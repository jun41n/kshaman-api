export type Language = "ko" | "en" | "ja" | "es" | "pt" | "fr";

export interface UserInfo {
  lastName: string;
  firstName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  gender: "female" | "male" | null;
}

export interface ChatMessage {
  id: string;
  role: "user" | "shaman";
  content: string;
  timestamp: Date;
}

export interface AppState {
  selectedPersonaId: string | null;
  userInfo: UserInfo | null;
  selectedProductId: string | null;
  currentLang: Language;
}
