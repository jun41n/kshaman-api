import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { TestCard } from "@/components/test-card";
import { tests } from "@/data/tests";
import { Sparkles, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Tests() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const categories = ["전체", "성격 테스트", "연애 테스트", "재미 테스트"];

  // Handle category from URL query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, []);

  const filteredTests = activeCategory === "전체" 
    ? tests 
    : tests.filter(t => t.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Update URL without reload
    const newUrl = category === "전체" 
      ? window.location.pathname 
      : `${window.location.pathname}?category=${encodeURIComponent(category)}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <Layout>
      <div className="mb-12 text-center pt-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">테스트 컬렉션</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          궁금했던 나의 모습을 지금 바로 확인해보세요. 준비된 다양한 프리미엄 테스트를 통해 숨겨진 내면을 재미있게 분석해드립니다.
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-primary/80 bg-primary/5 px-4 py-2 rounded-full">
          <Search className="w-4 h-4" /> 총 {tests.length}개의 테스트
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(category => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
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
              <span className="relative z-10">{category}</span>
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
          <p className="text-muted-foreground text-lg font-bold">해당 카테고리의 테스트가 없습니다.</p>
        </div>
      )}
    </Layout>
  );
}
