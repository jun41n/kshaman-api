import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Result from "@/pages/Result";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz/:type" component={Quiz} />
      <Route path="/result/:type/:key" component={Result} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </>
  );
}
