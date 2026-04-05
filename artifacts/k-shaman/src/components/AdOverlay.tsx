import { useEffect } from "react";
import { useApp } from "../store/appStore";

interface Props {
  onClose: () => void;
}

const DURATION = 7;

const readingLabel: Record<string, string> = {
  ko: "점사 보는 중...",
  en: "Reading your fortune...",
  ja: "占いを見ています...",
  es: "Leyendo tu fortuna...",
  pt: "Lendo seu destino...",
  fr: "Lecture en cours...",
};

export function AdOverlay({ onClose }: Props) {
  const { state } = useApp();
  const lang = state.currentLang;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, DURATION * 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80">
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
            />
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="rgba(251,191,36,0.9)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="53 160"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl">🔮</div>
        </div>

        {/* Message */}
        <p className="text-white text-lg font-bold text-center">
          {readingLabel[lang] ?? readingLabel["en"]}
        </p>

        <p className="text-white/30 text-xs text-center">
          {DURATION}s
        </p>
      </div>
    </div>
  );
}
