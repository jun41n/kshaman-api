import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import {
  buildAskAnythingMessages,
  buildSummaryUpdatePrompt,
} from "../lib/ai/buildFinalMessages.js";
import {
  createSession,
  getSession,
  updateSession,
} from "../lib/ai/sessionStore.js";
import type { MessageRequest, MessageResponse } from "../lib/ai/types.js";

const router = Router();

/**
 * POST /api/ask-anything/message
 *
 * Handles a single Ask Anything chat turn.
 * - Creates or resumes a session
 * - Builds full prompt with re-injected persona/product/context on EVERY turn (anti-drift)
 * - Maintains a conversation summary for long-session memory
 * - Returns the assistant reply and remaining question count
 *
 * TODO (payment): Add session creation gating behind payment verification.
 * For now, sessions are created freely in development mode.
 * Example future check:
 *   if (!req.body.paymentToken) return res.status(402).json({ error: 'Payment required' });
 */
router.post("/ask-anything/message", async (req, res) => {
  try {
    const body = req.body as MessageRequest;

    if (!body.userMessage || !body.userProfile) {
      res.status(400).json({ error: "userMessage and userProfile are required" });
      return;
    }

    const { userMessage, userProfile } = body;
    let sessionId = body.sessionId;

    // Get or create session
    let session = sessionId ? getSession(sessionId) : null;

    if (!session) {
      session = createSession({
        personaId: userProfile.personaId,
        productId: userProfile.productId,
        locale: userProfile.locale,
        userProfile,
      });
      sessionId = session.sessionId;
    }

    // Check remaining questions
    if (session.remainingQuestions <= 0) {
      res.status(429).json({
        error: "Session limit reached",
        detail: `This session has reached the maximum of ${session.maxQuestions} questions.`,
        sessionId,
      });
      return;
    }

    const client = getOpenAIClient();

    // Build full prompt with ALL layers re-injected (prevents persona drift)
    const { messages } = buildAskAnythingMessages(
      session.userProfile,
      session.messages,
      session.conversationSummary,
      userMessage
    );

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.9, // Slightly higher for conversational expressiveness
      max_tokens: 600,
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply) {
      res.status(500).json({ error: "No response generated" });
      return;
    }

    // Update session messages
    const updatedMessages = [
      ...session.messages,
      { role: "user" as const, content: userMessage },
      { role: "assistant" as const, content: reply },
    ];

    const remainingQuestions = session.remainingQuestions - 1;

    // Asynchronously update conversation summary every 4 turns
    // This runs in the background and doesn't block the response
    let newSummary = session.conversationSummary;
    if (updatedMessages.length % 8 === 0) {
      try {
        const { messages: summaryMessages } = buildSummaryUpdatePrompt(
          session.personaId,
          session.locale,
          session.conversationSummary,
          { userMessage, assistantReply: reply }
        );

        const summaryCompletion = await client.chat.completions.create({
          model: "gpt-4o-mini", // Use mini for summary — cheaper and fast enough
          messages: summaryMessages,
          temperature: 0.3,
          max_tokens: 200,
        });

        newSummary = summaryCompletion.choices[0]?.message?.content ?? newSummary;
      } catch (summaryErr) {
        // Non-critical — session continues even if summary update fails
        console.warn("[ask-anything] Summary update failed:", summaryErr);
      }
    }

    // Persist updated session
    updateSession(session.sessionId, {
      messages: updatedMessages,
      remainingQuestions,
      conversationSummary: newSummary,
    });

    const response: MessageResponse = {
      sessionId: session.sessionId,
      reply,
      remainingQuestions,
      personaId: session.personaId,
    };

    res.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[ask-anything/message] Error:", message);

    if (message.includes("OPENAI_API_KEY")) {
      res.status(503).json({
        error: "AI service not configured",
        detail: "OPENAI_API_KEY environment variable is not set.",
      });
      return;
    }

    res.status(500).json({ error: "Failed to generate reply", detail: message });
  }
});

export default router;
