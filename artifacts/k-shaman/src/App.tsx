import { useState, useEffect } from "react";
import { AppContext, useAppStore } from "./store/appStore";
import { CharacterSelectPage } from "./pages/CharacterSelectPage";
import { UserInfoFormPage } from "./pages/UserInfoFormPage";
import { ProductMenuPage } from "./pages/ProductMenuPage";
import { PartnerInfoFormPage } from "./pages/PartnerInfoFormPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ReadingResultPage } from "./pages/ReadingResultPage";
import { AskAnythingChatPage } from "./pages/AskAnythingChatPage";
import { ShamanFooter } from "./components/ShamanFooter";
import { SparkleOrbs } from "./components/SparkleOrbs";

type Step = "select" | "form" | "products" | "payment" | "partner-form" | "result" | "chat";

export default function App() {
  const store = useAppStore();
  const [step, setStep] = useState<Step>("select");

  useEffect(() => {
    console.log("[App] step changed →", step);
  }, [step]);

  useEffect(() => {
    console.log("[App] store.state.selectedProductId changed →", store.state.selectedProductId);
  }, [store.state.selectedProductId]);

  const handleProductSelect = (productId: string) => {
    console.log("[App] handleProductSelect:", productId);
    store.setProductId(productId);
    setStep("payment");
  };

  const handlePaymentSuccess = (productId: string) => {
    console.log("[App] handlePaymentSuccess productId:", productId);
    if (productId === "ask_anything") {
      setStep("chat");
    } else if (productId === "compatibility") {
      console.log("[App] → setStep partner-form");
      setStep("partner-form");
    } else {
      console.log("[App] → setStep result (productId was:", productId, ")");
      setStep("result");
    }
  };

  const handleReset = () => {
    store.reset();
    setStep("select");
  };

  return (
    <AppContext.Provider value={store}>
      <div className="min-h-screen flex flex-col bg-gray-950 font-sans antialiased">
        <SparkleOrbs />

        {/* DEBUG BANNER */}
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-400 text-black text-xs font-mono text-center py-1 px-2">
          step=<b>{step}</b> | productId=<b>{store.state.selectedProductId ?? "null"}</b>
        </div>

        <div className="flex-grow pt-6">
          {step === "select" && (
            <CharacterSelectPage onNext={() => setStep("form")} />
          )}
          {step === "form" && (
            <UserInfoFormPage
              onNext={() => setStep("products")}
              onBack={() => setStep("select")}
            />
          )}
          {step === "products" && (
            <ProductMenuPage
              onSelect={handleProductSelect}
              onBack={() => setStep("form")}
            />
          )}
          {step === "payment" && (
            <PaymentPage
              onSuccess={handlePaymentSuccess}
              onBack={() => setStep("products")}
            />
          )}
          {step === "partner-form" && (
            <PartnerInfoFormPage
              onNext={() => setStep("result")}
              onBack={() => setStep("payment")}
            />
          )}
          {step === "result" && (
            <ReadingResultPage
              onAskAnything={() => setStep("chat")}
              onReset={handleReset}
            />
          )}
          {step === "chat" && (
            <AskAnythingChatPage
              onBack={() => setStep("result")}
              onReset={handleReset}
            />
          )}
        </div>
        <ShamanFooter />
      </div>
    </AppContext.Provider>
  );
}
