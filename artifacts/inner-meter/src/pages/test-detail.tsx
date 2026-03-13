import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { getTestBySlug } from "@/data/tests";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { trackTestStart, trackTestComplete } from "@/lib/analytics";

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

/* ── Fisher-Yates shuffle (returns a new array) ── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TestDetail() {
  const [, params] = useRoute("/tests/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  const test = getTestBySlug(slug);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Record<string, number>>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Shuffled questions in state so a re-render is triggered once they're ready
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof test extends null ? never[] : NonNullable<typeof test>['questions']>([]);
  // Stable shuffled options per question index (ref is fine here — not needed for render gating)
  const shuffledOptionsRef = useRef<Map<number, number[]>>(new Map());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!test) { setLocation("/tests"); return; }

    // Only shuffle once per test session
    if (!initializedRef.current) {
      initializedRef.current = true;

      // Shuffle question order — set via state to trigger re-render
      const shuffled = shuffle(test.questions) as typeof test.questions;
      setShuffledQuestions(shuffled);

      // Shuffle option order for each question
      const optMap = new Map<number, number[]>();
      test.questions.forEach((q) => {
        const origIdx = test.questions.indexOf(q);
        optMap.set(origIdx, shuffle(q.options.map((_, i) => i)));
      });
      shuffledOptionsRef.current = optMap;

      // Track test start
      trackTestStart({
        test_slug: test.slug,
        test_title: test.title,
        category: test.category,
      });
    }

    window.scrollTo(0, 0);
  }, [test, setLocation]);

  if (!test) return null;
  if (shuffledQuestions.length === 0) return null;

  const questions = shuffledQuestions;
  const question = questions[currentQuestionIndex];
  // Get the shuffled option order for the current question's original index
  const origIndex = test.questions.findIndex(q => q.id === question.id);
  const optionOrder = shuffledOptionsRef.current.get(origIndex) ?? question.options.map((_, i) => i);
  const displayOptions = optionOrder.map(i => question.options[i]);

  const progressPct = (currentQuestionIndex / questions.length) * 100;
  const isNearEnd = currentQuestionIndex >= questions.length - 2;

  const handleOptionClick = (scores: Record<string, number>, displayIdx: number) => {
    if (isTransitioning) return;
    setSelectedIdx(displayIdx);
    const newAnswers = { ...answers, [currentQuestionIndex]: scores };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedIdx(null);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Compute final scores
        const totalScores: Record<string, number> = {};
        Object.values(newAnswers).forEach(scoreObj => {
          Object.entries(scoreObj).forEach(([dim, score]) => {
            totalScores[dim] = (totalScores[dim] || 0) + score;
          });
        });
        const resultKey = test.calculateResult(totalScores);

        // Find the result title for tracking
        const resultObj = test.results.find(r => r.key === resultKey);

        trackTestComplete({
          test_slug: test.slug,
          test_title: test.title,
          result_key: resultKey,
          result_title: resultObj?.title ?? resultKey,
          category: test.category,
        });

        window.scrollTo({ top: 0, behavior: 'instant' });
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
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
          </div>

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
            <p className="text-xs font-bold text-primary/60 text-center mb-2 tracking-wide uppercase">
              Q{currentQuestionIndex + 1}
            </p>

            <h2 className="text-[1.4rem] md:text-[1.75rem] font-bold text-foreground leading-snug mb-8 text-center break-keep">
              {question.text}
            </h2>

            <div className="flex flex-col gap-3">
              {displayOptions.map((option, displayIdx) => {
                const isSelected = selectedIdx === displayIdx;
                return (
                  <motion.button
                    key={displayIdx}
                    onClick={() => handleOptionClick(option.scores, displayIdx)}
                    whileTap={{ scale: 0.985 }}
                    className={`w-full text-left rounded-2xl border transition-all duration-200 group
                      ${isSelected
                        ? 'border-primary bg-primary/8 shadow-md shadow-primary/10 ring-1 ring-primary/20'
                        : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-start gap-3.5 p-4 md:p-5">
                      <span className={`flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black shrink-0 mt-0.5 transition-colors
                        ${isSelected
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary'
                        }`}>
                        {OPTION_LABELS[displayIdx]}
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
