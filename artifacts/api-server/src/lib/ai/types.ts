export type Language = "ko" | "en" | "ja" | "es" | "pt" | "fr";

export interface UserProfile {
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

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AskAnythingSession {
  sessionId: string;
  personaId: string;
  productId: string;
  locale: Language;
  maxQuestions: number;
  remainingQuestions: number;
  conversationSummary: string;
  messages: ChatMessage[];
  userProfile: UserProfile;
  createdAt: number;
  lastActiveAt: number;
}

export interface ReadingRequest {
  userProfile: UserProfile;
}

export interface ReadingResponse {
  content: string;
  personaId: string;
  productId: string;
}

export interface MessageRequest {
  sessionId?: string;
  userMessage: string;
  userProfile: UserProfile;
}

export interface MessageResponse {
  sessionId: string;
  reply: string;
  remainingQuestions: number;
  personaId: string;
}
