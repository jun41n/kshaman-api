import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { TAROT3_CARDS } from "@/data/tarot3Cards";
import type { Tarot3Card } from "@/data/tarot3Cards";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { trackTarotDraw } from "@/lib/analytics";
import { ShareButtons } from "@/components/share-buttons";

const STARS = [
  { top: '5%',  left: '4%',  size: '4px', opacity: 0.55, delay: 0 },
  { top: '11%', left: '89%', size: '3px', opacity: 0.40, delay: 0.6 },
  { top: '27%', left: '93%', size: '5px', opacity: 0.50, delay: 1.1 },
  { top: '48%', left: '2%',  size: '4px', opacity: 0.45, delay: 0.4 },
  { top: '67%', left: '91%', size: '4px', opacity: 0.40, delay: 1.4 },
  { top: '80%', left: '6%',  size: '3px', opacity: 0.35, delay: 0.2 },
  { top: '18%', left: '52%', size: '3px', opacity: 0.30, delay: 0.9 },
  { top: '88%', left: '58%', size: '3px', opacity: 0.30, delay: 0.1 },
  { top: '3%',  left: '33%', size: '4px', opacity: 0.40, delay: 1.2 },
  { top: '44%', left: '97%', size: '3px', opacity: 0.35, delay: 0.7 },
];

/* ─── CardIllustration (22 major arcana) ─────────────────────── */
function CardIllustration({ id }: { id: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/tarot/${id}.png`}
      alt={id}
      className="w-full h-full object-cover"
      draggable={false}
    />
  );
}

/* ─── Card Back ───────────────────────────────────────────────── */
function CardBack({ w = 220, h = 356 }: { w?: number | string; h?: number | string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/tarot-back.png`}
      alt="Tarot card back"
      style={{ width: w, height: h, objectFit: 'cover', borderRadius: 12, display: 'block' }}
      draggable={false}
    />
  );
}

