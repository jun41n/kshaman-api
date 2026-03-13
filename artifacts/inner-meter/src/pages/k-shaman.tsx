import { useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, Link as LinkIcon, RefreshCw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

/* ─────────────────────────────────────────────
   PERSONA DATA
───────────────────────────────────────────── */
interface Shaman {
  id: string;
  name: string;
  title: string;
  emoji: string;
  vibe: string;
  color: string;
  glow: string;
  border: string;
}

const SHAMANS: Shaman[] = [
  { id: 'baby-bosal', name: '애기보살', title: '귀염둥이 신령', emoji: '🌸',
    vibe: '친근하고 솔직한 20대 보살님',
    color: 'from-pink-500 to-rose-400', glow: 'shadow-pink-500/40', border: 'border-pink-400/40' },
  { id: 'sunnyeo-bosal', name: '선녀보살', title: '달빛의 신령', emoji: '🌙',
    vibe: '우아하고 신비로운 중년 보살님',
    color: 'from-violet-600 to-indigo-500', glow: 'shadow-violet-500/40', border: 'border-violet-400/40' },
  { id: 'chunshin-doryeong', name: '천신도령', title: '하늘의 신령', emoji: '⚡',
    vibe: '강하고 자신감 넘치는 청년 신령',
    color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/40', border: 'border-amber-400/40' },
  { id: 'musog-in', name: '무속인', title: '전통의 신령', emoji: '🔮',
    vibe: '솔직하고 직설적인 전통 무속인',
    color: 'from-emerald-600 to-teal-500', glow: 'shadow-emerald-500/40', border: 'border-emerald-400/40' },
  { id: 'beopsa', name: '법사', title: '지혜의 신령', emoji: '📿',
    vibe: '고요하고 철학적인 노년 법사',
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
   TEXT GENERATION (persona speech styles)
───────────────────────────────────────────── */
interface Section {
  icon: string;
  title: string;
  body: string;
  highlight?: string;
}

function generateSections(d: DestinyValues, persona: string, gender: string): Section[] {
  const genderWord = gender === 'female' ? '언니야' : '형이야';
  const genderWordN = gender === 'female' ? '이 분' : '이 분';
  const { turningAge: ta, successAge: sa, loveAges: la, wealthStart: ws, wealthEnd: we, warningAges: wa, lifeFlowType: lf } = d;

  const summary: Record<string, string> = {
    'baby-bosal': `음… 흐름을 보니 딱 ${lf}이에요. 가만히 보니 ${ta}세 전후로 뭔가 크게 달라지는 기운이 있어요. 그때까지는 좀 답답할 수 있는데, 그게 다 이유가 있어요.`,
    'sunnyeo-bosal': `운의 흐름이 부드럽게 움직입니다. ${lf}의 기운을 지니고 계시며, ${ta}세 전후로 삶의 물길이 새롭게 열리는 흐름이 보입니다.`,
    'chunshin-doryeong': `${lf}이야. ${ta}세 전후가 전환점이다. 그 시기가 오기 전까지 단단히 준비해둬. 여기서 길이 갈린다.`,
    'musog-in': `사주 흐름을 보면 ${lf}야. ${ta}세 전후로 운이 살아나는 흐름이고, 그 전까지는 다소 막히는 부분이 있을 수 있어.`,
    'beopsa': `${lf}의 운명을 지니고 계십니다. ${ta}세 전후로 삶의 흐름이 크게 전환되는 시기가 찾아옵니다. 이 시기를 잘 준비하십시오.`,
  };

  const inborn: Record<string, string> = {
    'baby-bosal': `이런 기운이 있네요. 한번 흐름이 열리면 꾸준히 올라가는 타입이에요. 근데 초반에 좀 치이는 경험이 있는데, 그게 나중에 다 자산이 돼요. 지금 힘들어도 버텨요~`,
    'sunnyeo-bosal': `당신은 한번 운의 문이 열리면 그 흐름이 끊이지 않는 기운을 타고났습니다. 지금 당장은 보이지 않더라도 좋은 기운이 이어지고 있으니 조급해하지 마세요.`,
    'chunshin-doryeong': `타고난 기운이 강해. 흐름이 한번 열리면 멈추지 않는 타입이야. 다만 혼자 모든 걸 짊어지려는 경향이 있어. 그거 좀 내려놔.`,
    'musog-in': `타고난 기운 보면 의지력이 강한 편이야. 쉽게 포기 안 하고 꾸준히 가는 스타일인데, 그게 제일 큰 무기야.`,
    'beopsa': `당신의 내면에는 흔들리지 않는 고요한 힘이 있습니다. 겉으로는 보이지 않지만, 어떤 어려움에도 결국 중심을 잡는 기운을 타고났습니다.`,
  };

  const turning: Record<string, string> = {
    'baby-bosal': `${ta}세 전후로 인생이 진짜 달라져요. 이게 막연한 말이 아니라, 그즈음에 직업이든 관계든 거주지든 뭔가 큰 변화가 생겨요. 무서워하지 말고 흐름에 올라타봐요.`,
    'sunnyeo-bosal': `${ta}세 전후로 삶의 기운이 새롭게 흐르기 시작합니다. 이 시기에는 새로운 인연과 기회가 자연스럽게 찾아오니, 마음을 열고 받아들이시면 됩니다.`,
    'chunshin-doryeong': `${ta}세. 이 시기가 전환점이다. 여기서 방향을 제대로 잡아야 해. 흔들리면 안 돼. 이 시기를 놓치면 다음 기회는 한참 뒤야.`,
    'musog-in': `${ta}세 전후로 운이 크게 바뀌는 시기야. 이 시기 이후로 흐름이 달라지기 시작하는데, 그 변화를 두려워하지 말고 받아들여야 해.`,
    'beopsa': `${ta}세 전후, 이 시기는 삶의 방향이 결정되는 중요한 전환점입니다. 서두르지 말고, 깊이 생각하고 신중하게 선택하십시오.`,
  };

  const success: Record<string, string> = {
    'baby-bosal': `${sa}세 이후에는 사회적으로 뭔가 자리가 잡히는 느낌이에요. 인정받기 시작하고, 경제적으로도 안정이 들어오는 흐름이에요. 그때 되면 지금 고생했던 게 다 의미 있었구나 싶을 거예요.`,
    'sunnyeo-bosal': `${sa}세 이후로 사회적인 결실이 맺히기 시작합니다. 그동안 묵묵히 쌓아온 노력이 빛을 발하는 시기이니, 지금의 과정을 믿으세요.`,
    'chunshin-doryeong': `${sa}세부터 성취가 들어온다. 그 전까지 쌓아놓은 것들이 결과로 나타나는 시기야. 여기서 방심하지 마. 계속 달려야 해.`,
    'musog-in': `${sa}세 이후에는 사회적 안정이나 성취가 들어오는 흐름이 보여. 이 시기에 맞춰 준비를 잘 해두면 더 크게 열려.`,
    'beopsa': `${sa}세 이후, 오랜 노력의 결실이 보이기 시작합니다. 이 시기의 성취는 욕심에서 비롯된 것이 아닌, 성실함에 대한 보상임을 기억하십시오.`,
  };

  const love: Record<string, string> = {
    'baby-bosal': `연애운은요~ ${la[0]}세, ${la[1]}세, ${la[2]}세 전후로 강하게 들어오는 흐름이에요. 특히 이 시기에 만나는 사람이 진짜 의미 있을 수 있어요. 지나치지 마요!`,
    'sunnyeo-bosal': `사랑의 기운은 ${la[0]}세, ${la[1]}세, ${la[2]}세 전후로 강하게 흐릅니다. 이 시기에 만나는 인연은 단순한 스침이 아니라 깊은 연결일 수 있으니, 마음을 열어두세요.`,
    'chunshin-doryeong': `연애운은 ${la[0]}세, ${la[1]}세, ${la[2]}세 전후로 강하게 들어온다. 이 타이밍에 기회 왔을 때 망설이지 마. 그냥 해. 생각만 하다가 다 놓쳐.`,
    'musog-in': `연애 흐름 보면 ${la[0]}세, ${la[1]}세, ${la[2]}세 전후에 강한 인연이 들어오는 기운이야. 이 시기에 만나는 사람 허투루 보지 마.`,
    'beopsa': `사랑의 인연은 ${la[0]}세, ${la[1]}세, ${la[2]}세 전후로 찾아옵니다. 억지로 만들려 하지 마시고, 그 시기에 자연스럽게 열리는 마음을 따라가십시오.`,
  };

  const wealth: Record<string, string> = {
    'baby-bosal': `재물운은 ${ws}세부터 ${we}세까지 점점 안정되는 흐름이에요. 이 시기에 무리하게 뭔가를 벌려고 하기보다는 차곡차곡 쌓는 게 진짜 이득이에요. 조급해하지 마요~`,
    'sunnyeo-bosal': `재물의 흐름은 ${ws}세부터 ${we}세까지 서서히 안정되어 갑니다. 작은 것에도 감사하는 마음으로 성실하게 임하시면, 풍요로운 기운이 자연스럽게 따라옵니다.`,
    'chunshin-doryeong': `${ws}세부터 ${we}세까지 재물운이 열린다. 이 시기에 투자든 사업이든 뭔가 결단을 내려야 해. 단, 도박성 있는 건 절대 안 돼. 정직하게 쌓아.`,
    'musog-in': `재물 흐름은 ${ws}세부터 ${we}세까지 점차 안정되는 흐름이야. 이 시기에 무리한 욕심 부리면 오히려 흩어지니까 조심해.`,
    'beopsa': `${ws}세부터 ${we}세까지 재물이 안정되는 시기입니다. 탐욕을 내려놓고 정직하게 노력하는 자에게 재물은 반드시 돌아옵니다. 이 시기를 경솔하게 쓰지 마십시오.`,
  };

  const warning: Record<string, string> = {
    'baby-bosal': `${wa[0]}세랑 ${wa[1]}세 전후에는 좀 조심해야 해요. 이때는 결정을 서두르거나 감정적으로 뭔가 하면 후회할 수 있어요. 일단 잠깐 멈추고 생각해봐요. 나도 그때 보면서 좀 걱정됐거든요.`,
    'sunnyeo-bosal': `${wa[0]}세와 ${wa[1]}세 전후에는 결정이나 관계에서 신중을 기하셔야 합니다. 서두르지 마시고, 마음을 고요히 한 뒤 선택하십시오. 이 시기는 지혜롭게 지나가야 합니다.`,
    'chunshin-doryeong': `${wa[0]}세, ${wa[1]}세 전후는 주의해야 할 시기야. 이때 섣불리 판단하면 크게 후회한다. 여기서 조심해야 다음 기회를 잡을 수 있어.`,
    'musog-in': `${wa[0]}세와 ${wa[1]}세 전후에는 판단을 조심해야 해. 이 시기에는 뭔가 결정을 내릴 때 두 번 세 번 생각하고, 주변 사람들 말도 들어봐.`,
    'beopsa': `${wa[0]}세와 ${wa[1]}세 전후에는 조심해야 합니다. 이 시기에는 판단을 서두르면 안 됩니다. 중요한 결정이라면 반드시 시간을 두고 깊이 숙고하십시오.`,
  };

  return [
    { icon: '🌟', title: '한줄 총평', body: summary[persona] || summary['musog-in'] },
    { icon: '✨', title: '타고난 기운', body: inborn[persona] || inborn['musog-in'] },
    { icon: '🔄', title: '인생 전환 시기', body: turning[persona] || turning['musog-in'], highlight: `${ta}세` },
    { icon: '🚀', title: '성공 흐름', body: success[persona] || success['musog-in'] },
    { icon: '💘', title: '연애 흐름', body: love[persona] || love['musog-in'] },
    { icon: '💰', title: '재물 흐름', body: wealth[persona] || wealth['musog-in'] },
    { icon: '⚠️', title: '조심해야 할 시기', body: warning[persona] || warning['musog-in'] },
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
    if (y < 1940 || y > 2010 || m < 1 || m > 12 || dy < 1 || dy > 31) return;
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
      toast({ title: '이미지 저장 완료! 🔮', description: '갤러리에서 확인해보세요.' });
      trackEvent('k_shaman_share_save', { persona_id: selected?.id });
    } catch {
      toast({ variant: 'destructive', title: '저장 실패', description: '다시 시도해주세요.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/k-shaman');
      toast({ title: '링크 복사 완료! 🎉', description: '친구에게 공유해보세요.' });
      trackEvent('k_shaman_share_link', { persona_id: selected?.id });
    } catch {
      toast({ variant: 'destructive', title: '복사 실패', description: '다시 시도해주세요.' });
    }
  };

  const sections = (selected && destiny)
    ? generateSections(destiny, selected.id, gender || 'female')
    : [];

  const isFormValid = birthYear.length === 4 && birthMonth && birthDay && gender;

  return (
    <Layout>
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
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    누구에게 점사를 볼까요?
                  </h1>
                  <p className="text-purple-200/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                    보살마다 말투도 다르고, 해석도 다릅니다.<br />
                    마음이 끌리는 분을 선택하세요.
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
                              <span className="text-purple-300/60 text-xs font-medium">{shaman.title}</span>
                            </div>
                            <p className="text-purple-200/70 text-sm leading-snug">{shaman.vibe}</p>
                          </div>
                          <span className="text-purple-300/60 text-lg shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <p className="text-center text-purple-300/40 text-xs mt-8">
                  인생 전환 시기 · 연애운 · 재물운 · 성공 흐름 확인
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: 생년월일·성별 입력 ── */}
            {step === 'form' && selected && (
              <motion.div key="form"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <button onClick={() => setStep('persona')}
                  className="flex items-center gap-1.5 text-purple-300/70 hover:text-white transition-colors mb-6 text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /> 다른 보살 선택하기
                </button>

                {/* 선택된 보살 미니 카드 */}
                <div className={`flex items-center gap-3 bg-white/5 border ${selected.border} rounded-2xl px-4 py-3 mb-8`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-xl shrink-0`}>
                    {selected.emoji}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{selected.name}</p>
                    <p className="text-purple-300/60 text-xs">{selected.vibe}</p>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-white mb-2">생년월일을 알려주세요</h2>
                  <p className="text-purple-200/60 text-sm">정확할수록 더 깊은 점사를 봐드려요</p>
                </div>

                {/* 생년월일 입력 */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-2">출생연도</label>
                    <input
                      type="number"
                      placeholder="예: 1995"
                      value={birthYear}
                      onChange={e => setBirthYear(e.target.value)}
                      min={1940} max={2010}
                      className="w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-lg font-bold outline-none focus:border-violet-400/60 focus:bg-white/12 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-2">월</label>
                      <select
                        value={birthMonth}
                        onChange={e => setBirthMonth(e.target.value)}
                        className="w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white text-base font-bold outline-none focus:border-violet-400/60 transition-all appearance-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <option value="" style={{ background: '#130a2e' }}>월 선택</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1} style={{ background: '#130a2e' }}>{i + 1}월</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-2">일</label>
                      <select
                        value={birthDay}
                        onChange={e => setBirthDay(e.target.value)}
                        className="w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white text-base font-bold outline-none focus:border-violet-400/60 transition-all appearance-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                      >
                        <option value="" style={{ background: '#130a2e' }}>일 선택</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1} style={{ background: '#130a2e' }}>{i + 1}일</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 성별 선택 */}
                <div className="mb-8">
                  <label className="text-purple-300/80 text-xs font-bold tracking-wider uppercase block mb-3">성별</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['female', 'male'] as const).map(g => (
                      <button key={g}
                        onClick={() => setGender(g)}
                        className={`rounded-xl py-3.5 font-black text-base transition-all border ${gender === g
                          ? 'bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/5 border-white/15 text-purple-200/70 hover:bg-white/10 hover:text-white'}`}>
                        {g === 'female' ? '👩 여성' : '👨 남성'}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleFormSubmit}
                  disabled={!isFormValid}
                  className="w-full h-14 rounded-2xl font-black text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-xl shadow-violet-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  🔮 점사 보기
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
                  <ArrowLeft className="w-4 h-4" /> 다시 입력하기
                </button>

                {/* Shaman header */}
                <div className={`relative rounded-[2rem] overflow-hidden mb-8 border ${selected.border} shadow-2xl ${selected.glow}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-20`} />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  <div className="relative z-10 p-7 text-center">
                    <div className="text-5xl mb-3">{selected.emoji}</div>
                    <p className="text-purple-300/80 text-xs font-bold tracking-[0.2em] uppercase mb-1">{selected.name}의 점사</p>
                    <div className="text-purple-200/60 text-xs mt-1">
                      {birthYear}년 {birthMonth}월 {birthDay}일생 · {gender === 'female' ? '여성' : '남성'}
                    </div>
                  </div>
                </div>

                {/* 인생 전환 시기 강조 배너 */}
                <div className="relative rounded-2xl overflow-hidden mb-6 border border-amber-400/30 bg-gradient-to-br from-amber-900/40 to-orange-900/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
                  <div className="relative z-10 p-6 text-center">
                    <p className="text-amber-300/80 text-xs font-bold tracking-widest uppercase mb-2">인생 전환 시기</p>
                    <div className="text-7xl font-black text-amber-400 leading-none mb-2"
                      style={{ textShadow: '0 0 30px rgba(251,191,36,0.5)' }}>
                      {destiny.turningAge}세
                    </div>
                    <p className="text-amber-200/70 text-sm">이 시기 전후로 삶의 흐름이 달라집니다</p>
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
                    {saving ? '저장 중...' : '결과 이미지 저장'}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="h-12 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center gap-2 transition-all">
                      <LinkIcon className="w-4 h-4" /> 링크 복사
                    </button>
                    <button
                      onClick={handleReset}
                      className="h-12 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center gap-2 transition-all">
                      <RefreshCw className="w-4 h-4" /> 다시 점사 보기
                    </button>
                  </div>
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
import { forwardRef } from "react";

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

          {/* Persona name */}
          <p style={{ color: 'rgba(216,180,254,0.8)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            {shaman.name}이 본 점사
          </p>

          {/* Divider */}
          <div style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)',
            margin: '0 auto 24px',
          }} />

          {/* Label */}
          <p style={{ color: 'rgba(196,181,253,0.6)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 8 }}>
            내 인생 전환 시기
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
          <p style={{
            fontSize: 28, fontWeight: 900,
            background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 24,
          }}>세</p>

          {/* Sub info */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 14, padding: '10px 20px', marginBottom: 24,
          }}>
            <p style={{ color: 'rgba(196,181,253,0.75)', fontSize: 12, fontWeight: 500 }}>
              성공 흐름: {destiny.successAge}세 이후 · 재물 안정: {destiny.wealthStart}~{destiny.wealthEnd}세
            </p>
          </div>

          {/* Birth info */}
          <p style={{ color: 'rgba(196,181,253,0.5)', fontSize: 11 }}>
            {birthYear}.{birthMonth}.{birthDay} · {gender === 'female' ? '여성' : '남성'}
          </p>
        </div>
      </div>
    );
  }
);
ShamanShareCard.displayName = 'ShamanShareCard';
