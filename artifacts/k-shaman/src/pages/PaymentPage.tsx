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

const BASE = import.meta.env.BASE_URL;

export function PaymentPage({ onSuccess, onBack }: Props) {
  const { state, selectedPersona, selectedProduct } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const user = state.userInfo;
  const isKo = lang === "ko";

  const [showAd, setShowAd] = useState(false);
  const [copied, setCopied] = useState(false);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  const isFree = selectedProduct?.is_free ?? false;
  const displayedPrice = isFree ? FREE_LABEL[lang] : formatPrice(lang);
  const productName = isKo ? selectedProduct?.name_ko : selectedProduct?.name_en;
  const productNameAlt = isKo ? selectedProduct?.name_en : selectedProduct?.name_ko;

  const fullName = isKo
    ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText("1001-8318-9198").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isFree) {
    return (
      <div className="text-white pb-28">
        {showAd && <AdOverlay onClose={() => { setShowAd(false); onSuccess(); }} />}
        <SiteNav onBack={onBack} backLabel={t.back} />
        <div className="px-4 pt-6 max-w-md mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{selectedProduct?.icon}</span>
              <div>
                <h2 className="font-bold text-white">{productName}</h2>
                <p className="text-xs text-white/40">{productNameAlt}</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-sm text-white/50">{isKo ? `${fullName}님` : fullName}</span>
              <span className="text-2xl font-bold text-emerald-400">{displayedPrice}</span>
            </div>
          </div>
          <button
            onClick={() => setShowAd(true)}
            className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-xl"
          >
            🎁 {t.tryFree}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white pb-36">
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
            <span className="text-sm text-white/50">{isKo ? `${fullName}님` : fullName}</span>
            <span className="text-xs text-white/35 italic">{t.altarEmpty}</span>
          </div>
        </div>

        {/* Offering title */}
        <div className="text-center">
          <h3 className="text-[2rem] font-bold text-violet-300">{t.bokchaeTitle}</h3>
          <p className="text-sm text-white/50 mt-1 leading-relaxed whitespace-pre-line">{t.bokchaeDesc}</p>
        </div>

        {/* ── Toss (항상 표시, 한글 고정) ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-3 py-3 border-b border-white/10">
            {/* 한 줄: 토스로고 | 🇰🇷 | 토스뱅크 | 계좌번호 | 이름 | 복사버튼 */}
            <div className="flex items-center gap-2 flex-wrap">
              <img src={`${BASE}toss_logo.jpg`} alt="Toss" className="h-5 object-contain rounded shrink-0" />
              <span className="text-base leading-none">🇰🇷</span>
              <span className="text-[11px] text-white/40 shrink-0">토스뱅크</span>
              <span className="text-sm font-mono text-white font-bold tracking-wide shrink-0">1001-8318-9198</span>
              <span className="text-xs text-white/50 shrink-0">최영준</span>
              <button
                onClick={handleCopy}
                className={`ml-auto shrink-0 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20"
                }`}
              >
                {copied ? t.bokchaeCopied : t.bokchaeCopy}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center py-4 gap-1">
            <p className="text-xs text-white/40">QR코드로 바로 송금</p>
            <img
              src={`${BASE}toss_qr.jpg`}
              alt="Toss QR Code"
              className="w-44 h-44 rounded-xl border border-white/10"
            />
          </div>
        </div>

        {/* ── PayPal (항상 표시, 텍스트는 다국어) ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-white/10">
            <a
              href="https://paypal.me/YoungjunChoi310/1.99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[#003087] hover:bg-[#002070] transition-colors font-bold text-white text-sm shadow"
            >
              <img src={`${BASE}paypal_logo.jpg`} alt="PayPal" className="h-5 object-contain rounded" />
              {t.bokchaePaypalBtn}
            </a>
          </div>
          <div className="flex flex-col items-center py-4 gap-1">
            <p className="text-xs text-white/40">
              {isKo ? "QR코드로 PayPal 바로 연결" : "Scan QR to open PayPal"}
            </p>
            <img
              src={`${BASE}paypal_qr.jpg`}
              alt="PayPal QR Code"
              className="w-44 h-44 rounded-xl border border-white/10"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-violet-500/20 bg-violet-900/10 px-4 py-3">
          <p className="text-xs text-violet-200/70 leading-relaxed text-center whitespace-pre-line">
            {t.bokchaeDisclaimer}
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent">
        <div className="max-w-md mx-auto">
          <button
            onClick={onSuccess}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl active:scale-95 transition-all bg-gradient-to-r ${fromColor} ${toColor}`}
          >
            {t.bokchaeConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
