import type { ChatMessage, Language, UserProfile } from "./types.js";
import { buildGlobalSystemPrompt } from "./globalPrompt.js";
import { buildPersonaPrompt } from "./buildPersonaPrompt.js";
import { buildProductPrompt } from "./buildProductPrompt.js";
import { buildSessionContext } from "./buildSessionContext.js";

export interface FinalMessages {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
}

function buildReadingStyleBlock(): string {
  return `
Fix the reading style immediately.

Current problem:
The response is too long, boring, generic, and emotionally flat.
Users do not feel engaged, surprised, amused, or exposed enough.

--------------------------------
CORE STYLE
--------------------------------

The reading must feel:
- sharp
- direct
- slightly uncomfortable
- addictive
- memorable

This should feel like a real person talking, not content writing.

--------------------------------
OPENING RULE
--------------------------------

The first 2 lines MUST:
- feel specific
- feel exposing
- feel immediate
- NOT sound polite
- NOT sound generic
- NOT sound like a report

Good openings:
- "잠깐... 가만 있어봐."
- "이거 그냥 넘길 일 아니다."
- "너 지금 모르는 척하고 있네."
- "답은 이미 나왔는데, 네가 인정 안 하고 있는 거다."

--------------------------------
FORMAT RULE (CRITICAL)
--------------------------------

- Each block = 1–3 sentences max
- Use frequent line breaks
- NO long paragraphs
- Must feel like spoken dialogue
- Must be easy to scan on mobile

--------------------------------
HOOK FLOW
--------------------------------

Hook → Expand → Twist → Punch line

Repeat 2–3 times.

--------------------------------
SHAMAN PERFORMANCE
--------------------------------

- Use 반말 (especially musokin)
- Speak like a real mudang
- Slightly rough, direct tone
- Human, not polished

--------------------------------
IMPACT + WIT RULE (CRITICAL)
--------------------------------

Include 1–2 lines that feel:
- slightly uncomfortable
- very specific
- annoyingly accurate

Examples:
- "모르는 게 아니라, 인정하기 싫은 거지."
- "답은 이미 나왔는데, 네가 질질 끄는 거다."
- "끝난 걸 못 끝내서 계속 꼬인다."
- "이 정도면 운 문제가 아니라 선택 문제다."

--------------------------------
REALITY HOOK (NEW — MUST INCLUDE)
--------------------------------

You MUST include at least ONE everyday behavior.

Examples:
- "밤에 괜히 카톡창 열어보지?"
- "연락 안 하면서 기다리는 거, 그거 제일 피곤한 거다."
- "이미 끝난 거 알면서도 한 번 더 확인하고 싶어서 그래."

This creates "소름 + 공감 + 웃김"

--------------------------------
KILLER LINE RULE (CRITICAL)
--------------------------------

Each reading MUST contain at least ONE line that:
- feels slightly harsh
- feels undeniable
- sticks in memory

Examples:
- "결국 네가 끊어야 풀린다."
- "이건 운이 아니라 네 선택이다."
- "이 상태 계속 가면 또 반복된다."

This line is the "screenshot moment".

--------------------------------
ANTI-GENERIC RULE
--------------------------------

Do NOT use:
- "당신은..."
- "현재 당신은..."
- "어쩌면..."
- "일반적으로..."

Speak like you already see everything.

--------------------------------
FORBIDDEN
--------------------------------

- no essay
- no long paragraphs
- no therapist tone
- no polite 상담 느낌
- no boring explanation

--------------------------------
ENDING RULE
--------------------------------

End with ONE strong line.

--------------------------------
IMPORTANT
--------------------------------

This is NOT writing.
This is performance.

User must:
- stop scrolling
- feel exposed
- feel entertained
- want to screenshot
`.trim();
}

