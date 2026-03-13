import { useEffect, useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { ShareButtons } from "@/components/share-buttons";
import { TestCard } from "@/components/test-card";
import { getTestBySlug } from "@/data/tests";
import { RotateCcw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function TestResult() {
  const [, params] = useRoute("/results/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  
  const [resultKey, setResultKey] = useState<string | null>(null);
  const test = getTestBySlug(slug);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('result');
    if (!key || !test) {
      setLocation('/tests');
    } else {
      setResultKey(key);
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#8B5CF6', '#EC4899', '#3B82F6'] });
      }, 250);
      window.scrollTo(0, 0);
    }
  }, [slug, test, setLocation]);

  if (!test || !resultKey) return null;
  const result = test.results.find(r => r.key === resultKey);
  if (!result) return null;

  const recommendedTests = result.recommendedTests
    .map(rSlug => getTestBySlug(rSlug))
    .filter(Boolean) as any[];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-600 pt-2">

        {/* Hero Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden mb-6 shadow-2xl shadow-primary/20"
        >
          {/* Gradient BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500" />
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)'}} />
          
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-fuchsia-400/20 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-12">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-wide mb-6 border border-white/20">
              ✨ {test.title} 결과
            </div>

            <div className="text-8xl md:text-9xl mb-6 drop-shadow-xl select-none">
              {test.emoji}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {result.title}
            </h1>

            <div className="w-16 h-1 bg-white/40 rounded-full mb-5" />

            <p className="text-lg md:text-xl font-semibold text-white/90 leading-relaxed max-w-sm">
              "{result.summary}"
            </p>
          </div>
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm mb-5"
        >
          <p className="text-base md:text-lg text-foreground leading-relaxed break-keep">
            {result.description}
          </p>
        </motion.div>

        {/* Strengths & Caution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-900/40"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-sm">✓</div>
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-base">나의 강점</h3>
            </div>
            <ul className="space-y-3">
              {result.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-amber-50 dark:bg-amber-950/30 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/40"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-white text-sm">!</div>
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-base">주의할 점</h3>
            </div>
            <ul className="space-y-3">
              {result.caution.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-amber-900 dark:text-amber-200 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900" />
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.4) 0%, transparent 60%)'}} />
          {/* Stars */}
          {['top-4 left-8', 'top-8 right-12', 'bottom-8 left-16', 'bottom-4 right-8', 'top-16 left-1/2'].map((pos, i) => (
            <span key={i} className={`absolute ${pos} text-white/30 text-xs select-none`}>✦</span>
          ))}
          <div className="relative z-10 p-8 text-center">
            <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-2">Share</p>
            <h3 className="text-xl font-bold text-white mb-1">결과 공유하기 ✨</h3>
            <p className="text-white/70 mb-6 text-sm">친구들한테 내 결과 알려주고 반응 확인해봐요!</p>
            <ShareButtons
              title={`나의 ${test.title} 결과는 ${result.title}!`}
              text={result.shareText}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-16">
          <Button asChild size="lg" className="w-full rounded-2xl h-14 text-base font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-transform">
            <Link href={`/tests/${test.slug}`}><RotateCcw className="w-4 h-4 mr-2" /> 다시 해보기</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-2xl h-12 text-base font-bold hover:-translate-y-0.5 transition-transform border-border">
            <Link href="/tests"><LayoutGrid className="w-4 h-4 mr-2" /> 다른 테스트 보기</Link>
          </Button>
        </div>

        {/* Recommended Tests */}
        {recommendedTests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-border pt-12 mb-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-foreground mb-2">이런 테스트도 해봤어요? 🎯</h2>
              <p className="text-sm text-muted-foreground">이 결과를 본 사람들이 다음에 많이 한 테스트예요</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedTests.map(rt => (
                <TestCard key={rt.slug} test={rt} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
