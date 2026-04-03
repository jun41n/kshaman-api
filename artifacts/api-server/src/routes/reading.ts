import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import { buildReadingMessages } from "../lib/ai/buildFinalMessages.js";
import type { ReadingRequest, ReadingResponse } from "../lib/ai/types.js";

const router = Router();

/**
 * POST /api/reading/generate
 *
 * Generates a one-time spiritual reading based on persona + product + user profile.
 *
 * TODO (payment): Before calling the AI, verify payment status here.
 * For now, all requests in development mode are allowed through.
 * Example future check:
 *   const isPaid = await verifyPayment(req.body.paymentToken);
 *   if (!isPaid && product.id !== 'daily_fortune') return res.status(402).json({ error: 'Payment required' });
 */
router.post("/reading/generate", async (req, res) => {
  try {
    const body = req.body as ReadingRequest;

    if (!body.userProfile) {
      res.status(400).json({ error: "userProfile is required" });
      return;
    }

    const { userProfile } = body;

    if (!userProfile.personaId || !userProfile.productId) {
      res.status(400).json({ error: "personaId and productId are required in userProfile" });
      return;
    }

    const client = getOpenAIClient();
    const { messages } = buildReadingMessages(userProfile);

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.85, // Slightly creative for persona authenticity
      max_tokens: 1200,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      res.status(500).json({ error: "No response generated" });
      return;
    }

    const response: ReadingResponse = {
      content,
      personaId: userProfile.personaId,
      productId: userProfile.productId,
    };

    res.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[reading/generate] Error:", message);

    // Surface API key errors clearly
    if (message.includes("OPENAI_API_KEY")) {
      res.status(503).json({
        error: "AI service not configured",
        detail: "OPENAI_API_KEY environment variable is not set.",
      });
      return;
    }

    res.status(500).json({ error: "Failed to generate reading", detail: message });
  }
});

export default router;
