import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import { buildReadingMessages } from "../lib/ai/buildFinalMessages.js";
import type { ReadingRequest, ReadingResponse } from "../lib/ai/types.js";

const router = Router();

const FREE_PRODUCTS = new Set(["daily_fortune"]);
const LONGEST_PRODUCTS = new Set(["yearly_fortune", "saju"]);

function getMaxTokens(productId: string): number {
  if (FREE_PRODUCTS.has(productId)) return 700;
  if (LONGEST_PRODUCTS.has(productId)) return 4000;
  return 3200;
}

// Minimum character thresholds for paid products before triggering expansion
const MIN_CHARS_BY_PRODUCT: Record<string, number> = {
  saju: 2000,
  yearly_fortune: 2500,
  compatibility: 2000,
  luck_cycle: 2000,
  date_selection: 2000,
};

// Continuation instruction — added to conversation so model appends more content
const CONTINUATION_MESSAGES: Record<string, string> = {
  ko: `점사가 아직 충분히 깊지 않습니다. 위의 내용을 이어받아 다음을 추가로 작성해 주세요:

① 아직 충분히 전개하지 않은 섹션이 있다면 그 섹션을 더 깊이 발전시켜 주세요.
② 사용자의 생년월일에서 오는 에너지가 현재 삶의 구체적인 영역(직업, 인간관계, 건강, 재물)에 어떻게 나타나는지 더 자세히 분석해 주세요.
③ 실질적인 조언 섹션을 더 구체적이고 실행 가능하게 확장해 주세요.
④ 가장 강력한 마무리 문장으로 끝맺어 주세요.

위 내용을 반복하지 말고, 바로 이어서 새로운 내용을 추가로 써주세요.`,

  en: `This reading needs more depth. Please continue from where you left off and add:

① Expand any sections that were not fully developed.
② Add detailed analysis of how the user's birth energy manifests in specific life areas (career, relationships, health, finances).
③ Expand the practical advice section with more concrete, actionable guidance.
④ End with a powerful closing statement.

Do NOT repeat the above content — just continue writing new content from here.`,
};

/**
 * POST /api/reading/generate
 *
 * Generates a one-time spiritual reading based on persona + product + user profile.
 * For paid products: automatically requests a deeper expansion if the first response is too short.
 *
 * TODO (payment): Before calling the AI, verify payment status here.
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
      res
        .status(400)
        .json({ error: "personaId and productId are required in userProfile" });
      return;
    }

    const client = getOpenAIClient();
    const { messages } = buildReadingMessages(userProfile);
    const maxTokens = getMaxTokens(userProfile.productId);
    const isPaid = !FREE_PRODUCTS.has(userProfile.productId);
    const minChars = MIN_CHARS_BY_PRODUCT[userProfile.productId] ?? 2000;

    console.log(
      `[reading/generate] persona=${userProfile.personaId} product=${userProfile.productId} max_tokens=${maxTokens}`,
    );

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.88,
      max_tokens: maxTokens,
    });

    let content = completion.choices[0]?.message?.content ?? "";
    if (!content) {
      res.status(500).json({ error: "No response generated" });
      return;
    }

    console.log(`[reading/generate] First pass: ${content.length} chars`);

    // Auto-continuation: if paid reading is too short, append more content
    if (isPaid && content.length < minChars) {
      console.log(
        `[reading/generate] Too short (${content.length} < ${minChars}), requesting continuation...`,
      );

      const continuationLocale = (
        userProfile.locale === "ko" ? "ko" : "en"
      ) as keyof typeof CONTINUATION_MESSAGES;
      const continuationInstruction =
        CONTINUATION_MESSAGES[continuationLocale] ?? CONTINUATION_MESSAGES.en;

      const continuationMessages = [
        ...messages,
        { role: "assistant" as const, content },
        { role: "user" as const, content: continuationInstruction },
      ];

      const continuationCompletion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: continuationMessages,
        temperature: 0.88,
        max_tokens: maxTokens,
      });

      const continuation = continuationCompletion.choices[0]?.message?.content;
      if (continuation && continuation.trim().length > 100) {
        // Append the continuation to the original (additive — guaranteed to be longer)
        content = content + "\n\n" + continuation;
        console.log(
          `[reading/generate] After continuation: ${content.length} chars`,
        );
      } else {
        console.log(
          `[reading/generate] Continuation was empty or too short, using original`,
        );
      }
    }

    console.log(
      `[reading/generate] Final: ${content.length} chars for ${userProfile.productId}`,
    );

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

    res
      .status(500)
      .json({ error: "Failed to generate reading", detail: message });
  }
});

export default router;
