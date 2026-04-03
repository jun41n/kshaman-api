export interface Character {
  id: string;
  koreanName: string;
  englishName: string;
  subtitle: string;
  emoji: string;
  description: string;
  speciality: string;
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
  description: string;
  price: number;
  currency: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  icon: string;
}

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
  selectedCharacter: Character | null;
  userInfo: UserInfo | null;
  selectedProduct: Product | null;
  currentLang: Language;
}
