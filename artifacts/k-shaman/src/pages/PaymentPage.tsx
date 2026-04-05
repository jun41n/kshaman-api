import { useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { formatPrice, FREE_LABEL } from "../config/pricing";
import { SiteNav } from "../components/SiteNav";
import { AdOverlay } from "../components/AdOverlay";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const KO_PAYMENT_METHODS = [
  { id: "kakao", label: "카카오페이", icon: "💛", available: true },
  { id: "toss", label: "토스페이", icon: "💙", available: true },
  { id: "card", label: "신용카드", icon: "💳", available: true },
];

const INTL_PAYMENT_METHODS = [
  { id: "card", label: "Credit Card", icon: "💳", available: true },
  { id: "paypal", label: "PayPal", icon: "🅿️", available: true },
  { id: "apple", label: "Apple Pay", icon: "🍎", available: false },
  { id: "google", label: "Google Pay", icon: "🟢", available: false },
];

export function PaymentPage({ onSuccess, onBack }: Props) {
  const { state, selectedPersona, selectedProduct } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const user = state.userInfo;
  const isKo = lang === "ko";

  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  const isFree = selectedProduct?.is_free ?? false;
  const displayedPrice = isFree ? FREE_LABEL[lang] : formatPrice(lang);
  const productName = isKo ? selectedProduct?.name_ko : selectedProduct?.name_en;
  const productNameAlt = isKo ? selectedProduct?.name_en : selectedProduct?.name_ko;

  const fullName = isKo
    ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const paymentMethods = isKo ? KO_PAYMENT_METHODS : INTL_PAYMENT_METHODS;

  const handlePay = () => {
    if (isFree) {
      window.open(
        "https://www.profitablecpmratenetwork.com/wyus782qa2?key=3e1412d8e7e4077de0d858bb53fb8b6f",
        "_blank",
        "noopener,noreferrer",
      );
      setShowAd(true);
      return;
    }
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-28">
      {showAd && <AdOverlay onClose={() => { setShowAd(false); onSuccess(); }} />}
      <SiteNav onBack={onBack} backLabel={t.back} />

      <div className="px-4 pt-6 max-w-md mx-auto space-y-5">
        {/* Order summary */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{selectedProduct?.icon}</span>
            <div>
              <h2 className="font-bold text-white">{productName}</h2>
              <p className="text-xs text-white/40">{productNameAlt}</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <span className="text-sm text-white/50">
              {isKo ? `${fullName}님` : fullName}
            </span>
            <span className={`text-2xl font-bold ${isFree ? "text-emerald-400" : "text-white"}`}>
              {displayedPrice}
            </span>
          </div>
        </div>

        {/* Payment methods — skip if free */}
        {!isFree && (
          <div>
            <p className="text-xs text-white/50 mb-3">{t.payWith}</p>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => method.available && setSelected(method.id)}
                  disabled={!method.available}
                  className={`relative py-4 rounded-xl border text-sm font-medium transition-all ${
                    !method.available
                      ? "opacity-40 cursor-not-allowed border-white/5 bg-white/5"
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
        )}

        <div className="text-center text-xs text-white/30 flex items-center justify-center gap-1">
          🔒 {t.securePayment}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
        <button
          onClick={handlePay}
          disabled={(!isFree && !selected) || loading}
          className={`w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-200 ${
            (!isFree && !selected) || loading
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : isFree
              ? "bg-emerald-600 active:scale-95"
              : `bg-gradient-to-r ${fromColor} ${toColor} active:scale-95`
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin text-xl">🔮</span>
              {t.processingPayment}
            </span>
          ) : (
            <>🔮 {isFree ? t.tryFree : t.payWith}</>
          )}
        </button>
      </div>
    </div>
  );
}
