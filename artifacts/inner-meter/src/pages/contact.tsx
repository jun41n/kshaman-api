import { Layout } from "@/components/layout";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SeoHead } from "@/components/SeoHead";

const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SeoHead title={t('seo.contact.title')} description={t('seo.contact.desc')} path="/contact" />
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <Mail className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('contact.title')}
          </h1>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8 text-foreground/80 leading-relaxed text-base">

          <p>{t('contact.p1')}</p>

          <div>
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">{t('contact.emailLabel')}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:opacity-80 transition-opacity break-all"
            >
              <Mail className="w-5 h-5 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </div>

          <p>{t('contact.p2')}</p>
          <p>{t('contact.p3')}</p>
        </div>
      </div>
    </Layout>
  );
}
