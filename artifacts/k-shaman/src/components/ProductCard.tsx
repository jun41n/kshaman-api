import type { Product } from "../types";
import { useApp } from "../store/appStore";
import { T } from "../config/i18n";
import { PriceBadge } from "./PriceBadge";

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { state } = useApp();
  const t = T[state.currentLang];
  const char = state.selectedCharacter;
  const fromColor = char?.colorFrom ?? "from-violet-600";
  const toColor = char?.colorTo ?? "to-indigo-500";

  return (
    <div
      className={`relative rounded-2xl border ${
        product.popular
          ? "border-violet-400/60 bg-violet-900/20"
          : "border-white/10 bg-white/5"
      } backdrop-blur-sm overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20`}
      onClick={onSelect}
    >
      {product.badge && (
        <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${fromColor} ${toColor} text-white`}>
          {product.popular ? t.popular : t.premium}
        </div>
      )}

      <div className="p-5">
        <div className="text-3xl mb-2">{product.icon}</div>
        <h3 className="text-lg font-bold text-white">{product.nameKo}</h3>
        <p className="text-sm text-white/50 mt-0.5">{product.name}</p>
        <p className="text-sm text-white/60 mt-2 leading-relaxed">{product.description}</p>

        <PriceBadge price={product.price} currency={product.currency} />

        <ul className="mt-3 space-y-1">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-white/60">
              <span className="text-violet-400">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          className={`w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r ${fromColor} ${toColor} text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow`}
        >
          {t.selectReading}
        </button>
      </div>
    </div>
  );
}
