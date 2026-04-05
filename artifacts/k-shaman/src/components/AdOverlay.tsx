import { useState, useEffect } from "react";
import { useApp } from "../store/appStore";

interface Props {
  onClose: () => void;
}

const DURATION = 5;

export function AdOverlay({ onClose }: Props) {
  const { state } = useApp();
  const lang = state.currentLang;

  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanClose(true);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (DURATION - secondsLeft) / DURATION;
  const strokeDashoffset = circumference * (1 - progress);

  const watchingLabel: Record<string, string> = {
    ko: "광고 시청 중...",
    en: "Watching ad...",
    ja: "広告を視聴中...",
    es: "Viendo anuncio...",
    pt: "Assistindo anúncio...",
    fr: "Visionnage de pub...",
  };

  const skipLabel: Record<string, string> = {
    ko: "광고를 시청하면 무료 운세를 볼 수 있어요",
    en: "Watch the ad to unlock your free reading",
    ja: "広告を見て無料リーディングを解除",
    es: "Mira el anuncio para desbloquear tu lectura gratis",
    pt: "Assista ao anúncio para ver sua leitura grátis",
    fr: "Regardez la pub pour débloquer votre lecture gratuite",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Ad banner */}
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-6">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex flex-col items-center justify-center py-12 gap-4">
            <div className="text-6xl">🔮</div>
            <div className="text-center px-4">
              <p className="text-white font-bold text-xl">K-Shaman</p>
              <p className="text-white/50 text-sm mt-1">Spiritual reading powered by AI</p>
            </div>
            <div className="mt-2 border border-amber-400/30 bg-amber-500/10 rounded-xl px-6 py-3 text-center">
              <p className="text-amber-300 text-xs font-semibold">mytesttype.com/k-shaman</p>
            </div>
          </div>

          {/* Footer with countdown */}
          <div className="bg-gray-900 flex items-center justify-between px-5 py-3 border-t border-white/5">
            <p className="text-white/40 text-xs">
              {watchingLabel[lang] ?? watchingLabel["en"]}
            </p>

            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="absolute w-11 h-11 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="rgba(251,191,36,0.9)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>

              {canClose ? (
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white font-bold transition-all text-base leading-none"
                  aria-label="Close ad"
                >
                  ✕
                </button>
              ) : (
                <span className="text-white/80 text-sm font-bold tabular-nums">
                  {secondsLeft}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-white/30 text-xs text-center">
          {skipLabel[lang] ?? skipLabel["en"]}
        </p>
      </div>
    </div>
  );
}
