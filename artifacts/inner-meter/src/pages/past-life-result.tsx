import { motion } from "framer-motion";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResultShareButtons } from "@/components/ResultShareButtons";
import { getPastLifeCareer } from "@/data/past-life-careers";
import type { GwansangAnalysisResult } from "@/pages/gwansang";

type Props = {
  result: GwansangAnalysisResult;
  image: string | null;
  onReset: () => void;
};

const PAGE_BG = "linear-gradient(175deg, #E8C88F 0%, #D9AE67 55%, #C68D46 100%)";
const API_BASE = "https://api.mytesttype.com";

export function PastLifeResult({ result, image, onReset }: Props) {
  const { i18n } = useTranslation();
  // The uploaded image is the stable seed. AI wording can vary between calls,
  // but the same source image should keep its past-life character.
  const career = getPastLifeCareer(image ?? [
    result.summary,
    result.personality?.type,
    ...(result.personality?.traits ?? []),
    result.dragonface?.tier,
  ].filter(Boolean).join("|"));
  const url = "https://mytesttype.com/";
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(Boolean(image));
  const [generationAttempt, setGenerationAttempt] = useState(0);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const story = getStory(career.title, career.wealthStyle);

  useEffect(() => {
    if (!image) return;
    let active = true;
    const createPastLifeImage = async () => {
      setGenerating(true);
      setImageError(null);
      try {
        const response = await fetch(`${API_BASE}/api/generate-face-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: image, type: "pastLife", career: career.title }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "전생 이미지 생성에 실패했습니다.");
        if (active) setGeneratedImage(data.imageBase64);
      } catch (error) {
        if (active) setImageError(error instanceof Error ? error.message : "전생 이미지 생성에 실패했습니다.");
      } finally {
        if (active) setGenerating(false);
      }
    };
    void createPastLifeImage();
    return () => { active = false; };
  }, [career.title, generationAttempt, image]);

  return (
    <main className="paper-grain min-h-screen pb-12 text-[#2a1b16]" style={{ background: PAGE_BG }}>
      <section className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden border border-[#8e5a38]/35 bg-[#f5d99e]/80 p-5 shadow-[7px_7px_0_rgba(104,59,32,.18)] sm:p-7"
        >
          <div className="absolute inset-3 border border-[#9b5a3b]/25" />
          <div className="relative text-center">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#84422e]">AI 전생 캐릭터 결과</p>
            <div className="relative mt-4 overflow-hidden border border-[#8e5a38]/30 bg-[#e3be7d]">
              {generatedImage ? (
                <img src={generatedImage} alt={`${career.title}로 생성된 전생 캐릭터`} className="aspect-[4/3] w-full object-cover sm:aspect-square" />
              ) : image ? (
                <div className="relative aspect-[4/3] sm:aspect-square">
                  <img src={image} alt="전생 캐릭터 생성에 사용할 얼굴" className="h-full w-full object-cover blur-[2px] opacity-55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#4a2517]/45 px-5 text-[#fff0c8]">
                    {generating ? <Loader2 className="h-7 w-7 animate-spin" /> : <span className="text-2xl">{career.icon}</span>}
                    <p className="text-center text-sm font-bold">{generating ? `${career.title}의 모습으로 변신 중` : "전생 캐릭터 이미지를 불러오지 못했습니다"}</p>
                  </div>
                </div>
              ) : <div className="flex aspect-[4/3] items-center justify-center text-6xl sm:aspect-square">{career.icon}</div>}
              {image && <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-[#f4dca4]/60 bg-[#342016]/80 px-2 py-1.5 text-left text-[10px] font-bold text-[#fff0c8]"><img src={image} alt="원본 얼굴" className="h-7 w-7 rounded-full object-cover" />내 얼굴 기반 전생 캐릭터</div>}
            </div>
            <h1 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">당신의 전생 직업은</h1>
            <p className="mt-1 font-serif text-4xl font-bold text-[#914430] sm:text-5xl">{career.title}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5d4031]">{career.description}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="mt-5 grid gap-3 sm:grid-cols-3">
          <InfoCard label="당시 보상" value={career.eraPay} />
          <InfoCard label="AI 전생 생활력 환산" value={career.modernPay} emphasis />
          <InfoCard label="재산을 쌓는 방식" value={career.wealthStyle} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mt-4 border border-[#8e5a38]/25 bg-[#fff0c8]/70 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#7e3c2a]"><Sparkles className="h-4 w-4" />현생에 이어진 전생 기질</div>
          <p className="mt-3 text-sm leading-7 text-[#523427]">{result.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(result.personality?.traits ?? []).slice(0, 4).map((trait) => <span key={trait} className="rounded-full border border-[#8e5a38]/25 bg-[#f6dca4] px-3 py-1 text-xs font-semibold text-[#6e3929]">{trait}</span>)}
          </div>
        </motion.div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <StoryCard eyebrow="전생 기록" title="그 시절의 당신" text={story.past} />
          <StoryCard eyebrow="사람들이 기억한 방식" title="관계의 기질" text={story.relationship} />
          <StoryCard eyebrow="현생으로 이어진 강점" title="재물 감각" text={story.wealth} />
          <StoryCard eyebrow="오늘의 전생 미션" title="이 기질을 쓰는 법" text={story.mission} accent />
        </div>

        {!premiumUnlocked ? (
          <section className="mt-4 border border-[#7e3c2a]/35 bg-[#432116] p-5 text-[#fff0c8] shadow-[4px_4px_0_rgba(104,59,32,.18)]">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#eabf72]">후원으로 여는 상세 전생 기록</p>
            <h2 className="mt-2 font-serif text-xl font-bold">당신이 끝까지 지키려 했던 것은 무엇이었을까?</h2>
            <p className="mt-2 text-sm leading-6 text-[#f4dca4]/85">전생의 결정적 장면, 숨겨진 라이벌, 사랑의 인연, 현생에서 다시 만난 과제를 이어서 확인하세요.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs font-bold">
              <a href="https://mytesttype.com/k-shaman/toss_qr.jpg" target="_blank" rel="noreferrer" className="border border-[#f4dca4]/30 bg-[#fff0c8]/10 px-3 py-3">Toss 후원 QR</a>
              <a href="https://mytesttype.com/k-shaman/paypal_qr.jpg" target="_blank" rel="noreferrer" className="border border-[#f4dca4]/30 bg-[#fff0c8]/10 px-3 py-3">PayPal 후원 QR</a>
            </div>
            <button type="button" onClick={() => setPremiumUnlocked(true)} className="mt-3 h-11 w-full bg-[#f1c970] text-sm font-black text-[#3a1f14]">후원 후 상세 기록 보기</button>
            <p className="mt-2 text-center text-[10px] text-[#f4dca4]/60">자발적 후원이며 자동 결제·자동 확인은 하지 않습니다.</p>
          </section>
        ) : (
          <section className="mt-4 border border-[#8e5a38]/35 bg-[#f7dfaa]/85 p-5">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#7e3c2a]">상세 전생 기록</p>
            <h2 className="mt-2 font-serif text-xl font-bold">당신의 숨은 전생 장면</h2>
            <p className="mt-3 text-sm leading-7 text-[#523427]">{story.secret}</p>
            <p className="mt-3 border-t border-[#8e5a38]/20 pt-3 text-sm leading-7 text-[#523427]">{story.love}</p>
          </section>
        )}

        {imageError && (
          <div className="mt-3 text-center">
            <p className="px-3 text-[11px] leading-5 text-[#8e3f2b]">전생 이미지 생성이 일시적으로 지연되었습니다. 결과 카드는 그대로 공유할 수 있습니다.</p>
            <button type="button" onClick={() => setGenerationAttempt((attempt) => attempt + 1)} className="mt-2 border border-[#815039]/35 bg-[#f7dfaa]/75 px-4 py-2 text-xs font-bold text-[#50291c]">전생 이미지 다시 만들기</button>
          </div>
        )}
        <p className="mt-4 px-3 text-center text-[11px] leading-5 text-[#705244]">당시 보상은 직업·시대·지역별 차이가 큰 현물 중심 체계였습니다. ‘현대 생활력 환산’은 역사적 급여를 확정하는 수치가 아닌, AI 전생 캐릭터 놀이를 위한 생활력 비유입니다.</p>

        <div className="mt-5">
          <ResultShareButtons lang={i18n.language} title={`나는 전생에 ${career.title}이었다`} url={url} variant="paper" />
        </div>

        <button type="button" onClick={onReset} className="mt-4 flex h-12 w-full items-center justify-center gap-2 border border-[#815039]/35 bg-[#f7dfaa]/75 text-sm font-bold text-[#50291c]">
          <RotateCcw className="h-4 w-4" />다른 전생 확인하기
        </button>
      </section>
    </main>
  );
}

function StoryCard({ eyebrow, title, text, accent = false }: { eyebrow: string; title: string; text: string; accent?: boolean }) {
  return <section className={`border p-5 ${accent ? "border-[#8e3f2b]/45 bg-[#6a2f1d] text-[#fff0c8]" : "border-[#8e5a38]/25 bg-[#f9e5b5]/80 text-[#3f281d]"}`}>
    <p className={`text-[10px] font-bold tracking-[0.14em] ${accent ? "text-[#f2cc7e]" : "text-[#85513b]"}`}>{eyebrow}</p>
    <h2 className="mt-1 font-serif text-lg font-bold">{title}</h2>
    <p className={`mt-3 text-sm leading-6 ${accent ? "text-[#fff0c8]/90" : "text-[#604133]"}`}>{text}</p>
  </section>;
}

function getStory(career: string, wealthStyle: string) {
  const specific = {
    "농사꾼": {
      past: "농사꾼이었던 당신은 계절과 땅의 변화를 누구보다 먼저 읽었습니다. 비가 오기 전의 바람, 사람들의 표정처럼 작은 징후를 놓치지 않았고, 수확철에는 가족과 이웃을 끝까지 챙기는 사람이었습니다.",
      relationship: "사람들은 당신을 말보다 손이 먼저 움직이는 사람으로 기억했습니다. 큰 약속보다 매일의 성실함으로 신뢰를 만들었고, 힘든 시기에 곁을 지키는 쪽을 선택했습니다.",
      wealth: "농부의 재물 감각은 한 번에 크게 얻는 돈이 아니라, 뿌리를 고르고 제때 돌보아 수확을 늘리는 방식입니다. 지금도 반복 가능한 일과 오래 갈 관계를 고를수록 강점이 살아납니다.",
      mission: "이번 주에는 눈앞의 성과보다 3개월 뒤에도 남을 한 가지를 심어 보세요. 배우기, 기록하기, 고객과의 약속처럼 작지만 계속 쌓이는 선택이 전생의 힘을 깨웁니다.",
      secret: "흉년의 기운이 돌던 해에도 당신은 혼자 몫을 챙기기보다, 다음 계절을 버틸 방법을 먼저 계산했습니다. 이 현실 감각이 위기 때 주변을 움직이게 했습니다.",
      love: "사랑에서는 말솜씨보다 함께 밥을 먹고 하루를 버틸 수 있는 안정감을 중요하게 여겼습니다. 화려한 관계보다 마음 놓고 돌아올 수 있는 사람에게 오래 마음이 갔습니다.",
    },
    "전장의 무사": {
      past: "전장의 무사였던 당신은 가장 먼저 나서기보다, 모두가 흔들릴 때 흐름을 정리하는 쪽이었습니다. 결정해야 할 순간에는 오래 망설이지 않았고, 한 번 약속한 사람은 끝까지 지켰습니다.",
      relationship: "사람들은 당신을 든든하지만 쉽게 속을 보이지 않는 사람으로 기억했습니다. 가까워질수록 챙김은 깊어지지만, 마음이 상했을 때 혼자 견디는 버릇이 있었습니다.",
      wealth: "무사의 재물 감각은 위험을 무작정 피하는 것이 아니라, 지켜야 할 것과 버릴 것을 빠르게 가르는 데 있습니다. 지금도 기준이 분명한 일에서 성과가 크게 납니다.",
      mission: "이번 주에는 미뤄 둔 결정을 하나만 정리하세요. 오래 끌던 선택을 끝내는 행동이 전생의 추진력을 가장 잘 살립니다.",
      secret: "당신이 진짜 두려워한 것은 싸움이 아니라, 내 선택 때문에 누군가가 다치는 일이었습니다. 그래서 겉보다 훨씬 신중하게 마지막 판단을 내렸습니다.",
      love: "사랑에서는 말보다 보호와 책임으로 마음을 보였습니다. 상대가 약한 모습을 보여도 흔들리지 않는 안정감이 당신의 가장 큰 매력입니다.",
    },
    "조선의 임금": {
      past: "조선의 임금이었던 당신은 모든 사람이 보는 자리에서 결정을 내려야 했습니다. 칭찬보다 책임이 먼저였고, 혼자 생각을 정리하는 시간이 길수록 판단이 단단해졌습니다.",
      relationship: "사람들은 당신에게 기대를 많이 걸었지만, 당신은 쉽게 속마음을 보여 주지 않았습니다. 믿는 사람에게는 깊이 의지하면서도 관계의 균형을 늘 생각했습니다.",
      wealth: "왕의 재물 감각은 내 몫을 늘리는 것보다, 한정된 자원을 어디에 먼저 써야 오래 가는지 판단하는 능력입니다. 큰 그림과 우선순위가 강점입니다.",
      mission: "이번 주에는 해야 할 일을 늘리기보다, 지금 가장 중요한 한 가지에 자원을 몰아 주세요. 당신의 힘은 선택과 집중에서 커집니다.",
      secret: "가장 고요한 시간에 당신은 사람들의 말보다 표정과 침묵을 더 오래 읽었습니다. 이 관찰력이 위기마다 방향을 바꾸는 실마리가 되었습니다.",
      love: "사랑에서는 특별 대우보다 나를 있는 그대로 대하는 사람에게 마음이 열렸습니다. 권위가 아닌 편안함을 주는 관계가 오래 남습니다.",
    },
  }[career];
  if (specific) return specific;
  return {
    past: `${career}이었던 당신은 맡은 자리에서 눈에 띄는 결과를 만들기보다, 자기 방식으로 오래 버티며 사람들의 신뢰를 쌓는 쪽에 가까웠습니다. 일이 몰릴수록 중심을 잡고, 작은 빈틈을 먼저 메우는 역할을 했습니다.`,
    relationship: "가까운 사람에게는 말보다 행동으로 마음을 보였습니다. 처음에는 무뚝뚝하거나 조용해 보여도, 한 번 내 편이라고 생각한 사람은 쉽게 놓지 않는 타입으로 기억됩니다.",
    wealth: `${wealthStyle}의 감각은 한 번의 큰 승부보다, 내가 잘하는 것을 반복해 값어치로 바꾸는 데 있습니다. 지금도 ‘손에 잡히는 실력’과 ‘사람들이 다시 찾는 신뢰’를 쌓을수록 흐름이 강해집니다.`,
    mission: "이번 주에는 혼자 오래 미뤄 둔 한 가지를 끝까지 마무리해 보세요. 전생의 당신이 가졌던 추진력은, 시작보다 완결에서 가장 크게 드러납니다.",
    secret: `당신이 가장 경계했던 것은 무능함이 아니라, 믿었던 사람에게 맡긴 일이 흐트러지는 순간이었습니다. 그래서 중요한 순간에는 결국 직접 확인하고 마지막 결정을 내리는 쪽을 택했습니다.`,
    love: "사랑에서는 화려한 말보다 ‘함께 현실을 감당할 수 있는 사람’에게 마음이 기울었습니다. 관계가 깊어질수록 상대를 챙기려는 마음이 강해지지만, 내 마음을 먼저 말하는 연습도 필요합니다.",
  };
}

function InfoCard({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={`border p-4 ${emphasis ? "border-[#8e3f2b]/50 bg-[#572618] text-[#fff0cc]" : "border-[#8e5a38]/25 bg-[#f9e5b5]/80 text-[#3f281d]"}`}>
      <p className={`text-[11px] font-bold tracking-wide ${emphasis ? "text-[#f8d99b]" : "text-[#85513b]"}`}>{label}</p>
      <p className="mt-2 text-sm font-bold leading-6">{value}</p>
    </div>
  );
}
