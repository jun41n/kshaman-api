import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronDown, Sparkles, Loader2 } from "lucide-react";
import { GwansangAnalysisResult } from "@/pages/gwansang";

interface ResultProps {
  result: GwansangAnalysisResult;
  image: string | null;
  onReset: () => void;
}

const PAGE_BG = "linear-gradient(175deg, #D4A96A 0%, #C49050 40%, #B8813A 100%)";

const TIER_COLORS: Record<string, string> = {
  황금룡: "#D4AF37", 청룡: "#00C8B4", 백호: "#B0B8C8", 주작: "#E05840", 현무: "#6040A0",
};

const API_BASE = "https://api.mytesttype.com";

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full mt-1.5 mb-3 overflow-hidden" style={{ background: "rgba(100,55,10,0.15)" }}>
      <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
        initial={{ width: 0 }} animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} />
    </div>
  );
}

function SectionCard({ icon, title, children, delay = 0, accent = "hsl(15,65%,28%)" }: {
  icon: string; title: string; children: React.ReactNode; delay?: number; accent?: string;
}) {
  return (
    <motion.div className="rounded-2xl p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <span style={{ fontSize: 14 }}>{icon}</span>
        <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: accent }}>{title}</p>
      </div>
      {children}
    </motion.div>
  );
}

