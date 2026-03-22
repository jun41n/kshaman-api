import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const BASE_URL = "https://mytesttype.com";
const SITE_NAME = "InnerMeter";

const DEFAULT_TITLE =
  "Personality Test · Love Test · Psychology Quiz | InnerMeter";

const DEFAULT_DESCRIPTION =
  "Discover your personality, love style, and hidden traits through fun and simple psychology tests.";

const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

export function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoHeadProps) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}${normalizedPath}`;
  const finalTitle = title?.trim() ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang="en" />

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-X5N345WH91"
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X5N345WH91');
        `}
      </script>

      <title>{finalTitle}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content="en_US" />
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
