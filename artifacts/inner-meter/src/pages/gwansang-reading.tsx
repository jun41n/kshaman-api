import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { GwansangAnalysisResult } from "@/pages/gwansang";

interface ReadingProps {
  onResult: (imageBase64: string, data: GwansangAnalysisResult) => void;
  onBack: () => void;
}

type Stage = "upload" | "analyzing";

const STEPS = [
  { label: "AI 관상 알고리즘 초기화 중", pct: 8 },
  { label: "얼굴 구조 매핑 중", pct: 18 },
  { label: "재물운 기운 감지 중", pct: 30 },
  { label: "연애운 흐름 포착 중", pct: 42 },
  { label: "역사적 인물 데이터 매칭 중", pct: 54 },
  { label: "성격·직업 적성 산출 중", pct: 64 },
  { label: "노화 패턴 시뮬레이션 중", pct: 74 },
  { label: "미래 아기·애니 변환 중", pct: 84 },
  { label: "관상 대가 최종 판정 중", pct: 95 },
];

function CosmicWatch({ stepIndex }: { stepIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = W / 2 - 2;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; a: number;
      color: string;
      life: number; maxLife: number;
    }

    const COLORS = [
      "rgba(0,230,200,A)", "rgba(0,200,180,A)",
      "rgba(100,255,220,A)", "rgba(200,80,255,A)",
      "rgba(160,60,230,A)", "rgba(80,255,200,A)",
      "rgba(40,180,160,A)", "rgba(180,100,255,A)",
    ];

    const makeParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const dist = R * (0.15 + Math.random() * 0.65);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const maxLife = 80 + Math.random() * 120;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 0.6 + Math.random() * 1.8,
        a: Math.random(),
        color,
        life: Math.random() * maxLife,
        maxLife,
      };
    };

    const particles: Particle[] = Array.from({ length: 200 }, makeParticle);

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, W, H);

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.45);
      coreGrad.addColorStop(0, "rgba(0,200,170,0.18)");
      coreGrad.addColorStop(0.5, "rgba(100,50,220,0.08)");
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, W, H);

      const cloudA = (Math.sin(t * 0.012) * 0.5 + 0.5) * 0.12 + 0.04;
      const cloudGrad = ctx.createRadialGradient(cx + 10, cy - 8, 0, cx, cy, R * 0.55);
      cloudGrad.addColorStop(0, `rgba(0,210,180,${cloudA})`);
      cloudGrad.addColorStop(0.4, `rgba(120,60,240,${cloudA * 0.6})`);
      cloudGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cloudGrad;
      ctx.fillRect(0, 0, W, H);

      const cloudB = (Math.sin(t * 0.009 + 2) * 0.5 + 0.5) * 0.1 + 0.03;
      const cloudGrad2 = ctx.createRadialGradient(cx - 14, cy + 10, 0, cx, cy, R * 0.5);
      cloudGrad2.addColorStop(0, `rgba(160,80,255,${cloudB})`);
      cloudGrad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cloudGrad2;
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.life++;
        if (p.life > p.maxLife) { Object.assign(p, makeParticle()); continue; }
        const lifePct = p.life / p.maxLife;
        const fade = lifePct < 0.2 ? lifePct / 0.2 : lifePct > 0.8 ? (1 - lifePct) / 0.2 : 1;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("A", String(p.a * fade));
        ctx.fill();
        if (p.r > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace("A", String(p.a * fade * 0.15));
          ctx.fill();
        }
      }

      const ringPulse = 0.6 + Math.sin(t * 0.04) * 0.15;
      ctx.strokeStyle = `rgba(0,210,180,${ringPulse * 0.35})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(120,60,240,${ringPulse * 0.25})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.52, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const step = STEPS[Math.min(stepIndex, STEPS.length - 1)];
  const progress = step.pct;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 200, height: 200 }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 50%, #2a2a2a 100%)", boxShadow: "0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)" }} />
        <div className="absolute inset-[6px] rounded-full overflow-hidden"
          style={{ boxShadow: "inset 0 0 20px rgba(0,200,170,0.15)" }}>
          <canvas ref={canvasRef} width={188} height={188} className="w-full h-full" />
        </div>
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(0,200,170,0.12)" strokeWidth="2.5" />
          <motion.circle
            cx="100" cy="100" r="96"
            fill="none"
            stroke="rgba(0,210,180,0.7)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 96}`}
            animate={{ strokeDashoffset: 2 * Math.PI * 96 * (1 - progress / 100) }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="text-xs font-bold tabular-nums"
            style={{ color: "rgba(0,220,190,0.9)", textShadow: "0 0 8px rgba(0,220,190,0.5)" }}
            key={progress}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}>
            {progress}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}

const PAGE_BG = "linear-gradient(175deg, #D4A96A 0%, #C49050 40%, #B8813A 100%)";
const API_URL = "https://api.mytesttype.com/api/face-reading";

