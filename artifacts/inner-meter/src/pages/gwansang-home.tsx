import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface GwansangHomeProps {
  onStart: () => void;
}

const FEATURES = [
  { icon: "🐉", title: "AI 운명 등급 판별", desc: "황금룡·청룡 등 운명의 기운 판별" },
  { icon: "💰", title: "재물운 · 연애운", desc: "재물 기운과 인연의 깊이 분석" },
  { icon: "🏛️", title: "역사적 인물 매칭", desc: "가장 닮은 역사 인물과 운명 비교" },
  { icon: "🔮", title: "성격 · 직업 · 궁합", desc: "기질·적성·관계 맞춤 분석" },
  { icon: "⏳", title: "노화 시뮬레이션", desc: "20년 후 얼굴 변화 예측" },
  { icon: "✨", title: "미래 아기 · 애니 변환", desc: "유전 예측 + 애니 캐릭터화" },
];

const PAGE_BG = "linear-gradient(175deg, #D4A96A 0%, #C49050 40%, #B8813A 100%)";

export function GwansangHome({ onStart }: GwansangHomeProps) {
  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, minHeight: "80vh" }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-40 py-8 md:py-16 flex-1">

        {/* 왼쪽: 헤더 + CTA */}
        <div className="flex flex-col md:flex-shrink-0 md:w-[340px] lg:w-[400px]">
          <motion.div className="pb-1 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <div className="px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase"
              style={{ background: "rgba(120,50,10,0.15)", color: "hsl(15,65%,28%)", border: "1px solid rgba(120,50,10,0.2)" }}>
              AI · 관상 분석
            </div>
          </motion.div>

          <motion.div className="pt-3 pb-4"
            initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.35 }}>
            <img
              src={`${import.meta.env.BASE_URL}gwansang.png`}
              alt="관상"
              className="h-[68px] md:h-[90px] lg:h-[110px] w-auto object-contain"
              style={{ filter: "drop-shadow(1px 2px 5px rgba(60,30,5,0.4))" }}
            />
            <p className="mt-2 text-[19px] md:text-[26px] lg:text-[32px] font-bold leading-snug"
              style={{ color: "hsl(25,65%,10%)" }}>
              내가 부자가 될 상인가?
            </p>
            <p className="mt-1 text-sm md:text-base" style={{ color: "hsl(25,40%,38%)" }}>
              사진 한 장으로 운명을 읽다
            </p>
          </motion.div>

          <div className="hidden md:block">
            <motion.button
              onClick={onStart}
              className="w-full h-[56px] rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2.5 transition-all"
              style={{ background: "linear-gradient(135deg, hsl(15,70%,24%) 0%, hsl(10,65%,20%) 100%)", color: "hsl(36,80%,92%)", boxShadow: "2px 3px 12px rgba(80,30,5,0.4)" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
              whileTap={{ scale: 0.97 }}>
              <Camera size={20} />
              관상 보기
            </motion.button>
            <p className="text-center text-[11px] mt-2.5" style={{ color: "hsl(25,35%,45%)" }}>
              사진은 분석 후 즉시 삭제됩니다 · AI 관상학 기반
            </p>
          </div>
        </div>

        {/* 오른쪽: 피처 그리드 */}
        <div className="md:flex-1 md:max-w-[520px] mt-6 md:mt-0">
          <div className="grid grid-cols-2 gap-2.5">
            {FEATURES.map((f, i) => (
              <motion.div key={i} className="rounded-2xl px-3.5 py-3 md:px-4 md:py-4"
                style={{ background: "rgba(255,235,185,0.48)", border: "1px solid rgba(140,90,20,0.22)" }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.06 }}>
                <span className="text-xl md:text-2xl mb-1.5 block">{f.icon}</span>
                <p className="text-[12px] md:text-[14px] font-bold leading-tight mb-0.5" style={{ color: "hsl(25,55%,12%)" }}>{f.title}</p>
                <p className="text-[11px] md:text-[12px] leading-tight" style={{ color: "hsl(25,35%,42%)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — 모바일 하단 */}
      <div className="px-4 pb-10 mt-4 md:hidden">
        <motion.button
          onClick={onStart}
          className="w-full h-[56px] rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2.5 transition-all"
          style={{ background: "linear-gradient(135deg, hsl(15,70%,24%) 0%, hsl(10,65%,20%) 100%)", color: "hsl(36,80%,92%)", boxShadow: "2px 3px 12px rgba(80,30,5,0.4)" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
          whileTap={{ scale: 0.97 }}>
          <Camera size={20} />
          관상 보기
        </motion.button>
        <p className="text-center text-[11px] mt-2.5" style={{ color: "hsl(25,35%,45%)" }}>
          사진은 분석 후 즉시 삭제됩니다 · AI 관상학 기반
        </p>
      </div>
    </div>
  );
}
