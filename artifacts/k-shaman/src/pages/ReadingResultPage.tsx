import { useEffect, useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { generateReading } from "../lib/apiClient";

interface Props {
  onAskAnything: () => void;
  onReset: () => void;
}

export function ReadingResultPage({ onAskAnything, onReset }: Props) {
  const { state, selectedPersona, selectedProduct } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const user = state.userInfo;
  const isKo = lang === "ko";

  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";
  const accentColor = selectedPersona?.accentColor ?? "text-violet-300";

  const fullName = isKo
    ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  // Fetch the reading when the component mounts
  useEffect(() => {
    if (!user || !state.selectedPersonaId || !state.selectedProductId) {
      setError("Missing required information for reading.");
      setLoading(false);
      return;
    }

    generateReading(
      user,
      lang,
      state.selectedPersonaId,
      state.selectedProductId
    )
      .then((result) => {
        // Split the reading into paragraphs for progressive reveal
        const rawParagraphs = result.content
          .split(/\n\n+/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0);
        setParagraphs(rawParagraphs.length > 0 ? rawParagraphs : [result.content]);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message ?? "Failed to generate reading.");
        setLoading(false);
      });
  }, []);

  // Progressive reveal — reveal one paragraph every 600ms
  useEffect(() => {
    if (!loading && paragraphs.length > 0 && revealedCount < paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedCount((c) => c + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [loading, paragraphs, revealedCount]);

  const isFullyRevealed = revealedCount >= paragraphs.length;

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onReset} className="text-white/60 hover:text-white transition-colors text-sm">
          ← {t.newReading}
        </button>
        <span className="text-sm font-semibold text-white/70">{t.yourReading}</span>
        <LanguageSwitcher />
      </div>

      {/* Header */}
      <div className="px-4 pt-8 pb-6 text-center">
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-4xl mx-auto mb-4 shadow-2xl shadow-violet-500/40`}
        >
          {selectedPersona?.emoji ?? "🔮"}
        </div>
        <p className={`text-xs font-medium mb-1 ${accentColor}`}>
          {selectedPersona?.display_name_ko} · {selectedPersona?.display_name_en}
        </p>
        <h1 className="text-2xl font-extrabold">
          {isKo ? `${fullName}님의 점사` : `${fullName}'s Reading`}
        </h1>
        <p className="text-xs text-white/40 mt-1">
          {selectedProduct
            ? isKo
              ? selectedProduct.name_ko
              : selectedProduct.name_en
            : ""}
          {" · "}
          {user?.birthYear}.{user?.birthMonth}.{user?.birthDay}
        </p>
      </div>

      <div className="px-4 max-w-md mx-auto space-y-4">
        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="text-4xl mb-4 animate-pulse">{selectedPersona?.emoji ?? "🔮"}</div>
            <p className={`text-sm ${accentColor} animate-pulse`}>
              {isKo ? "신령이 점사를 보고 있어요..." : "Your spirit guide is reading..."}
            </p>
            <div className="flex justify-center gap-1 mt-4">
              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-400/30 bg-red-900/10 p-6 text-center">
            <p className="text-red-300 text-sm font-medium mb-1">
              {isKo ? "점사를 불러오지 못했어요" : "Could not load reading"}
            </p>
            <p className="text-red-400/60 text-xs">{error}</p>
            <button
              onClick={onReset}
              className="mt-4 px-4 py-2 rounded-xl bg-red-900/30 text-red-300 text-sm hover:bg-red-900/50 transition-colors"
            >
              {t.newReading}
            </button>
          </div>
        )}

        {/* Reading paragraphs — progressively revealed */}
        {!loading && !error && paragraphs.map((paragraph, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              i < revealedCount
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
              <p className="text-sm text-white/80 leading-relaxed">{paragraph}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTAs — shown only after full reveal */}
      {isFullyRevealed && !loading && !error && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
          <div className="max-w-md mx-auto space-y-3">
            <button
              onClick={onAskAnything}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r ${fromColor} ${toColor} shadow-xl active:scale-95 transition-transform`}
            >
              💬 {t.askAnything}
            </button>
            <button
              onClick={onReset}
              className="w-full py-3 rounded-2xl font-medium text-white/60 bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
            >
              {t.newReading}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