export function GwansangReading({ onResult, onBack }: ReadingProps) {
  const [stage, setStage] = useState<Stage>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) { setError("이미지 파일만 업로드할 수 있습니다."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("파일 크기는 10MB 이하여야 합니다."); return; }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!preview) return;
    setStage("analyzing");
    setStepIndex(0);
    setError(null);

    stepTimerRef.current = setInterval(() => {
      setStepIndex((p) => Math.min(p + 1, STEPS.length - 1));
    }, 2200);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: preview }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "분석 중 오류가 발생했습니다.");
      }
      onResult(preview, await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석 중 오류가 발생했습니다.");
      setStage("upload");
    } finally {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    }
  };

  if (stage === "analyzing") {
    const step = STEPS[Math.min(stepIndex, STEPS.length - 1)];
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20"
        style={{ background: "linear-gradient(175deg, #0A0A12 0%, #0D0D18 60%, #080810 100%)", minHeight: "75vh" }}>
        {preview && (
          <motion.div className="w-14 h-14 rounded-full overflow-hidden mb-6 flex-shrink-0"
            style={{ border: "1.5px solid rgba(0,200,170,0.4)", boxShadow: "0 0 16px rgba(0,200,170,0.2)" }}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <img src={preview} alt="face" className="w-full h-full object-cover" />
          </motion.div>
        )}
        <CosmicWatch stepIndex={stepIndex} />
        <motion.div className="mt-6 flex flex-col items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <img
            src={`${import.meta.env.BASE_URL}gwansang.png`}
            alt="관상"
            className="h-7 w-auto object-contain opacity-80"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,210,180,0.3)) brightness(3)" }}
          />
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(0,200,170,0.6)" }}>AI 관상 알고리즘</p>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.p key={stepIndex}
            className="mt-4 text-sm text-center"
            style={{ color: "rgba(200,220,210,0.75)" }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}>
            {step.label}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-2 mt-5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(0,210,180,0.7)" }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, minHeight: "75vh" }}>
      <div className="w-full max-w-xl md:max-w-2xl mx-auto flex flex-col flex-1 px-4 sm:px-6">
        <div className="flex items-center gap-4 pt-8 pb-6">
          <button onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(100,55,10,0.15)", color: "hsl(25,60%,15%)" }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-lg" style={{ color: "hsl(25,60%,10%)" }}>사진 업로드</h2>
            <p className="text-xs" style={{ color: "hsl(25,35%,40%)" }}>얼굴이 잘 보이는 정면 사진을 올려주세요</p>
          </div>
        </div>

        <div className="flex-1">
          {!preview ? (
            <motion.div
              className="relative rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all"
              style={{ minHeight: 260, background: "rgba(255,235,185,0.35)", border: "2px dashed rgba(140,90,20,0.3)" }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "rgba(140,70,15,0.15)" }}>
                <Upload size={28} style={{ color: "hsl(15,65%,32%)" }} />
              </div>
              <p className="font-semibold text-base mb-1.5" style={{ color: "hsl(25,55%,14%)" }}>사진을 드래그하거나 탭하세요</p>
              <p className="text-sm" style={{ color: "hsl(25,35%,45%)" }}>JPG, PNG, HEIC · 최대 10MB</p>
              <input ref={fileInputRef} type="file" accept="image/*" capture="user" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </motion.div>
          ) : (
            <motion.div className="relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <img src={preview} alt="preview" className="w-full object-cover rounded-3xl" style={{ maxHeight: 340 }} />
              <button className="absolute bottom-4 right-4 text-xs px-4 py-2 rounded-full flex items-center gap-1.5 transition"
                style={{ background: "rgba(20,10,5,0.7)", backdropFilter: "blur(8px)", color: "#f5e8cc" }}
                onClick={() => { setPreview(null); setError(null); }}>
                <Camera size={13} />다시 선택
              </button>
            </motion.div>
          )}

          {!preview && (
            <motion.div className="mt-4 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              {["정면을 바라보는 사진", "밝은 조명 아래 찍은 사진", "선글라스·마스크 없는 사진"].map((tip, i) => (
                <div key={i} className="flex items-center gap-3 px-1">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(15,60%,40%)" }} />
                  <p className="text-sm" style={{ color: "hsl(25,35%,40%)" }}>{tip}이 좋습니다</p>
                </div>
              ))}
            </motion.div>
          )}

          {error && (
            <motion.div className="mt-4 rounded-2xl px-4 py-3"
              style={{ background: "rgba(180,50,20,0.1)", border: "1px solid rgba(180,50,20,0.2)" }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-sm" style={{ color: "hsl(10,70%,35%)" }}>{error}</p>
            </motion.div>
          )}
        </div>

        <div className="pb-10 pt-6">
          <motion.button
            onClick={handleAnalyze}
            disabled={!preview}
            className="w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 transition-all disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              background: preview ? "linear-gradient(135deg, hsl(15,70%,24%) 0%, hsl(10,65%,20%) 100%)" : "rgba(100,55,10,0.18)",
              color: preview ? "hsl(36,80%,92%)" : "hsl(25,40%,45%)",
              boxShadow: preview ? "2px 3px 12px rgba(60,20,5,0.4)" : "none",
            }}
            whileTap={preview ? { scale: 0.97 } : undefined}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {preview ? "AI 관상 분석 시작" : "사진을 먼저 선택해주세요"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
