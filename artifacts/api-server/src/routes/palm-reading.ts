import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";

const router = Router();
type Tier = "free" | "premium";

const SYSTEM_PROMPT = `당신은 손금 전통을 현대적인 자기성찰 콘텐츠로 설명하는 오락용 AI 해설자입니다.
이미지에서 실제로 보이는 손바닥의 선과 형태만 관찰하고, 전통 수상학의 상징을 조건부 표현으로 설명하세요.
손금으로 건강, 수명, 임신·출산, 재산, 투자, 법률, 진로 성공, 연애 결과를 확정하거나 예측하지 마세요.
의학적·심리학적 근거가 있는 진단처럼 표현하지 말고, 모든 내용은 문화·오락 목적의 참고 안내로 작성하세요.
반드시 순수 JSON만 반환하세요.`;

const FREE_SCHEMA = `{
  "summary": "관찰 가능한 손바닥 인상과 전통 상징을 구분한 총평 2~3문장",
  "lines": [
    {"name": "생명선", "reading": "선의 형태를 관찰하고 전통 상징을 조건부로 설명하는 2문장"},
    {"name": "두뇌선", "reading": "선의 형태를 관찰하고 전통 상징을 조건부로 설명하는 2문장"},
    {"name": "감정선", "reading": "선의 형태를 관찰하고 전통 상징을 조건부로 설명하는 2문장"}
  ],
  "observation": "사진에서 보이는 손바닥 상태와 촬영 품질에 대한 짧은 안내",
  "reflection": "오늘 시도해 볼 수 있는 안전한 자기성찰 질문 1개"
}`;

const PREMIUM_SCHEMA = `{
  "summary": "무료 총평보다 구체적인 종합 해설 3~4문장",
  "lines": [{"name":"선 이름","reading":"관찰과 전통 상징을 구분한 3문장"}],
  "mounts": [{"name":"언덕 이름","reading":"손바닥 부위의 시각적 특징과 전통적 상징을 조건부로 설명하는 2문장"}],
  "patterns": [{"name":"관찰 패턴","reading":"두 개 이상의 관찰 요소를 연결한 오락용 해설 2~3문장"}],
  "everyday": ["직장·학습에서 시도할 구체적 행동", "관계에서 시도할 구체적 행동", "생활 리듬을 점검할 구체적 행동"],
  "reflection": "중요한 결정을 대신하지 않는 자기성찰 질문 1개"
}`;

function cleanJson(text: string): string {
  return text.trim().replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "").trim();
}

router.post("/palm-reading", async (req, res): Promise<void> => {
  const { images, tier = "free" } = req.body as {
    images?: Array<{ side?: string; imageBase64?: string }>;
    tier?: Tier;
  };

  if (!Array.isArray(images) || images.length < 1 || images.length > 2) {
    res.status(400).json({ error: "손바닥 이미지가 한 장 이상 필요합니다." });
    return;
  }
  if (tier !== "free" && tier !== "premium") {
    res.status(400).json({ error: "tier는 free 또는 premium이어야 합니다." });
    return;
  }
  if (images.some((image) => typeof image.imageBase64 !== "string" || !image.imageBase64.startsWith("data:image/"))) {
    res.status(400).json({ error: "지원되는 이미지 데이터가 필요합니다." });
    return;
  }

  const prompt = tier === "free"
    ? `손바닥 이미지에서 무료 기본 해설을 작성하세요. 양손 이미지가 있으면 공통점만 조심스럽게 비교하세요.\nJSON 구조:\n${FREE_SCHEMA}`
    : `손바닥 이미지에서 프리미엄 상세 해설을 작성하세요. 무료 기본 항목보다 관찰 가능한 특징, 선 사이의 관계, 생활 속 실천을 구체화하세요. 건강·수명·재산·미래를 판정하지 마세요.\nJSON 구조:\n${PREMIUM_SCHEMA}`;

  try {
    const client = getOpenAIClient();
    const content = [
      { type: "text" as const, text: prompt },
      ...images.map((image) => ({
        type: "image_url" as const,
        image_url: { url: image.imageBase64 as string, detail: "high" as const },
      })),
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content },
      ],
      temperature: 0.65,
      max_tokens: tier === "premium" ? 2600 : 1000,
    });
    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty palm reading response");
    const result = JSON.parse(cleanJson(text));
    res.json({ tier, result, disclaimer: "문화·오락 목적의 참고 안내이며 전문적인 판단을 대신하지 않습니다." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[손금] OpenAI 분석 실패", { tier, message });
    if (message.includes("OPENAI_API_KEY")) {
      res.status(503).json({ error: "AI 손금 서비스가 아직 설정되지 않았습니다." });
      return;
    }
    res.status(502).json({ error: "손금 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." });
  }
});

export default router;
