import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import "@/lib/i18n";

// Pages
import Home from "@/pages/home";
import Tests from "@/pages/tests";
import TestDetail from "@/pages/test-detail";
import TestResult from "@/pages/test-result";
import Tarot from "@/pages/tarot";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import PetHome from "@/pages/pet-home";
import PetQuiz from "@/pages/pet-quiz";
import PetResult from "@/pages/pet-result";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

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
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tests" component={Tests} />
        <Route path="/tests/:slug" component={TestDetail} />
        <Route path="/results/:slug" component={TestResult} />
        <Route path="/tarot" component={Tarot} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/pet-test" component={PetHome} />
        <Route path="/pet-test/quiz/:type" component={PetQuiz} />
        <Route path="/pet-test/result/:type/:key" component={PetResult} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
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
