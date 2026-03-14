import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { ShareButtons } from "@/components/share-buttons";
import { ResultShareCard } from "@/components/ResultShareCard";
import { TestCard } from "@/components/test-card";
import { getTestBySlug, RESULT_EMOJIS } from "@/data/tests";
import { RotateCcw, Grid2x2, Download, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { trackRecommendedTestClick, trackResultImageSave } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import { useLocalizedTest } from "@/hooks/useLocalizedTest";

const CATEGORY_GRADIENTS: Record<string, string> = {
  '연애 테스트': 'from-pink-500 via-rose-500 to-fuchsia-500',
  '성격 테스트': 'from-violet-600 via-purple-500 to-indigo-500',
  'MBTI':         'from-indigo-900 via-violet-800 to-purple-900',
  '심리 테스트':  'from-teal-500 via-cyan-500 to-sky-600',
  '재미 테스트':  'from-amber-500 via-orange-400 to-red-400',
  '타로':         'from-violet-950 via-purple-900 to-indigo-950',
};
const CATEGORY_GLOW: Record<string, string> = {
  '연애 테스트': 'shadow-pink-500/25',
  '성격 테스트': 'shadow-violet-500/25',
  'MBTI':         'shadow-indigo-500/30',
  '심리 테스트':  'shadow-teal-500/25',
  '재미 테스트':  'shadow-amber-500/20',
  '타로':         'shadow-purple-500/30',
};

async function downloadCardAsPng(
  el: HTMLDivElement,
  filename: string,
): Promise<Blob | null> {
  const { toBlob } = await import("html-to-image");

  // Run toBlob twice — first pass embeds fonts/images, second pass renders cleanly
  const opts = {
    pixelRatio: 2.5,
    cacheBust: false,
    skipFonts: false,
    style: { borderRadius: '28px' },
    fetchRequestInit: { cache: 'force-cache' as RequestCache },
  };

  // Warm-up pass (populates internal caches)
  await toBlob(el, opts).catch(() => null);

  // Actual capture with timeout guard
  const blobPromise = toBlob(el, opts);
  const timeoutPromise = new Promise<null>((_, reject) =>
    setTimeout(() => reject(new Error('capture-timeout')), 15_000),
  );
  const blob = await Promise.race([blobPromise, timeoutPromise]);
  return blob;
}

export default function TestResult() {
  const { t } = useTranslation();
  const [, params] = useRoute("/results/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  const localTest = useLocalizedTest(slug);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cardScale, setCardScale] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null!);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const test = getTestBySlug(slug);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('result');
    if (!key || !test) { setLocation('/tests'); return; }
    setResultKey(key);

    const end = Date.now() + 2200;
    const rng = (min: number, max: number) => Math.random() * (max - min) + min;
    const iv: ReturnType<typeof setInterval> = setInterval(() => {
      const left = end - Date.now();
      if (left <= 0) { clearInterval(iv); return; }
      const n = 45 * (left / 2200);
      const opts = { startVelocity: 26, spread: 340, ticks: 55, zIndex: 0 };
      confetti({ ...opts, particleCount: n, origin: { x: rng(0.1, 0.3), y: -0.1 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#F59E0B'] });
      confetti({ ...opts, particleCount: n, origin: { x: rng(0.7, 0.9), y: -0.1 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'] });
    }, 220);

    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => clearInterval(iv);
  }, [slug, test, setLocation]);

  // Measure the preview wrapper and compute how much to scale the card
  const updateCardScale = useCallback(() => {
    if (!previewWrapperRef.current) return;
    const available = previewWrapperRef.current.clientWidth;
    setCardScale(Math.min(1, available / 360));
  }, []);

  useEffect(() => {
    updateCardScale();
    window.addEventListener('resize', updateCardScale);
    return () => window.removeEventListener('resize', updateCardScale);
  }, [updateCardScale, resultKey]);

  if (!test || !resultKey) return null;
  const result = test.results.find(r => r.key === resultKey);
  if (!result) return null;

  const localResult = localTest?.results[resultKey];
  const resultTitle = localResult?.title ?? result.title;
  const resultSummary = localResult?.summary ?? result.summary;
  const resultDescription = localResult?.description ?? result.description;
  const resultStrengths = localResult?.strengths ?? result.strengths;
  const resultCaution = localResult?.caution ?? result.caution;

  const recommendedTests = result.recommendedTests
    .map(s => getTestBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTestBySlug>>[];

  const gradient = CATEGORY_GRADIENTS[test.category] || 'from-violet-600 via-purple-500 to-fuchsia-500';
  const glow = CATEGORY_GLOW[test.category] || 'shadow-violet-500/25';

  const handleSaveImage = async () => {
    if (!cardRef.current || isSaving) return;
    setIsSaving(true);
    try {
      const blob = await downloadCardAsPng(cardRef.current, `innermeter-${result.key}`);
      if (!blob) throw new Error('Failed to generate image');

      const file = new File([blob], `innermeter-${result.key}.png`, { type: 'image/png' });
      const canNativeShare = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

      if (canNativeShare) {
        await navigator.share({ files: [file], title: resultTitle, text: localResult?.shareText ?? result.shareText });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `innermeter-${result.key}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2800);
      trackResultImageSave({ test_slug: test.slug, result_key: result.key, result_title: result.title });
    } catch (err) {
      console.warn('Image save failed', err);
      alert(t('result.saveError'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <SeoHead
        title={resultTitle ? `${resultTitle} | InnerMeter` : `${localTest?.title ?? ''} | InnerMeter`}
        description={resultSummary}
        path={`/results/${slug}`}
      />
      <div className="max-w-xl mx-auto pt-2 pb-4">

        {/* ── Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`relative rounded-[2rem] overflow-hidden mb-5 shadow-2xl ${glow}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(255,255,255,0.22) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.14) 0%, transparent 50%)' }} />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-10">
            <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs font-bold mb-5">
              {t('result.resultBadge', { title: localTest?.title ?? test.title })}
            </div>
            <div className="text-[5rem] md:text-[7rem] mb-5 drop-shadow-xl select-none leading-none">
              {RESULT_EMOJIS[result.key] ?? test.emoji}
            </div>
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
            {resultDescription}
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
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">{t('result.strengths')}</h3>
            </div>
            <ul className="space-y-2.5">
              {resultStrengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">{item}</span>
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
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm">{t('result.caution')}</h3>
            </div>
            <ul className="space-y-2.5">
              {resultCaution.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-amber-900 dark:text-amber-200 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Relationship Style & Compatible Vibe (MBTI only) ── */}
        {(result.relationshipStyle || result.compatibleVibe) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mb-5 rounded-[1.5rem] overflow-hidden border border-violet-100 dark:border-violet-900/40"
          >
            {result.relationshipStyle && (
              <div className="bg-violet-50 dark:bg-violet-950/30 p-5 border-b border-violet-100 dark:border-violet-900/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg leading-none">💘</span>
                  <h3 className="font-bold text-violet-800 dark:text-violet-300 text-sm">{t('result.loveStyle')}</h3>
                </div>
                <p className="text-sm text-violet-900 dark:text-violet-200 leading-relaxed break-keep">
                  {result.relationshipStyle}
                </p>
              </div>
            )}
            {result.compatibleVibe && (
              <div className="bg-fuchsia-50 dark:bg-fuchsia-950/30 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg leading-none">✨</span>
                  <h3 className="font-bold text-fuchsia-800 dark:text-fuchsia-300 text-sm">{t('result.compatibleVibe')}</h3>
                </div>
                <p className="text-sm text-fuchsia-900 dark:text-fuchsia-200 leading-relaxed break-keep">
                  {result.compatibleVibe}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Share Card Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="relative rounded-[1.75rem] overflow-hidden mb-6"
        >
          {/* dark cosmic bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-950" />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.30) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.18) 0%, transparent 50%)' }} />
          {(['8% 8%','90% 10%','5% 88%','88% 85%','50% 50%'] as const).map((pos, i) => (
            <span key={i} className="absolute text-white/15 text-xs select-none pointer-events-none"
              style={{ top: pos.split(' ')[1], left: pos.split(' ')[0] }}>✦</span>
          ))}

          <div className="relative z-10 p-6 md:p-8">
            {/* section header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-black text-white mb-1">{t('result.shareCardTitle')}</h3>
              <p className="text-white/55 text-sm">{t('result.shareCardSub')}</p>
            </div>

            {/* ── Card Preview ── */}
            {/* previewWrapperRef measures available width; cardScale is set by JS */}
            <div ref={previewWrapperRef} className="w-full flex justify-center mb-5">
              {/* outer div is the visual bounding box after scaling */}
              <div
                style={{
                  width: `${Math.round(360 * cardScale)}px`,
                  height: `${Math.round(480 * cardScale)}px`,
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: '28px',
                  filter: 'drop-shadow(0 20px 60px rgba(139,92,246,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                }}
              >
                {/* inner div renders at native 360×480 then scales to fill the outer */}
                <div
                  style={{
                    width: '360px',
                    height: '480px',
                    transformOrigin: 'top left',
                    transform: `scale(${cardScale})`,
                  }}
                >
                  <ResultShareCard
                    ref={cardRef}
                    test={test}
                    result={result}
                    localTitle={resultTitle}
                    localSummary={resultSummary}
                    localTestTitle={localTest?.title ?? test.title}
                  />
                </div>
              </div>
            </div>

            {/* ── Save / Share buttons ── */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleSaveImage}
                disabled={isSaving}
                className={`
                  w-full flex items-center justify-center gap-2.5 
                  rounded-2xl h-14 text-[0.95rem] font-black
                  transition-all duration-200 active:scale-[0.97]
                  ${saved
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-900 hover:bg-white/90'
                  }
                  ${isSaving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                  shadow-xl shadow-black/30
                `}
              >
                {isSaving ? (
                  <><Loader2 className="w-5 h-5 animate-spin" />{t('common.saveImage')}...</>
                ) : saved ? (
                  <><Check className="w-5 h-5" />{t('common.copied')} 🎉</>
                ) : (
                  <><Download className="w-5 h-5" />{t('common.saveImage')}</>
                )}
              </button>

              {typeof navigator.share === 'function' && (
                <button
                  onClick={handleSaveImage}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl h-11 text-sm font-bold text-white/80 border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-4 h-4" />{t('result.shareMobile')}
                </button>
              )}
            </div>

            {/* divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/35 text-xs font-medium shrink-0">{t('result.snsDivider')}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* SNS buttons */}
            <ShareButtons
              title={t('result.shareTitle', { testTitle: localTest?.title ?? test.title, resultTitle: resultTitle })}
              text={localResult?.shareText ?? result.shareText}
              url={window.location.origin + import.meta.env.BASE_URL}
              testSlug={test.slug}
              resultKey={result.key}
            />
          </div>
        </motion.div>

        {/* ── Actions ── */}
        <div className="flex flex-col gap-2.5 mb-14">
          <Button asChild size="lg"
            className="w-full rounded-2xl h-13 text-[0.95rem] font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
            <Link href={`/tests/${test.slug}`}>
              <RotateCcw className="w-4 h-4 mr-2" />{t('common.retake')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg"
            className="w-full rounded-2xl h-12 text-[0.95rem] font-bold hover:-translate-y-0.5 transition-transform">
            <Link href="/tests">
              <Grid2x2 className="w-4 h-4 mr-2" />{t('common.takeOther')}
            </Link>
          </Button>
        </div>

        {/* ── Recommended ── */}
        {recommendedTests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.36 }}
            className="border-t border-border pt-10 mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-black text-foreground mb-1">{t('result.recommended')}</h2>
              <p className="text-xs text-muted-foreground">{t('result.recommendedSub')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedTests.map(rt => (
                <div key={rt.slug}
                  onClick={() => trackRecommendedTestClick({ from_test_slug: test.slug, to_test_slug: rt.slug })}>
                  <TestCard test={rt} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