/* ─── Mini card for grid ──────────────────────────────────────── */
function MiniCardBack({ selected, selectionOrder, w = 48, h = 76 }: { selected: boolean; selectionOrder?: number; w?: number; h?: number }) {
  return (
    <div
      className="relative rounded overflow-hidden cursor-pointer"
      style={{
        width: w, height: h,
        boxShadow: selected
          ? '0 0 0 2.5px #f0c040, 0 4px 20px rgba(240,192,64,0.6)'
          : '0 2px 10px rgba(0,0,0,0.6)',
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/tarot-back.png`}
        alt="Tarot card back"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {selected && selectionOrder !== undefined && (
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#f0c040] flex items-center justify-center">
          <span className="text-black text-[9px] font-black">{selectionOrder}</span>
        </div>
      )}
    </div>
  );
}

type CardLocale = 'ko' | 'en' | 'ja' | 'es' | 'pt-BR' | 'fr';

/* ─── Full card face for reading ─────────────────────────────── */
function ReadingCard({ card, locale }: { card: Tarot3Card; locale: CardLocale }) {
  return (
    <div
      className="relative rounded overflow-hidden"
      style={{
        width: 'min(150px, 28vw)', height: 'min(234px, 43.7vw)',
        boxShadow: '0 0 0 1.5px #b8860b, 0 8px 32px rgba(0,0,0,0.7)',
      }}
    >
      <div className="absolute inset-0 bg-[#0e0620]" />
      <div className="absolute inset-[6px] border border-[#b8860b] rounded-sm opacity-70" />
      <div className="absolute top-[6px] left-[6px] right-[6px] h-7 flex items-center justify-center">
        <span className="text-[#ffd700] text-[11px] font-bold tracking-widest font-serif">{card.roman}</span>
      </div>
      <div className="absolute top-[36px] left-[7px] right-[7px] bottom-[28px] overflow-hidden rounded border border-[#b8860b] border-opacity-40">
        <CardIllustration id={card.id} />
      </div>
      <div className="absolute bottom-[6px] left-[6px] right-[6px] h-6 flex items-center justify-center">
        <span className="text-[#ffd700] text-[10px] font-bold tracking-wide font-serif text-center leading-tight truncate px-1">{card.name[locale]}</span>
      </div>
    </div>
  );
}

/* ─── Main Tarot Component ────────────────────────────────────── */
type Phase = 'intro' | 'selection' | 'reading';

export default function Tarot() {
  const { t, i18n } = useTranslation();
  const fullLocale = i18n.language ?? 'ko';
  const validLocales: CardLocale[] = ['ko','en','ja','es','pt-BR','fr'];
  const safeLocale: CardLocale = validLocales.includes(fullLocale as CardLocale)
    ? (fullLocale as CardLocale) : 'ko';

  const [phase, setPhase] = useState<Phase>('intro');
  const [question, setQuestion] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const shuffled = useMemo(
    () => [...TAROT3_CARDS].sort(() => Math.random() - 0.5),
    []
  );

  const handleCardClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(s => s !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleRead = () => {
    const selected = selectedIds
      .map(id => TAROT3_CARDS.find(c => c.id === id)!)
      .filter(Boolean);
    selected.forEach(c => trackTarotDraw(c.name[safeLocale]));
    setPhase('reading');
    setTimeout(() => setRevealed(true), 300);
  };

  const handleReset = () => {
    setPhase('intro');
    setQuestion('');
    setSelectedIds([]);
    setRevealed(false);
  };

  const selectedCards: Tarot3Card[] = selectedIds
    .map(id => TAROT3_CARDS.find(c => c.id === id)!)
    .filter(Boolean);

  const positions = [
    t('tarot3.position1'),
    t('tarot3.position2'),
    t('tarot3.position3'),
  ];

  const positionKeys: ('present' | 'advice' | 'future')[] = ['present', 'advice', 'future'];

  return (
    <Layout showAd={phase === 'reading'}>
      <SeoHead title={t('seo.tarot.title')} description={t('seo.tarot.desc')} path="/tarot" />
      <div className="relative min-h-screen -mx-4 sm:-mx-6 -mt-6 px-4 sm:px-6 pt-8 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080420] via-[#0d0630] to-[#120840]" />
        {STARS.map((star, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: star.delay }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <p className="text-violet-300/70 text-xs font-bold tracking-[0.25em] uppercase mb-2">✦ TAROT ✦</p>
            <h1 className="text-3xl font-black text-white mb-2 leading-tight">{t('tarot3.title')}</h1>
            <p className="text-violet-200/60 text-sm leading-relaxed max-w-xs mx-auto">{t('tarot3.subtitle')}</p>
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── INTRO PHASE ─────────────────────────────────── */}
            {phase === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 mb-5">
                  <label className="block text-violet-200/80 text-sm font-semibold mb-1">
                    {t('tarot3.questionLabel')}
                    <span className="text-violet-400/60 text-xs font-normal ml-1">{t('tarot3.questionOptional')}</span>
                  </label>
                  <textarea
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder={t('tarot3.questionPlaceholder')}
                    className="w-full bg-transparent text-white placeholder-violet-400/40 text-sm resize-none outline-none mt-1 leading-relaxed"
                    rows={3}
                    maxLength={200}
                  />
                </div>

                {/* Decorative card preview */}
                <div className="flex justify-center gap-3 mb-7 opacity-60">
                  {[0,1,2].map(i => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                      <CardBack w="min(150px, 28vw)" h="min(234px, 43.7vw)" />
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => setPhase('selection')}
                  className="w-full h-13 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-violet-900/40 border-0 transition-all"
                >
                  {t('tarot3.continueBtn')} →
                </Button>
              </motion.div>
            )}

            {/* ── SELECTION PHASE ─────────────────────────────── */}
            {phase === 'selection' && (
              <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <p className="text-center text-violet-200/70 text-sm mb-3 font-medium">{t('tarot3.selectInstruction')}</p>
                <p className="text-center text-violet-300/90 text-sm font-bold mb-4">
                  {t('tarot3.selectedCount', { count: selectedIds.length })}
                </p>

                {/* 22-card fan spread — 3 rows of 8/7/7 */}
                {(() => {
                  const CARD_W = 72, CARD_H = 114;
                  const STEP = 36;       // horizontal step between cards (overlap)
                  const MAX_DEG = 10;    // max rotation angle at edges
                  const ROW_H = CARD_H + 38; // container height per row (space for rotation)

                  const renderFanRow = (cards: typeof shuffled) => {
                    const n = cards.length;
                    const center = (n - 1) / 2;
                    const totalW = CARD_W + (n - 1) * STEP;

                    return (
                      <div className="relative mx-auto" style={{ width: totalW, height: ROW_H }}>
                        {cards.map((card, i) => {
                          const angle = ((i - center) / center) * MAX_DEG;
                          const orderIdx = selectedIds.indexOf(card.id);
                          const sel = orderIdx !== -1;
                          return (
                            <div
                              key={card.id}
                              style={{
                                position: 'absolute',
                                left: i * STEP,
                                bottom: 0,
                                transform: `rotate(${angle}deg)`,
                                transformOrigin: 'bottom center',
                                zIndex: sel ? 30 + i : i,
                              }}
                            >
                              <motion.div
                                onClick={() => handleCardClick(card.id)}
                                whileTap={{ scale: 0.93 }}
                                animate={sel ? { y: -14 } : { y: 0 }}
                                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                              >
                                <MiniCardBack selected={sel} selectionOrder={sel ? orderIdx + 1 : undefined} w={CARD_W} h={CARD_H} />
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  };

                  return (
                    <div className="flex flex-col gap-3 mb-6 items-center overflow-hidden w-full">
                      {renderFanRow(shuffled.slice(0, 8))}
                      {renderFanRow(shuffled.slice(8, 15))}
                      {renderFanRow(shuffled.slice(15, 22))}
                    </div>
                  );
                })()}

                <Button
                  onClick={selectedIds.length === 3 ? handleRead : undefined}
                  disabled={selectedIds.length < 3}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg shadow-violet-900/40 border-0 transition-all"
                >
                  {selectedIds.length < 3
                    ? t('tarot3.readBtnHint')
                    : t('tarot3.readBtn')}
                </Button>
              </motion.div>
            )}

            {/* ── READING PHASE ───────────────────────────────── */}
            {phase === 'reading' && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                {/* Question echo */}
                {question.trim() && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-5 text-center">
                    <p className="text-violet-300/70 text-xs mb-1">✦</p>
                    <p className="text-violet-100/80 text-sm italic leading-relaxed">"{question}"</p>
                  </div>
                )}

                {/* 3 cards row */}
                <div className="flex justify-center gap-3 mb-6">
                  {selectedCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, rotateY: 90, y: 20 }}
                      animate={revealed ? { opacity: 1, rotateY: 0, y: 0 } : { opacity: 0 }}
                      transition={{ delay: i * 0.25, duration: 0.5, type: 'spring', stiffness: 120 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <p className="text-violet-300/60 text-[10px] font-semibold tracking-widest uppercase text-center leading-tight"
                         style={{ maxWidth: 'min(150px, 28vw)' }}>
                        {positions[i]}
                      </p>
                      <ReadingCard card={card} locale={safeLocale} />
                    </motion.div>
                  ))}
                </div>

                {/* Card readings */}
                <div className="space-y-4 mb-6">
                  {selectedCards.map((card, i) => {
                    const posKey = positionKeys[i] as 'present' | 'advice' | 'future';
                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ delay: 0.7 + i * 0.2 }}
                        className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="shrink-0 w-6 h-6 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/50 flex items-center justify-center">
                            <span className="text-[#ffd700] text-[10px] font-black">{i + 1}</span>
                          </div>
                          <div>
                            <p className="text-violet-300/60 text-[10px] font-semibold tracking-widest uppercase">{positions[i]}</p>
                            <p className="text-[#ffd700] font-bold text-sm">{card.name[safeLocale]}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4 ml-9">
                          {card.keywords[safeLocale].map(kw => (
                            <span key={kw} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-900/60 text-violet-200/80 border border-violet-700/40">
                              {kw}
                            </span>
                          ))}
                        </div>
                        {/* 3-part structured reading */}
                        <div className="ml-9 space-y-3">
                          {/* 짧은 문장 */}
                          <p className="text-sm font-bold text-white leading-snug">
                            {card.reading[posKey][safeLocale].headline}
                          </p>
                          {/* 상징 해석 */}
                          <p className="text-sm text-violet-100/80 leading-relaxed">
                            {card.reading[posKey][safeLocale].symbol}
                          </p>
                          {/* 조언 */}
                          <div className="bg-[#ffd700]/8 rounded-xl px-3 py-2.5 border border-[#ffd700]/15">
                            <p className="text-[10px] text-[#ffd700]/60 font-semibold tracking-widest uppercase mb-1">
                              {safeLocale === 'ko' ? '조언' : safeLocale === 'ja' ? 'アドバイス' : safeLocale === 'es' ? 'Consejo' : 'Advice'}
                            </p>
                            <p className="text-sm text-violet-100/90 leading-relaxed">
                              {card.reading[posKey][safeLocale].advice}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Synthesis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-gradient-to-b from-violet-900/30 to-indigo-900/30 border border-violet-700/30 rounded-2xl p-5 mb-5"
                >
                  <p className="text-violet-300/60 text-[10px] font-semibold tracking-widest uppercase mb-1">{t('tarot3.synthesisSubtitle')}</p>
                  <p className="text-white font-bold text-base mb-3">{t('tarot3.synthesisTitle')}</p>
                  <div className="space-y-2">
                    {selectedCards.map(card => (
                      <p key={card.id} className="text-sm text-violet-100/70 leading-relaxed">
                        <span className="text-[#ffd700]/80 font-semibold">{card.name[safeLocale]}</span>
                        {' — '}{card.daily[safeLocale]}
                      </p>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <Button
                    onClick={handleReset}
                    className="w-full h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md transition-all"
                  >
                    🔮 {t('tarot3.resetBtn')}
                  </Button>
                </motion.div>

                {/* ── Share Section ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ delay: 2.1 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/40 text-xs font-medium shrink-0">{t('tarot3.snsDivider')}</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <ShareButtons
                    title={t('tarot3.shareTitle')}
                    text={t('tarot3.shareText', { cards: selectedCards.map(c => c.name[safeLocale]).join(' · ') })}
                    url={typeof window !== 'undefined' ? window.location.href : 'https://mytesttype.com/tarot'}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
