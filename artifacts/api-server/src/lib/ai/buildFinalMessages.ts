import type { ChatMessage, Language, UserProfile } from "./types.js";
import { buildGlobalSystemPrompt } from "./globalPrompt.js";
import { buildPersonaPrompt } from "./buildPersonaPrompt.js";
import { buildProductPrompt } from "./buildProductPrompt.js";
import { buildSessionContext } from "./buildSessionContext.js";

export interface FinalMessages {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
}

/**
 * Builds the full message array for a one-time reading request.
 * Layers: global rules → persona → product → user context
 */
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
  ].join("\n");

  const userMessage = buildReadingUserMessage(profile.locale, profile.productId);

  return {
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: userMessage },
    ],
  };
}

/**
 * Builds the full message array for an Ask Anything conversation turn.
 * Layers: global rules → persona → product → user context → session summary → recent history → new message
 * Persona context is re-injected on EVERY turn to prevent drift.
 */
export function buildAskAnythingMessages(
  profile: UserProfile,
  conversationHistory: ChatMessage[],
  conversationSummary: string,
  newUserMessage: string
): FinalMessages {
  // System prompt re-injects ALL layers on every turn — this is intentional anti-drift behavior
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
    buildConversationSummaryBlock(conversationSummary),
  ].join("\n");

  // Include recent conversation history (last 10 messages for context window efficiency)
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

/**
 * Generates a concise summary of the conversation to inject in future turns.
 * This preserves emotional arc, core issue, and persona voice reminder.
 */
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
    // Free reading — simple prompt
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

  // Paid reading — include hard length enforcement in user turn
  const prompts: Record<Language, string> = {
    ko: `지금 저를 위한 점사를 봐주세요.

⚠️ 중요: 이것은 유료 프리미엄 점사입니다. 반드시 다음을 지켜주세요:
• 8개 섹션을 모두 완성해주세요 — 하나도 빠뜨리지 마세요 (Hook → 숨겨진 진실 → 반복 패턴 → 감정 모순 → 경고 → 기회 → 실질 조언 → 마무리).
• 첫 문장은 인사말이 아닌, 상대방의 내면을 직접 꿰뚫는 문장으로 시작해주세요.
• "당신은 어쩌면..." 같은 애매한 표현을 사용하지 마세요. 직접적으로 말해주세요.
• 각 섹션은 최소 3–4개의 문단, 각 문단은 최소 4–5개의 완성된 문장으로 구성해야 합니다.
• 전체 글자수가 2000자 이상이어야 합니다. 1800자에서 끝내지 마세요.
• 절대로 요약하거나 생략하지 마세요. 완전하게 전개된 글이어야 합니다.`,

    en: `Please give me my reading now.

⚠️ IMPORTANT: This is a paid premium reading. You MUST:
• Complete all 8 sections in order: Hook → Hidden Truth → Situation Pattern → Emotional Contradiction → Warning → Opportunity → Action Advice → Closing.
• The first sentence must NOT be a greeting — it must immediately feel confrontational and personally accurate.
• NEVER use hedging language ("you may feel", "it is possible that") — speak directly.
• Each section: minimum 3–4 full paragraphs, each paragraph 4–6 complete sentences.
• Total length: minimum 800 words. Do not stop at 400.
• Do NOT summarize or truncate. Write full, developed prose throughout.`,

    ja: `今、私のために占ってください。

⚠️ 重要：これは有料プレミアム占いです。以下を必ず守ってください：
• 7つのセクションをすべて完成させてください。
• 各セクション：最低3〜4段落、各段落4〜6文。
• 合計2000文字以上。途中で終わらないでください。`,

    es: `Por favor, dame mi lectura ahora.

⚠️ IMPORTANTE: Esta es una lectura premium de pago. DEBES:
• Completar las 7 secciones — no omitas ni comprimas ninguna.
• Mínimo 800 palabras en total. No termines antes.
• Prosa completa y desarrollada en todo momento.`,

    pt: `Por favor, me dê minha leitura agora.

⚠️ IMPORTANTE: Esta é uma leitura premium paga. VOCÊ DEVE:
• Completar todas as 7 seções — não pule nenhuma.
• Mínimo de 800 palavras no total.
• Prosa completa e desenvolvida.`,

    fr: `Veuillez me donner ma lecture maintenant.

⚠️ IMPORTANT: Il s'agit d'une lecture premium payante. VOUS DEVEZ:
• Compléter les 7 sections — n'en omettez aucune.
• Minimum 800 mots au total.
• Prose complète et développée.`,
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
