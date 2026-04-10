import type { ProductConfig } from "../config/products";
import { useApp } from "../store/appStore";
import { T } from "../config/i18n";
import { PriceBadge } from "./PriceBadge";

interface ProductCardProps {
  product: ProductConfig;
  onSelect: () => void;
}

const PRODUCT_COLORS: Record<string, {
  border: string;
  from: string;
  to: string;
  accent: string;
}> = {
  daily_fortune: {
    border: "border-emerald-500/50",
    from: "from-emerald-600",
    to: "to-teal-500",
    accent: "text-emerald-400",
  },
  saju: {
    border: "border-amber-500/50",
    from: "from-amber-500",
    to: "to-yellow-400",
    accent: "text-amber-400",
  },
  gungap: {
    border: "border-rose-500/50",
    from: "from-rose-600",
    to: "to-pink-500",
    accent: "text-rose-400",
  },
  jeongsaeng: {
    border: "border-indigo-500/50",
    from: "from-indigo-600",
    to: "to-blue-500",
    accent: "text-indigo-400",
  },
  taegukseon: {
    border: "border-violet-500/50",
    from: "from-violet-600",
    to: "to-purple-500",
    accent: "text-violet-400",
  },
  dream: {
    border: "border-sky-500/50",
    from: "from-sky-500",
    to: "to-cyan-400",
    accent: "text-sky-400",
  },
};

const FALLBACK_COLORS = {
  border: "border-violet-500/50",
  from: "from-violet-600",
  to: "to-indigo-500",
  accent: "text-violet-400",
};

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { state, selectedPersona } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;

  const colors = PRODUCT_COLORS[product.id] ?? {
    border: selectedPersona ? selectedPersona.borderColor : FALLBACK_COLORS.border,
    from: selectedPersona?.colorFrom ?? FALLBACK_COLORS.from,
    to: selectedPersona?.colorTo ?? FALLBACK_COLORS.to,
    accent: selectedPersona?.accentColor ?? FALLBACK_COLORS.accent,
  };

  const primaryName = lang === "ko" ? product.name_ko : product.name_en;
  const secondaryName = lang === "ko" ? product.name_en : product.name_ko;

  return (
    <div
      className={`relative rounded-2xl border ${colors.border} bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer group hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl`}
      onClick={onSelect}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none`} />

      <div className="relative p-5">
        {/* Icon */}
        <div className="text-4xl mb-3 text-center">{product.icon}</div>

        {/* Names */}
        <div className="text-center mb-3">
          <h3 className="text-xl font-bold text-white">{primaryName}</h3>
          <p className={`text-sm font-medium ${colors.accent} mt-0.5`}>{secondaryName}</p>
        </div>

        {/* Description */}
        <div className="border-t border-white/10 pt-3 mt-1">
          <p className="text-xs text-white/60 leading-relaxed text-center">
            {product.description[lang]}
          </p>
        </div>

        {/* Price */}
        <div className="mt-3 flex justify-center">
          <PriceBadge lang={lang} isFree={product.is_free} />
        </div>

        {/* Features */}
        <ul className="mt-3 space-y-1.5">
          {product.features[lang].map((f, i) => (
            <li key={i} className={`flex items-center gap-2 text-xs ${colors.accent}`}>
              <span className="opacity-80">✓</span>
              <span className="text-white/70">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className={`w-full mt-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md group-hover:shadow-lg transition-shadow bg-gradient-to-r ${colors.from} ${colors.to}`}
        >
          {product.is_free ? t.tryFree : t.selectReading}
        </button>
      </div>
    </div>
  );
}
