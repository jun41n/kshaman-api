export type Language = "ko" | "en" | "ja" | "es" | "pt" | "fr";

export interface Character {
  id: string;
  koreanName: string;
  englishName: string;
  emoji: string;
  subtitles: Record<Language, string>;
  descriptions: Record<Language, string>;
  specialities: Record<Language, string>;
  colorFrom: string;
  colorTo: string;
  glowColor: string;
  borderColor: string;
  accentColor: string;
}

export interface UserInfo {
  lastName: string;
  firstName: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  gender: "female" | "male" | null;
}

export interface PartnerInfo {
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
  partnerInfo: PartnerInfo | null;
  selectedProductId: string | null;
  currentLang: Language;
}
