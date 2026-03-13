import { useState } from "react";
import { Layout } from "@/components/layout";
import { tarotCards } from "@/data/tarot";
import { Button } from "@/components/ui/button";
import { Heart, Briefcase, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackTarotDraw } from "@/lib/analytics";

const STARS = [
  { top: '8%', left: '5%', size: '6px', opacity: 0.5, delay: 0 },
  { top: '15%', left: '88%', size: '4px', opacity: 0.4, delay: 0.5 },
  { top: '30%', left: '92%', size: '7px', opacity: 0.6, delay: 1 },
  { top: '55%', left: '3%', size: '5px', opacity: 0.4, delay: 0.7 },
  { top: '70%', left: '90%', size: '4px', opacity: 0.5, delay: 1.2 },
  { top: '85%', left: '8%', size: '6px', opacity: 0.3, delay: 0.3 },
  { top: '20%', left: '50%', size: '3px', opacity: 0.3, delay: 0.8 },
  { top: '45%', left: '96%', size: '5px', opacity: 0.4, delay: 1.5 },
  { top: '90%', left: '60%', size: '4px', opacity: 0.3, delay: 0.2 },
  { top: '5%', left: '35%', size: '3px', opacity: 0.4, delay: 1.1 },
];

export default function Tarot() {
  const [isDrawn, setIsDrawn] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const drawCard = () => {
    if (isDrawn) return;
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const card = tarotCards[randomIndex];
    setSelectedCard(card);
    setIsDrawn(true);
    setTimeout(() => setIsFlipped(true), 700);
    trackTarotDraw(card.name);
  };

  const resetTarot = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIsDrawn(false);
      setSelectedCard(null);
    }, 500);
  };

  return (
    <Layout>
      {/* Full dark cosmic background */}
      <div className="relative min-h-screen -mx-4 sm:-mx-6 -mt-6 px-4 sm:px-6 pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0720] via-[#130a2e] to-[#1a0d3a]" />

        {/* Animated stars */}
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: star.delay }}
          />
        ))}

        {/* Nebula glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-purple-300/80 text-xs font-bold tracking-[0.3em] uppercase mb-3">🌌 오늘의 우주 에너지</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              오늘의 타로 한 장
            </h1>
            <p className="text-purple-200/70 text-base leading-relaxed max-w-xs mx-auto">
              마음속으로 질문을 하나 떠올려보세요.<br />
              오늘의 카드가 당신에게 속삭여줄 거예요 🌙
            </p>
          </motion.div>

          {/* Card */}
          <div className="relative mb-8">
            {/* Pulsing glow under card (before draw) */}
            <AnimatePresence>
              {!isFlipped && (
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-2xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)' }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>

            <div
              className="relative w-[220px] h-[340px] md:w-[260px] md:h-[400px] cursor-pointer"
              onClick={!isDrawn ? drawCard : undefined}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.9, type: 'spring', stiffness: 55, damping: 12 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-purple-400/40 shadow-2xl group"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/tarot-back.png`}
                    alt="Tarot Back"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {!isDrawn && (
                    <div className="absolute inset-0 flex items-end justify-center pb-8 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        탭해서 뽑기 ✨
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Front */}
                <div
                  className={`absolute inset-0 rounded-2xl shadow-2xl border-2 border-white/30 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br ${selectedCard?.color || 'from-violet-700 to-purple-900'}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  {selectedCard && (
                    <div className="relative z-10 text-center p-6 text-white">
                      <div className="text-7xl mb-5 drop-shadow-xl">{selectedCard.emoji}</div>
                      <h3 className="text-2xl font-black mb-2 leading-tight">{selectedCard.name}</h3>
                      <div className="w-10 h-0.5 bg-white/40 mx-auto rounded-full mb-4" />
                      <p className="text-sm text-white/85 leading-snug font-medium">{selectedCard.meaning}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action / Result */}
          <AnimatePresence mode="wait">
            {!isDrawn ? (
              <motion.div
                key="action"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <Button
                  onClick={drawCard}
                  size="lg"
                  className="rounded-full h-14 px-10 text-base font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 border-0 shadow-xl shadow-violet-500/40 hover:-translate-y-1 transition-all text-white"
                >
                  🔮 오늘의 카드 뽑기
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full space-y-3"
              >
                {selectedCard && (
                  <>
                    <p className="text-center text-purple-300/80 text-xs font-bold tracking-[0.2em] uppercase mb-4">오늘의 조언</p>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shrink-0 shadow-lg">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 text-sm">사랑 조언</h4>
                        <p className="text-sm text-purple-200/80 leading-relaxed">{selectedCard.loveMessage}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 text-sm">일/학업 조언</h4>
                        <p className="text-sm text-purple-200/80 leading-relaxed">{selectedCard.workMessage}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 text-sm">오늘의 에너지</h4>
                        <p className="text-sm text-purple-200/80 leading-relaxed">{selectedCard.energyMessage}</p>
                      </div>
                    </div>

                    <Button
                      onClick={resetTarot}
                      className="w-full mt-4 rounded-2xl h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md transition-all"
                    >
                      🔮 새 카드 뽑기
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