export function buildReadingMessages(profile: UserProfile): FinalMessages {
  const systemContent = [
    buildGlobalSystemPrompt(profile.locale),
    "",
    "---",
    "",
    buildPersonaPrompt(profile.personaId),
    "",
    "---",
    "",
    buildProductPrompt(profile.productId),
    "",
    "---",
    "",
    buildSessionContext(profile),
    "",
    "---",
    "",
    buildReadingStyleBlock(),
  ].join("\n");

  const userMessage = buildReadingUserMessage(profile.locale, profile.productId);

  return {
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: userMessage },
    ],
  };
}

export function buildAskAnythingMessages(
  profile: UserProfile,
  conversationHistory: ChatMessage[],
  conversationSummary: string,
  newUserMessage: string
): FinalMessages {
  const systemContent = [
    buildGlobalSystemPrompt(profile.locale),
    "",
    "---",
    "",
    buildPersonaPrompt(profile.personaId),
    "",
    "---",
    "",
    buildProductPrompt(profile.productId),
    "",
    "---",
    "",
    buildSessionContext(profile),
    "",
    "---",
    "",
    buildReadingStyleBlock(),
    "",
    "---",
    "",
    buildConversationSummaryBlock(conversationSummary),
  ].join("\n");

  const recentHistory = conversationHistory.slice(-10);

  const messages: FinalMessages["messages"] = [
    { role: "system", content: systemContent },
    ...recentHistory.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: newUserMessage },
  ];

  return { messages };
}

export function buildSummaryUpdatePrompt(
  personaId: string,
  locale: Language,
  previousSummary: string,
  recentExchange: { userMessage: string; assistantReply: string }
): FinalMessages {
  const systemContent = `
You are a conversation summarizer for a spiritual reading session.
Your job is to update the session memory summary based on the latest exchange.

The summary must preserve:
1. The user's core question or issue
2. The user's emotional state (confused, hopeful, anxious, etc.)
3. Any unresolved questions still open
4. A reminder of which persona is active: ${personaId}
5. Any significant information revealed by the user (relationship details, names, dates, etc.)

Keep the summary under 150 words.
Write the summary in English for system use, regardless of the conversation language.
Return ONLY the updated summary text — no labels, no headers, no explanation.
`.trim();

  const userContent = `
PREVIOUS SUMMARY:
${previousSummary || "(No previous summary — this is the first turn.)"}

LATEST USER MESSAGE:
${recentExchange.userMessage}

LATEST ASSISTANT REPLY (${personaId} persona):
${recentExchange.assistantReply}

Please write an updated memory summary.
`.trim();

  return {
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: userContent },
    ],
  };
}

const FREE_PRODUCTS = new Set(["daily_fortune"]);

function buildReadingUserMessage(locale: Language, productId: string): string {
  const isPaid = !FREE_PRODUCTS.has(productId);

  if (!isPaid) {
    const prompts: Record<Language, string> = {
      ko: "지금 저를 위한 오늘의 운세를 봐주세요.",
      en: "Please give me my daily fortune now.",
      ja: "今日の運勢を教えてください。",
      es: "Por favor, dame mi fortuna del día ahora.",
      pt: "Por favor, me dê minha fortuna diária agora.",
      fr: "Veuillez me donner ma fortune du jour maintenant.",
    };
    return prompts[locale] ?? prompts.en;
  }

  const prompts: Record<Language, string> = {
    ko: `지금 저를 위한 점사를 봐주세요.`,
    en: `Give me my reading now.`,
    ja: `今、私のために占ってください。`,
    es: `Dame mi lectura ahora.`,
    pt: `Me dê minha leitura agora.`,
    fr: `Donnez-moi ma lecture maintenant.`,
  };

  return prompts[locale] ?? prompts.en;
}

function buildConversationSummaryBlock(summary: string): string {
  if (!summary) return "";
  return `
SESSION MEMORY SUMMARY (use this to maintain continuity with the user's situation):
${summary}

This summary captures what has been discussed so far. Use it to stay contextually aware of the user's core issue, emotional state, and unresolved questions. Do not repeat what has already been said verbatim — build forward from it.
`.trim();
}
