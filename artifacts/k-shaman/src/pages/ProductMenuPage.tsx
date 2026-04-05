import { PRODUCTS } from "../config/products";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { ProductCard } from "../components/ProductCard";
import { SiteNav } from "../components/SiteNav";

interface Props {
  onSelect: (productId: string) => void;
  onBack: () => void;
}

export function ProductMenuPage({ onSelect, onBack }: Props) {
  const { state, selectedPersona } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const user = state.userInfo;

  const fullName =
    lang === "ko"
      ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
      : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  return (
    <div className="text-white pb-10">
      <SiteNav
        onBack={onBack}
        backLabel={t.back}
        centre={
          <div className="flex items-center gap-1.5">
            <span>{selectedPersona?.emoji}</span>
            <span className="text-sm font-semibold text-white/70">
              {selectedPersona?.display_name_ko}
            </span>
          </div>
        }
      />

      <div className="px-4 pt-6 pb-4 text-center">
        <p className={`text-sm font-medium mb-1 ${selectedPersona?.accentColor ?? "text-violet-300"}`}>
          ✦ {lang === "ko" ? `${fullName}님` : fullName} ✦
        </p>
        <h1 className="text-xl font-bold">{t.chooseReading}</h1>
        <p className="text-sm text-white/50 mt-1">{t.chooseReadingSubtitle}</p>
      </div>

      <div className="px-4 max-w-md mx-auto grid grid-cols-1 gap-4">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onSelect(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
