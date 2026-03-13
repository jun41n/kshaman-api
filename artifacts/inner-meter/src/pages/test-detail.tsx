import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { getTestBySlug } from "@/data/tests";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

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
  const progressPct = (currentQuestionIndex / test.questions.length) * 100;
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
        const totalScores: Record<string, number> = {};
        Object.values(newAnswers).forEach(scoreObj => {
          Object.entries(scoreObj).forEach(([dim, score]) => {
            totalScores[dim] = (totalScores[dim] || 0) + score;
          });
        });
        const resultKey = test.calculateResult(totalScores);
        setLocation(`/results/${test.slug}?result=${resultKey}`);
      }
    }, 320);
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedIdx(null);
    } else {
      setLocation('/tests');
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto w-full pt-2 pb-20">
        {/* ── Header ── */}
        <div className="mb-8">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-5 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            이전
          </button>

          {/* Test title + count */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">{test.emoji}</span>
              <span className="text-xs font-semibold text-muted-foreground truncate">{test.title}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {isNearEnd && (
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-sm"
                >✨</motion.span>
              )}
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full tabular-nums">
                {currentQuestionIndex + 1} / {test.questions.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <Progress value={progressPct} className="h-2 rounded-full bg-secondary" />
        </div>

        {/* ── Question ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Question number */}
            <p className="text-xs font-bold text-primary/60 text-center mb-2 tracking-wide uppercase">
              Q{currentQuestionIndex + 1}
            </p>

            <h2 className="text-[1.4rem] md:text-[1.75rem] font-bold text-foreground leading-snug mb-8 text-center break-keep">
              {question.text}
            </h2>

            <div className="flex flex-col gap-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleOptionClick(option.scores, idx)}
                    whileTap={{ scale: 0.985 }}
                    className={`w-full text-left rounded-2xl border transition-all duration-200 group
                      ${isSelected
                        ? 'border-primary bg-primary/8 shadow-md shadow-primary/10 ring-1 ring-primary/20'
                        : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-start gap-3.5 p-4 md:p-5">
                      {/* Letter badge */}
                      <span className={`flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black shrink-0 mt-0.5 transition-colors
                        ${isSelected
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary'
                        }`}>
                        {OPTION_LABELS[idx]}
                      </span>
                      <span className="text-[0.95rem] font-medium text-foreground leading-relaxed">{option.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
