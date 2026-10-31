import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import { GwansangHome } from "@/pages/gwansang-home";
import { GwansangReading } from "@/pages/gwansang-reading";
import { GwansangResult } from "@/pages/gwansang-result";
import { PastLifeResult } from "@/pages/past-life-result";
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
  const [location] = useLocation();
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

  // Past-life and face-reading share one component, so changing the route must
  // always start the selected service at its own landing view.
  useEffect(() => {
    setUploadedImage(null);
    setResult(null);
    setView("home");
  }, [location]);

  const canonicalPath = location === "/" ? "/" : "/gwansang/";
  const isPastLife = location === "/";

  return (
    <Layout showAd>
      <SeoHead
        title={isPastLife ? "AI 전생 캐릭터 테스트" : "AI 관상 분석"}
        description={isPastLife ? "관상 문화의 언어로 살펴보는 나의 전생 캐릭터 테스트. 왕이었을까, 무사였을까? 오락·문화 참고용 서비스입니다." : "사진 한 장을 바탕으로 얼굴 특징과 인상에서 보이는 성향을 살펴보는 MyTestType AI 관상입니다. 한국 전통 관상 문화를 현대적으로 풀어낸 오락·참고용 서비스입니다."}
        path={canonicalPath}
        ogImage={isPastLife ? "https://mytesttype.com/past-life.png" : "https://mytesttype.com/gwansang.png"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: isPastLife ? "AI 전생 캐릭터 테스트" : "AI 관상 분석",
          description: isPastLife ? "관상 문화의 언어로 살펴보는 나의 전생 캐릭터 테스트" : "사진 한 장을 바탕으로 얼굴 특징과 인상에서 보이는 성향을 살펴보는 문화·오락 목적의 AI 관상 분석",
          url: `https://mytesttype.com${canonicalPath}`,
          applicationCategory: "EntertainmentApplication",
          offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        }}
      />
      {/* full-bleed golden background — cancels Layout's max-w padding */}
      <div className="-mx-4 sm:-mx-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div key="home"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
              <GwansangHome variant={isPastLife ? "pastLife" : "face"} onStart={() => setView("reading")} />
            </motion.div>
          )}
          {view === "reading" && (
            <motion.div key="reading"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <GwansangReading pastLife={isPastLife} onResult={handleResult} onBack={() => setView("home")} />
            </motion.div>
          )}
          {view === "result" && result && (
            <motion.div key="result"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.3 }}>
              {isPastLife
                ? <PastLifeResult result={result} image={uploadedImage} onReset={handleReset} />
                : <GwansangResult result={result} image={uploadedImage} onReset={handleReset} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
