import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import "@/lib/i18n";

// Only the four live services are loaded on demand. Legacy test, tarot, pet,
// and blog modules intentionally stay out of the production entry bundle.
const Gwansang = lazy(() => import("@/pages/gwansang"));
const PalmReading = lazy(() => import("@/pages/palm-reading"));
const About = lazy(() => import("@/pages/about"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const Contact = lazy(() => import("@/pages/contact"));
const NotFound = lazy(() => import("@/pages/not-found"));
const SharedResult = lazy(() => import("@/pages/shared-result"));

const queryClient = new QueryClient();

/** Tracks a page view and scrolls to top on every wouter route change. */
function RouteTracker() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackPageView(location);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <RouteTracker />
      <Suspense fallback={<main aria-busy="true" className="min-h-screen bg-[#ecd094]" />}>
        <Switch>
          <Route path="/" component={RootPage} />
          <Route path="/tests/:rest*"><LegacyRedirect /></Route>
          <Route path="/tests"><LegacyRedirect /></Route>
          <Route path="/results/:rest*"><LegacyRedirect /></Route>
          <Route path="/tarot"><LegacyRedirect /></Route>
          <Route path="/pet-test/:rest*"><LegacyRedirect /></Route>
          <Route path="/pet-test"><LegacyRedirect /></Route>
          <Route path="/blog/:rest*"><LegacyRedirect /></Route>
          <Route path="/blog"><LegacyRedirect /></Route>
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/contact" component={Contact} />
          <Route path="/gwansang" component={Gwansang} />
          <Route path="/palm-reading" component={PalmReading} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function RootPage() {
  const shareId = new URLSearchParams(window.location.search).get("share");
  return shareId ? <SharedResult id={shareId} /> : <Gwansang />;
}

function LegacyRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/", { replace: true });
  }, [setLocation]);
  return null;
}

function App() {
  // Initialise GA4 once on mount (no-op when VITE_GA_ID is not set)
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
