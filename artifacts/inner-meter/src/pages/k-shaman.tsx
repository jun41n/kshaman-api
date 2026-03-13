import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Coins, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Shaman {
  id: string;
  name: string;
  title: string;
  emoji: string;
  vibe: string;
  color: string;
  glow: string;
  border: string;
  reading: {
    love: string;
    wealth: string;
    life: string;
  };
}

const SHAMANS: Shaman[] = [
  {
    id: 'baby-bosal',
    name: '애기보살',
    title: '귀염둥이 신령',
    emoji: '🌸',
    vibe: '친근하고 솔직한 20대 보살님',
    color: 'from-pink-500 to-rose-400',
    glow: 'shadow-pink-500/40',
    border: 'border-pink-400/40',
    reading: {
      love: '언니(오빠)야~ 오늘 사랑 쪽 기운이 완전 좋은데? 좋아하는 사람 있으면 지금 당장 말 걸어봐. 진짜야. 귀신같이 잘 풀릴 것 같은 느낌 있어. 혼자 고민하다 타이밍 놓치면 나 진짜 속상해... 솔직하게 마음 표현하면 돼. 상대도 생각 있거든. 힘내!',
      wealth: '돈 얘기 하자면~ 지금 당장 대박은 아닌데 꾸준히 하면 분명히 쌓여. 충동구매 좀 자제하고 작은 거라도 저금 시작해봐. 한 달 후에 분명 다른 느낌 날 거야. 그리고 요즘 새로운 부업이나 아이디어 생각나는 거 있지? 그거 한 번 믿어봐!',
      life: '전체적으로 에너지 되게 좋아 지금. 근데 혼자 너무 짊어지고 있는 거 있는 것 같아. 주변 사람한테 솔직하게 말해봐. 다 혼자 해결하려고 하면 지쳐. 도움 받는 것도 실력이야. 오늘은 하고 싶은 거 하나만 골라서 즐겨봐. 인생 뭐 있어~',
    },
  },
  {
    id: 'sunnyeo-bosal',
    name: '선녀보살',
    title: '달빛의 신령',
    emoji: '🌙',
    vibe: '우아하고 신비로운 중년 보살님',
    color: 'from-violet-600 to-indigo-500',
    glow: 'shadow-violet-500/40',
    border: 'border-violet-400/40',
    reading: {
      love: '달빛이 당신의 마음을 비추고 있습니다. 사랑의 실이 서서히 이어지고 있는 기운이 느껴지는군요. 서두르지 마세요. 인연이란 억지로 당긴다고 가까워지지 않습니다. 지금은 나 자신을 더욱 아름답게 가꾸는 시간입니다. 당신이 빛날수록 올바른 인연이 자연스럽게 다가올 것입니다.',
      wealth: '재물의 기운이 흩어지지 않도록 마음을 고요히 하십시오. 지금 당장 눈앞의 이익을 쫓기보다는 씨앗을 심는 심정으로 준비하시면, 머지않아 풍요로운 수확의 기운이 찾아올 것입니다. 작은 것에도 감사하는 마음이 재물을 불러옵니다.',
      life: '당신의 내면에 이미 모든 답이 있습니다. 다만 세상의 소음에 가려 들리지 않을 뿐이지요. 잠시 눈을 감고 본인의 목소리에 귀를 기울여 보세요. 이미 알고 있는 것을 용기 내어 실행할 때, 당신의 운명이 아름답게 펼쳐질 것입니다.',
    },
  },
  {
    id: 'chunshin-doryeong',
    name: '천신도령',
    title: '하늘의 신령',
    emoji: '⚡',
    vibe: '강하고 자신감 넘치는 청년 신령',
    color: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/40',
    border: 'border-amber-400/40',
    reading: {
      love: '하늘의 기운이 강하게 내린다! 사랑에 있어서 지금 네 앞에 분명한 기회가 보여. 망설이지 마. 머뭇거리다가 시간 다 보내면 후회한다. 마음속에 담아둔 사람, 지금 당장 행동으로 보여줘. 하늘은 용감한 자를 돕는다. 지금 네가 먼저 나서는 게 맞아.',
      wealth: '지금 네 재물 기운 보니까 묶여 있는 에너지가 있네. 뭔가 결정을 미루고 있는 거 아냐? 그게 걸리고 있어. 이번 주 안에 결단 내려. 망설이면 기회는 지나간다. 단, 도박이나 빠른 수익 노리는 건 금물. 차근차근 정직하게 쌓아나가면 분명 빛이 보인다.',
      life: '지금 네 상황, 쉽지 않은 거 안다. 하지만 이게 바로 네가 강해지는 과정이야. 하늘에서 볼 때 너는 분명 이 시련을 이겨낼 사람이야. 포기하지 마. 한 번만 더 힘내봐. 진짜 기운이 바뀌려고 하는 시점이 지금이야. 조금만 더 버텨.',
    },
  },
  {
    id: 'musog-in',
    name: '무속인',
    title: '전통의 신령',
    emoji: '🔮',
    vibe: '솔직하고 직설적인 전통 무속인',
    color: 'from-emerald-600 to-teal-500',
    glow: 'shadow-emerald-500/40',
    border: 'border-emerald-400/40',
    reading: {
      love: '에이, 뭘 그리 고민해. 보면 알잖아. 그 사람 너 좋아해. 근데 서로 눈치만 보고 있는 거야. 둘 다 답답해. 한 명이 먼저 나서야 풀려. 그게 네가 돼야 해. 귀신같이 알아? 지금 타이밍이야. 나중에 "그때 왜 그랬을까" 하기 싫으면 지금 해.',
      wealth: '재수 없는 소리 같아도 솔직히 말할게. 지금 돈 씀씀이 좀 정신 차려야 해. 들어오는 것보다 나가는 게 더 많은 기운이야. 딱 한 달만 불필요한 지출 줄여봐. 확 달라져. 그리고 뭔가 도와줄 수 있는 사람이 주변에 있는데 본인이 안 보이는 거야.',
      life: '솔직히 지금 네 문제는 너무 많이 생각해서야. 분석하다가 아무것도 못 하는 타입이지? 일단 해봐. 틀리면 고치면 되고. 완벽하게 준비하다가 기회 놓치는 거야. 지금 몸이 좀 힘들다 싶으면 진짜 쉬어. 억지로 하다가 더 크게 탈나.',
    },
  },
  {
    id: 'beopsa',
    name: '법사',
    title: '지혜의 신령',
    emoji: '📿',
    vibe: '고요하고 철학적인 노년 법사',
    color: 'from-slate-600 to-blue-700',
    glow: 'shadow-slate-500/40',
    border: 'border-slate-400/40',
    reading: {
      love: '모든 인연은 때가 있습니다. 지금 사랑 때문에 마음이 복잡하다면, 그것은 아직 무르익지 않은 것일 뿐입니다. 억지로 당기거나 밀어내지 마십시오. 지금 이 시간은 스스로를 온전히 사랑하는 연습을 할 때입니다. 자신을 사랑하는 사람 곁에 좋은 인연이 모입니다.',
      wealth: '재물이란 흘러다니는 것입니다. 지금 많다고 교만하지 말고, 적다고 낙담하지 마십시오. 지금 당신에게 필요한 것은 작은 것에서도 가치를 찾는 지혜입니다. 탐욕을 내려놓고 정직하게 노력하는 자에게 재물은 반드시 돌아옵니다.',
      life: '한 발 물러서서 자신의 삶을 바라보는 시간이 필요합니다. 지금 당신이 집착하는 것이 정말 중요한 것인지 스스로에게 물어보십시오. 가장 중요한 것은 이미 당신 곁에 있습니다. 다만 당신이 먼 곳만 바라보고 있어 보이지 않을 뿐입니다.',
    },
  },
];

