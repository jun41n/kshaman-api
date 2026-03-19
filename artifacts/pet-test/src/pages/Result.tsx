import { useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { useTranslation } from "react-i18next";
import { getPetTest, PetType } from "@/data/petData";
import PetShareCard from "@/components/PetShareCard";

export default function Result() {
  const params = useParams<{ type: string; key: string }>();
  const petType = params.type as PetType;
  const resultKey = params.key;
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const test = getPetTest(petType);
  const result = test.results.find((r) => r.key === resultKey);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8B6650]">{t('result.notFound')}</p>
      </div>
    );
  }

  const labelKey = petType === 'dog' ? 'quiz.dogLabel' : 'quiz.catLabel';

  async function handleSaveImage() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: result!.cardBg,
      });
      const link = document.createElement("a");
      link.download = `pet-result-${resultKey}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const rKey = `${petType}.results.${resultKey}`;

  return (
    <div className="flex-1 flex flex-col items-center pb-10">
      <div className="w-full max-w-sm px-4 pt-6">
        <button
          className="text-[#8B6650] text-sm mb-6 flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          {t('nav.back')}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-sm text-[#8B6650] font-semibold mb-3 uppercase tracking-wider">
            {test.emoji} {t('result.heading', { label: t(labelKey) })}
          </p>

          <div ref={cardRef} className="rounded-3xl overflow-hidden shadow-xl mb-6">
            <PetShareCard result={result} petType={petType} />
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
            <h3 className="text-[#3D2B1F] font-bold text-base mb-2">{t('result.descSection')}</h3>
            <p className="text-[#5A3E2B] text-sm leading-relaxed">{t(`${rKey}.description`)}</p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
            <h3 className="text-[#3D2B1F] font-bold text-base mb-3">{t('result.traitsSection')}</h3>
            <ul className="space-y-2">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#5A3E2B]">
                  <span className="text-base leading-none mt-0.5">✅</span>
                  <span>{t(`${rKey}.trait${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl p-5 shadow-sm mb-6"
            style={{ background: result.gradient }}>
            <p className="text-white font-bold text-sm mb-1">{t('result.ownerLabel')}</p>
            <p className="text-white/90 text-sm font-semibold mb-3">{t(`${rKey}.compatibleOwner`)}</p>
            <div className="bg-white/20 rounded-2xl p-3">
              <p className="text-white text-xs leading-relaxed">
                💡 <span className="font-semibold">{t('result.tipLabel')}</span><br />
                {t(`${rKey}.ownerTip`)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              className="w-full py-4 rounded-2xl font-bold text-base text-white shadow-md flex items-center justify-center gap-2 transition-opacity"
              style={{ background: result.cardBg, opacity: saving ? 0.7 : 1 }}
              onClick={handleSaveImage}
              disabled={saving}
            >
              {saving ? t('result.savingBtn') : t('result.saveBtn')}
            </button>

            <button
              className="w-full py-4 rounded-2xl font-bold text-base border-2 border-[#F0E4D8] bg-white text-[#3D2B1F] shadow-sm flex items-center justify-center gap-2 transition-colors"
              onClick={handleCopyLink}
            >
              {copied ? t('result.copiedBtn') : t('result.shareBtn')}
            </button>

            <button
              className="w-full py-3 rounded-2xl font-semibold text-sm text-[#8B6650] bg-[#F0E4D8] transition-colors"
              onClick={() => navigate(`/quiz/${petType}`)}
            >
              {t('result.retryBtn')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
