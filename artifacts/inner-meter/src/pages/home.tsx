import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { TestCard } from "@/components/test-card";
import { tests } from "@/data/tests";
import { ArrowRight, Sparkles, Heart, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleCategoryClick = (category: string) => {
    setLocation(`/tests?category=${encodeURIComponent(category)}`);
  };

  const scrollToTrending = () => {
    document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reorder: love → hidden-personality → how-friends
  const trendingTests = [
    tests.find(t => t.slug === 'love-style-test'),
    tests.find(t => t.slug === 'hidden-personality-test'),
    tests.find(t => t.slug === 'how-friends-see-me-test'),
  ].filter(Boolean) as typeof tests;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-primary/10">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Hero background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/20 mb-5 text-sm font-bold text-primary shadow-sm">
            <Sparkles className="w-4 h-4" />
            새로운 나와 마주하는 시간
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
            알면 알수록 재밌는 <br />
            <span className="text-gradient-primary">나의 내면 세계</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            지금 이 순간, 당신은 어떤 사람인가요? 💫<br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>성향, 연애 세포, 멘탈 점수를 가볍게 분석해드려요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full h-13 px-8 text-base font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all">
              <Link href="/tests">테스트 시작하기 🚀</Link>
            </Button>
            <Button onClick={scrollToTrending} variant="outline" size="lg" className="rounded-full h-12 px-6 text-base font-bold bg-white/50 dark:bg-black/30 backdrop-blur-md border-border/50 hover:bg-white/80 transition-all">
              인기 테스트 보기 ↓
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending-section" className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">🔥 지금 뜨는 테스트</h2>
            <p className="text-muted-foreground mt-0.5 text-sm">오늘 가장 많이 공유된 인기 테스트예요</p>
          </div>
          <Link href="/tests" className="hidden sm:flex items-center text-sm font-bold text-primary hover:opacity-80 transition-opacity whitespace-nowrap">
            전체 보기 <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingTests.map((test, i) => (
            <motion.div
              key={test.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <TestCard test={test} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center sm:hidden">
          <Button asChild variant="ghost" className="text-primary font-bold">
            <Link href="/tests">모든 테스트 보기 <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* Category Section */}
      <section className="mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 text-center">어떤 테스트를 해볼까요?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleCategoryClick('성격 테스트')}
            className="flex flex-col items-center justify-center p-5 min-h-[110px] bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-2xl">
              <Brain className="w-7 h-7 text-blue-500" />
            </div>
            <span className="font-bold text-foreground text-sm">성격 분석</span>
          </button>

          <button
            onClick={() => handleCategoryClick('연애 테스트')}
            className="flex flex-col items-center justify-center p-5 min-h-[110px] bg-pink-50 dark:bg-pink-900/20 rounded-3xl border border-pink-100 dark:border-pink-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-pink-500" />
            </div>
            <span className="font-bold text-foreground text-sm">연애 성향</span>
          </button>

          <button
            onClick={() => handleCategoryClick('재미 테스트')}
            className="flex flex-col items-center justify-center p-5 min-h-[110px] bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-amber-500" />
            </div>
            <span className="font-bold text-foreground text-sm">심심풀이</span>
          </button>

          <Link
            href="/tarot"
            className="flex flex-col items-center justify-center p-5 min-h-[110px] bg-purple-50 dark:bg-purple-900/20 rounded-3xl border border-purple-100 dark:border-purple-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-2xl">
              🔮
            </div>
            <span className="font-bold text-foreground text-sm">오늘의 타로</span>
          </Link>
        </div>
      </section>

      {/* Tarot Teaser */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-purple-900/50">
          {/* Stars */}
          {['top-4 left-8', 'top-12 right-16', 'bottom-8 left-24', 'top-1/2 right-8', 'bottom-16 right-32'].map((pos, i) => (
            <span key={i} className={`absolute ${pos} text-white/20 text-sm select-none`}>✦</span>
          ))}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-56 h-56 bg-violet-500 opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-56 h-56 bg-fuchsia-500 opacity-15 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-white/15 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
                🌙 매일 새로운 카드
              </div>
              <h2 className="text-2xl md:text-4xl font-black mb-3 leading-tight">내 운명의 카드는 무엇일까?</h2>
              <p className="text-purple-200/80 text-base mb-6 leading-relaxed">
                매일 한 장, 오늘의 에너지를 읽어주는 프리미엄 타로 드로우.<br />
                사랑, 일, 에너지에 대한 따뜻한 조언을 들어보세요.
              </p>
              <Button asChild size="lg" className="rounded-full bg-white text-purple-900 hover:bg-gray-100 font-bold border-0 shadow-lg h-12 px-7 text-sm">
                <Link href="/tarot">🔮 카드 뽑으러 가기</Link>
              </Button>
            </div>

            <div className="w-36 h-52 md:w-48 md:h-72 shrink-0 transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-2xl overflow-hidden border-2 border-white/20">
              <img src={`${import.meta.env.BASE_URL}images/tarot-back.png`} alt="Tarot Card Back" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* All Tests Grid */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">전체 테스트 모음</h2>
          <span className="text-xs font-bold text-primary/70 bg-primary/8 px-3 py-1 rounded-full">총 {tests.length}개</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map(test => (
            <TestCard key={test.slug} test={test} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
