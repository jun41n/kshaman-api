import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GwansangHome } from "@/pages/gwansang-home";
import { GwansangReading } from "@/pages/gwansang-reading";
import { GwansangResult } from "@/pages/gwansang-result";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";

export interface FacePart {
  title: string;
  score: number;
  reading: string;
}

export interface GwansangAnalysisResult {
  summary: string;
  wealth: { title: string; score: number; reading: string };
  love: { title: string; score: number; reading: string };
  eyes: FacePart;
  nose: FacePart;
  mouth: FacePart;
  personality: { title: string; type: string; traits: string[]; reading: string };
  career: { title: string; jobs: string[]; reading: string };
  compatibility: { title: string; best: string; reading: string };
  dragonface: { title: string; tier: string; score: number; reading: string };
  historical: { title: string; person: string; era: string; reading: string };
  aging: { title: string; decade: string; reading: string };
  baby: { title: string; reading: string };
  anime: { title: string; character: string; reading: string };
  fortune: { title: string; reading: string };
  advice: string;
}

type ViewType = "home" | "reading" | "result";

export default function Gwansang() {
  const [view, setView] = useState<ViewType>("home");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<GwansangAnalysisResult | null>(null);

  const handleResult = (imageBase64: string, data: GwansangAnalysisResult) => {
    setUploadedImage(imageBase64);
    setResult(data);
    setView("result");
  };

  const handleReset = () => {
    setUploadedImage(null);
    setResult(null);
    setView("home");
  };

  return (
    <Layout showAd>
      <SeoHead
        title="AI 관상 분석"
        description="사진 한 장을 바탕으로 얼굴 특징과 인상에서 보이는 성향을 살펴보는 MyTestType AI 관상입니다. 한국 전통 관상 문화를 현대적으로 풀어낸 오락·참고용 서비스입니다."
        path="/gwansang/"
        ogImage="https://mytesttype.com/gwansang.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AI 관상 분석",
          description: "사진 한 장을 바탕으로 얼굴 특징과 인상에서 보이는 성향을 살펴보는 문화·오락 목적의 AI 관상 분석",
          url: "https://mytesttype.com/gwansang/",
          applicationCategory: "EntertainmentApplication",
          offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        }}
      />
      {/* full-bleed golden background — cancels Layout's max-w padding */}
      <div className="-mx-4 sm:-mx-6 -my-6 md:-my-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div key="home"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
              <GwansangHome onStart={() => setView("reading")} />
            </motion.div>
          )}
          {view === "reading" && (
            <motion.div key="reading"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <GwansangReading onResult={handleResult} onBack={() => setView("home")} />
            </motion.div>
          )}
          {view === "result" && result && (
            <motion.div key="result"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.3 }}>
              <GwansangResult result={result} image={uploadedImage} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
