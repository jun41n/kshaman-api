import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getPetTest, PetType } from "@/data/petData";
import { Layout } from "@/components/layout";

export default function PetQuiz() {
  const params = useParams<{ type: string }>();
  const petType = params.type as PetType;
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  const test = getPetTest(petType);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);

  const q = test.questions[current];
  const progress = ((current) / test.questions.length) * 100;

  const labelKey = petType === 'dog' ? 'pet.quiz.dogLabel' : 'pet.quiz.catLabel';

  function handleAnswer(optIdx: number) {
    if (selected !== null) return;
    setSelected(optIdx);

    const opt = q.options[optIdx];
    const newScores = { ...scores };
    for (const [dim, pts] of Object.entries(opt.scores)) {
      newScores[dim] = (newScores[dim] || 0) + pts;
    }

    setTimeout(() => {
      if (current + 1 < test.questions.length) {
        setDirection(1);
        setScores(newScores);
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        const resultKey = test.calculateResult(newScores);
        sessionStorage.setItem(`pet_quiz_done_${petType}`, resultKey);
        navigate(`/pet-test/result/${petType}/${resultKey}`);
      }
    }, 420);
  }

  const accentColor = petType === "dog" ? "#F97316" : "#A855F7";
  const accentLight = petType === "dog" ? "#FFF0E6" : "#F5EEFF";

  const qKey = `${petType}.q${q.id}`;

  return (
    <Layout>
      <div className="flex-1 flex flex-col">
        <div className="px-4 pt-6 pb-2 max-w-sm mx-auto w-full">
          <button
            className="text-[#8B6650] dark:text-muted-foreground text-sm mb-4 flex items-center gap-1"
            onClick={() => navigate("/pet-test")}
          >
            {t('pet.nav.back')}
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{test.emoji}</span>
            <span className="text-sm font-semibold text-[#8B6650] dark:text-muted-foreground">
              {t('pet.quiz.testLabel', { label: t(labelKey) })}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2.5 bg-[#F0E4D8] dark:bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: accentColor }}
                animate={{ width: `${progress + (100 / test.questions.length)}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <span className="text-xs text-[#8B6650] dark:text-muted-foreground font-medium w-10 text-right">
              {current + 1}/{test.questions.length}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col px-4 pb-8 max-w-sm mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              <div
                className="rounded-3xl px-5 py-6 mt-4 mb-6 shadow-sm"
                style={{ background: accentLight }}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: accentColor }}>
                  Q{q.id}
                </p>
                <p className="text-xl font-bold text-[#3D2B1F] leading-snug">
                  {t(`${qKey}.text`)}
                </p>
              </div>

              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  return (
                    <motion.button
                      key={idx}
                      className="w-full text-left rounded-2xl px-5 py-4 border-2 font-medium text-[#3D2B1F] text-base transition-all"
                      style={{
                        borderColor: isSelected ? accentColor : "#F0E4D8",
                        background: isSelected ? accentLight : "white",
                        opacity: selected !== null && !isSelected ? 0.5 : 1,
                      }}
                      whileHover={selected === null ? { scale: 1.015 } : {}}
                      whileTap={selected === null ? { scale: 0.985 } : {}}
                      onClick={() => handleAnswer(idx)}
                      disabled={selected !== null}
                    >
                      <span className="inline-flex items-start gap-3">
                        <span
                          className="mt-0.5 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                          style={{
                            borderColor: isSelected ? accentColor : "#D6BDB0",
                            background: isSelected ? accentColor : "transparent",
                            color: isSelected ? "white" : "#8B6650",
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{t(`${qKey}.a${idx}`)}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
