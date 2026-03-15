import { useState, useRef, forwardRef } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, Link as LinkIcon, RefreshCw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { ShareButtons } from "@/components/share-buttons";
import { SeoHead } from "@/components/SeoHead";

/* ─────────────────────────────────────────────
   PERSONA DATA (structural — names stay Korean as cultural brand)
───────────────────────────────────────────── */
interface Shaman {
  id: string;
  name: string;
  emoji: string;
  color: string;
  glow: string;
  border: string;
  personaKey: string;
}

const SHAMANS: Shaman[] = [
  { id: 'baby-bosal', name: '애기보살', emoji: '🌸', personaKey: 'baby_bosal',
    color: 'from-pink-500 to-rose-400', glow: 'shadow-pink-500/40', border: 'border-pink-400/40' },
  { id: 'sunnyeo-bosal', name: '선녀보살', emoji: '🌙', personaKey: 'sunnyeo_bosal',
    color: 'from-violet-600 to-indigo-500', glow: 'shadow-violet-500/40', border: 'border-violet-400/40' },
  { id: 'chunshin-doryeong', name: '천신도령', emoji: '⚡', personaKey: 'chunshin_doryeong',
    color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/40', border: 'border-amber-400/40' },
  { id: 'musog-in', name: '무속인', emoji: '🔮', personaKey: 'musog_in',
    color: 'from-emerald-600 to-teal-500', glow: 'shadow-emerald-500/40', border: 'border-emerald-400/40' },
  { id: 'beopsa', name: '법사', emoji: '📿', personaKey: 'beopsa',
    color: 'from-slate-600 to-blue-700', glow: 'shadow-slate-500/40', border: 'border-slate-400/40' },
];

/* ─────────────────────────────────────────────
   DESTINY ENGINE (deterministic, no random)
───────────────────────────────────────────── */
interface DestinyValues {
  turningAge: number;
  successAge: number;
  loveAges: [number, number, number];
  wealthStart: number;
  wealthEnd: number;
  warningAges: [number, number];
  lifeFlowType: '초반 고생형' | '중반 상승형' | '늦게 성공형' | '꾸준 상승형';
}

function hashBirth(year: number, month: number, day: number): number {
  return Math.abs((year * 2053 + month * 317 + day * 97) | 0);
}

function pick<T>(arr: T[], h: number, salt: number = 0): T {
  return arr[Math.abs((h * 31 + salt * 97) % arr.length)];
}

function calculateDestiny(year: number, month: number, day: number): DestinyValues {
  const h = hashBirth(year, month, day);

  const turningAge = pick([28, 31, 33, 36, 39, 41], h, 0);
  const successAge = turningAge + pick([2, 3, 4], h, 1);

  const lovePool = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
  const la1 = lovePool[(h * 7 + 3) % lovePool.length];
  let la2 = lovePool[(h * 13 + 11) % lovePool.length];
  let la3 = lovePool[(h * 17 + 23) % lovePool.length];
  if (la2 === la1) la2 = lovePool[(la2 + 2) % lovePool.length];
  if (la3 === la1 || la3 === la2) la3 = lovePool[(la3 + 3) % lovePool.length];
  const loveAges = ([la1, la2, la3].sort((a, b) => a - b)) as [number, number, number];

  const wealthStart = successAge + 1;
  const wealthEnd = wealthStart + 4 + (h % 3);

  const wa1 = turningAge - 2 - (h % 3);
  const wa2 = turningAge + 1 + ((h * 3) % 4);

  const lifeFlowTypes: DestinyValues['lifeFlowType'][] = ['초반 고생형', '중반 상승형', '늦게 성공형', '꾸준 상승형'];
  const lifeFlowType = pick(lifeFlowTypes, h, 5);

  return { turningAge, successAge, loveAges, wealthStart, wealthEnd, warningAges: [wa1, wa2], lifeFlowType };
}

/* ─────────────────────────────────────────────
   TEXT GENERATION (persona speech styles via i18n)
───────────────────────────────────────────── */
interface Section {
  icon: string;
  title: string;
  body: string;
  highlight?: string;
}

const LF_KEY_MAP: Record<string, string> = {
  '초반 고생형': 'early_hard',
  '중반 상승형': 'mid_rise',
  '늦게 성공형': 'late_success',
  '꾸준 상승형': 'steady_rise',
};

function generateSections(d: DestinyValues, shaman: Shaman, t: TFunction): Section[] {
  const lfKey = LF_KEY_MAP[d.lifeFlowType] || 'steady_rise';
  const flow = t(`kshaman.lifeFlow.${lfKey}`);
  const pk = shaman.personaKey;
  const { turningAge: ta, successAge: sa, loveAges: la, wealthStart: ws, wealthEnd: we, warningAges: wa } = d;
  const ageSuffix = t('kshaman.ui.ageSuffix');

  return [
    { icon: '🌟', title: t('kshaman.sec.summary'),  body: t(`kshaman.speech.${pk}.summary`,  { flow, ta }) },
    { icon: '✨', title: t('kshaman.sec.inborn'),   body: t(`kshaman.speech.${pk}.inborn`) },
    { icon: '🔄', title: t('kshaman.sec.turning'),  body: t(`kshaman.speech.${pk}.turning`,  { ta }), highlight: `${ta}${ageSuffix}` },
    { icon: '🚀', title: t('kshaman.sec.success'),  body: t(`kshaman.speech.${pk}.success`,  { sa }) },
    { icon: '💘', title: t('kshaman.sec.love'),     body: t(`kshaman.speech.${pk}.love`,     { la0: la[0], la1: la[1], la2: la[2] }) },
    { icon: '💰', title: t('kshaman.sec.wealth'),   body: t(`kshaman.speech.${pk}.wealth`,   { ws, we }) },
    { icon: '⚠️', title: t('kshaman.sec.warning'),  body: t(`kshaman.speech.${pk}.warning`,  { wa0: wa[0], wa1: wa[1] }) },
  ];
}

/* ─────────────────────────────────────────────
   STARS BG
───────────────────────────────────────────── */
const STARS = [
  { top: '5%', left: '3%', size: '4px', op: 0.5, d: 0 },
  { top: '12%', left: '91%', size: '3px', op: 0.4, d: 0.6 },
  { top: '35%', left: '95%', size: '5px', op: 0.5, d: 1.1 },
  { top: '55%', left: '2%', size: '4px', op: 0.4, d: 0.3 },
  { top: '75%', left: '88%', size: '3px', op: 0.45, d: 1.4 },
  { top: '88%', left: '15%', size: '4px', op: 0.35, d: 0.8 },
  { top: '20%', left: '48%', size: '3px', op: 0.3, d: 0.5 },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
type Step = 'persona' | 'form' | 'result';

export default function KShaman() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('persona');
  const [selected, setSelected] = useState<Shaman | null>(null);
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [destiny, setDestiny] = useState<DestinyValues | null>(null);
  const [saving, setSaving] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const handlePersonaSelect = (shaman: Shaman) => {
    setSelected(shaman);
    trackEvent('persona_select', { persona_id: shaman.id, persona_name: shaman.name });
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = () => {
    const y = parseInt(birthYear);
    const m = parseInt(birthMonth);
    const dy = parseInt(birthDay);
    if (!y || !m || !dy || !gender) return;
    if (y < 1940 || y > 2020 || m < 1 || m > 12 || dy < 1 || dy > 31) return;
    const d = calculateDestiny(y, m, dy);
    setDestiny(d);
    trackEvent('k_shaman_result_view', { persona_id: selected?.id, birth_year: y });
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('persona');
    setSelected(null);
    setBirthYear(''); setBirthMonth(''); setBirthDay('');
    setGender(null);
    setDestiny(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveImage = async () => {
    if (!shareCardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(shareCardRef.current, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement('a');
      link.download = 'k-shaman-reading.png';
      link.href = dataUrl;
      link.click();
      toast({ title: t('kshaman.ui.saveSuccess'), description: t('kshaman.ui.saveSuccessDesc') });
      trackEvent('k_shaman_share_save', { persona_id: selected?.id });
    } catch {
      toast({ variant: 'destructive', title: t('kshaman.ui.saveError'), description: t('kshaman.ui.saveErrorDesc') });
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/k-shaman');
      toast({ title: t('kshaman.ui.copySuccess'), description: t('kshaman.ui.copySuccessDesc') });
      trackEvent('k_shaman_share_link', { persona_id: selected?.id });
    } catch {
      toast({ variant: 'destructive', title: t('kshaman.ui.copyError'), description: t('kshaman.ui.copyErrorDesc') });
    }
  };

  const sections = (selected && destiny)
    ? generateSections(destiny, selected, t)
    : [];

  const isFormValid = birthYear.length === 4 && birthMonth && birthDay && gender;

  return (
    <Layout>
      <SeoHead title={t('seo.kshaman.title')} description={t('seo.kshaman.desc')} path="/k-shaman" />
      <div className="relative min-h-screen -mx-4 sm:-mx-6 -mt-6 px-4 sm:px-6 pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0720] via-[#130a2e] to-[#1a0d3a]" />
        {STARS.map((s, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={{ opacity: [s.op, s.op * 0.2, s.op] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: s.d }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-fuchsia-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: 보살 선택 ── */}
            {step === 'persona' && (
              <motion.div key="persona"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <div className="text-center mb-10">
                  <p className="text-purple-300/80 text-xs font-bold tracking-[0.3em] uppercase mb-3">🔮 K-Shaman Reading</p>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight whitespace-pre-line">
                    {t('kshaman.ui.heading')}
                  </h1>
                  <p className="text-purple-200/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto whitespace-pre-line">
                    {t('kshaman.ui.subtext')}
                  </p>
                </div>
                <div className="space-y-3">
                  {SHAMANS.map((shaman, i) => (
                    <motion.button key={shaman.id}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => handlePersonaSelect(shaman)}
                      className="w-full text-left group">
                      <div className={`relative rounded-2xl p-5 border ${shaman.border} bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${shaman.glow}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${shaman.color} flex items-center justify-center text-2xl shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                            {shaman.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-white font-black text-lg">{shaman.name}</span>
                              <span className="text-purple-300/60 text-xs font-medium">
                                {t(`kshaman.persona.${shaman.personaKey}.title`)}
                              </span>
                            </div>
                            <p className="text-purple-200/70 text-sm leading-snug">
                              {t(`kshaman.persona.${shaman.personaKey}.vibe`)}
                            </p>
                          </div>
                          <span className="text-purple-300/60 text-lg shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <p className="text-center text-purple-300/40 text-xs mt-8">
                  {t('kshaman.ui.footerNote')}
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: 생년월일·성별 입력 ── */}
            {step === 'form' && selected && (
              <motion.div key="form"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <button onClick={() => setStep('persona')}
                  className="flex items-center gap-1.5 text-purple-300/70 hover:text-white transition-colors mb-6 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /> {t('kshaman.ui.backToPersona')}
                </button>

                {/* 선택된 보살 미니 카드 */}
                <div className={`flex items-center gap-3 bg-white/5 border ${selected.border} rounded-2xl px-4 py-3 mb-8`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-xl shrink-0`}>
                    {selected.emoji}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{selected.name}</p>
                    <p className="text-purple-300/60 text-xs">{t(`kshaman.persona.${selected.personaKey}.vibe`)}</p>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-white mb-2">{t('kshaman.ui.formTitle')}</h2>
                  <p className="text-purple-200/60 text-sm">{t('kshaman.ui.formSubtitle')}</p>
                </div>

                {/* 생년월일 입력 */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-2">
                      {t('kshaman.ui.birthYear')}
                    </label>
                    <input
                      type="number"
                      placeholder={t('kshaman.ui.yearPlaceholder')}
                      value={birthYear}
                      onChange={e => setBirthYear(e.target.value)}
                      min={1940} max={2020}
                      className="w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-lg font-bold outline-none focus:border-violet-400/60 focus:bg-white/12 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-2">
                        {t('kshaman.ui.monthLabel')}
                      </label>
                      <select
                        value={birthMonth}
                        onChange={e => setBirthMonth(e.target.value)}
                        className="w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white text-base font-bold outline-none focus:border-violet-400/60 transition-all appearance-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <option value="" style={{ background: '#130a2e' }}>{t('kshaman.ui.monthSelect')}</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1} style={{ background: '#130a2e' }}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-2">
                        {t('kshaman.ui.dayLabel')}
                      </label>
                      <select
                        value={birthDay}
                        onChange={e => setBirthDay(e.target.value)}
                        className="w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white text-base font-bold outline-none focus:border-violet-400/60 transition-all appearance-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <option value="" style={{ background: '#130a2e' }}>{t('kshaman.ui.daySelect')}</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1} style={{ background: '#130a2e' }}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 성별 선택 */}
                <div className="mb-8">
                  <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-3">
                    {t('kshaman.ui.genderLabel')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['female', 'male'] as const).map(g => (
                      <button key={g}
                        onClick={() => setGender(g)}
                        className={`rounded-xl py-3.5 font-black text-base transition-all border ${gender === g
                          ? 'bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/5 border-white/15 text-purple-200/70 hover:bg-white/10 hover:text-white'}`}>
                        {g === 'female' ? t('kshaman.ui.female') : t('kshaman.ui.male')}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleFormSubmit}
                  disabled={!isFormValid}
                  className="w-full h-14 rounded-2xl font-black text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-xl shadow-violet-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  {t('kshaman.ui.readingBtn')}
                </Button>
              </motion.div>
            )}

            {/* ── STEP 3: 결과 ── */}
            {step === 'result' && selected && destiny && (
              <motion.div key="result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                {/* 뒤로가기 */}
                <button onClick={() => setStep('form')}
                  className="flex items-center gap-1.5 text-purple-300/70 hover:text-white transition-colors mb-6 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /> {t('kshaman.ui.reEnter')}
                </button>

                {/* Shaman header */}
                <div className={`relative rounded-[2rem] overflow-hidden mb-8 border ${selected.border} shadow-2xl ${selected.glow}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-20`} />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  <div className="relative z-10 p-7 text-center">
                    <div className="text-5xl mb-3">{selected.emoji}</div>
                    <p className="text-purple-300/80 text-xs font-bold tracking-[0.2em] uppercase mb-1">
                      {t('kshaman.ui.readingOf', { name: selected.name })}
                    </p>
                    <div className="text-purple-200/60 text-xs mt-1">
                      {birthYear}.{birthMonth}.{birthDay} · {gender === 'female' ? t('kshaman.ui.genderFemale') : t('kshaman.ui.genderMale')}
                    </div>
                  </div>
                </div>

                {/* 인생 전환 시기 강조 배너 */}
                <div className="relative rounded-2xl overflow-hidden mb-6 border border-amber-400/30 bg-gradient-to-br from-amber-900/40 to-orange-900/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
                  <div className="relative z-10 p-6 text-center">
                    <p className="text-amber-300/80 text-xs font-bold tracking-widest uppercase mb-2">
                      {t('kshaman.ui.turningBanner')}
                    </p>
                    <div className="text-7xl font-black text-amber-400 leading-none mb-2"
                      style={{ textShadow: '0 0 30px rgba(251,191,36,0.5)' }}>
                      {destiny.turningAge}{t('kshaman.ui.ageSuffix')}
                    </div>
                    <p className="text-amber-200/70 text-sm">{t('kshaman.ui.turningSubtext')}</p>
                  </div>
                </div>

                {/* 7 섹션 */}
                <div className="space-y-4 mb-8">
                  {sections.map((sec, i) => (
                    <motion.div key={sec.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}>
                      <SectionCard section={sec} />
                    </motion.div>
                  ))}
                </div>

                {/* 공유 카드 (캡처 대상) */}
                <div className="flex justify-center mb-6">
                  <ShamanShareCard
                    ref={shareCardRef}
                    shaman={selected}
                    destiny={destiny}
                    birthYear={birthYear}
                    birthMonth={birthMonth}
                    birthDay={birthDay}
                    gender={gender || 'female'}
                  />
                </div>

                {/* 공유 버튼들 */}
                <div className="space-y-3 mb-4">
                  <button
                    onClick={handleSaveImage}
                    disabled={saving}
                    className="w-full h-12 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60">
                    <Download className="w-5 h-5" />
                    {saving ? t('kshaman.ui.saveImageSaving') : t('kshaman.ui.saveImage')}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="h-12 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center gap-2 transition-all">
                      <LinkIcon className="w-4 h-4" /> {t('kshaman.ui.copyLink')}
                    </button>
                    <button
                      onClick={handleReset}
                      className="h-12 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center gap-2 transition-all">
                      <RefreshCw className="w-4 h-4" /> {t('kshaman.ui.newReading')}
                    </button>
                  </div>
                </div>

                {/* SNS 바이럴 공유 */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-white/15" />
                    <span className="text-xs text-white/45 font-medium tracking-wide">{t('result.snsDivider')}</span>
                    <div className="flex-1 h-px bg-white/15" />
                  </div>
                  <ShareButtons
                    title={selected ? t('kshaman.ui.cardReading', { name: selected.name }) : ''}
                    text={t('kshaman.ui.shareText')}
                    url={window.location.origin + '/k-shaman'}
                    testSlug="k-shaman"
                    resultKey={selected?.id ?? ''}
                  />
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

/* ─────────────────────────────────────────────
   SECTION CARD
───────────────────────────────────────────── */
function SectionCard({ section }: { section: Section }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-xl">{section.icon}</span>
        <h3 className="font-black text-white text-base">{section.title}</h3>
      </div>
      {section.highlight && (
        <div className="text-4xl font-black text-amber-400 mb-2"
          style={{ textShadow: '0 0 20px rgba(251,191,36,0.4)' }}>
          {section.highlight}
        </div>
      )}
      <p className="text-purple-100/80 text-sm leading-relaxed">{section.body}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHAMAN SHARE CARD (캡처용)
───────────────────────────────────────────── */
interface ShamanShareCardProps {
  shaman: Shaman;
  destiny: DestinyValues;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
}

const ShamanShareCard = forwardRef<HTMLDivElement, ShamanShareCardProps>(
  ({ shaman, destiny, birthYear, birthMonth, birthDay, gender }, ref) => {
    const { t } = useTranslation();
    const ageSuffix = t('kshaman.ui.ageSuffix');
    const genderLabel = gender === 'female' ? t('kshaman.ui.genderFemale') : t('kshaman.ui.genderMale');
    const cardReading = t('kshaman.ui.cardReading', { name: shaman.name });
    const turningAge = t('kshaman.ui.turningAge');
    const successInfo = t('kshaman.ui.successInfo', {
      sa: destiny.successAge,
      ws: destiny.wealthStart,
      we: destiny.wealthEnd,
    });

    return (
      <div ref={ref} style={{
        width: 360,
        height: 480,
        background: 'linear-gradient(150deg, #0d0720 0%, #130a2e 50%, #1a0d3a 100%)',
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 32px',
        boxSizing: 'border-box',
      }}>
        {/* Gold glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        {/* Star dots */}
        {[
          { top: 24, left: 28, r: 2 }, { top: 40, left: 320, r: 1.5 },
          { top: 100, left: 340, r: 2 }, { top: 360, left: 20, r: 1.5 },
          { top: 420, left: 320, r: 2 },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', top: s.top, left: s.left,
            width: s.r * 2, height: s.r * 2, borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
          }} />
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
          {/* Brand */}
          <p style={{ color: 'rgba(196,181,253,0.6)', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', marginBottom: 20 }}>
            INNERMETER · K-SHAMAN READING
          </p>

          {/* Persona emoji */}
          <div style={{ fontSize: 52, marginBottom: 12, lineHeight: 1 }}>{shaman.emoji}</div>

          {/* Persona name / reading label */}
          <p style={{ color: 'rgba(216,180,254,0.8)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            {cardReading}
          </p>

          {/* Divider */}
          <div style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)',
            margin: '0 auto 24px',
          }} />

          {/* Label */}
          <p style={{ color: 'rgba(196,181,253,0.6)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 8 }}>
            {turningAge}
          </p>

          {/* BIG turning age */}
          <div style={{
            fontSize: 88, fontWeight: 900, lineHeight: 1,
            background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 60%, #d97706 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5))',
            marginBottom: 4,
          }}>
            {destiny.turningAge}
          </div>
          {ageSuffix && (
            <p style={{
              fontSize: 28, fontWeight: 900,
              background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 24,
            }}>{ageSuffix}</p>
          )}
          {!ageSuffix && <div style={{ marginBottom: 24 }} />}

          {/* Sub info */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 14, padding: '10px 20px', marginBottom: 24,
          }}>
            <p style={{ color: 'rgba(196,181,253,0.75)', fontSize: 12, fontWeight: 500 }}>
              {successInfo}
            </p>
          </div>

          {/* Birth info */}
          <p style={{ color: 'rgba(196,181,253,0.5)', fontSize: 11 }}>
            {birthYear}.{birthMonth}.{birthDay} · {genderLabel}
          </p>
        </div>
      </div>
    );
  }
);
ShamanShareCard.displayName = 'ShamanShareCard';
