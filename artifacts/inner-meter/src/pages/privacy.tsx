import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SeoHead } from "@/components/SeoHead";

const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function Privacy() {
  const { t } = useTranslation();
  const thirdPartyItems = t('privacy.thirdPartyItems', { returnObjects: true }) as string[];

  return (
    <Layout>
      <SeoHead title={t('seo.privacy.title')} description={t('seo.privacy.desc')} path="/privacy" />
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('privacy.title')}
          </h1>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-7 text-foreground/80 leading-relaxed text-base">

          <p>{t('privacy.p1')}</p>

          {/* Section 1 — Collected info */}
          <div>
            <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              {t('privacy.collectedTitle')}
            </h2>
            <ul className="space-y-3">
              {(['item1','item2'] as const).map((k) => (
                <li key={k} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {t(`privacy.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2 — Paddle (blue box) */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl px-5 py-4">
            <h2 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
              {t('privacy.paddleTitle')}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('privacy.paddleText')}
            </p>
          </div>

          {/* Section 3 — Third party & ads */}
          <div>
            <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              {t('privacy.thirdPartyTitle')}
            </h2>
            <ul className="space-y-3">
              {Array.isArray(thirdPartyItems) && thirdPartyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {i === 1 ? (
                    <span>
                      {item}{' '}
                      <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:opacity-80 transition-opacity"
                      >
                        {t('privacy.adLinkText')}
                      </a>
                    </span>
                  ) : item}
                </li>
              ))}
            </ul>
          </div>

          <p>
            {t('privacy.p8Pre')}
            <Link href="/contact" className="font-semibold text-primary hover:opacity-80 transition-opacity">
              {t('privacy.contactLink')}
            </Link>
            {t('privacy.p8Post')}
          </p>

          <div className="pt-4 border-t border-border text-sm text-muted-foreground">
            {t('privacy.emailLabel')}:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:opacity-80 transition-opacity">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
