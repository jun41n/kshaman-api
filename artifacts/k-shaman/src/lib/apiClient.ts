import type { UserInfo, PartnerInfo, Language } from "../types";

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export interface UserProfilePayload {
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
}

export interface PartnerProfilePayload {
  firstName: string;
  lastName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour?: string;
  gender: "female" | "male";
}

export interface ReadingRequestBody {
  userProfile: UserProfilePayload;
  partnerProfile?: PartnerProfilePayload;
}

export interface ReadingResult {
  content: string;
  personaId: string;
  productId: string;
}

export interface MessageRequestBody {
  sessionId?: string;
  userMessage: string;
  userProfile: UserProfilePayload;
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
): UserProfilePayload {
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

function buildPartnerProfile(partnerInfo: PartnerInfo): PartnerProfilePayload {
  return {
    firstName: partnerInfo.firstName,
    lastName: partnerInfo.lastName,
    birthYear: partnerInfo.birthYear,
    birthMonth: partnerInfo.birthMonth,
    birthDay: partnerInfo.birthDay,
    birthHour: partnerInfo.birthHour || undefined,
    gender: partnerInfo.gender as "female" | "male",
  };
}

export async function generateReading(
  userInfo: UserInfo,
  locale: Language,
  personaId: string,
  productId: string,
  partnerInfo?: PartnerInfo | null,
): Promise<ReadingResult> {
  const body: ReadingRequestBody = {
    userProfile: buildUserProfile(userInfo, locale, personaId, productId),
    ...(partnerInfo && productId === "compatibility"
      ? { partnerProfile: buildPartnerProfile(partnerInfo) }
      : {}),
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

export class LimitReachedError extends Error {
  constructor(public readonly sessionId?: string) {
    super("limit_reached");
    this.name = "LimitReachedError";
  }
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

  if (res.status === 429) {
    const err = await res.json().catch(() => ({}));
    throw new LimitReachedError((err as { sessionId?: string }).sessionId);
  }

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