function AccordionCard({ icon, title, children, delay = 0, accent = "hsl(15,65%,28%)" }: {
  icon: string; title: string; children: React.ReactNode; delay?: number; accent?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <button className="w-full flex items-center justify-between px-4 py-3.5" onClick={() => setOpen((o) => !o)}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 14 }}>{icon}</span>
          <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: accent }}>{title}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} style={{ color: accent }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaceImageCard({
  icon, title, description, accent, delay, uploadedImage, type,
}: {
  icon: string; title: string; description: string; accent: string;
  delay: number; uploadedImage: string | null; type: "aging" | "baby" | "anime";
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (!uploadedImage) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/generate-face-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: uploadedImage, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "생성 실패");
      setGeneratedImage(data.imageBase64);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [uploadedImage, type]);

  return (
    <motion.div className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <button className="w-full flex items-center justify-between px-4 py-3.5" onClick={() => setOpen((o) => !o)}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 14 }}>{icon}</span>
          <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: accent }}>{title}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} style={{ color: accent }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-4 pb-4 space-y-3">
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{description}</p>
              {!generatedImage ? (
                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-[14px] font-black transition-all active:scale-[0.97]"
                  style={{
                    background: loading
                      ? "linear-gradient(135deg, #8B5E3C, #6B3E1E)"
                      : "linear-gradient(135deg, #C47C2A, #9B4F0F)",
                    color: "#FFF5E0",
                    boxShadow: loading ? "none" : "0 3px 12px rgba(140,70,10,0.45)",
                    opacity: loading ? 0.75 : 1,
                    border: "none",
                  }}>
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> AI 이미지 생성 중… (30초 내외)</>
                  ) : (
                    <><Sparkles size={15} /> ✦ AI 이미지 생성하기</>
                  )}
                </button>
              ) : (
                <div className="space-y-2">
                  <motion.img
                    src={generatedImage}
                    alt={title}
                    className="w-full rounded-xl object-cover"
                    style={{ maxHeight: 320, border: `1.5px solid ${accent}33` }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <button
                    onClick={() => { setGeneratedImage(null); }}
                    className="w-full h-9 rounded-xl text-[12px] font-semibold"
                    style={{ background: "rgba(100,55,10,0.1)", color: "hsl(25,40%,38%)" }}>
                    다시 생성하기
                  </button>
                </div>
              )}
              {error && <p className="text-[12px] text-center" style={{ color: "hsl(0,60%,40%)" }}>{error}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function GwansangResult({ result, image, onReset }: ResultProps) {
  const tierColor = result.dragonface?.tier ? (TIER_COLORS[result.dragonface.tier] ?? "hsl(15,65%,28%)") : "hsl(15,65%,28%)";

  return (
    <div className="pb-12" style={{ background: PAGE_BG }}>

      <div className="relative px-5 pt-8 pb-4 flex flex-col items-center">
        {image && (
          <motion.div className="w-20 h-20 rounded-full overflow-hidden mb-3"
            style={{ border: "2.5px solid rgba(140,70,15,0.5)", boxShadow: "0 4px 16px rgba(60,20,5,0.3)" }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}>
            <img src={image} alt="face" className="w-full h-full object-cover" />
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-center">
          <img
            src={`${import.meta.env.BASE_URL}gwansang.png`}
            alt="관상"
            className="h-8 w-auto object-contain mx-auto mb-1"
            style={{ filter: "drop-shadow(1px 1px 3px rgba(60,25,5,0.3))" }}
          />
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(15,60%,30%)" }}>AI 관상 분석 완료</p>
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">

        {result.dragonface && (
          <motion.div className="rounded-3xl p-5 mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ background: "linear-gradient(135deg, rgba(140,65,15,0.15), rgba(100,45,10,0.12))", border: `1.5px solid ${tierColor}44` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 18 }}>🐉</span>
                <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>운명 등급</p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-black" style={{ background: `${tierColor}22`, color: tierColor, border: `1px solid ${tierColor}66` }}>
                {result.dragonface.tier}
              </div>
            </div>
            <ScoreBar score={result.dragonface.score} color={tierColor} />
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,45%,22%)" }}>{result.dragonface.reading}</p>
          </motion.div>
        )}

        <div className="mb-4">
          <SectionCard icon="◎" title="종합 총평" delay={0.24} accent="hsl(15,60%,30%)">
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,50%,18%)" }}>{result.summary}</p>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">

          {result.wealth && (
            <motion.div className="rounded-2xl p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-1 mb-0.5">
                <span style={{ fontSize: 13 }}>💰</span>
                <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>재물운</p>
              </div>
              <p className="text-2xl font-black mb-1" style={{ color: "hsl(35,75%,30%)" }}>{result.wealth.score}</p>
              <ScoreBar score={result.wealth.score} color="hsl(35,70%,38%)" />
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(25,45%,25%)" }}>{result.wealth.reading}</p>
            </motion.div>
          )}

          {result.love && (
            <motion.div className="rounded-2xl p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}>
              <div className="flex items-center gap-1 mb-0.5">
                <span style={{ fontSize: 13 }}>💕</span>
                <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "hsl(350,60%,32%)" }}>연애운</p>
              </div>
              <p className="text-2xl font-black mb-1" style={{ color: "hsl(350,65%,35%)" }}>{result.love.score}</p>
              <ScoreBar score={result.love.score} color="hsl(350,60%,42%)" />
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(25,45%,25%)" }}>{result.love.reading}</p>
            </motion.div>
          )}

          {result.eyes && (
            <motion.div className="rounded-2xl p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.37 }}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(15,65%,30%)", fontSize: 13 }}>◈</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,65%,30%)" }}>{result.eyes.title}</span>
                </div>
                <span className="text-xs font-black" style={{ color: "hsl(15,65%,30%)" }}>{result.eyes.score}점</span>
              </div>
              <ScoreBar score={result.eyes.score} color="hsl(15,65%,30%)" />
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,25%)" }}>{result.eyes.reading}</p>
            </motion.div>
          )}

          {result.nose && (
            <motion.div className="rounded-2xl p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(25,60%,32%)", fontSize: 13 }}>◇</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(25,60%,32%)" }}>{result.nose.title}</span>
                </div>
                <span className="text-xs font-black" style={{ color: "hsl(25,60%,32%)" }}>{result.nose.score}점</span>
              </div>
              <ScoreBar score={result.nose.score} color="hsl(25,60%,32%)" />
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,25%)" }}>{result.nose.reading}</p>
            </motion.div>
          )}

          {result.mouth && (
            <motion.div className="rounded-2xl p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.43 }}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(5,62%,32%)", fontSize: 13 }}>◉</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(5,62%,32%)" }}>{result.mouth.title}</span>
                </div>
                <span className="text-xs font-black" style={{ color: "hsl(5,62%,32%)" }}>{result.mouth.score}점</span>
              </div>
              <ScoreBar score={result.mouth.score} color="hsl(5,62%,32%)" />
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,25%)" }}>{result.mouth.reading}</p>
            </motion.div>
          )}

          {result.historical && (
            <SectionCard icon="🏛️" title="역사적 인물 매칭" delay={0.55} accent="hsl(25,55%,28%)">
              <div className="flex items-center justify-between mb-2">
                <p className="text-base font-black" style={{ color: "hsl(25,60%,14%)" }}>{result.historical.person}</p>
                <div className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                  style={{ background: "rgba(140,70,15,0.15)", color: "hsl(25,55%,30%)" }}>
                  유사도 {result.historical.similarity}%
                </div>
              </div>
              <p className="text-[11px] mb-2" style={{ color: "hsl(25,35%,42%)" }}>{result.historical.era}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,45%,22%)" }}>{result.historical.reading}</p>
            </SectionCard>
          )}

          {result.personality && (
            <SectionCard icon="🔮" title="성격 분석" delay={0.6} accent="hsl(260,45%,38%)">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-sm font-black" style={{ color: "hsl(260,45%,30%)" }}>{result.personality.type}</p>
                {result.personality.traits?.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: "rgba(100,60,180,0.12)", color: "hsl(260,45%,35%)" }}>{t}</span>
                ))}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{result.personality.reading}</p>
            </SectionCard>
          )}

          {result.career && (
            <SectionCard icon="💼" title="직업 추천" delay={0.64} accent="hsl(200,55%,28%)">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {result.career.jobs?.map((job) => (
                  <span key={job} className="px-3 py-1 rounded-full text-[12px] font-semibold"
                    style={{ background: "rgba(0,100,140,0.1)", color: "hsl(200,55%,28%)", border: "1px solid rgba(0,100,140,0.2)" }}>
                    {job}
                  </span>
                ))}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{result.career.reading}</p>
            </SectionCard>
          )}

          {result.compatibility && (
            <AccordionCard icon="🤝" title="관계 궁합" delay={0.68} accent="hsl(140,45%,28%)">
              <p className="text-sm font-bold mb-1.5" style={{ color: "hsl(140,45%,25%)" }}>최적 파트너: {result.compatibility.best}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{result.compatibility.reading}</p>
            </AccordionCard>
          )}

          {result.aging && (
            <FaceImageCard
              icon="⏳" title="노화 시뮬레이션" type="aging"
              description={`${result.aging.decade} — ${result.aging.reading}`}
              accent="hsl(35,55%,28%)" delay={0.72} uploadedImage={image}
            />
          )}

          {result.baby && (
            <FaceImageCard
              icon="👶" title="미래 아기 예측" type="baby"
              description={result.baby.reading}
              accent="hsl(350,50%,32%)" delay={0.75} uploadedImage={image}
            />
          )}

          {result.anime && (
            <FaceImageCard
              icon="✨" title="애니메이션 캐릭터 변환" type="anime"
              description={`${result.anime.character} — ${result.anime.reading}`}
              accent="hsl(280,45%,35%)" delay={0.78} uploadedImage={image}
            />
          )}
        </div>

        {result.fortune && (
          <div className="mb-3">
            <SectionCard icon="🌟" title={result.fortune.title || "전체 운세"} delay={0.82} accent="hsl(15,60%,30%)">
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,45%,22%)" }}>{result.fortune.reading}</p>
            </SectionCard>
          </div>
        )}

        {result.advice && (
          <motion.div className="rounded-2xl p-5 mb-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86 }}
            style={{ background: "linear-gradient(135deg, rgba(140,65,15,0.15), rgba(100,45,10,0.1))", border: "1px solid rgba(140,65,15,0.25)" }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ color: "hsl(15,65%,30%)", fontSize: 12 }}>✦</span>
              <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>관상 대가의 조언</p>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,50%,18%)" }}>{result.advice}</p>
          </motion.div>
        )}

        <motion.button
          onClick={onReset}
          className="w-full h-[50px] rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          style={{ background: "rgba(100,55,10,0.14)", border: "1px solid rgba(140,90,20,0.3)", color: "hsl(25,40%,32%)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.97 }}>
          <RotateCcw size={15} />
          다시 분석하기
        </motion.button>
      </div>
    </div>
  );
}
