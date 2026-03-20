import { useRef, useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { Check, Download, Loader2, RotateCcw, Grid2x2, Share2 } from "lucide-react";
import { getPetTest, PetType } from "@/data/petData";
import PetShareCard from "@/components/PetShareCard";
import { Layout } from "@/components/layout";
import { useToast } from "@/hooks/use-toast";
import { ShareButtons } from "@/components/share-buttons";
import {
  buildShareMessage,
  saveResultCardImage,
  shareResultComparison,
} from "@/lib/shareMessage";

export default function PetResult() {
  const params = useParams<{ type: string; key: string }>();
  const petType = params.type as PetType;
  const resultKey = params.key;
  const [, navigate] = useLocation();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const lang = i18n.language || 'ko';

  const cardRef = useRef<HTMLDivElement>(null!);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [cardScale, setCardScale] = useState(1);

  const test = getPetTest(petType);
  const result = test.results.find((r) => r.key === resultKey);


  const updateCardScale = useCallback(() => {
    if (!previewWrapperRef.current) return;
    const available = previewWrapperRef.current.clientWidth;
    setCardScale(Math.min(1, available / 360));
  }, []);

  useEffect(() => {
    updateCardScale();
    window.addEventListener('resize', updateCardScale);
    return () => window.removeEventListener('resize', updateCardScale);
  }, [updateCardScale]);

  useEffect(() => {
    if (!result) return;
    const end = Date.now() + 2200;
    const rng = (min: number, max: number) => Math.random() * (max - min) + min;
    const iv = setInterval(() => {
      const left = end - Date.now();
      if (left <= 0) { clearInterval(iv); return; }
      const n = 45 * (left / 2200);
      const opts = { startVelocity: 26, spread: 340, ticks: 55, zIndex: 0 };
      confetti({ ...opts, particleCount: n, origin: { x: rng(0.1, 0.3), y: -0.1 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#F59E0B'] });
      confetti({ ...opts, particleCount: n, origin: { x: rng(0.7, 0.9), y: -0.1 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'] });
    }, 220);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => clearInterval(iv);
  }, [result]);

  if (!result) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">{t('pet.result.notFound')}</p>
        </div>
      </Layout>
    );
  }

  const labelKey = petType === 'dog' ? 'pet.quiz.dogLabel' : 'pet.quiz.catLabel';
  const rKey = `${petType}.results.${resultKey}`;
  const resultTitle = t(`${rKey}.title`);
  const resultPageUrl = `https://mytesttype.com${window.location.pathname}${window.location.search}`;
  const shareText = buildShareMessage(lang, resultTitle, resultPageUrl);

  async function handleSaveImage() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      await saveResultCardImage(
        cardRef.current,
        `pet-result-${resultKey}`,
        () => toast({ title: t('result.iosSaveHint'), description: t('result.iosSaveHintDesc') }),
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2800);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.warn('Image save failed', err);
      toast({ variant: 'destructive', title: t('pet.result.saveError') });
    } finally {
      setSaving(false);
    }
  }

  async function handleShareComparison() {
    if (!cardRef.current || sharing) return;
    setSharing(true);
    try {
      await shareResultComparison(
        cardRef.current,
        resultTitle,
        resultPageUrl,
        lang,
        `pet-result-${resultKey}`,
      );
      setShared(true);
      setTimeout(() => setShared(false), 2800);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      await navigator.clipboard.writeText(resultPageUrl).catch(() => {});
      toast({ title: t('share.copySuccess'), description: t('share.copySuccessDesc') });
    } finally {
      setSharing(false);
    }
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center pb-10">
        <div className="w-full max-w-xl px-4 pt-6">
          <button
            className="text-muted-foreground text-sm mb-6 flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => navigate("/pet-test")}
          >
            {t('pet.nav.back')}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-sm text-muted-foreground font-semibold mb-3 uppercase tracking-wider">
              {test.emoji} {t('pet.result.heading', { label: t(labelKey) })}
            </p>

            <div className="rounded-3xl overflow-hidden shadow-xl mb-5">
              <PetShareCard result={result} petType={petType} />
            </div>

            <div className="bg-card rounded-[1.5rem] p-6 border border-border shadow-sm mb-4">
              <h3 className="text-foreground font-bold text-base mb-2">{t('pet.result.descSection')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(`${rKey}.description`)}</p>
            </div>

            <div className="bg-card rounded-[1.5rem] p-6 border border-border shadow-sm mb-4">
              <h3 className="text-foreground font-bold text-base mb-3">{t('pet.result.traitsSection')}</h3>
              <ul className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i + 1}</span>
                    <span>{t(`${rKey}.trait${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl p-5 shadow-sm mb-6" style={{ background: result.gradient }}>
              <p className="text-white font-bold text-sm mb-1">{t('pet.result.ownerLabel')}</p>
              <p className="text-white/90 text-sm font-semibold mb-3">{t(`${rKey}.compatibleOwner`)}</p>
              <div className="bg-white/20 rounded-2xl p-3">
                <p className="text-white text-xs leading-relaxed">
                  💡 <span className="font-semibold">{t('pet.result.tipLabel')}</span><br />
                  {t(`${rKey}.ownerTip`)}
                </p>
              </div>
            </div>

            {/* ── Share Card Section ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="relative rounded-[1.75rem] overflow-hidden mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-950" />
              <div className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.30) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.18) 0%, transparent 50%)' }} />
              {(['8% 8%', '90% 10%', '5% 88%', '88% 85%', '50% 50%'] as const).map((pos, i) => (
                <span key={i} className="absolute text-white/15 text-xs select-none pointer-events-none"
                  style={{ top: pos.split(' ')[1], left: pos.split(' ')[0] }}>✦</span>
              ))}

              <div className="relative z-10 p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-black text-white mb-1">{t('pet.result.shareCardTitle')}</h3>
                  <p className="text-white/55 text-sm">{t('pet.result.shareCardSub')}</p>
                </div>

                {/* ── Card Preview (capture target: cardRef) ── */}
                <div ref={previewWrapperRef} className="w-full flex justify-center mb-5">
                  <div style={{
                    width: `${Math.round(360 * cardScale)}px`,
                    height: `${Math.round(480 * cardScale)}px`,
                    flexShrink: 0,
                    overflow: 'hidden',
                    borderRadius: '28px',
                    filter: 'drop-shadow(0 20px 60px rgba(139,92,246,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                  }}>
                    <div style={{
                      width: '360px',
                      height: '480px',
                      transformOrigin: 'top left',
                      transform: `scale(${cardScale})`,
                    }}>
                      {/* cardRef — only this 360×480 card is captured */}
                      <div ref={cardRef}>
                        <PetShareCard result={result} petType={petType} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {/* Primary: 친구랑 비교하기 — native share with image + message */}
                  <button
                    onClick={handleShareComparison}
                    disabled={sharing}
                    className={`w-full flex items-center justify-center gap-2.5 rounded-2xl h-14 text-[0.95rem] font-black transition-all duration-200 active:scale-[0.97] shadow-xl shadow-black/30 ${
                      shared
                        ? 'bg-emerald-500 text-white cursor-pointer'
                        : sharing
                          ? 'bg-white/70 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-900 hover:bg-white/90 cursor-pointer'
                    }`}
                  >
                    {sharing
                      ? <><Loader2 className="w-5 h-5 animate-spin" />{t('result.sharing')}</>
                      : shared
                        ? <><Check className="w-5 h-5" />{t('result.shared')}</>
                        : <><Share2 className="w-5 h-5" />{t('pet.result.compareWithFriends')}</>
                    }
                  </button>

                  {/* Secondary: 이미지 저장 — save PNG only, no share sheet */}
                  <button
                    onClick={handleSaveImage}
                    disabled={saving}
                    className={`w-full flex items-center justify-center gap-2.5 rounded-2xl h-11 text-sm font-bold text-white/80 border border-white/20 hover:bg-white/10 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {saving
                      ? <><Loader2 className="w-4 h-4 animate-spin" />{t('pet.result.savingImage')}</>
                      : saved
                        ? <><Check className="w-4 h-4" />{t('pet.result.imageSaved')}</>
                        : <><Download className="w-4 h-4" />{t('pet.common.saveImage')}</>
                    }
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/35 text-xs font-medium shrink-0">{t('result.snsDivider')}</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <ShareButtons
                  title={t('result.shareTitle', { testTitle: t(labelKey), resultTitle })}
                  text={shareText}
                  url={resultPageUrl}
                  resultTitle={resultTitle}
                />
              </div>
            </motion.div>

            <div className="flex flex-col gap-2.5 mb-10">
              <button
                onClick={() => navigate(`/pet-test/quiz/${petType}`)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl h-13 py-3.5 text-[0.95rem] font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
              >
                <RotateCcw className="w-4 h-4" />{t('pet.common.retake')}
              </button>
              <button
                onClick={() => navigate('/tests')}
                className="w-full flex items-center justify-center gap-2 rounded-2xl h-12 text-[0.95rem] font-bold border border-border bg-card text-foreground hover:-translate-y-0.5 transition-transform"
              >
                <Grid2x2 className="w-4 h-4" />{t('pet.common.takeOther')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
