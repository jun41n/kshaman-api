import type { ProductConfig } from "../config/products";
import { useApp } from "../store/appStore";
import { T } from "../config/i18n";
import { PriceBadge } from "./PriceBadge";

interface ProductCardProps {
  product: ProductConfig;
  onSelect: () => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { state, selectedPersona } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  const primaryName = lang === "ko" ? product.name_ko : product.name_en;
  const secondaryName = lang === "ko" ? product.name_en : product.name_ko;

  return (
    <div
      className={`relative rounded-2xl border ${
        product.is_free
          ? "border-emerald-400/30 bg-emerald-900/10"
          : "border-white/10 bg-white/5"
      } backdrop-blur-sm overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20`}
      onClick={onSelect}
    >
      {product.is_free && (
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          {t.freeLabel}
        </div>
      )}

      <div className="p-5">
        <div className="text-3xl mb-2">{product.icon}</div>
        <h3 className="text-lg font-bold text-white">{primaryName}</h3>
        <p className="text-xs text-white/40 mt-0.5">{secondaryName}</p>
        <p className="text-sm text-white/60 mt-2 leading-relaxed">
          {product.description[lang]}
        </p>

        <PriceBadge lang={lang} isFree={product.is_free} />

        <ul className="mt-3 space-y-1">
          {product.features[lang].map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-white/60">
              <span className={product.is_free ? "text-emerald-400" : "text-violet-400"}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          className={`w-full mt-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow ${
            product.is_free
              ? "bg-emerald-600/80 hover:bg-emerald-600"
              : `bg-gradient-to-r ${fromColor} ${toColor}`
          }`}
        >
          {product.is_free ? t.tryFree : t.selectReading}
        </button>
      </div>
    </div>
  );
}
