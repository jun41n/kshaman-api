import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";

export default function Terms() {
  const { t } = useTranslation();

  const articles = [
    { title: t('terms.a1title'), body: t('terms.a1body') },
    { title: t('terms.a2title'), body: t('terms.a2body') },
    { title: t('terms.a3title'), body: t('terms.a3body') },
    { title: t('terms.a4title'), body: t('terms.a4body') },
    { title: t('terms.a5title'), body: t('terms.a5body') },
  ];

  return (
    <Layout>
      <SeoHead title={t('seo.terms.title')} description={t('seo.terms.desc')} path="/terms" />
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <FileText className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-sm text-muted-foreground">{t('terms.effectiveDate')}</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8 text-foreground/80 leading-relaxed text-base">
          {articles.map((article, i) => (
            <div key={i}>
              <h2 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                {article.title}
              </h2>
              <p>{article.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
