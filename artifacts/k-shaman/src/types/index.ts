export type Language = "ko" | "en" | "ja" | "es" | "pt" | "fr";

export interface Character {
  id: string;
  koreanName: string;
  englishName: string;
  subtitles: Record<Language, string>;
  emoji: string;
  descriptions: Record<Language, string>;
  specialities: Record<Language, string>;
  colorFrom: string;
  colorTo: string;
  glowColor: string;
  borderColor: string;
  accentColor: string;
}

export interface Product {
  id: string;
  name: string;
  nameKo: string;
  descriptions: Record<Language, string>;
  free?: boolean;
  icon: string;
  features: Record<Language, string[]>;
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

export interface ChatMessage {
  id: string;
  role: "user" | "shaman";
  content: string;
  timestamp: Date;
}

export interface AppState {
  selectedCharacter: Character | null;
  userInfo: UserInfo | null;
  selectedProduct: Product | null;
  currentLang: Language;
}
