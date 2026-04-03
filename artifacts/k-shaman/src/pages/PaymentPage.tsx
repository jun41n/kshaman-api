import { useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { PriceBadge } from "../components/PriceBadge";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const PAYMENT_METHODS = [
  { id: "kakao", label: "카카오페이", icon: "💛", available: true },
  { id: "toss", label: "토스페이", icon: "💙", available: true },
  { id: "card", label: "신용카드", icon: "💳", available: true },
  { id: "paypal", label: "PayPal", icon: "🔵", available: false },
];

export function PaymentPage({ onSuccess, onBack }: Props) {
  const { state } = useApp();
  const t = T[state.currentLang];
  const char = state.selectedCharacter;
  const product = state.selectedProduct;
  const user = state.userInfo;
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fromColor = char?.colorFrom ?? "from-violet-600";
  const toColor = char?.colorTo ?? "to-indigo-500";

  const fullName =
    state.currentLang === "ko"
      ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
      : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const handlePay = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-28">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1">
          ← {t.back}
        </button>
        <span className="text-sm font-semibold text-white/70">{t.paymentTitle}</span>
        <LanguageSwitcher />
      </div>

      <div className="px-4 pt-6 max-w-md mx-auto space-y-5">
        <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${fromColor} ${toColor} bg-opacity-10 p-5`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{product?.icon}</span>
            <div>
              <h2 className="font-bold text-white">{product?.nameKo}</h2>
              <p className="text-sm text-white/60">{product?.name}</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <span className="text-sm text-white/50">{fullName}님</span>
            {product && (
              <PriceBadge price={product.price} currency={product.currency} />
            )}
          </div>
        </div>

        <div>
          <p className="text-xs text-white/50 mb-3">{t.payWith}</p>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => method.available && setSelected(method.id)}
                disabled={!method.available}
                className={`relative py-4 rounded-xl border text-sm font-medium transition-all ${
                  !method.available
                    ? "opacity-40 cursor-not-allowed border-white/5 bg-white/3"
                    : selected === method.id
                    ? `bg-gradient-to-br ${fromColor} ${toColor} border-transparent text-white`
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl block mb-1">{method.icon}</span>
                {method.label}
                {!method.available && (
                  <span className="absolute top-1.5 right-1.5 text-[9px] text-white/30 bg-white/5 rounded px-1">
                    {t.comingSoon}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-white/30 flex items-center justify-center gap-1">
          🔒 SSL 256-bit encrypted — secure payment
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
        <button
          onClick={handlePay}
          disabled={!selected || loading}
          className={`w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-200 ${
            !selected || loading
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : `bg-gradient-to-r ${fromColor} ${toColor} active:scale-95`
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin text-xl">🔮</span>
              처리 중...
            </span>
          ) : (
            <>🔮 {t.payWith}</>
          )}
        </button>
      </div>
    </div>
  );
}
