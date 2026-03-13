import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { ShareButtons } from "@/components/share-buttons";
import { ResultShareCard } from "@/components/ResultShareCard";
import { TestCard } from "@/components/test-card";
import { getTestBySlug } from "@/data/tests";
import { RotateCcw, Grid2x2, Download, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { trackRecommendedTestClick, trackResultImageSave } from "@/lib/analytics";

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
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(el, {
    pixelRatio: 3,
    cacheBust: true,
    skipAutoScale: false,
    style: { borderRadius: '28px' },
  });
  const res = await fetch(dataUrl);
  return res.blob();
}

export default function TestResult() {
  const [, params] = useRoute("/results/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
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

    window.scrollTo(0, 0);
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
        await navigator.share({ files: [file], title: result.title, text: result.shareText });
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
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
              ✨ {test.title} 결과
            </div>
            <div className="text-[5rem] md:text-[7rem] mb-5 drop-shadow-xl select-none leading-none">
              {test.emoji}
            </div>
            <h1 className="text-3xl md:text-[2.6rem] font-black text-white mb-3 leading-tight tracking-tight">
              {result.title}
            </h1>
            <div className="w-12 h-[3px] bg-white/35 rounded-full mb-4" />
            <p className="text-base md:text-lg font-semibold text-white/90 leading-snug max-w-[18rem] break-keep">
              "{result.summary}"
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
            {result.description}
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
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">나의 강점</h3>
            </div>
            <ul className="space-y-2.5">
              {result.strengths.map((item, idx) => (
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
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm">주의할 점</h3>
            </div>
            <ul className="space-y-2.5">
              {result.caution.map((item, idx) => (
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
              <h3 className="text-lg font-black text-white mb-1">결과 카드 저장 & 공유 ✨</h3>
              <p className="text-white/55 text-sm">이미지로 저장하고 SNS에 자랑해봐요!</p>
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
                  <ResultShareCard ref={cardRef} test={test} result={result} />
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
                  <><Loader2 className="w-5 h-5 animate-spin" />이미지 생성 중...</>
                ) : saved ? (
                  <><Check className="w-5 h-5" />저장 완료! 🎉</>
                ) : (
                  <><Download className="w-5 h-5" />결과 이미지 저장하기</>
                )}
              </button>

              {typeof navigator.share === 'function' && (
                <button
                  onClick={handleSaveImage}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl h-11 text-sm font-bold text-white/80 border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-4 h-4" />이미지로 공유하기 (모바일)
                </button>
              )}
            </div>

            {/* divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/35 text-xs font-medium shrink-0">SNS로 바로 공유</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* SNS buttons */}
            <ShareButtons
              title={`나의 ${test.title} 결과는 ${result.title}!`}
              text={result.shareText}
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
              <RotateCcw className="w-4 h-4 mr-2" />다시 해보기
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg"
            className="w-full rounded-2xl h-12 text-[0.95rem] font-bold hover:-translate-y-0.5 transition-transform">
            <Link href="/tests">
              <Grid2x2 className="w-4 h-4 mr-2" />다른 테스트 하기
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
              <h2 className="text-xl font-black text-foreground mb-1">이런 테스트도 해봤어요? 🎯</h2>
              <p className="text-xs text-muted-foreground">이 결과를 본 사람들이 다음에 많이 한 테스트예요</p>
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
