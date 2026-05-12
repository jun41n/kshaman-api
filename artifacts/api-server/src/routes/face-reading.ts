import { Router, type IRouter } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { logger } from "../lib/logger.js";

const router: IRouter = Router();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  logger.warn("[관상] ANTHROPIC_API_KEY 환경변수 없음 — 관상 라우트 비활성");
}

const MODEL = "claude-opus-4-5";
const anthropic = ANTHROPIC_API_KEY ? new Anthropic({ apiKey: ANTHROPIC_API_KEY }) : null;

const SYSTEM_PROMPT = `당신은 AI 관상 분석 시스템입니다. 동양 관상학, 현대 심리학, 유전학적 데이터를 통합한 최첨단 알고리즘으로 얼굴을 분석합니다. 반드시 순수 JSON으로만 응답하세요.`;

const USER_PROMPT = `이 얼굴 사진을 AI 관상 알고리즘으로 정밀 분석하세요.

아래 JSON 구조로만 응답하세요 (마크다운 없이 순수 JSON):
{
  "summary": "첫인상·전반적 기운 총평 2~3문장",
  "wealth": { "title": "재물운", "score": 숫자(1-100), "reading": "이마·코·턱 형태로 읽는 재물 기운과 부의 흐름 2~3문장" },
  "love": { "title": "연애운", "score": 숫자(1-100), "reading": "눈매·입술·인중으로 읽는 연애운과 인연의 깊이 2~3문장" },
  "eyes": { "title": "눈", "score": 숫자(1-100), "reading": "눈의 형태와 광채로 읽는 지혜·감수성·인복 2~3문장" },
  "nose": { "title": "코", "score": 숫자(1-100), "reading": "코의 형태·높이로 읽는 재복·자존감·의지력 2~3문장" },
  "mouth": { "title": "입", "score": 숫자(1-100), "reading": "입술·크기로 읽는 언변·애정운·사교성 2~3문장" },
  "personality": { "title": "성격 분석", "type": "MBTI 스타일 한 단어 유형명", "traits": ["핵심 성격 특성 3가지 키워드"], "reading": "얼굴 구조에서 읽히는 성격과 내면의 기질 3~4문장" },
  "career": { "title": "직업 추천", "jobs": ["추천 직업 1", "추천 직업 2", "추천 직업 3", "추천 직업 4"], "reading": "이 관상에 맞는 직업군과 그 이유 2~3문장" },
  "compatibility": { "title": "관계 궁합", "best": "가장 잘 맞는 인상형", "reading": "대인관계·궁합·인간관계에서의 강점과 주의점 2~3문장" },
  "dragonface": { "title": "운명 등급", "tier": "황금룡|청룡|백호|주작|현무 중 하나", "score": 숫자(1-100), "reading": "AI 관상 분석으로 읽은 이 얼굴의 특별한 운명적 기운 2~3문장" },
  "historical": { "title": "역사적 인물 매칭", "person": "가장 닮은 역사적 인물 이름", "era": "시대", "similarity": 유사도숫자(60-99), "reading": "이 인물과의 관상학적 공통점과 운명적 유사성 2~3문장" },
  "aging": { "title": "노화 시뮬레이션", "decade": "20년 후 예측", "reading": "이 얼굴의 뼈대·피부·이목구비가 세월에 따라 어떻게 변화할지 구체적으로 예측 2~3문장" },
  "baby": { "title": "미래 아기 예측", "reading": "이 사람의 유전적 특성이 자녀에게 어떻게 전달될지 눈·코·입 중심으로 예측 2~3문장" },
  "anime": { "title": "애니메이션 캐릭터 변환", "character": "어울리는 애니메이션 장르와 캐릭터 유형", "reading": "이 얼굴을 애니메이션으로 변환하면 어떤 캐릭터가 될지 구체적으로 묘사 2~3문장" },
  "fortune": { "title": "전체 운세", "reading": "올해의 운세 흐름과 앞으로의 길흉화복 2~3문장" },
  "advice": "이 관상에 맞는 구체적이고 실질적인 인생 전략과 조언 2~3문장"
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

  req.log.info({ model: MODEL }, "[관상] Claude API 호출 시작");

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
    req.log.error({ err: msg }, "[관상] Claude API 호출 실패");
    res.status(502).json({ error: `AI 분석 중 오류가 발생했습니다: ${msg.slice(0, 120)}` });
    return;
  }

  req.log.info({ inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens }, "[관상] Claude 응답 완료");

  const content = message.content[0];
  if (content.type !== "text") { res.status(500).json({ error: "분석 결과를 받지 못했습니다." }); return; }

  const text = content.text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  let analysis;
  try {
    analysis = JSON.parse(text);
  } catch {
    req.log.error({ raw: text.slice(0, 300) }, "[관상] JSON 파싱 실패");
    res.status(500).json({ error: "분석 결과 처리 중 오류가 발생했습니다." });
    return;
  }

  res.json(analysis);
});

export default router;
