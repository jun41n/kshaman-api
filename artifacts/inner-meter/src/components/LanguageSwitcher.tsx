import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { LANGUAGES, setLanguage } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code: string) => {
    setLanguage(code);
    setOpen(false);
  };

  if (compact) {
    return (
      <div className="grid grid-cols-4 gap-2 py-2">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
              i18n.language === lang.code
                ? 'bg-primary/15 text-primary ring-1 ring-primary/30'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <span className="leading-none truncate w-full text-center">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors text-sm font-semibold text-muted-foreground hover:text-foreground"
        title="언어 선택 / Select Language"
        aria-label="Language selector"
      >
        <Globe className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs">{current.flag}</span>
        <span className="hidden sm:inline text-xs">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-[200] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          style={{ width: 280 }}>
          <div className="p-2 border-b border-border">
            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider px-2 py-1">
              Language / 언어 선택
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            <div className="grid grid-cols-2 gap-1">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                    i18n.language === lang.code
                      ? 'bg-primary/10 text-primary font-bold ring-1 ring-primary/20'
                      : 'hover:bg-muted text-foreground/80 hover:text-foreground font-medium'
                  }`}
                >
                  <span className="text-base shrink-0">{lang.flag}</span>
                  <span className="truncate text-xs leading-tight">{lang.native}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
