import { useState } from "react";
import { AppContext, useAppStore } from "./store/appStore";
import { CharacterSelectPage } from "./pages/CharacterSelectPage";
import { UserInfoFormPage } from "./pages/UserInfoFormPage";
import { ProductMenuPage } from "./pages/ProductMenuPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ReadingResultPage } from "./pages/ReadingResultPage";
import { AskAnythingChatPage } from "./pages/AskAnythingChatPage";
import { ShamanFooter } from "./components/ShamanFooter";
import { SparkleOrbs } from "./components/SparkleOrbs";

type Step = "select" | "form" | "products" | "payment" | "result" | "chat";

export default function App() {
  const store = useAppStore();
  const [step, setStep] = useState<Step>("select");

  const handleProductSelect = (productId: string) => {
    store.setProductId(productId);
    setStep("payment");
  };

  const handleReset = () => {
    store.reset();
    setStep("select");
  };

  return (
    <AppContext.Provider value={store}>
      <div className="min-h-screen flex flex-col bg-gray-950 font-sans antialiased">
        <SparkleOrbs />
        <div className="flex-grow">
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
              onSuccess={() => {
                if (store.state.selectedProductId === "ask_anything") {
                  setStep("chat");
                } else {
                  setStep("result");
                }
              }}
              onBack={() => setStep("products")}
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
