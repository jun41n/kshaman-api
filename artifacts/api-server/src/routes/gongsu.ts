import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import { pickRandomPersona } from "../lib/ai/gongsuPersonas.js";
import { buildSessionContext } from "../lib/ai/buildSessionContext.js";
import type { ReadingRequest } from "../lib/ai/types.js";
import type { Language } from "../lib/ai/types.js";

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// 출력 스키마 타입
// ─────────────────────────────────────────────────────────────────────────────
interface GongsuOutput {
  intro_gongsu: string;
  past_cause: string;
  future_warning: string;
  solution_bibang: string;
}

interface GongsuResponse {
  personaId: string;
  displayName: string;
  locale: Language;
  result: GongsuOutput;
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON 스키마 지시문 (locale별)
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemaInstruction(locale: Language, introLine: string): string {
  if (locale === "ko") {
    return `
반드시 아래 JSON 스키마를 정확히 따라 응답하라. 다른 형식은 절대 불가하다.

{
  "intro_gongsu": "(반드시 이 문장을 그대로 첫머리에 넣어라: '${introLine}') 이어서 내담자의 속마음을 꿰뚫는 강렬한 첫마디",
  "past_cause": "문제의 원인을 무속적 세계관과 해당 캐릭터의 말투로 해석한 내용",
  "future_warning": "다가올 위험에 대한 단호한 경고 — 캐릭터 성격 완전히 반영",
  "solution_bibang": "일상에서 실천 가능한 액막이 비방 및 마무리 조언"
}

엄격한 규칙:
1. intro_gongsu의 첫 문장은 반드시 제공된 시작 지문 '${introLine}' 을 이탤릭이나 괄호 없이 그대로 포함할 것.
2. 각 필드는 최소 2문장 이상.
3. 캐릭터의 말투, 금지사항, 주요 단어를 모든 필드에서 일관되게 사용할 것.
4. JSON 외 다른 텍스트(마크다운, 설명, 주석 등) 절대 출력 금지.
    `.trim();
  }

  return `
You MUST respond using exactly this JSON schema. No other format is allowed.

{
  "intro_gongsu": "(MUST begin with this exact line: '${introLine}') followed by an intense opening that pierces the user's inner feelings",
  "past_cause": "Interpretation of the root cause using a shamanistic worldview and this character's voice",
  "future_warning": "Firm warning about coming danger — fully reflecting the character's personality",
  "solution_bibang": "Practical everyday countermeasure advice and closing guidance"
}

Strict rules:
1. intro_gongsu MUST open with the exact line: '${introLine}'
2. Each field must be at least 2 sentences.
3. Maintain the character's speech style, vocabulary, and forbidden phrases consistently across all fields.
4. Output ONLY the JSON object — no markdown, no explanations, no comments.
  `.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/gongsu/generate
// ─────────────────────────────────────────────────────────────────────────────
router.post("/gongsu/generate", async (req, res) => {
  try {
    const body = req.body as ReadingRequest;

    if (!body.userProfile) {
      res.status(400).json({ error: "userProfile is required" });
      return;
    }

    const { userProfile } = body;
    const locale = userProfile.locale ?? "ko";

    // 1. 무작위 캐릭터 선택
    const persona = pickRandomPersona();

    console.log(
      `[gongsu] locale=${locale} persona=${persona.id} user=${userProfile.firstName}`
    );

    // 2. 시스템 프롬프트 구성
    //    ① 전역 언어 지시
    //    ② 캐릭터 설정 (말투, 단어, 금지)
    //    ③ 사용자 프로필 컨텍스트
    //    ④ JSON 스키마 지시문
    const LANG_LABEL: Record<Language, string> = {
      ko: "Korean (한국어)",
      en: "English",
      ja: "Japanese (日本語)",
      es: "Spanish (Español)",
      pt: "Portuguese (Português)",
      fr: "French (Français)",
    };

    const systemPrompt = [
      `⚠️ ABSOLUTE RULE — LANGUAGE: Respond ENTIRELY in ${LANG_LABEL[locale]}. Every word must be in ${LANG_LABEL[locale]}.`,
      "",
      "---",
      "",
      persona.buildSystemPrompt(locale),
      "",
      "---",
      "",
      buildSessionContext(userProfile),
      "",
      "---",
      "",
      buildSchemaInstruction(locale, persona.intro_line),
    ].join("\n");

    // 3. 사용자 메시지 (운세 요청)
    const userMessage =
      locale === "ko"
        ? `이 내담자의 운세를 봐줘. 사주 정보를 바탕으로 네 캐릭터 그대로 공수를 전해줘.`
        : `Read this person's fortune. Deliver your message completely in character based on their birth data.`;

    // 4. OpenAI 호출 — JSON 모드
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.95,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      res.status(500).json({ error: "No response from AI" });
      return;
    }

    // 5. JSON 파싱 (response_format: json_object 이므로 항상 유효한 JSON)
    let result: GongsuOutput;
    try {
      result = JSON.parse(rawContent) as GongsuOutput;
    } catch {
      console.error("[gongsu] JSON parse failed:", rawContent.slice(0, 300));
      res.status(500).json({ error: "AI returned invalid JSON", raw: rawContent });
      return;
    }

    // 6. 필드 존재 검증
    const required: (keyof GongsuOutput)[] = [
      "intro_gongsu",
      "past_cause",
      "future_warning",
      "solution_bibang",
    ];
    const missing = required.filter((k) => !result[k]);
    if (missing.length > 0) {
      res.status(500).json({ error: `Missing fields: ${missing.join(", ")}`, raw: result });
      return;
    }

    console.log(`[gongsu] success persona=${persona.id} chars=${rawContent.length}`);

    const response: GongsuResponse = {
      personaId: persona.id,
      displayName: locale === "ko" ? persona.display_name_ko : persona.display_name_en,
      locale,
      result,
    };

    res.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[gongsu/generate] Error:", message);

    if (message.includes("OPENAI_API_KEY")) {
      res.status(503).json({ error: "AI service not configured" });
      return;
    }

    res.status(500).json({ error: "Failed to generate gongsu", detail: message });
  }
});

export default router;
