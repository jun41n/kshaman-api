import { useEffect, useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { ShareButtons } from "@/components/share-buttons";
import { TestCard } from "@/components/test-card";
import { getTestBySlug } from "@/data/tests";
import { RotateCcw, Grid2x2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const CATEGORY_GRADIENTS: Record<string, string> = {
  '연애 테스트': 'from-pink-500 via-rose-500 to-fuchsia-500',
  '성격 테스트': 'from-violet-600 via-purple-500 to-indigo-500',
  '재미 테스트': 'from-amber-500 via-orange-400 to-yellow-400',
};

const CATEGORY_GLOW: Record<string, string> = {
  '연애 테스트': 'shadow-pink-500/25',
  '성격 테스트': 'shadow-violet-500/25',
  '재미 테스트': 'shadow-amber-500/20',
};

export default function TestResult() {
  const [, params] = useRoute("/results/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  const [resultKey, setResultKey] = useState<string | null>(null);
  const test = getTestBySlug(slug);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('result');
    if (!key || !test) { setLocation('/tests'); return; }
    setResultKey(key);
    const end = Date.now() + 2200;
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const iv: any = setInterval(() => {
      const left = end - Date.now();
      if (left <= 0) { clearInterval(iv); return; }
      const n = 45 * (left / 2200);
      const opts = { startVelocity: 26, spread: 340, ticks: 55, zIndex: 0 };
      confetti({ ...opts, particleCount: n, origin: { x: randomInRange(0.1, 0.3), y: -0.1 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#F59E0B'] });
      confetti({ ...opts, particleCount: n, origin: { x: randomInRange(0.7, 0.9), y: -0.1 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'] });
    }, 220);
    window.scrollTo(0, 0);
  }, [slug, test, setLocation]);

  if (!test || !resultKey) return null;
  const result = test.results.find(r => r.key === resultKey);
  if (!result) return null;

  const recommendedTests = result.recommendedTests.map(s => getTestBySlug(s)).filter(Boolean) as any[];
  const gradient = CATEGORY_GRADIENTS[test.category] || 'from-violet-600 via-purple-500 to-fuchsia-500';
  const glow = CATEGORY_GLOW[test.category] || 'shadow-violet-500/25';

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
          {/* light leaks */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(255,255,255,0.22) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.14) 0%, transparent 50%)' }} />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs font-bold mb-5">
              ✨ {test.title} 결과
            </div>

            {/* Big emoji */}
            <div className="text-[5rem] md:text-[7rem] mb-5 drop-shadow-xl select-none leading-none">
              {test.emoji}
            </div>

            {/* Result title */}
            <h1 className="text-3xl md:text-[2.6rem] font-black text-white mb-3 leading-tight tracking-tight">
              {result.title}
            </h1>

            <div className="w-12 h-[3px] bg-white/35 rounded-full mb-4" />

            {/* Summary */}
            <p className="text-base md:text-lg font-semibold text-white/90 leading-snug max-w-[18rem]">
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

        {/* ── Share ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="relative rounded-[1.75rem] overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-950" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139,92,246,0.35) 0%, transparent 60%)' }} />
          {['8% 10%', '88% 12%', '12% 82%', '85% 78%', '48% 48%'].map((pos, i) => (
            <span key={i} className="absolute text-white/20 text-xs select-none pointer-events-none" style={{ top: pos.split(' ')[1], left: pos.split(' ')[0] }}>✦</span>
          ))}
          <div className="relative z-10 p-6 md:p-8 text-center">
            <h3 className="text-lg font-black text-white mb-1">친구한테 자랑하기 ✨</h3>
            <p className="text-white/65 text-sm mb-5">내 결과 공유하고 친구 반응 확인해봐요!</p>
            <ShareButtons
              title={`나의 ${test.title} 결과는 ${result.title}!`}
              text={result.shareText}
            />
          </div>
        </motion.div>

        {/* ── Actions ── */}
        <div className="flex flex-col gap-2.5 mb-14">
          <Button asChild size="lg" className="w-full rounded-2xl h-13 text-[0.95rem] font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
            <Link href={`/tests/${test.slug}`}><RotateCcw className="w-4 h-4 mr-2" />다시 해보기</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-2xl h-12 text-[0.95rem] font-bold hover:-translate-y-0.5 transition-transform">
            <Link href="/tests"><Grid2x2 className="w-4 h-4 mr-2" />다른 테스트 하기</Link>
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
              {recommendedTests.map(rt => <TestCard key={rt.slug} test={rt} />)}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
