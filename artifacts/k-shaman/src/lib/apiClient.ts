import type { UserInfo, Language } from "../types";

// In development, the Vite dev server proxies /api to the API server.
// In production, the reverse proxy routes /api to the api-server artifact.
const API_BASE = "/api";

export interface ReadingRequestBody {
  userProfile: {
    firstName: string;
    lastName: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    birthHour?: string;
    gender: "female" | "male";
    locale: Language;
    personaId: string;
    productId: string;
  };
}

export interface ReadingResult {
  content: string;
  personaId: string;
  productId: string;
}

export interface MessageRequestBody {
  sessionId?: string;
  userMessage: string;
  userProfile: ReadingRequestBody["userProfile"];
}

export interface MessageResult {
  sessionId: string;
  reply: string;
  remainingQuestions: number;
  personaId: string;
}

function buildUserProfile(
  userInfo: UserInfo,
  locale: Language,
  personaId: string,
  productId: string
): ReadingRequestBody["userProfile"] {
  return {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    birthYear: userInfo.birthYear,
    birthMonth: userInfo.birthMonth,
    birthDay: userInfo.birthDay,
    birthHour: userInfo.birthHour || undefined,
    gender: userInfo.gender as "female" | "male",
    locale,
    personaId,
    productId,
  };
}

export async function generateReading(
  userInfo: UserInfo,
  locale: Language,
  personaId: string,
  productId: string
): Promise<ReadingResult> {
  const body: ReadingRequestBody = {
    userProfile: buildUserProfile(userInfo, locale, personaId, productId),
  };

  const res = await fetch(`${API_BASE}/reading/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Network error" }));
    throw new Error(
      (err as { detail?: string; error?: string }).detail ??
        (err as { error?: string }).error ??
        "Failed to generate reading"
    );
  }

  return res.json() as Promise<ReadingResult>;
}

export async function sendMessage(
  userMessage: string,
  userInfo: UserInfo,
  locale: Language,
  personaId: string,
  productId: string,
  sessionId?: string
): Promise<MessageResult> {
  const body: MessageRequestBody = {
    sessionId,
    userMessage,
    userProfile: buildUserProfile(userInfo, locale, personaId, productId),
  };

  const res = await fetch(`${API_BASE}/ask-anything/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Network error" }));
    throw new Error(
      (err as { detail?: string; error?: string }).detail ??
        (err as { error?: string }).error ??
        "Failed to send message"
    );
  }

  return res.json() as Promise<MessageResult>;
}
