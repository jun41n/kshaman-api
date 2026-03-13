import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { getTestBySlug } from "@/data/tests";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

export default function TestDetail() {
  const [, params] = useRoute("/tests/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";

  const test = getTestBySlug(slug);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Record<string, number>>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!test) setLocation("/tests");
    window.scrollTo(0, 0);
  }, [test, setLocation]);

  if (!test) return null;

  const question = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / test.questions.length) * 100;
  const isNearEnd = currentQuestionIndex >= test.questions.length - 2;

  const handleOptionClick = (scores: Record<string, number>, idx: number) => {
    if (isTransitioning) return;
    setSelectedIdx(idx);

    const newAnswers = { ...answers, [currentQuestionIndex]: scores };
    setAnswers(newAnswers);

    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestionIndex < test.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedIdx(null);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        calculateAndNavigateResult(newAnswers);
      }
    }, 350);
  };

  const calculateAndNavigateResult = (finalAnswers: Record<number, Record<string, number>>) => {
    const totalScores: Record<string, number> = {};
    Object.values(finalAnswers).forEach(scoreObj => {
      Object.entries(scoreObj).forEach(([dimension, score]) => {
        totalScores[dimension] = (totalScores[dimension] || 0) + score;
      });
    });
    const resultKey = test.calculateResult(totalScores);
    setLocation(`/results/${test.slug}?result=${resultKey}`);
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedIdx(null);
    } else {
      setLocation(`/tests`);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto w-full pt-4 pb-24">
        {/* Header & Progress */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> 이전으로
          </button>

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{test.emoji}</span>
              <span className="text-xs font-bold text-muted-foreground/70 truncate max-w-[140px]">{test.title}</span>
            </div>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full tabular-nums">
              {currentQuestionIndex + 1} / {test.questions.length}
            </span>
          </div>

          <div className="relative">
            <Progress value={progress} className="h-2 bg-secondary" />
            {isNearEnd && (
              <motion.span
                className="absolute -top-0.5 text-[10px]"
                style={{ left: `${Math.min(progress, 90)}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            )}
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug mb-10 text-center break-keep">
              {question.text}
            </h2>

            <div className="flex flex-col gap-3">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleOptionClick(option.scores, idx)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-5 md:p-6 bg-card rounded-2xl border transition-all duration-200 text-base font-medium text-foreground shadow-sm group
                    ${selectedIdx === idx
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                      : 'border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="leading-relaxed">{option.label}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-all duration-200 ${selectedIdx === idx ? 'text-primary opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-60 group-hover:translate-x-1'}`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
