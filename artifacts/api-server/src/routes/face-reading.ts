import { Router, type IRouter } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router: IRouter = Router();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.warn("[관상] ANTHROPIC_API_KEY 환경변수 없음 — 관상 라우트 비활성");
}

const MODEL = "claude-opus-4-5";
const anthropic = ANTHROPIC_API_KEY ? new Anthropic({ apiKey: ANTHROPIC_API_KEY }) : null;

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
  if (!anthropic) {
    res.status(503).json({ error: "관상 분석 서비스를 사용할 수 없습니다." });
    return;
  }

  const { imageBase64 } = req.body;
  if (!imageBase64 || typeof imageBase64 !== "string") {
    res.status(400).json({ error: "이미지 데이터가 필요합니다." });
    return;
  }

  let base64Data = imageBase64;
  let mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" = "image/jpeg";

  if (imageBase64.startsWith("data:")) {
    const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) { res.status(400).json({ error: "잘못된 이미지 형식입니다." }); return; }
    const t = match[1];
    if (t === "image/jpeg" || t === "image/png" || t === "image/gif" || t === "image/webp") mediaType = t;
    base64Data = match[2];
  }

  req.log?.info({ model: MODEL }, "[관상] Claude API 호출 시작");

  let message;
  try {
    message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64Data } },
          { type: "text", text: USER_PROMPT },
        ],
      }],
    });
  } catch (apiErr: unknown) {
    const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
    req.log?.error({ err: msg }, "[관상] Claude API 호출 실패");
    res.status(502).json({ error: "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    return;
  }

  req.log?.info({ inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens }, "[관상] Claude 응답 완료");

  const content = message.content[0];
  if (content.type !== "text") { res.status(500).json({ error: "분석 결과를 받지 못했습니다." }); return; }

  const text = content.text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  let analysis;
  try {
    analysis = JSON.parse(text);
  } catch {
    req.log?.error({ raw: text.slice(0, 300) }, "[관상] JSON 파싱 실패");
    res.status(500).json({ error: "분석 결과 처리 중 오류가 발생했습니다." });
    return;
  }

  res.json(analysis);
});

export default router;
