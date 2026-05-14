import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const BASE_URL = "https://mytesttype.com";
const SITE_NAME = "MyTestType";

const DEFAULT_TITLE =
  "Personality Test · Love Test · Psychology Quiz | MyTestType";

const DEFAULT_DESCRIPTION =
  "Discover your personality, love style, and hidden traits through fun and simple psychology tests.";

const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

const HREFLANG_CODES = ["ko", "en", "ja", "es", "pt-BR", "fr"] as const;

const LOCALE_MAP: Record<string, string> = {
  ko:      "ko_KR",
  en:      "en_US",
  ja:      "ja_JP",
  es:      "es_ES",
  "pt-BR": "pt_BR",
  fr:      "fr_FR",
};

const HTML_LANG_MAP: Record<string, string> = {
  ko:      "ko",
  en:      "en",
  ja:      "ja",
  es:      "es",
  "pt-BR": "pt-BR",
  fr:      "fr",
};

export function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoHeadProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language ?? "ko";

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}${normalizedPath}`;
  const finalTitle = title?.trim() ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const htmlLang = HTML_LANG_MAP[lang] ?? lang;
  const ogLocale = LOCALE_MAP[lang] ?? "ko_KR";

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={htmlLang} />

      <title>{finalTitle}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang: 6개 언어 모두 동일 URL 선언 — 각 언어 검색엔진에 노출 */}
      {HREFLANG_CODES.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={code === "pt-BR" ? "pt-BR" : code}
          href={canonicalUrl}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
