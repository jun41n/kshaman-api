const GA_ID = "G-X5N345WH91";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Analytics deliberately excludes names, birth data, readings, and other personal input. */
export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
  trackEvent("page_view", { page_path: window.location.pathname, page_title: document.title });
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (!initialized) return;
  window.gtag?.("event", name, params);
}