const STARS = [
  { top: '5%', left: '3%', size: '4px', op: 0.5, d: 0 },
  { top: '12%', left: '91%', size: '3px', op: 0.4, d: 0.6 },
  { top: '35%', left: '95%', size: '5px', op: 0.5, d: 1.1 },
  { top: '55%', left: '2%', size: '4px', op: 0.4, d: 0.3 },
  { top: '75%', left: '88%', size: '3px', op: 0.45, d: 1.4 },
  { top: '88%', left: '15%', size: '4px', op: 0.35, d: 0.8 },
  { top: '20%', left: '48%', size: '3px', op: 0.3, d: 0.5 },
];

export default function KShaman() {
  const [selected, setSelected] = useState<Shaman | null>(null);

  const handleSelect = (shaman: Shaman) => {
    setSelected(shaman);
    trackEvent('persona_select', { persona_id: shaman.id, persona_name: shaman.name });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => setSelected(null);

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
            {!selected ? (
              /* ── 보살 선택 화면 ── */
              <motion.div key="select"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
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
                    <motion.button
                      key={shaman.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => handleSelect(shaman)}
                      className="w-full text-left group"
                    >
                      <div className={`relative rounded-2xl p-5 border ${shaman.border} bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${shaman.glow}`}>
                        <div className="flex items-center gap-4">
                          {/* emoji circle */}
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
                  연애운 · 재물운 · 인생 전환 시기 확인
                </p>
              </motion.div>
            ) : (
              /* ── 점사 결과 화면 ── */
              <motion.div key="reading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* 뒤로가기 */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-purple-300/70 hover:text-white transition-colors mb-6 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  다른 보살 선택하기
                </button>

                {/* Shaman header */}
                <div className={`relative rounded-[2rem] overflow-hidden mb-6 border ${selected.border} shadow-2xl ${selected.glow}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-20`} />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  <div className="relative z-10 p-8 text-center">
                    <div className="text-6xl mb-4">{selected.emoji}</div>
                    <p className="text-purple-300/80 text-xs font-bold tracking-[0.2em] uppercase mb-2">오늘의 점사</p>
                    <h2 className="text-3xl font-black text-white mb-1">{selected.name}</h2>
                    <p className="text-purple-200/70 text-sm">{selected.vibe}</p>
                  </div>
                </div>

                {/* Readings */}
                <div className="space-y-4">
                  <ReadingCard
                    icon={<Heart className="w-5 h-5 text-white" />}
                    iconBg="bg-gradient-to-br from-pink-400 to-rose-500"
                    label="💘 사랑 점사"
                    text={selected.reading.love}
                  />
                  <ReadingCard
                    icon={<Coins className="w-5 h-5 text-white" />}
                    iconBg="bg-gradient-to-br from-amber-400 to-orange-500"
                    label="💰 재물 점사"
                    text={selected.reading.wealth}
                  />
                  <ReadingCard
                    icon={<Sparkles className="w-5 h-5 text-white" />}
                    iconBg="bg-gradient-to-br from-violet-400 to-purple-500"
                    label="✨ 인생 조언"
                    text={selected.reading.life}
                  />
                </div>

                {/* Reset */}
                <Button
                  onClick={handleBack}
                  className="w-full mt-6 rounded-2xl h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold backdrop-blur-md transition-all"
                >
                  🔮 다른 보살에게 점사 받기
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

function ReadingCard({ icon, iconBg, label, text }: {
  icon: React.ReactNode; iconBg: string; label: string; text: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-lg`}>
          {icon}
        </div>
        <h3 className="font-black text-white text-base">{label}</h3>
      </div>
      <p className="text-purple-100/80 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
