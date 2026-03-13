import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { TestCard } from "@/components/test-card";
import { tests } from "@/data/tests";
import { Sparkles } from "lucide-react";

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
        <h1 className="text-4xl font-bold text-foreground mb-4">테스트 컬렉션</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          나를 알아가는 여정. 준비된 다양한 프리미엄 테스트를 통해 숨겨진 내면을 재미있게 분석해보세요.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeCategory === category
                ? "bg-foreground text-background shadow-md transform -translate-y-0.5"
                : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {filteredTests.map(test => (
          <TestCard key={test.slug} test={test} />
        ))}
      </div>
      
      {filteredTests.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-border border-dashed">
          <p className="text-muted-foreground text-lg">해당 카테고리의 테스트가 없습니다.</p>
        </div>
      )}
    </Layout>
  );
}
