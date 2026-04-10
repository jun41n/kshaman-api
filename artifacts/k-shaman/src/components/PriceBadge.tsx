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

  if (isKo) {
    return (
      <div className="mt-3 space-y-0.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl">☕</span>
          <span className="text-lg font-bold text-white">커피 한 잔 복채</span>
        </div>
        <p className="text-xs text-white/40">(₩500 또는 ₩3,000)</p>
      </div>
    );
  }

  return (
    <div className="mt-3 inline-flex items-baseline gap-1">
      <span className="text-2xl font-bold text-white">{formatted}</span>
    </div>
  );
}
