import { useEffect, useRef, useState } from "react";
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

const guideLabel: Record<string, string> = {
  ko: "보살이 점사를 보고 있어요",
  en: "Your spirit guide is reading",
  ja: "守護霊が占いをしています",
  es: "Tu guía espiritual está leyendo",
  pt: "Seu guia espiritual está lendo",
  fr: "Votre guide spirituel vous lit",
};

export function AdOverlay({ onClose }: Props) {
  const { state } = useApp();
  const lang = state.currentLang;
  const onCloseRef = useRef(onClose);
  const [countdown, setCountdown] = useState(DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      onCloseRef.current();
    }, DURATION * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const circumference = 2 * Math.PI * 34;
  const progress = (DURATION - countdown) / DURATION;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Spinner with countdown inside */}
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
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
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-2xl tabular-nums">{countdown}</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-white text-lg font-bold text-center">
          {readingLabel[lang] ?? readingLabel["en"]}
        </p>

        {/* Subtitle */}
        <p className="text-white/40 text-xs text-center tracking-wide">
          {guideLabel[lang] ?? guideLabel["en"]}
        </p>
      </div>
    </div>
  );
}
