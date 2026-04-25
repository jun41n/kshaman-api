import { Router } from "express";
import { getOpenAIClient } from "../lib/ai/openaiClient.js";
import { pickRandomPersona } from "../lib/ai/gongsuPersonas.js";
import { calcSaju } from "../lib/ai/sajuCalc.js";
import type { ReadingRequest } from "../lib/ai/types.js";
import type { Language } from "../lib/ai/types.js";

const router = Router();

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
// 핵심 개선: 사주 데이터 기반 "팩트 폭격" 컨텍스트
// ─────────────────────────────────────────────────────────────────────────────
function buildSajuContext(saju: ReturnType<typeof calcSaju>, name: string, locale: Language): string {
  const isKo = locale === "ko";

  if (isKo) {
    return `
══════════════════════════════════════════════
이 내담자의 사주 원소 (반드시 이 데이터를 운세 해석의 근거로 써라)
══════════════════════════════════════════════

이름: ${name}
${saju.summaryForPrompt}

【오행 성격 특성】
출생 천간 ${saju.yearStem} = ${saju.yearElement} ${saju.yearYinYang}의 기운:
${getStemPersonality(saju.yearElement, "ko")}

출생 월지 ${saju.monthBranch} = ${saju.monthSeason} 기운:
${getMonthPersonality(saju.monthBranch, "ko")}

【${saju.currentYear}년 흐름 진단】
현재 연도: ${saju.currentYearPillar}년
연지 충합: ${saju.branchRelation.type} (강도: ${saju.branchRelation.energy})
→ ${saju.branchRelation.description}
천간 오행: ${saju.stemRelation.type}
→ ${saju.stemRelation.description}

══════════════════════════════════════════════
【팩트 폭격 필수 규칙】
══════════════════════════════════════════════

위 사주 데이터를 반드시 활용해서 아래 규칙을 지켜라:

1. 띠·오행을 명시적으로 언급해라.
   예: "${name}는 ${saju.yearZodiac}띠 ${saju.yearElement} 기운이라서..."
   예: "${saju.currentYear}년은 ${saju.branchRelation.type}이 걸린 해야..."

2. 나이·시간을 구체적으로 언급해라.
   예: "만 ${saju.currentAge}세인 지금이 딱 그 시기야"
   예: "${saju.currentYear}년 하반기, 특히 7~9월을 조심해라"
   예: "이 기운은 내년까지 이어진다"

3. 뜬구름 금지. 아래는 절대 쓰지 마라:
   ✗ "인간관계를 잘 챙겨야 해"
   ✗ "결단력이 부족할 수 있어"
   ✗ "재물에 주의해야 해"

4. 대신 이런 식으로 써라:
   ✓ "${saju.yearZodiac}띠 특유의 [구체적 성격]이 지금 [구체적 상황]에서 문제가 되고 있어"
   ✓ "${saju.branchRelation.type} 기운이 걸린 해라, [구체적 사건 영역]에서 갑자기 터질 수 있어"
   ✓ "${saju.yearElement} 기운이 강한 사람은 [구체적 약점]이 있어서..."

5. 각 필드에 최소 3~4문장, 사주 원소 기반 팩트를 최소 1개 이상 포함해라.
`.trim();
  }

  return `
══════════════════════════════════════════════
SUBJECT'S SAJU DATA — Use this as the factual basis for all readings
══════════════════════════════════════════════

Name: ${name}
${saju.summaryForPrompt}

[Element Personality]
Birth stem ${saju.yearStem} = ${saju.yearElement} ${saju.yearYinYang} energy:
${getStemPersonality(saju.yearElement, "en")}

Birth month branch ${saju.monthBranch} = ${saju.monthSeason} energy:
${getMonthPersonality(saju.monthBranch, "en")}

[${saju.currentYear} Energy Analysis]
Current year: ${saju.currentYearPillar}
Branch relation: ${saju.branchRelation.type} (strength: ${saju.branchRelation.energy})
→ ${saju.branchRelation.description}
Stem element: ${saju.stemRelation.type}
→ ${saju.stemRelation.description}

══════════════════════════════════════════════
SPECIFICITY RULES — MANDATORY
══════════════════════════════════════════════

1. Explicitly reference their zodiac animal and element.
   e.g., "As a ${saju.yearZodiac} with ${saju.yearElement} energy..."
   e.g., "In ${saju.currentYear}, with ${saju.branchRelation.type} in effect..."

2. Use specific age and time references.
   e.g., "At age ${saju.currentAge}, this is exactly the critical window"
   e.g., "The second half of ${saju.currentYear} carries particularly heavy energy"

3. BANNED generic phrases:
   ✗ "Be careful with relationships"
   ✗ "You may lack decisiveness"
   ✗ "Watch your finances"

4. USE these specific patterns instead:
   ✓ "The ${saju.yearZodiac}'s typical [trait] is causing problems in [specific area] right now"
   ✓ "With ${saju.branchRelation.type} hitting this year, [specific domain] could suddenly shift"
   ✓ "People with strong ${saju.yearElement} energy have a weakness in [specific area]..."
`.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// 오행별 성격 특성
// ─────────────────────────────────────────────────────────────────────────────
function getStemPersonality(element: string, lang: "ko" | "en"): string {
  const el = element.replace(/\(.*\)/, "").trim();
  if (lang === "ko") {
    const map: Record<string, string> = {
      "목": "창의적이고 성장 지향적이나 고집이 세고 유연성이 부족함. 새 시작은 잘 하지만 마무리가 약하고, 인정받으려는 욕구가 강해 상처를 잘 받음.",
      "화": "열정적이고 카리스마 있으나 충동적이고 쉽게 달아올라 쉽게 식음. 인간관계 폭은 넓으나 깊이가 얕고, 자존심이 강해서 사과가 어려움.",
      "토": "안정적이고 신뢰감 있으나 우유부단하고 변화를 극도로 싫어함. 한 자리에 오래 앉아 있지만 그 안에서 쌓인 불만이 폭발할 때 무섭게 터짐.",
      "금": "원칙적이고 결단력 있으나 냉정하고 완벽주의적. 기준이 높아서 스스로도 타인도 힘들게 하고, 감정 표현을 억누르다 갑자기 폭발하는 패턴.",
      "수": "직관력이 뛰어나고 적응력 강하나 우유부단하고 감정 기복이 심함. 아이디어가 많지만 실행력이 약하고, 불안감이 크며 혼자 끙끙 앓는 경향.",
    };
    return map[el] ?? "복합적인 오행 기운을 지님.";
  }
  const map: Record<string, string> = {
    "목": "Creative and growth-oriented but stubborn and inflexible. Great at starting things but weak at finishing. Sensitive to recognition and easily wounded.",
    "화": "Passionate and charismatic but impulsive — burns hot then cools fast. Wide social circle but lacks depth. Strong pride makes apology difficult.",
    "토": "Stable and trustworthy but indecisive and averse to change. Bottles frustration for long periods, then explodes without warning.",
    "금": "Principled and decisive but cold and perfectionistic. High standards exhaust both self and others. Suppresses emotion until sudden eruption.",
    "수": "Intuitive and adaptable but indecisive with emotional volatility. Rich in ideas but weak in execution. Prone to anxiety and silent suffering.",
  };
  return map[el] ?? "Complex elemental energy.";
}

function getMonthPersonality(monthBranch: string, lang: "ko" | "en"): string {
  const SEASON_DESC_KO: Record<string, string> = {
    "인(寅)": "봄이 막 시작되는 시기에 태어나 추진력과 개척 정신이 강하다. 새로운 것에 본능적으로 달려들지만 끝맺음이 부족하다.",
    "묘(卯)": "봄 한복판에 태어나 감수성과 미적 감각이 풍부하다. 그러나 타인의 시선에 예민하고 쉽게 흔들린다.",
    "진(辰)": "봄이 무르익을 때 태어나 현실 감각과 실행력이 강하다. 고집이 세고 자기 방식을 쉽게 바꾸지 않는다.",
    "사(巳)": "여름이 시작될 때 태어나 총명하고 전략적이다. 그러나 속을 잘 드러내지 않아 주변과 오해가 생기기 쉽다.",
    "오(午)": "여름 한복판에 태어나 에너지가 넘치고 존재감이 강하다. 충동적이고 참을성이 부족한 면이 있다.",
    "미(未)": "여름이 끝날 때 태어나 온화하고 배려심이 깊다. 그러나 결정을 못 내리고 미루는 경향이 강하다.",
    "신(申)": "가을이 시작될 때 태어나 영리하고 실리적이다. 이익을 계산하는 경향이 있어 타인에게 차갑게 느껴지기도 한다.",
    "유(酉)": "가을 한복판에 태어나 완벽주의적이고 예리하다. 비판적 시선이 강해 본인도 타인도 피곤하게 만드는 면이 있다.",
    "술(戌)": "가을이 끝날 때 태어나 충직하고 의리가 강하다. 한 번 상처받으면 오래 품고, 겉으로는 안 내색해도 마음속에 오래 남긴다.",
    "해(亥)": "겨울이 시작될 때 태어나 자유를 사랑하고 독립적이다. 구속을 싫어하고 예측 불가한 행동으로 주변을 당황하게 만든다.",
    "자(子)": "겨울 한복판에 태어나 영리하고 자원 관리 능력이 뛰어나다. 겉으로 쿨해 보이지만 속으로 많은 것을 계산하고 있다.",
    "축(丑)": "겨울이 끝날 때 태어나 인내심이 강하고 묵묵히 해낸다. 그러나 변화를 극히 싫어하고 고집 부리다 기회를 놓치는 패턴이 있다.",
  };
  const SEASON_DESC_EN: Record<string, string> = {
    "인(寅)": "Born at spring's start — strong drive and pioneer spirit, but tends to leave things unfinished.",
    "묘(卯)": "Born in mid-spring — rich sensitivity and aesthetics, but easily swayed by others' opinions.",
    "진(辰)": "Born as spring peaks — practical and action-oriented, but stubborn and resistant to changing methods.",
    "사(巳)": "Born at summer's start — intelligent and strategic, but guarded, causing frequent misunderstandings.",
    "오(午)": "Born in midsummer — overflowing energy and strong presence, but impulsive with low patience.",
    "미(未)": "Born as summer ends — warm and considerate, but chronically indecisive and prone to procrastination.",
    "신(申)": "Born at autumn's start — clever and pragmatic, but calculating in ways that feel cold to others.",
    "유(酉)": "Born in mid-autumn — perfectionistic and sharp, but critical in ways that exhaust everyone including themselves.",
    "술(戌)": "Born as autumn ends — loyal and deeply committed, but holds wounds silently for a long time.",
    "해(亥)": "Born at winter's start — freedom-loving and independent, with unpredictable behavior that surprises others.",
    "자(子)": "Born in midwinter — intelligent and resourceful, but always calculating more than they let on.",
    "축(丑)": "Born as winter ends — patient and steadfast, but stubbornness causes missed opportunities.",
  };
  return lang === "ko"
    ? (SEASON_DESC_KO[monthBranch] ?? "월지 기운을 지님.")
    : (SEASON_DESC_EN[monthBranch] ?? "Month branch energy present.");
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON 스키마 지시문
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemaInstruction(locale: Language, introLine: string, saju: ReturnType<typeof calcSaju>): string {
  if (locale === "ko") {
    return `
반드시 아래 JSON 스키마를 정확히 따라 응답하라.

{
  "intro_gongsu": "시작 지문 '${introLine}' 을 첫 문장에 그대로 포함. 이어서 띠·오행·현재 나이를 언급하며 내담자의 속을 꿰뚫는 첫마디. 최소 3문장.",
  "past_cause": "연지 ${saju.branchRelation.type}·오행 ${saju.stemRelation.type} 등 사주 원소를 근거로 과거 문제의 원인을 무속적으로 해석. 최소 3문장.",
  "future_warning": "${saju.currentYear}년 하반기 또는 구체적 시기를 명시한 경고. 캐릭터 말투 유지. 최소 3문장.",
  "solution_bibang": "오행 기운에 맞는 구체적 액막이 비방 (색깔, 방향, 행동 등 실천 가능한 것). 최소 3문장."
}

필수 규칙:
1. intro_gongsu 첫 문장 = '${introLine}' 그대로.
2. 뜬구름 일반론 금지. 사주 데이터(띠, 오행, 나이, 연지 관계) 반드시 언급.
3. 캐릭터 말투·금지어 전 필드 일관 유지.
4. JSON 외 마크다운·주석·설명 출력 금지.
`.trim();
  }

  return `
Respond using exactly this JSON schema:

{
  "intro_gongsu": "Start with exact line: '${introLine}'. Follow with piercing insight referencing zodiac, element, and current age. Min 3 sentences.",
  "past_cause": "Interpret root causes using saju elements (${saju.branchRelation.type}, ${saju.stemRelation.type}) in character voice. Min 3 sentences.",
  "future_warning": "Warning with specific time reference (e.g., second half of ${saju.currentYear}). Maintain character voice. Min 3 sentences.",
  "solution_bibang": "Concrete countermeasures matching their element energy (colors, directions, actions). Min 3 sentences."
}

Rules:
1. intro_gongsu MUST open with: '${introLine}'
2. No vague generics — reference saju data (zodiac, element, age, year relation).
3. Maintain character voice throughout all fields.
4. Output ONLY the JSON object.
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

    // 2. 사주 계산
    const birthYear = parseInt(userProfile.birthYear, 10);
    const birthMonth = parseInt(userProfile.birthMonth, 10);
    const birthDay = parseInt(userProfile.birthDay, 10);
    const birthHour = userProfile.birthHour ? parseInt(userProfile.birthHour, 10) : undefined;
    const saju = calcSaju(birthYear, birthMonth, birthDay, birthHour);

    const fullName = locale === "ko"
      ? `${userProfile.lastName}${userProfile.firstName}`
      : `${userProfile.firstName} ${userProfile.lastName}`.trim();

    console.log(
      `[gongsu] locale=${locale} persona=${persona.id} name=${fullName} saju=${saju.yearPillar} age=${saju.currentAge} relation=${saju.branchRelation.type}`,
    );

    // 3. 시스템 프롬프트 구성
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
      buildSajuContext(saju, fullName, locale),
      "",
      "---",
      "",
      buildSchemaInstruction(locale, persona.intro_line, saju),
    ].join("\n");

    // 4. 사용자 메시지
    const userMessage = locale === "ko"
      ? `${fullName}(${saju.yearZodiac}띠, 만 ${saju.currentAge}세)의 공수를 봐줘. ${saju.currentYear}년 ${saju.branchRelation.type} 기운이 이 사람한테 어떻게 작용하는지를 중심으로, 네 캐릭터 그대로 팩트를 날려줘.`
      : `Read ${fullName}'s fortune. They are a ${saju.yearZodiac} (age ${saju.currentAge}) with ${saju.branchRelation.type} energy hitting in ${saju.currentYear}. Deliver sharp, specific insights completely in character.`;

    // 5. OpenAI 호출
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.93,
      max_tokens: 2000,
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

    // 6. JSON 파싱
    let result: GongsuOutput;
    try {
      result = JSON.parse(rawContent) as GongsuOutput;
    } catch {
      console.error("[gongsu] JSON parse failed:", rawContent.slice(0, 300));
      res.status(500).json({ error: "AI returned invalid JSON", raw: rawContent });
      return;
    }

    // 7. 필드 검증
    const required: (keyof GongsuOutput)[] = ["intro_gongsu", "past_cause", "future_warning", "solution_bibang"];
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
