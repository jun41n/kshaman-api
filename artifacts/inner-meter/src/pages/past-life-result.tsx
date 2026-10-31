import { motion } from "framer-motion";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResultShareButtons } from "@/components/ResultShareButtons";
import { getPastLifeCareer } from "@/data/past-life-careers";
import type { GwansangAnalysisResult } from "@/pages/gwansang";

type Props = {
  result: GwansangAnalysisResult;
  image: string | null;
  onReset: () => void;
};

const PAGE_BG = "linear-gradient(175deg, #E8C88F 0%, #D9AE67 55%, #C68D46 100%)";
const API_BASE = "https://api.mytesttype.com";

export function PastLifeResult({ result, image, onReset }: Props) {
  const { i18n } = useTranslation();
  // The uploaded image is the stable seed. AI wording can vary between calls,
  // but the same source image should keep its past-life character.
  const career = getPastLifeCareer(image ?? [
    result.summary,
    result.personality?.type,
    ...(result.personality?.traits ?? []),
    result.dragonface?.tier,
  ].filter(Boolean).join("|"));
  const url = "https://mytesttype.com/";
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(Boolean(image));
  const [generationAttempt, setGenerationAttempt] = useState(0);

  useEffect(() => {
    if (!image) return;
    let active = true;
    const createPastLifeImage = async () => {
      setGenerating(true);
      setImageError(null);
      try {
        const response = await fetch(`${API_BASE}/api/generate-face-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: image, type: "pastLife", career: career.title }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "전생 이미지 생성에 실패했습니다.");
        if (active) setGeneratedImage(data.imageBase64);
      } catch (error) {
        if (active) setImageError(error instanceof Error ? error.message : "전생 이미지 생성에 실패했습니다.");
      } finally {
        if (active) setGenerating(false);
      }
    };
    void createPastLifeImage();
    return () => { active = false; };
  }, [career.title, generationAttempt, image]);

  return (
    <main className="paper-grain min-h-screen pb-12 text-[#2a1b16]" style={{ background: PAGE_BG }}>
      <section className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden border border-[#8e5a38]/35 bg-[#f5d99e]/80 p-5 shadow-[7px_7px_0_rgba(104,59,32,.18)] sm:p-7"
        >
          <div className="absolute inset-3 border border-[#9b5a3b]/25" />
          <div className="relative text-center">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#84422e]">AI 전생 캐릭터 결과</p>
            <div className="relative mt-4 overflow-hidden border border-[#8e5a38]/30 bg-[#e3be7d]">
              {generatedImage ? (
                <img src={generatedImage} alt={`${career.title}로 생성된 전생 캐릭터`} className="aspect-[4/3] w-full object-cover sm:aspect-square" />
              ) : image ? (
                <div className="relative aspect-[4/3] sm:aspect-square">
                  <img src={image} alt="전생 캐릭터 생성에 사용할 얼굴" className="h-full w-full object-cover blur-[2px] opacity-55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#4a2517]/45 px-5 text-[#fff0c8]">
                    {generating ? <Loader2 className="h-7 w-7 animate-spin" /> : <span className="text-2xl">{career.icon}</span>}
                    <p className="text-center text-sm font-bold">{generating ? `${career.title}의 모습으로 변신 중` : "전생 캐릭터 이미지를 불러오지 못했습니다"}</p>
                  </div>
                </div>
              ) : <div className="flex aspect-[4/3] items-center justify-center text-6xl sm:aspect-square">{career.icon}</div>}
              {image && <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-[#f4dca4]/60 bg-[#342016]/80 px-2 py-1.5 text-left text-[10px] font-bold text-[#fff0c8]"><img src={image} alt="원본 얼굴" className="h-7 w-7 rounded-full object-cover" />내 얼굴 기반 전생 캐릭터</div>}
            </div>
            <h1 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">당신의 전생 직업은</h1>
            <p className="mt-1 font-serif text-4xl font-bold text-[#914430] sm:text-5xl">{career.title}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5d4031]">{career.description}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="mt-5 grid gap-3 sm:grid-cols-3">
          <InfoCard label="당시 보상" value={career.eraPay} />
          <InfoCard label="AI 전생 생활력 환산" value={career.modernPay} emphasis />
          <InfoCard label="재산을 쌓는 방식" value={career.wealthStyle} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mt-4 border border-[#8e5a38]/25 bg-[#fff0c8]/70 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#7e3c2a]"><Sparkles className="h-4 w-4" />현생에 이어진 전생 기질</div>
          <p className="mt-3 text-sm leading-7 text-[#523427]">{result.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(result.personality?.traits ?? []).slice(0, 4).map((trait) => <span key={trait} className="rounded-full border border-[#8e5a38]/25 bg-[#f6dca4] px-3 py-1 text-xs font-semibold text-[#6e3929]">{trait}</span>)}
          </div>
        </motion.div>

        {imageError && (
          <div className="mt-3 text-center">
            <p className="px-3 text-[11px] leading-5 text-[#8e3f2b]">전생 이미지 생성이 일시적으로 지연되었습니다. 결과 카드는 그대로 공유할 수 있습니다.</p>
            <button type="button" onClick={() => setGenerationAttempt((attempt) => attempt + 1)} className="mt-2 border border-[#815039]/35 bg-[#f7dfaa]/75 px-4 py-2 text-xs font-bold text-[#50291c]">전생 이미지 다시 만들기</button>
          </div>
        )}
        <p className="mt-4 px-3 text-center text-[11px] leading-5 text-[#705244]">당시 보상은 직업·시대·지역별 차이가 큰 현물 중심 체계였습니다. ‘현대 생활력 환산’은 역사적 급여를 확정하는 수치가 아닌, AI 전생 캐릭터 놀이를 위한 생활력 비유입니다.</p>

        <div className="mt-5">
          <ResultShareButtons lang={i18n.language} title={`나는 전생에 ${career.title}이었다`} url={url} variant="paper" />
        </div>

        <button type="button" onClick={onReset} className="mt-4 flex h-12 w-full items-center justify-center gap-2 border border-[#815039]/35 bg-[#f7dfaa]/75 text-sm font-bold text-[#50291c]">
          <RotateCcw className="h-4 w-4" />다른 전생 확인하기
        </button>
      </section>
    </main>
  );
}

function InfoCard({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={`border p-4 ${emphasis ? "border-[#8e3f2b]/50 bg-[#572618] text-[#fff0cc]" : "border-[#8e5a38]/25 bg-[#f9e5b5]/80 text-[#3f281d]"}`}>
      <p className={`text-[11px] font-bold tracking-wide ${emphasis ? "text-[#f8d99b]" : "text-[#85513b]"}`}>{label}</p>
      <p className="mt-2 text-sm font-bold leading-6">{value}</p>
    </div>
  );
}
