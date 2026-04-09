import { Sparkles } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useApp } from "../store/appStore";

interface Props {
  /** Show a ← back button on the left instead of the logo click */
  onBack?: () => void;
  /** Label for back button */
  backLabel?: string;
  /** Centre slot — e.g. persona name */
  centre?: React.ReactNode;
}

const MYTESTTYPE_HOME = "https://mytesttype.com";
const MYTESTTYPE_TESTS = "https://mytesttype.com/tests";

export function SiteNav({ onBack, backLabel, centre }: Props) {
  const { state } = useApp();
  const isKo = state.currentLang === "ko";

  return (
    <div className="sticky top-0 z-30 w-full bg-gray-950/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-screen-lg mx-auto px-4 h-12 flex items-center justify-between gap-3">

        {/* ── LEFT: logo or back button ── */}
        <div className="flex items-center gap-3 min-w-0">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm shrink-0"
            >
              <span className="text-base leading-none">←</span>
              <span>{backLabel ?? (isKo ? "뒤로" : "Back")}</span>
            </button>
          ) : (
            <a
              href={MYTESTTYPE_HOME}
              className="flex items-center gap-2 group shrink-0"
            >
              {/* MyTestType logo mark */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors tracking-tight">
                MyTestType
              </span>
            </a>
          )}

          {/* K-Shaman badge — always visible */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-900/30 border border-violet-500/20">
            <span className="text-xs">🔮</span>
            <span className="text-[11px] font-medium text-violet-300/80">K-Shaman</span>
          </div>
        </div>

        {/* ── CENTRE: optional slot (persona name, etc.) ── */}
        {centre && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            {centre}
          </div>
        )}

        {/* ── RIGHT: nav links + language ── */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Nav links — hidden on tiny screens */}
          <nav className="hidden sm:flex items-center gap-1">
            <a
              href={MYTESTTYPE_HOME}
              className="px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isKo ? "홈" : "Home"}
            </a>
            <a
              href={MYTESTTYPE_TESTS}
              className="px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isKo ? "테스트 모음" : "All Tests"}
            </a>
          </nav>

          {/* Mobile-only: compact home icon */}
          <a
            href={MYTESTTYPE_HOME}
            className="sm:hidden p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors text-base"
            aria-label="Home"
          >
            🏠
          </a>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
