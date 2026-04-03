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

  const userMessage = buildReadingUserMessage(profile.locale);

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

function buildReadingUserMessage(locale: Language): string {
  const prompts: Record<Language, string> = {
    ko: "지금 저를 위한 점사를 봐주세요.",
    en: "Please give me my reading now.",
    ja: "今、私のために占ってください。",
    es: "Por favor, dame mi lectura ahora.",
    pt: "Por favor, me dê minha leitura agora.",
    fr: "Veuillez me donner ma lecture maintenant.",
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
