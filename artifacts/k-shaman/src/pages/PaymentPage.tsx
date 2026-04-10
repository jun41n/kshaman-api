import { useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { formatPrice, FREE_LABEL } from "../config/pricing";
import { SiteNav } from "../components/SiteNav";
import { AdOverlay } from "../components/AdOverlay";
import { BokchaeModal } from "../components/BokchaeModal";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

export function PaymentPage({ onSuccess, onBack }: Props) {
  const { state, selectedPersona, selectedProduct } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const user = state.userInfo;
  const isKo = lang === "ko";

  const [showAd, setShowAd] = useState(false);
  const [showBokchae, setShowBokchae] = useState(false);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  const isFree = selectedProduct?.is_free ?? false;
  const displayedPrice = isFree ? FREE_LABEL[lang] : formatPrice(lang);
  const productName = isKo ? selectedProduct?.name_ko : selectedProduct?.name_en;
  const productNameAlt = isKo ? selectedProduct?.name_en : selectedProduct?.name_ko;

  const fullName = isKo
    ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const handlePay = () => {
    if (isFree) {
      setShowAd(true);
    } else {
      setShowBokchae(true);
    }
  };

  return (
    <div className="text-white pb-28">
      {showAd && <AdOverlay onClose={() => { setShowAd(false); onSuccess(); }} />}
      {showBokchae && (
        <BokchaeModal
          onConfirm={() => { setShowBokchae(false); onSuccess(); }}
          onClose={() => setShowBokchae(false)}
        />
      )}

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

        {/* Bokchae info card — for paid products */}
        {!isFree && (
          <div className="rounded-2xl border border-violet-500/20 bg-violet-900/10 p-5 space-y-2">
            <p className="text-sm font-semibold text-violet-300">
              {isKo ? "🙏 복채(자발적 후원)로 운영됩니다" : "🙏 This service runs on voluntary offerings"}
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              {isKo
                ? "본 서비스는 개인 프로젝트로 운영되며, 결제 정보를 직접 저장하지 않습니다. 복채를 올려주시면 신령의 기운이 더욱 강해집니다."
                : "This is an independent project. No payment data is stored. Your voluntary offering strengthens the spirit's energy."}
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent max-w-md mx-auto w-full">
        <button
          onClick={handlePay}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-200 active:scale-95 ${
            isFree
              ? "bg-emerald-600 hover:bg-emerald-500"
              : `bg-gradient-to-r ${fromColor} ${toColor}`
          }`}
        >
          {isFree ? <>🎁 {t.tryFree}</> : <>🔮 {t.openBokchae}</>}
        </button>
      </div>
    </div>
  );
}
