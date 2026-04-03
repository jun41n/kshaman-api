import { useState } from "react";
import { LANGUAGES } from "../config/i18n";
import { useApp } from "../store/appStore";

export function LanguageSwitcher() {
  const { state, setLang } = useApp();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === state.currentLang) ?? LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm text-white/80"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-xs opacity-60">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 z-50 bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[140px]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLang(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm hover:bg-white/10 transition-colors ${
                state.currentLang === lang.code
                  ? "text-violet-300 bg-white/5"
                  : "text-white/70"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
