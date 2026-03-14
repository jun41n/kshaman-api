import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SeoHead } from "@/components/SeoHead";

export default function About() {
  const { t } = useTranslation();
  const tests = t('about.tests', { returnObjects: true }) as string[];

  return (
    <Layout>
      <SeoHead title={t('seo.about.title')} description={t('seo.about.desc')} path="/about" />
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('about.title')}
          </h1>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-7 text-foreground/80 leading-relaxed text-base">

          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>

          <div>
            <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">{t('about.testsTitle')}</h2>
            <ul className="space-y-3">
              {tests.map((test) => (
                <li key={test} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <p>{t('about.p4')}</p>

          <div className="bg-muted/50 border border-border rounded-2xl px-5 py-4 text-sm text-muted-foreground">
            {t('about.disclaimer')}
          </div>

          <p className="text-sm text-muted-foreground/60 text-center pt-2">
            &copy; 2026 InnerMeter
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 text-sm font-semibold text-muted-foreground">
          <Link href="/contact" className="hover:text-primary transition-colors">{t('footer.contact')} →</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')} →</Link>
        </div>
      </div>
    </Layout>
  );
}
