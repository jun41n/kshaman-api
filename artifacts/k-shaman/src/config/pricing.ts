import type { Language } from "../types";

export const PRICE_KRW = 500;
export const PRICE_USD = 0.49;

export function isKoreanLocale(lang: Language): boolean {
  return lang === "ko";
}

export function getPrice(lang: Language): { amount: number; currency: "KRW" | "USD" } {
  return isKoreanLocale(lang)
    ? { amount: PRICE_KRW, currency: "KRW" }
    : { amount: PRICE_USD, currency: "USD" };
}

export function formatPrice(lang: Language): string {
  if (isKoreanLocale(lang)) return `₩${PRICE_KRW.toLocaleString("ko-KR")}`;
  return `$${PRICE_USD.toFixed(2)}`;
}

export const FREE_LABEL: Record<Language, string> = {
  ko: "무료",
  en: "Free",
  ja: "無料",
  es: "Gratis",
  pt: "Grátis",
  fr: "Gratuit",
};
