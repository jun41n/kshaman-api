import { useState, createContext, useContext } from "react";
import type { AppState, UserInfo, Language } from "../types";
import { getPersonaById } from "../config/personas";
import { getProductById } from "../config/products";

const LANG_MAP: Record<string, Language> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  es: "es",
  "pt-BR": "pt",
  pt: "pt",
  fr: "fr",
};

function detectInitialLang(): Language {
  try {
    const stored = localStorage.getItem("lang");
    if (stored && LANG_MAP[stored]) return LANG_MAP[stored];
  } catch {}
  return "ko";
}

const defaultState: AppState = {
  selectedPersonaId: null,
  userInfo: null,
  selectedProductId: null,
  currentLang: detectInitialLang(),
};

export function useAppStore() {
  const [state, setState] = useState<AppState>(defaultState);

  const setPersonaId = (id: string) =>
    setState((s) => ({ ...s, selectedPersonaId: id }));

  const setUserInfo = (u: UserInfo) =>
    setState((s) => ({ ...s, userInfo: u }));

  const setProductId = (id: string) =>
    setState((s) => ({ ...s, selectedProductId: id }));

  const setLang = (lang: Language) => {
    setState((s) => ({ ...s, currentLang: lang }));
    try { localStorage.setItem("lang", lang); } catch {}
  };

  const reset = () => setState(defaultState);

  // Derived convenience getters
  const selectedPersona = state.selectedPersonaId
    ? getPersonaById(state.selectedPersonaId)
    : undefined;

  const selectedProduct = state.selectedProductId
    ? getProductById(state.selectedProductId)
    : undefined;

  return {
    state,
    selectedPersona,
    selectedProduct,
    setPersonaId,
    setUserInfo,
    setProductId,
    setLang,
    reset,
  };
}

export type AppStore = ReturnType<typeof useAppStore>;
export const AppContext = createContext<AppStore | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContext.Provider");
  return ctx;
}
