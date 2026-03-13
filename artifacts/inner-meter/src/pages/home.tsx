import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { TestCard } from "@/components/test-card";
import { tests } from "@/data/tests";
import { ArrowRight, Sparkles, Heart, Brain, Zap, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [, setLocation] = useLocation();
  const trendingTests = tests.slice(0, 3);
  
  const handleCategoryClick = (category: string) => {
    setLocation(`/tests?category=${encodeURIComponent(category)}`);
  };

  const scrollToTrending = () => {
    document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full rounded-3xl overflow-hidden mb-16 md:mb-24 shadow-2xl shadow-primary/10">
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Hero background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent dark:from-background dark:via-background/80" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/20 mb-6 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="w-4 h-4" /> 
            새로운 나와 마주하는 시간
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 drop-shadow-sm">
            알면 알수록 재밌는 <br className="hidden sm:block" />
            <span className="text-gradient-primary">나의 내면 세계</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            수백만 명이 참여한 프리미엄 심리 분석. <br className="sm:hidden" />
            당신의 성향, 연애 세포, 멘탈 점수를 <br className="hidden sm:block" />가볍고 정확하게 측정해보세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all">
              <Link href="/tests">테스트 시작하기</Link>
            </Button>
            <Button onClick={scrollToTrending} variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-white/50 dark:bg-black/30 backdrop-blur-md border-border/50 hover:bg-white/80 transition-all">
              인기 테스트 <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending-section" className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">🔥 지금 뜨는 테스트</h2>
            <p className="text-muted-foreground mt-1">오늘 가장 많이 공유된 인기 테스트입니다.</p>
          </div>
          <Link href="/tests" className="hidden sm:flex items-center text-sm font-bold text-primary hover:opacity-80 transition-opacity">
            전체 보기 <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingTests.map(test => (
            <TestCard key={test.slug} test={test} />
          ))}
        </div>
        
        <div className="mt-6 text-center sm:hidden">
          <Button asChild variant="ghost" className="w-full text-primary font-bold">
            <Link href="/tests">모든 테스트 보기 <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Category Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">어떤 테스트를 해볼까요?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleCategoryClick('성격 테스트')}
            className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
            <span className="font-bold text-foreground">성격 분석</span>
          </button>
          
          <button 
            onClick={() => handleCategoryClick('연애 테스트')}
            className="flex flex-col items-center justify-center p-6 bg-pink-50 dark:bg-pink-900/20 rounded-3xl border border-pink-100 dark:border-pink-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <span className="font-bold text-foreground">연애 성향</span>
          </button>
          
          <button 
            onClick={() => handleCategoryClick('재미 테스트')}
            className="flex flex-col items-center justify-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-amber-500" />
            </div>
            <span className="font-bold text-foreground">심심풀이</span>
          </button>

          <Link 
            href="/tarot"
            className="flex flex-col items-center justify-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-3xl border border-purple-100 dark:border-purple-800 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <span className="font-bold text-foreground">오늘의 타로</span>
          </Link>
        </div>
      </section>

      {/* Tarot Teaser */}
      <section className="mb-20">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 backdrop-blur-sm">
                NEW FEATURE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">내 운명의 카드는 무엇일까?</h2>
              <p className="text-purple-100 text-lg mb-8 opacity-90">
                매일 한 장, 오늘의 에너지를 읽어주는 프리미엄 타로 드로우.
                사랑, 일, 에너지에 대한 따뜻한 조언을 들어보세요.
              </p>
              <Button asChild size="lg" className="rounded-full bg-white text-purple-900 hover:bg-gray-100 font-bold border-0 shadow-lg h-12 px-8">
                <Link href="/tarot">카드 뽑으러 가기 <Sparkles className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            
            <div className="w-48 h-64 md:w-64 md:h-80 shrink-0 transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-2xl overflow-hidden border border-white/20">
              <img src={`${import.meta.env.BASE_URL}images/tarot-back.png`} alt="Tarot Card Back" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* All Tests Grid Teaser */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">전체 테스트 모음</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map(test => (
            <TestCard key={test.slug} test={test} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
