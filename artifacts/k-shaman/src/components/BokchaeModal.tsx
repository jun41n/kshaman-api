import { useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const BASE = import.meta.env.BASE_URL;

export function BokchaeModal({ onConfirm, onClose }: Props) {
  const { state } = useApp();
  const t = T[state.currentLang];
  const isKo = state.currentLang === "ko";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1001-8318-9198").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm bg-gray-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-white leading-tight">{t.bokchaeTitle}</h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-xl leading-none mt-0.5 shrink-0"
              aria-label="Close"
            >✕</button>
          </div>
          <p className="mt-3 text-sm text-white/60 leading-relaxed whitespace-pre-line">
            {t.bokchaeDesc}
          </p>
        </div>

        {/* Payment section */}
        <div className="px-6 py-5 space-y-4">
          {isKo ? (
            /* ── Korean: Toss ── */
            <div className="space-y-4">
              {/* Toss logo + account */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`${BASE}toss_logo.jpg`}
                    alt="Toss"
                    className="h-7 object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-mono text-white font-semibold">
                    {t.bokchaeAccount}
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      copied
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {copied ? t.bokchaeCopied : t.bokchaeCopy}
                  </button>
                </div>
              </div>
              {/* Toss QR */}
              <div className="flex justify-center">
                <img
                  src={`${BASE}toss_qr.jpg`}
                  alt="Toss QR Code"
                  className="w-44 h-44 rounded-2xl border border-white/10"
                />
              </div>
            </div>
          ) : (
            /* ── Global: PayPal ── */
            <div className="space-y-4">
              {/* PayPal button */}
              <a
                href="https://paypal.me/YoungjunChoi310/3usd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl bg-[#003087] hover:bg-[#002070] transition-colors font-bold text-white text-sm"
              >
                <img
                  src={`${BASE}paypal_logo.jpg`}
                  alt="PayPal"
                  className="h-5 object-contain brightness-0 invert"
                />
                {t.bokchaePaypalBtn}
              </a>
              {/* PayPal QR */}
              <div className="flex justify-center">
                <img
                  src={`${BASE}paypal_qr.jpg`}
                  alt="PayPal QR Code"
                  className="w-44 h-44 rounded-2xl border border-white/10"
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm CTA */}
        <div className="px-6 pb-6">
          <button
            onClick={onConfirm}
            className="w-full py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 active:scale-95 transition-all shadow-xl shadow-violet-900/40"
          >
            {t.bokchaeConfirm}
          </button>
          <p className="text-center text-xs text-white/30 mt-3">
            {isKo
              ? "자발적 후원이며 입금 여부와 관계없이 점사가 제공됩니다"
              : "This is a voluntary offering. Reading is provided regardless of payment."}
          </p>
        </div>
      </div>
    </div>
  );
}
