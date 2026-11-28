/*
 * analytics.ts
 * Lightweight GA4 (gtag.js) wrapper for the Vite/React app.
 *
 * The public measurement ID is intentionally compiled into the static client,
 * matching the Saju app. Event payloads must never include photos, names,
 * birth data, analysis text, or other personal data.
 *
 * Usage:
 *   initAnalytics()           — call once at app start
 *   trackPageView('/tests')   — call on every route change
 *   trackEvent('test_start', { test_slug: '...' })
 */

const GA_ID = "G-X5N345WH91";

/* ── internal gtag shim ───────────────────────────────────── */
type GtagArgs = [string, ...unknown[]];

function gtag(...args: GtagArgs): void {
  const w = window as Window & { gtag?: (...a: GtagArgs) => void };
  w.gtag?.(...args);
}

/* ── public API ────────────────────────────────────────────── */

let _initialized = false;

/** Call once at app boot. Safe to call multiple times. */
export function initAnalytics(): void {
  if (_initialized || typeof window === 'undefined') return;
  _initialized = true;

  const w = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...a: GtagArgs) => void;
  };

  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function (...args: GtagArgs) {
    w.dataLayer!.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  // Disable automatic page_view so we control it manually via trackPageView
  gtag('config', GA_ID, { send_page_view: false });
}

/** Call whenever the route changes. */
export function trackPageView(path: string): void {
  if (!_initialized) return;
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** General-purpose event helper. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!_initialized) return;
  gtag('event', name, params ?? {});
}

/* ── typed convenience events ─────────────────────────────── */

export function trackTestStart(params: {
  test_slug: string;
  test_title: string;
  category: string;
}): void {
  trackEvent('test_start', params);
  trackEvent('reading_start', {
    service: params.category,
    test_slug: params.test_slug,
  });
}

export function trackTestComplete(params: {
  test_slug: string;
  test_title: string;
  result_key: string;
  result_title: string;
  category: string;
}): void {
  trackEvent('test_complete', params);
  trackEvent('reading_complete', {
    service: params.category,
    test_slug: params.test_slug,
    result_key: params.result_key,
  });
}

export function trackResultShareClick(params: {
  test_slug: string;
  result_key: string;
  share_type: string;
}): void {
  trackEvent('result_share_click', params);
  trackEvent('result_share', {
    service: params.test_slug,
    share_type: params.share_type,
  });
}

export function trackResultImageSave(params: {
  test_slug: string;
  result_key: string;
  result_title: string;
}): void {
  trackEvent('result_image_save', params);
}

export function trackDetailView(params: { service: string; mode?: string }): void {
  trackEvent('detail_view', params);
}

export function trackSupportClick(params: { service: string; method: string; mode?: string }): void {
  trackEvent('support_cta_click', params);
}

/**
 * The current Toss/PayPal flow has no provider callback. Keep this explicit so
 * the dashboard can separate a user's confirmation from a verified payment.
 */
export function trackSupportComplete(params: { service: string; method: string; verification: 'self_reported' | 'provider' }): void {
  trackEvent('support_complete', params);
}

export function trackTarotDraw(card_name: string): void {
  trackEvent('tarot_draw', { card_name });
}

export function trackRecommendedTestClick(params: {
  from_test_slug: string;
  to_test_slug: string;
}): void {
  trackEvent('recommended_test_click', params);
}
