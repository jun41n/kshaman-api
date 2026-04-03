import { useState, createContext, useContext } from "react";
import type { AppState, Character, UserInfo, Product, Language } from "../types";

const defaultState: AppState = {
  selectedCharacter: null,
  userInfo: null,
  selectedProduct: null,
  currentLang: "ko",
};

export function useAppStore() {
  const [state, setState] = useState<AppState>(defaultState);

  const setCharacter = (c: Character) =>
    setState((s) => ({ ...s, selectedCharacter: c }));

  const setUserInfo = (u: UserInfo) =>
    setState((s) => ({ ...s, userInfo: u }));

  const setProduct = (p: Product) =>
    setState((s) => ({ ...s, selectedProduct: p }));

  const setLang = (lang: Language) =>
    setState((s) => ({ ...s, currentLang: lang }));

  const reset = () => setState(defaultState);

  return { state, setCharacter, setUserInfo, setProduct, setLang, reset };
}

export type AppStore = ReturnType<typeof useAppStore>;
export const AppContext = createContext<AppStore | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContext.Provider");
  return ctx;
}
