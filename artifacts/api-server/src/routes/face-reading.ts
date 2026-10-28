import { Router, type IRouter } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import { buildKnowledgeContext } from "../lib/knowledge/index.js";

const router: IRouter = Router();

const MODEL = "gpt-4o";

const SYSTEM_PROMPT = `당신은 한국 전통 관상 문화를 현대적으로 풀어내는 오락용 AI 해설자입니다.
사진에서 직접 관찰 가능한 표정과 얼굴의 시각적 특징만 묘사하고, 전통 관상에서 해당 특징을 상징적으로 어떻게 해석하는지 조건부 표현으로 설명하세요.
얼굴만으로 실제 성격, 건강, 재산, 지능, 직업 적성, 연애 결과, 유전 특성 또는 미래를 판정할 수 있다고 주장하지 마세요.
의학적·심리학적·유전학적·재정적 근거가 있는 분석처럼 표현하지 말고, 모든 내용은 문화·오락 목적의 참고 문구로 작성하세요.
반드시 순수 JSON으로만 응답하세요.`;

const USER_PROMPT = `이 얼굴 사진에서 관찰 가능한 인상과 전통 관상 문화의 상징을 바탕으로 오락용 해설을 작성하세요.

모든 문장은 "~처럼 보일 수 있어요", "전통 관상에서는 ~로 풀이하기도 해요"처럼 조건부로 표현하세요. 실제 성격·운명·재산·건강·직업·연애·유전 정보를 확정하거나 예측하지 마세요.

아래 JSON 구조로만 응답하세요 (마크다운 없이 순수 JSON):
{
  "summary": "사진에서 보이는 첫인상과 전통 관상 상징을 구분해 설명하는 총평 2~3문장",
  "wealth": { "title": "생활 습관 상징", "score": 숫자(1-100), "reading": "이마·코·턱의 시각적 특징을 전통 관상에서 생활 태도의 상징으로 풀이하는 참고 문구 2~3문장" },
  "love": { "title": "관계 인상 상징", "score": 숫자(1-100), "reading": "눈매·입술·인중의 시각적 특징을 전통 관상에서 관계 인상의 상징으로 풀이하는 참고 문구 2~3문장" },
  "eyes": { "title": "눈 인상", "score": 숫자(1-100), "reading": "눈의 형태와 표정에서 보이는 시각적 인상을 전통 관상 상징과 함께 설명 2~3문장" },
  "nose": { "title": "코 인상", "score": 숫자(1-100), "reading": "코의 형태에서 보이는 시각적 인상을 전통 관상 상징과 함께 설명 2~3문장" },
  "mouth": { "title": "입 인상", "score": 숫자(1-100), "reading": "입술 형태와 표정에서 보이는 시각적 인상을 전통 관상 상징과 함께 설명 2~3문장" },
  "personality": { "title": "인상 키워드", "type": "오락용 인상 유형명", "traits": ["사진에서 느껴지는 인상 키워드 3가지"], "reading": "관찰 가능한 표정과 시각적 특징에서 떠올릴 수 있는 인상만 설명 3~4문장" },
  "career": { "title": "활동 환경 아이디어", "jobs": ["활동 아이디어 1", "활동 아이디어 2", "활동 아이디어 3", "활동 아이디어 4"], "reading": "인상 키워드에서 연상되는 활동 환경을 가볍게 제안하고 적성 판정이 아님을 드러내는 문구 2~3문장" },
  "compatibility": { "title": "관계 스타일 참고", "best": "대조적인 인상형", "reading": "사진의 인상과 대비되는 관계 스타일을 오락용으로 설명 2~3문장" },
  "dragonface": { "title": "인상 유형", "tier": "황금룡|청룡|백호|주작|현무 중 하나", "score": 숫자(1-100), "reading": "사진의 분위기를 다섯 가지 상징 유형 중 하나로 표현하는 오락용 설명 2~3문장" },
  "historical": { "title": "역사 인물 분위기 매칭", "person": "분위기가 연상되는 역사적 인물 이름", "era": "시대", "reading": "운명이나 신분이 아닌 시각적 분위기와 이미지의 공통점만 설명 2~3문장" },
  "aging": { "title": "미래 스타일 상상", "decade": "20년 후 이미지", "reading": "의학적 노화 예측이 아닌 스타일·표정 변화의 창의적 이미지 아이디어 2~3문장" },
  "baby": { "title": "아기 이미지 상상", "reading": "유전 예측이 아닌 따뜻한 가족 일러스트 콘셉트를 상상하는 오락용 문구 2~3문장" },
  "anime": { "title": "애니메이션 캐릭터 변환", "character": "어울리는 애니메이션 장르와 캐릭터 유형", "reading": "이 얼굴을 애니메이션으로 변환하면 어떤 캐릭터가 될지 구체적으로 묘사 2~3문장" },
  "fortune": { "title": "오늘의 참고 테마", "reading": "사진의 분위기에서 연상되는 가벼운 자기성찰 질문과 오늘의 행동 아이디어 2~3문장" },
  "advice": "중요한 결정을 지시하지 않는 작고 구체적인 일상 행동 제안 2~3문장"
}`;

router.post("/face-reading", async (req, res): Promise<void> => {
  const { imageBase64, language = "ko" } = req.body;
  if (!imageBase64 || typeof imageBase64 !== "string") {
    res.status(400).json({ error: "이미지 데이터가 필요합니다." });
    return;
  }

  const knowledge = buildKnowledgeContext(
    "face",
    [
      "face-regions",
      "forehead",
      "eyes",
      "nose",
      "mouth",
      "samjeong",
      "ogwan",
      "face-image-quality",
      "lighting",
      "camera-angle",
      "occlusion",
      "asymmetry",
    ],
    language,
  );
  const languageInstruction =
    language === "ko"
      ? "모든 JSON 문자열 값은 한국어로 작성하세요."
      : `모든 JSON 문자열 값은 ${language} 언어로 작성하세요. JSON 키는 기존 구조를 유지하세요.`;

  const imageUrl = imageBase64.startsWith("data:")
    ? imageBase64
    : `data:image/jpeg;base64,${imageBase64}`;

  console.info("[관상] OpenAI API 호출 시작", { model: MODEL });

  let completion;
  try {
    const client = getOpenAIClient();
    completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 8192,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageUrl, detail: "high" },
            },
            {
              type: "text",
              text: `${USER_PROMPT}\n${languageInstruction}\n${knowledge.text}`,
            },
          ],
        },
      ],
    });
  } catch (apiErr: unknown) {
    const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
    console.error("[관상] OpenAI API 호출 실패", { err: msg });
    if (msg.includes("OPENAI_API_KEY")) {
      res.status(503).json({ error: "AI 관상 서비스가 아직 설정되지 않았습니다." });
      return;
    }
    res.status(502).json({
      error: "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    });
    return;
  }

  console.info("[관상] OpenAI 응답 완료", {
    inputTokens: completion.usage?.prompt_tokens,
    outputTokens: completion.usage?.completion_tokens,
  });

  const textContent = completion.choices[0]?.message?.content;
  if (typeof textContent !== "string" || !textContent.trim()) {
    res.status(500).json({ error: "분석 결과를 받지 못했습니다." });
    return;
  }

  const text = textContent
    .trim()
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  let analysis;
  try {
    analysis = JSON.parse(text);
  } catch {
    console.error("[관상] JSON 파싱 실패", { raw: text.slice(0, 300) });
    res.status(500).json({ error: "분석 결과 처리 중 오류가 발생했습니다." });
    return;
  }

  res.json(analysis);
});

export default router;
