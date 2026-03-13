import { useEffect, useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { ShareButtons } from "@/components/share-buttons";
import { TestCard } from "@/components/test-card";
import { getTestBySlug } from "@/data/tests";
import { RotateCcw, LayoutGrid, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

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
      
      // Trigger confetti on mount
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#8B5CF6', '#EC4899', '#3B82F6']
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#8B5CF6', '#EC4899', '#3B82F6']
        });
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
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pt-6">
        
        {/* Result Header Card */}
        <div className="bg-card rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-primary/5 border border-border mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-primary"></div>
          
          <div className="inline-block px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-bold mb-6">
            {test.title} 결과
          </div>
          
          <div className="text-7xl md:text-8xl mb-6 transform hover:scale-110 transition-transform duration-500 cursor-default">
            {test.emoji}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 break-keep leading-tight">
            {result.title}
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-primary mb-8 break-keep">
            "{result.summary}"
          </p>
          
          <div className="bg-muted/50 rounded-2xl p-6 text-left border border-border/50">
            <p className="text-base md:text-lg text-foreground leading-relaxed break-keep">
              {result.description}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Strengths */}
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border">
            <h3 className="flex items-center text-lg font-bold text-foreground mb-6 border-b border-border pb-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> 
              나의 강점
            </h3>
            <ul className="space-y-4">
              {result.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 mr-3 shrink-0"></span>
                  <span className="text-muted-foreground font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Caution */}
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border">
            <h3 className="flex items-center text-lg font-bold text-foreground mb-6 border-b border-border pb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" /> 
              주의할 점
            </h3>
            <ul className="space-y-4">
              {result.caution.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 mr-3 shrink-0"></span>
                  <span className="text-muted-foreground font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-3xl p-8 text-center mb-16 border border-indigo-100 dark:border-indigo-900/30">
          <h3 className="text-xl font-bold text-foreground mb-2">테스트 결과 공유하기</h3>
          <p className="text-muted-foreground mb-6 text-sm">친구들에게 나의 성향을 알려주고 반응을 확인해보세요!</p>
          <ShareButtons 
            title={`나의 ${test.title} 결과는 ${result.title}!`}
            text={result.shareText}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg shadow-lg hover:-translate-y-1 transition-transform">
            <Link href={`/tests/${test.slug}`}><RotateCcw className="w-5 h-5 mr-2" /> 다시 하기</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full h-14 px-8 text-lg font-bold hover:-translate-y-1 transition-transform border border-border">
            <Link href="/tests"><LayoutGrid className="w-5 h-5 mr-2" /> 다른 테스트 보기</Link>
          </Button>
        </div>

        {/* Recommended Tests */}
        {recommendedTests.length > 0 && (
          <div className="border-t border-border pt-16 mb-8">
            <h2 className="text-2xl font-bold text-center mb-8">당신을 위한 추천 테스트 🎯</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendedTests.map(rt => (
                <TestCard key={rt.slug} test={rt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
