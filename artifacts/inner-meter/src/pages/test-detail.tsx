import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { getTestBySlug } from "@/data/tests";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function TestDetail() {
  const [, params] = useRoute("/tests/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  
  const test = getTestBySlug(slug);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Record<string, number>>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!test) {
      setLocation("/tests");
    }
    window.scrollTo(0, 0);
  }, [test, setLocation]);

  if (!test) return null;

  const question = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  const handleOptionClick = (scores: Record<string, number>) => {
    if (isTransitioning) return;
    
    // Save answer
    const newAnswers = { ...answers, [currentQuestionIndex]: scores };
    setAnswers(newAnswers);
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < test.questions.length - 1) {
        // Next question
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Calculate result
        calculateAndNavigateResult(newAnswers);
      }
    }, 400); // Wait for transition animation
  };

  const calculateAndNavigateResult = (finalAnswers: Record<number, Record<string, number>>) => {
    // Sum all scores across all dimensions
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
    } else {
      setLocation(`/tests`);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto w-full pt-4 pb-20">
        {/* Header & Progress */}
        <div className="mb-8">
          <button 
            onClick={goBack}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> 이전으로
          </button>
          
          <div className="flex justify-between items-end mb-3">
            <span className="text-2xl font-bold opacity-30">{test.emoji}</span>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {currentQuestionIndex + 1} / {test.questions.length}
            </span>
          </div>
          
          <Progress value={progress} className="h-2.5 bg-secondary" />
        </div>

        {/* Question Area */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug mb-10 text-center break-keep">
            {question.text}
          </h2>

          <div className="flex flex-col gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option.scores)}
                className="w-full text-left p-5 md:p-6 bg-card rounded-2xl border border-border/60 hover:border-primary hover:bg-primary/5 text-lg font-medium text-foreground shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
