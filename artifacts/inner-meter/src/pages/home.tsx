import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { TestCard } from "@/components/test-card";
import { tests } from "@/data/tests";
import { ArrowRight, Sparkles, Heart, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const TRENDING_SLUGS = ['mbti-test', 'love-language-test', 'narcissist-test'];
const NEW_SLUGS = ['teto-egen-test', 'pet-type-test', 'psychopath-test'];

export default function Home() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleCategoryClick = (category: string) => {
    setLocation(`/tests?category=${encodeURIComponent(category)}`);
  };

  const trendingTests = TRENDING_SLUGS
    .map(slug => tests.find(t => t.slug === slug))
    .filter(Boolean) as typeof tests;

  const newTests = NEW_SLUGS
    .map(slug => tests.find(t => t.slug === slug))
    .filter(Boolean) as typeof tests;

  const otherTests = tests.filter(
    t => !TRENDING_SLUGS.includes(t.slug) && !NEW_SLUGS.includes(t.slug)
  );

  return (
    <Layout>
      <SeoHead title={t('seo.home.title')} description={t('seo.home.desc')} path="/" />
      {/* ── Hero ── */}
      <section className="relative w-full rounded-[2rem] overflow-hidden mb-10 shadow-2xl shadow-primary/15">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background/95" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:py-28 text-center gap-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-white/30 text-xs font-bold text-primary shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {t('home.badge')}
          </div>

          <h1 className="text-[2.6rem] leading-[1.15] md:text-6xl font-black tracking-tight text-foreground max-w-md">
            {t('home.title1')} {t('home.title2')}<br />
            <span className="text-gradient-primary">{t('home.title3')}</span>
          </h1>

          <p className="text-[0.95rem] md:text-lg text-muted-foreground max-w-xs md:max-w-sm leading-relaxed">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <Button asChild size="lg" className="rounded-full h-13 px-8 text-base font-bold shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all">
              <Link href="/tests">{t('home.ctaPrimary')}</Link>
            </Button>
            <Button
              onClick={() => document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="rounded-full h-12 px-6 text-sm font-bold bg-white/50 dark:bg-black/30 backdrop-blur-sm border-white/40 hover:bg-white/70 transition-all"
            >
              {t('home.ctaSecondary')}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground/70 font-medium">
            {t('home.participants')}
          </p>
        </div>
      </section>

      {/* ── 지금 뜨는 테스트 ── */}
      <section id="trending-section" className="mb-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t('home.trending')}</h2>
            <p className="text-muted-foreground text-sm mt-0.5">{t('home.trendingSub')}</p>
          </div>
          <Link href="/tests" className="hidden sm:flex items-center text-xs font-bold text-primary hover:opacity-75 transition-opacity gap-0.5">
            {t('home.viewAll')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingTests.map((test, i) => (
            <motion.div
              key={test.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <TestCard test={test} />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 sm:hidden">
          <Button asChild variant="ghost" size="sm" className="w-full text-primary font-bold">
            <Link href="/tests">{t('home.viewAll')} <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* ── 카테고리 ── */}
      <section className="mb-12">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 text-center">{t('home.catSection')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: t('home.catPersonality'), emoji: null, icon: <Brain className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800', ring: 'bg-blue-100 dark:bg-blue-800', cat: '성격 테스트' },
            { label: t('home.catLove'), emoji: null, icon: <Heart className="w-6 h-6 text-pink-500" />, bg: 'bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-800', ring: 'bg-pink-100 dark:bg-pink-800', cat: '연애 테스트' },
            { label: t('home.catFun'), emoji: null, icon: <Zap className="w-6 h-6 text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800', ring: 'bg-amber-100 dark:bg-amber-800', cat: '재미 테스트' },
            { label: t('home.catTarot'), emoji: '🔮', icon: null, bg: 'bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800', ring: 'bg-violet-100 dark:bg-violet-800', cat: null },
          ].map(item => {
            const inner = (
              <div className={`flex flex-col items-center justify-center p-5 min-h-[108px] rounded-[1.5rem] border ${item.bg} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group cursor-pointer w-full`}>
                <div className={`w-12 h-12 rounded-full ${item.ring} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform`}>
                  {item.emoji
                    ? <span className="text-2xl">{item.emoji}</span>
                    : item.icon
                  }
                </div>
                <span className="font-bold text-foreground text-sm">{item.label}</span>
              </div>
            );
            return item.cat
              ? <button key={item.label} onClick={() => handleCategoryClick(item.cat!)}>{inner}</button>
              : <Link key={item.label} href="/tarot">{inner}</Link>;
          })}
        </div>
      </section>

      {/* ── 새로 나왔어요 ── */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground">{t('home.newSection')}</h2>
            <p className="text-muted-foreground text-sm mt-0.5">{t('home.newSub')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newTests.map((test, i) => (
            <motion.div
              key={test.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
            >
              <TestCard test={test} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Tarot teaser ── */}
      <section className="mb-12">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-purple-900/40">
          <div className="absolute inset-0 bg-gradient-to-br from-[#110d2a] via-[#1e0b3a] to-[#2d0f4a]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-600/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          {['6% 12%','90% 8%','15% 78%','85% 72%','50% 45%'].map((pos, i) => (
            <span key={i} className="absolute text-white/15 text-base select-none pointer-events-none" style={{ top: pos.split(' ')[1], left: pos.split(' ')[0] }}>✦</span>
          ))}

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
            <div className="text-center md:text-left max-w-md">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-purple-200 mb-4 border border-white/10">
                {t('home.tarotLabel')}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                {t('home.tarotTitle')}
              </h2>
              <p className="text-purple-200/75 text-sm md:text-base mb-6 leading-relaxed">
                {t('home.tarotDesc')}
              </p>
              <Button asChild className="rounded-full bg-white text-purple-950 hover:bg-purple-50 font-bold border-0 shadow-lg h-11 px-6 text-sm">
                <Link href="/tarot">{t('home.tarotCta')}</Link>
              </Button>
            </div>

            <div className="w-28 h-40 md:w-40 md:h-56 shrink-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500">
              <img src={`${import.meta.env.BASE_URL}images/tarot-back.png`} alt="Tarot" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── K-Shaman Featured Section ── */}
      <section className="mb-12">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-yellow-900/30">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0a1a] via-[#160d2e] to-[#1e0c3a]" />
          {/* Gold glow accents */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-fuchsia-700/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(180,130,50,0.06),transparent_65%)]" />

          {/* Floating star particles */}
          {[
            ['8%','10%'],['88%','7%'],['12%','82%'],
            ['82%','78%'],['50%','42%'],['25%','55%'],['72%','30%'],
          ].map(([left, top], i) => (
            <motion.span
              key={i}
              className="absolute select-none pointer-events-none"
              style={{ top, left, color: i % 2 === 0 ? 'rgba(251,191,36,0.18)' : 'rgba(255,255,255,0.10)', fontSize: '1rem' }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2.4 + i * 0.5, repeat: Infinity }}
            >✦</motion.span>
          ))}

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10">
            {/* Copy */}
            <div className="text-center md:text-left max-w-sm w-full">
              {/* Label */}
              <span className="inline-block px-3 py-1 bg-amber-400/10 rounded-full text-xs font-bold text-amber-300 mb-5 border border-amber-400/20 tracking-wide">
                {t('home.kshamanLabel')}
              </span>

              {/* Headline */}
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight" style={{ whiteSpace: 'pre-line' }}>
                {t('home.kshamanHeadline')}
              </h2>

              {/* Description */}
              <div className="text-purple-200/70 text-sm md:text-[0.9rem] mb-6 leading-[1.85] space-y-0.5">
                <p>{t('home.kshamanDesc1')}</p>
                <p>{t('home.kshamanDesc2')}</p>
                <p>{t('home.kshamanDesc3')}</p>
                <p className="mt-3 text-purple-300/60">{t('home.kshamanDesc4')}</p>
              </div>

              {/* Primary CTA */}
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black border-0 shadow-xl shadow-amber-700/30 h-12 px-8 text-sm mb-3 w-full sm:w-auto"
                onClick={() => trackEvent('k_shaman_home_click', {})}
              >
                <Link href="/k-shaman">{t('home.kshamanCta')}</Link>
              </Button>

              {/* Secondary helper text */}
              <p className="text-purple-400/60 text-[11px] mb-1.5">
                {t('home.kshamanHelper')}
              </p>

              {/* Social proof */}
              <p className="text-amber-400/50 text-[11px] font-semibold">
                {t('home.kshamanProof')}
              </p>

              {/* Keywords */}
              <p className="text-purple-500/50 text-[10px] mt-3 tracking-wider">
                {t('home.kshamanKeywords')}
              </p>
            </div>

            {/* Shaman visual — floating persona cards */}
            <div className="flex gap-2.5 shrink-0 items-end justify-center">
              {[
                { emoji: '🌸', label: '애기보살', h: 80 },
                { emoji: '🌙', label: '선녀보살', h: 96 },
                { emoji: '⚡', label: '천신도령', h: 110 },
                { emoji: '🔮', label: '무속인', h: 94 },
                { emoji: '📿', label: '법사', h: 78 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center justify-end rounded-2xl border border-amber-400/15 bg-white/[0.04] backdrop-blur-sm shadow-xl"
                  style={{ width: 46, height: card.h }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
                >
                  <span className="pb-1.5 text-[1.4rem]">{card.emoji}</span>
                  <span className="pb-2 text-[8px] text-amber-300/50 font-medium leading-none">{card.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 더 많은 테스트 ── */}
      <section className="mb-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-xl font-black text-foreground">{t('home.moreTests')}</h2>
          <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">{t('home.totalCount', { count: tests.length })}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherTests.map(test => (
            <TestCard key={test.slug} test={test} />
          ))}
        </div>
        <div className="mt-5 text-center">
          <Button asChild variant="outline" className="rounded-full px-8 font-bold border-border hover:bg-muted">
            <Link href="/tests">{t('home.viewAllTests', { count: tests.length })}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
