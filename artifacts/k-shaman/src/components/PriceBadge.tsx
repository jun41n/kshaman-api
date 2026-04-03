import type { Language } from "../types";
import { formatPrice, FREE_LABEL } from "../config/pricing";

interface PriceBadgeProps {
  lang: Language;
  isFree?: boolean;
}

export function PriceBadge({ lang, isFree }: PriceBadgeProps) {
  if (isFree) {
    return (
      <div className="mt-3 inline-flex items-center">
        <span className="text-2xl font-bold text-emerald-400">{FREE_LABEL[lang]}</span>
      </div>
    );
  }

  const isKo = lang === "ko";
  const formatted = formatPrice(lang);

  return (
    <div className="mt-3 inline-flex items-baseline gap-1">
      <span className="text-2xl font-bold text-white">{formatted}</span>
      {isKo && <span className="text-xs text-white/40">원</span>}
    </div>
  );
}
