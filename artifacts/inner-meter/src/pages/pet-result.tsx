import { useRef, useState, useCallback, useEffect } from "react";
import { useParams, useLocation, Link } from "wouter";
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

const ALL_DOG_TYPES = [
  'ENTJ','ENTP','ENFJ','ENFP',
  'ESTJ','ESFJ','ESTP','ESFP',
  'INTJ','INTP','INFJ','INFP',
  'ISTJ','ISTP','ISFJ','ISFP',
];

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
  const resultSummary = t(`${rKey}.summary`);
  const resultPageUrl = `https://mytesttype.com${window.location.pathname}${window.location.search}`;
  const shareText = buildShareMessage(lang, resultTitle, resultPageUrl);

  const dogImageSrc = petType === 'dog'
    ? `${window.location.origin}/images/${resultKey.toLowerCase()}.webp`
    : null;

  async function handleSaveImage() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      await saveResultCardImage(
        cardRef.current,
        `pet-result-${resultKey}`,
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
    <Layout showAd>
      <div className="max-w-xl mx-auto pt-2 pb-4 px-4">

        {/* ── Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative rounded-[2rem] overflow-hidden mb-5 shadow-2xl"
          style={{ boxShadow: '0 25px 60px rgba(139,92,246,0.30)' }}
        >
          <div className="absolute inset-0" style={{ background: result.gradient }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(255,255,255,0.22) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.14) 0%, transparent 50%)' }} />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-10">
            <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs font-bold mb-5">
              {test.emoji} {t('pet.result.heading', { label: t(labelKey) })}
            </div>
            {dogImageSrc ? (
              <motion.div
                className="w-44 h-44 md:w-56 md:h-56 mb-5 select-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={dogImageSrc}
                  alt={resultKey}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>
            ) : (
              <div className="text-[5rem] mb-5 drop-shadow-xl select-none leading-none">{test.emoji}</div>
            )}
            <h1 className="text-3xl md:text-[2.6rem] font-black text-white mb-3 leading-tight tracking-tight">
              {resultTitle}
            </h1>
            <div className="w-12 h-[3px] bg-white/35 rounded-full mb-4" />
            <p className="text-base md:text-lg font-semibold text-white/90 leading-snug max-w-[18rem] break-keep">
              "{resultSummary}"
            </p>
          </div>
        </motion.div>

        {/* ── Description ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-[1.5rem] p-6 border border-border shadow-sm mb-4"
        >
          <p className="text-[0.95rem] md:text-base text-foreground leading-relaxed break-keep">
            {t(`${rKey}.description`)}
          </p>
        </motion.div>

        {/* ── Strengths & Caution ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="bg-emerald-50 dark:bg-emerald-950/30 rounded-[1.5rem] p-5 border border-emerald-100 dark:border-emerald-900/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-sm">✓</div>
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">{t('pet.result.strengthsSection')}</h3>
            </div>
            <ul className="space-y-2.5">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                    {t(`${rKey}.strength${i}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="bg-amber-50 dark:bg-amber-950/30 rounded-[1.5rem] p-5 border border-amber-100 dark:border-amber-900/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl bg-amber-400 flex items-center justify-center text-white font-black text-sm">!</div>
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm">{t('pet.result.cautionSection')}</h3>
            </div>
            <ul className="space-y-2.5">
              {[0, 1].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
                    {t(`${rKey}.caution${i}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Lifestyle & Compatible Owner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-5 rounded-[1.5rem] overflow-hidden border border-violet-100 dark:border-violet-900/40"
        >
          <div className="bg-violet-50 dark:bg-violet-950/30 p-5 border-b border-violet-100 dark:border-violet-900/40">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg leading-none">🐾</span>
              <h3 className="font-bold text-violet-800 dark:text-violet-300 text-sm">{t('pet.result.lifestyleSection')}</h3>
            </div>
            <p className="text-sm text-violet-900 dark:text-violet-200 leading-relaxed break-keep">
              {t(`${rKey}.lifestyle`)}
            </p>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-950/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg leading-none">🏠</span>
              <h3 className="font-bold text-fuchsia-800 dark:text-fuchsia-300 text-sm">{t('pet.result.ownerLabel')}</h3>
            </div>
            <p className="text-sm text-fuchsia-900 dark:text-fuchsia-200 leading-relaxed break-keep">
              {t(`${rKey}.compatibleOwner`)}
            </p>
          </div>
        </motion.div>

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

            {/* ── Card Preview ── */}
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
                  <div ref={cardRef}>
                    <PetShareCard result={result} petType={petType} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleShareComparison}
                disabled={sharing}
                className={`w-full flex items-center justify-center gap-2.5 rounded-2xl h-14 text-[0.95rem] font-black transition-all duration-200 active:scale-[0.97] shadow-xl shadow-black/30 ${
                  shared ? 'bg-emerald-500 text-white cursor-pointer'
                  : sharing ? 'bg-white/70 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-900 hover:bg-white/90 cursor-pointer'
                }`}
              >
                {sharing ? <><Loader2 className="w-5 h-5 animate-spin" />{t('result.sharing')}</>
                : shared ? <><Check className="w-5 h-5" />{t('result.shared')}</>
                : <><Share2 className="w-5 h-5" />{t('pet.result.compareWithFriends')}</>}
              </button>

              <button
                onClick={handleSaveImage}
                disabled={saving}
                className={`w-full flex items-center justify-center gap-2.5 rounded-2xl h-11 text-sm font-bold text-white/80 border border-white/20 hover:bg-white/10 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />{t('pet.result.savingImage')}</>
                : saved ? <><Check className="w-4 h-4" />{t('pet.result.imageSaved')}</>
                : <><Download className="w-4 h-4" />{t('pet.common.saveImage')}</>}
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

        {/* ── Action Buttons ── */}
        <div className="flex flex-col gap-2.5 mb-12">
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

        {/* ── Deep Personality Content (SEO) ── */}
        <div className="space-y-4 mb-10">
          {/* 성격 특징 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="bg-card rounded-[1.5rem] p-6 border border-border shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🐕</span>
              <h2 className="font-bold text-foreground text-base">
                {resultKey.toUpperCase()} {t('pet.result.fullDescSection')}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed break-keep">
              {t(`${rKey}.fullDescription`)}
            </p>
          </motion.div>

          {/* 장점 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.34 }}
            className="bg-emerald-50 dark:bg-emerald-950/30 rounded-[1.5rem] p-6 border border-emerald-100 dark:border-emerald-900/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚡</span>
              <h2 className="font-bold text-emerald-800 dark:text-emerald-300 text-base">
                {resultKey.toUpperCase()} {t('pet.result.advantagesSection')}
              </h2>
            </div>
            <p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed break-keep">
              {t(`${rKey}.advantages`)}
            </p>
          </motion.div>

          {/* 단점 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.36 }}
            className="bg-amber-50 dark:bg-amber-950/30 rounded-[1.5rem] p-6 border border-amber-100 dark:border-amber-900/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💡</span>
              <h2 className="font-bold text-amber-800 dark:text-amber-300 text-base">
                {resultKey.toUpperCase()} {t('pet.result.disadvantagesSection')}
              </h2>
            </div>
            <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed break-keep">
              {t(`${rKey}.disadvantages`)}
            </p>
          </motion.div>

          {/* 추천 활동 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.38 }}
            className="bg-sky-50 dark:bg-sky-950/30 rounded-[1.5rem] p-6 border border-sky-100 dark:border-sky-900/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏃</span>
              <h2 className="font-bold text-sky-800 dark:text-sky-300 text-base">
                {resultKey.toUpperCase()} {t('pet.result.activitySection')}
              </h2>
            </div>
            <p className="text-sm text-sky-900 dark:text-sky-200 leading-relaxed break-keep">
              {t(`${rKey}.activityTip`)}
            </p>
          </motion.div>

          {/* 궁합 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.40 }}
            className="bg-fuchsia-50 dark:bg-fuchsia-950/30 rounded-[1.5rem] p-6 border border-fuchsia-100 dark:border-fuchsia-900/40"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤝</span>
              <h2 className="font-bold text-fuchsia-800 dark:text-fuchsia-300 text-base">
                {resultKey.toUpperCase()} {t('pet.result.compatibilitySection')}
              </h2>
            </div>
            <p className="text-sm text-fuchsia-900 dark:text-fuchsia-200 leading-relaxed break-keep">
              {t(`${rKey}.compatibility`)}
            </p>
          </motion.div>

          {/* 보호자 팁 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="rounded-[1.5rem] p-6 shadow-sm"
            style={{ background: result.gradient }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg leading-none">💌</span>
              <h2 className="font-bold text-white text-sm">{t('pet.result.tipLabel')}</h2>
            </div>
            <p className="text-white/90 text-sm leading-relaxed break-keep">
              {t(`${rKey}.ownerTip`)}
            </p>
          </motion.div>
        </div>

        {/* ── Dog Type Explorer ── */}
        {petType === 'dog' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.44 }}
            className="border-t border-border pt-10 mb-10"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-black text-foreground mb-1">{t('pet.result.exploreTypes')}</h2>
              <p className="text-xs text-muted-foreground">{t('pet.result.exploreTypesSub')}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {ALL_DOG_TYPES.map((type) => (
                <Link
                  key={type}
                  href={`/pet-test/result/dog/${type.toLowerCase()}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${
                    type.toLowerCase() === resultKey.toLowerCase()
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border bg-card text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Recommended Tests ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.46 }}
          className="border-t border-border pt-10 mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-black text-foreground mb-1">{t('result.recommended')}</h2>
            <p className="text-xs text-muted-foreground">{t('result.recommendedSub')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: '💘', title: t('pet.result.recTest1Title'), sub: t('pet.result.recTest1Sub'), href: '/tests/love-test', color: 'from-pink-500 to-rose-500' },
              { emoji: '🧬', title: t('pet.result.recTest2Title'), sub: t('pet.result.recTest2Sub'), href: '/tests/mbti-test', color: 'from-violet-500 to-purple-600' },
              { emoji: '🐱', title: t('pet.result.recTest3Title'), sub: t('pet.result.recTest3Sub'), href: '/pet-test/quiz/cat', color: 'from-amber-400 to-orange-500' },
            ].map((test, i) => (
              <Link key={i} href={test.href}
                className="group rounded-[1.25rem] overflow-hidden border border-border hover:border-primary transition-all hover:-translate-y-0.5 bg-card shadow-sm"
              >
                <div className={`h-16 bg-gradient-to-br ${test.color} flex items-center justify-center text-3xl`}>
                  {test.emoji}
                </div>
                <div className="p-3">
                  <p className="font-bold text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors">{test.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{test.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </Layout>
  );
}
