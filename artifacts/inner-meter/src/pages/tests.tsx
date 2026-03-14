import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { TestCard } from "@/components/test-card";
import { tests } from "@/data/tests";
import { Sparkles, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Tests() {
  const { t } = useTranslation();

  const CATEGORY_KEYS = [
    { key: 'all',   label: () => t('tests.catAll'),           filter: '전체' },
    { key: 'pers',  label: () => t('common.catPersonality'),  filter: '성격 테스트' },
    { key: 'love',  label: () => t('common.catLove'),         filter: '연애 테스트' },
    { key: 'fun',   label: () => t('common.catFun'),          filter: '재미 테스트' },
  ];

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('전체');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam && CATEGORY_KEYS.some(c => c.filter === categoryParam)) {
      setActiveCategoryFilter(categoryParam);
    }
  }, []);

  const filteredTests = activeCategoryFilter === '전체'
    ? tests
    : tests.filter(t => t.category === activeCategoryFilter);

  const handleCategoryChange = (filter: string) => {
    setActiveCategoryFilter(filter);
    const newUrl = filter === '전체'
      ? window.location.pathname
      : `${window.location.pathname}?category=${encodeURIComponent(filter)}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <Layout>
      <SeoHead title={t('seo.tests.title')} description={t('seo.tests.desc')} path="/tests" />
      <div className="mb-12 text-center pt-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">{t('tests.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          {t('tests.subtitle')}
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-primary/80 bg-primary/5 px-4 py-2 rounded-full">
          <Search className="w-4 h-4" /> {t('tests.count', { count: tests.length })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORY_KEYS.map(cat => {
          const isActive = activeCategoryFilter === cat.filter;
          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.filter)}
              className={`relative px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden ${
                isActive
                  ? "text-white shadow-lg transform -translate-y-1"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label()}</span>
            </button>
          );
        })}
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {filteredTests.map(test => (
          <TestCard key={test.slug} test={test} />
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-24 bg-muted/30 rounded-[3rem] border border-border border-dashed">
          <div className="w-16 h-16 mx-auto mb-4 opacity-50 text-4xl">🔍</div>
          <p className="text-muted-foreground text-lg font-bold">{t('tests.empty')}</p>
        </div>
      )}
    </Layout>
  );
}
