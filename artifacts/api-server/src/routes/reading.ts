import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import { buildReadingMessages } from "../lib/ai/buildFinalMessages.js";
import type { ReadingRequest, ReadingResponse } from "../lib/ai/types.js";

const router = Router();

// Products that are free and should use shorter responses
const FREE_PRODUCTS = new Set(["daily_fortune"]);

// Products with the longest expected output
const LONGEST_PRODUCTS = new Set(["yearly_fortune", "saju"]);

function getMaxTokens(productId: string): number {
  if (FREE_PRODUCTS.has(productId)) return 600;
  if (LONGEST_PRODUCTS.has(productId)) return 3500;
  return 2800; // All other paid products
}

/**
 * POST /api/reading/generate
 *
 * Generates a one-time spiritual reading based on persona + product + user profile.
 *
 * TODO (payment): Before calling the AI, verify payment status here.
 * For now, all requests in development mode are allowed through.
 * Example future check:
 *   const isPaid = await verifyPaymentToken(req.body.paymentToken);
 *   if (!isPaid && !FREE_PRODUCTS.has(userProfile.productId)) {
 *     return res.status(402).json({ error: 'Payment required' });
 *   }
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
    const maxTokens = getMaxTokens(userProfile.productId);

    console.log(`[reading/generate] persona=${userProfile.personaId} product=${userProfile.productId} max_tokens=${maxTokens}`);

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.88, // Slightly creative for authentic persona voice
      max_tokens: maxTokens,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      res.status(500).json({ error: "No response generated" });
      return;
    }

    console.log(`[reading/generate] Generated ${content.length} chars for ${userProfile.productId}`);

    const response: ReadingResponse = {
      content,
      personaId: userProfile.personaId,
      productId: userProfile.productId,
    };

    res.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[reading/generate] Error:", message);

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
