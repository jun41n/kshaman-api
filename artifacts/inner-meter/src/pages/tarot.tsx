import { useState } from "react";
import { Layout } from "@/components/layout";
import { tarotCards } from "@/data/tarot";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Briefcase, Zap, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tarot() {
  const [isDrawn, setIsDrawn] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const drawCard = () => {
    if (isDrawn) return;
    
    // Pick a random card
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setSelectedCard(tarotCards[randomIndex]);
    
    setIsDrawn(true);
    
    // Auto flip after a short delay for dramatic effect
    setTimeout(() => {
      setIsFlipped(true);
    }, 600);
  };

  const resetTarot = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIsDrawn(false);
      setSelectedCard(null);
    }, 400); // Wait for un-flip animation
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 pb-16 min-h-[80vh]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">오늘의 타로 한 장</h1>
          <p className="text-lg text-muted-foreground">
            마음을 편안하게 가라앉히고, 오늘 하루의 에너지를 읽어줄 카드를 뽑아보세요.
          </p>
        </div>

        {/* Card Interaction Area */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 mt-4 perspective-[1000px]">
          
          {/* The Card */}
          <div 
            className="relative w-[280px] h-[420px] md:w-[320px] md:h-[480px] cursor-pointer group"
            onClick={!isDrawn ? drawCard : undefined}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 12 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Back of card */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/tarot-back.png`} 
                  alt="Tarot Back" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                {!isDrawn && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold px-4 py-2 bg-black/40 rounded-full backdrop-blur-md">클릭해서 뽑기</span>
                  </div>
                )}
              </div>

              {/* Front of card */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-2xl shadow-2xl border-4 border-white overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br ${selectedCard?.color || 'from-gray-100 to-gray-200'}`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                {selectedCard && (
                  <div className="text-center p-6 text-white drop-shadow-md">
                    <div className="text-8xl mb-6 filter drop-shadow-xl">{selectedCard.emoji}</div>
                    <h3 className="text-3xl font-black mb-2">{selectedCard.name}</h3>
                    <div className="w-12 h-1 bg-white/50 mx-auto rounded-full mb-4"></div>
                    <p className="font-medium text-white/90 px-4 leading-snug">{selectedCard.meaning}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Action / Result Details */}
          <div className="w-full max-w-md flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              {!isDrawn ? (
                <motion.div 
                  key="action"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <Button 
                    onClick={drawCard} 
                    size="lg" 
                    className="rounded-full h-16 px-10 text-xl font-bold bg-gradient-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all"
                  >
                    오늘의 카드 뽑기
                  </Button>
                  <p className="mt-6 text-sm text-muted-foreground">마음속으로 질문을 떠올린 후 버튼을 누르거나 카드를 탭하세요.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full space-y-4"
                >
                  {selectedCard && (
                    <>
                      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border flex items-start gap-4">
                        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-500 shrink-0">
                          <Heart className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1">사랑 조언</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{selectedCard.loveMessage}</p>
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border flex items-start gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-500 shrink-0">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1">일/학업 조언</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{selectedCard.workMessage}</p>
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border flex items-start gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-500 shrink-0">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1">오늘의 에너지</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{selectedCard.energyMessage}</p>
                        </div>
                      </div>

                      <Button 
                        onClick={resetTarot} 
                        variant="outline" 
                        className="w-full mt-6 rounded-xl h-12 border-border hover:bg-muted font-bold text-muted-foreground"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" /> 다른 카드 다시 뽑기
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}
