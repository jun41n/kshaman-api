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

const EN_CAREER_COPY: Record<string, { title: string; eraPay: string; wealthStyle: string; description: string }> = {
  "조선의 임금": { title: "Joseon King", eraPay: "Royal treasury and court resources", wealthStyle: "Statecraft and stewardship", description: "A central figure who read the whole board and made weighty decisions" },
  "왕실의 책사": { title: "Royal strategist", eraPay: "Official stipend and royal gifts", wealthStyle: "Knowledge and connections", description: "An adviser who moved the court through strategy rather than force" },
  "암행어사": { title: "Secret royal inspector", eraPay: "Official stipend and mission expenses", wealthStyle: "Honor and practical skill", description: "An investigator who noticed what was hidden beneath appearances" },
  "포도대장": { title: "Capital security commander", eraPay: "Official stipend and military rewards", wealthStyle: "Responsibility and results", description: "A commander who restored order when a crisis arrived" },
  "전장의 무사": { title: "Battlefield warrior", eraPay: "Rations, cloth and merit rewards", wealthStyle: "Merit and performance", description: "A decisive protector who stood up for the people around them" },
  "명궁": { title: "Master archer", eraPay: "Rations and training rewards", wealthStyle: "Focus and craft", description: "A skilled specialist who kept their aim on one clear target" },
  "수군 장수": { title: "Naval commander", eraPay: "Military stipend and campaign rewards", wealthStyle: "Leadership and crisis control", description: "A leader who found direction in rough waters" },
  "유학자 선비": { title: "Confucian scholar", eraPay: "Teaching, patronage and official stipend", wealthStyle: "Knowledge and reputation", description: "A thoughtful person who refined ideas and chose words carefully" },
  "서당 훈장": { title: "Village school teacher", eraPay: "Grain, cloth and teaching fees", wealthStyle: "Teaching and trust", description: "A mentor who took joy in helping potential grow" },
  "궁중 화원": { title: "Court painter", eraPay: "Office pay and commissioned work", wealthStyle: "Creation and commissions", description: "An artist who preserved scenes others overlooked" },
  "궁중 악사": { title: "Court musician", eraPay: "Office pay and event fees", wealthStyle: "Talent and performance", description: "A performer who read the room and moved people through music" },
  "왕실 의관": { title: "Royal physician", eraPay: "Official stipend and royal gifts", wealthStyle: "Expertise and trust", description: "A specialist who noticed small signs and answered with care" },
  "궁중 의녀": { title: "Court medical attendant", eraPay: "Office pay and medical fees", wealthStyle: "Skill and care", description: "A calm healer who cared for people in difficult moments" },
  "마을의 무당": { title: "Village shaman", eraPay: "Grain, cloth and ritual fees", wealthStyle: "Relationships and trust", description: "A storyteller who listened to fears and gave them meaning" },
  "풍수지리사": { title: "Geomancy adviser", eraPay: "Consulting fees and land advice", wealthStyle: "Advice and insight", description: "A planner who read the flow between places and people" },
  "대장간 장인": { title: "Blacksmith", eraPay: "Wages and tool sales", wealthStyle: "Craft and making", description: "A maker who turned heat and effort into useful things" },
  "도자기 장인": { title: "Ceramic artisan", eraPay: "Official goods and workshop sales", wealthStyle: "Craft and reputation", description: "A maker who built quality by patiently shaping slow time" },
  "대목장": { title: "Master carpenter", eraPay: "Wages and building commissions", wealthStyle: "Craft and fieldwork", description: "A builder who saw the whole structure and made it stand firm" },
  "한지 장인": { title: "Hanji paper artisan", eraPay: "Tribute goods, delivery and sales", wealthStyle: "Craft and consistency", description: "An artisan who made delicate things that could last" },
  "염색 장인": { title: "Dyeing artisan", eraPay: "Wages and cloth deliveries", wealthStyle: "Taste and making", description: "A creative eye with a gift for subtle differences in color and texture" },
  "보부상": { title: "Traveling merchant", eraPay: "Profit from trading goods", wealthStyle: "Commerce and expansion", description: "A trader who found opportunity in unfamiliar places" },
  "객주 주인": { title: "Inn and trading-house owner", eraPay: "Brokerage and lodging income", wealthStyle: "Brokerage and networks", description: "An operator who turned the flow of people and information into value" },
  "약초상": { title: "Herbal merchant", eraPay: "Profit from medicinal goods", wealthStyle: "Judgment and commerce", description: "A person who recognized rare value and delivered it where needed" },
  "농사꾼": { title: "Farmer", eraPay: "Harvest and tenant-farming income", wealthStyle: "Land and consistency", description: "A steady provider who read the seasons and sustained daily life" },
  "바다의 어부": { title: "Sea fisherman", eraPay: "Sales from the catch", wealthStyle: "Fieldwork and adaptability", description: "A practical adventurer who never missed the tide" },
  "산의 사냥꾼": { title: "Mountain hunter", eraPay: "Game and hide sales", wealthStyle: "Self-reliance and instinct", description: "A quiet observer who moved at the decisive moment" },
  "나루터 뱃사공": { title: "Ferry boatman", eraPay: "Ferry fares and transport fees", wealthStyle: "Livelihood and connection", description: "A connector who carried people, news and goods across the water" },
  "떠돌이 광대": { title: "Wandering performer", eraPay: "Performance fees and patronage", wealthStyle: "Talent and word of mouth", description: "A free spirit who changed the mood wherever people gathered" },
  "궁중 예인": { title: "Court entertainer", eraPay: "Banquet fees and patronage", wealthStyle: "Art and relationships", description: "A performer who captured hearts through words and art" },
  "성실한 살림지기": { title: "Household steward", eraPay: "Food, shelter and service rewards", wealthStyle: "Keeping life steady", description: "A dependable guardian of the household and people closest to them" },
  "비밀 정보원": { title: "Secret informant", eraPay: "Mission expenses and confidential rewards", wealthStyle: "Information and opportunity", description: "A discreet problem-solver who found the key detail first" },
};

const EN_RESULT_COPY = {
  result: "AI past-life character result", careerLabel: "Your past-life role was", eraPay: "Historical reward", modernPay: "AI livelihood equivalent", wealthStyle: "How wealth was built", traits: "Past-life qualities carried into today", record: "Past-life record", then: "You in that era", remembered: "How people remembered you", unlockEyebrow: "Unlock a deeper past-life record", unlockTitle: "Open the defining scene of your past life", unlockBody: "See your wealth instincts, love story, a mission to carry forward and a collectible card based on your face.", detail: "Detailed past-life record", complete: "Your complete past-life record", poster: "Collectible past-life poster", retry: "Try the past-life image again", reset: "Check another past life", delayed: "The past-life image is taking longer than expected. Your result card is still ready to share.", disclaimer: "Historical rewards varied by occupation, era and region. The modern equivalent is an entertainment analogy, not a confirmed historical wage." 
} as const;

export function PastLifeResult({ result, image, onReset }: Props) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.toLowerCase().startsWith("en");
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
  const careerCopy = isEnglish ? EN_CAREER_COPY[career.title] : null;
  const displayTitle = careerCopy?.title ?? career.title;
  const displayEraPay = careerCopy?.eraPay ?? career.eraPay;
  const displayWealthStyle = careerCopy?.wealthStyle ?? career.wealthStyle;
  const displayDescription = careerCopy?.description ?? career.description;
  const story = getStory(career.title, career.wealthStyle, isEnglish);

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
          body: JSON.stringify({ imageBase64: image, type: "pastLife", career: displayTitle, language: i18n.language }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || (isEnglish ? "Past-life image generation failed." : "전생 이미지 생성에 실패했습니다."));
        if (active) setGeneratedImage(data.imageBase64);
      } catch (error) {
        if (active) setImageError(error instanceof Error ? error.message : (isEnglish ? "Past-life image generation failed." : "전생 이미지 생성에 실패했습니다."));
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
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#84422e]">{isEnglish ? EN_RESULT_COPY.result : "AI 전생 캐릭터 결과"}</p>
            <div className="relative mt-4 overflow-hidden border border-[#8e5a38]/30 bg-[#e3be7d]">
              {generatedImage ? (
                <img src={generatedImage} alt={`${displayTitle} past-life character`} className="aspect-[4/3] w-full object-cover sm:aspect-square" />
              ) : image ? (
                <div className="relative aspect-[4/3] sm:aspect-square">
                  <img src={image} alt="전생 캐릭터 생성에 사용할 얼굴" className="h-full w-full object-cover blur-[2px] opacity-55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#4a2517]/45 px-5 text-[#fff0c8]">
                    {generating ? <Loader2 className="h-7 w-7 animate-spin" /> : <span className="text-2xl">{career.icon}</span>}
                    <p className="text-center text-sm font-bold">{generating ? (isEnglish ? `Creating your ${displayTitle} character` : `${career.title}의 모습으로 변신 중`) : (isEnglish ? "The character image could not be loaded." : "전생 캐릭터 이미지를 불러오지 못했습니다")}</p>
                  </div>
                </div>
              ) : <div className="flex aspect-[4/3] items-center justify-center text-6xl sm:aspect-square">{career.icon}</div>}
              {image && <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-[#f4dca4]/60 bg-[#342016]/80 px-2 py-1.5 text-left text-[10px] font-bold text-[#fff0c8]"><img src={image} alt="Original face" className="h-7 w-7 rounded-full object-cover" />{isEnglish ? "Character based on my face" : "내 얼굴 기반 전생 캐릭터"}</div>}
            </div>
            <h1 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">{isEnglish ? EN_RESULT_COPY.careerLabel : "당신의 전생 직업은"}</h1>
            <p className="mt-1 font-serif text-4xl font-bold text-[#914430] sm:text-5xl">{displayTitle}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5d4031]">{displayDescription}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="mt-5 grid gap-3 sm:grid-cols-3">
          <InfoCard label={isEnglish ? EN_RESULT_COPY.eraPay : "당시 보상"} value={displayEraPay} />
          <InfoCard label={isEnglish ? EN_RESULT_COPY.modernPay : "AI 전생 생활력 환산"} value={career.modernPay} emphasis />
          <InfoCard label={isEnglish ? EN_RESULT_COPY.wealthStyle : "재산을 쌓는 방식"} value={displayWealthStyle} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mt-4 border border-[#8e5a38]/25 bg-[#fff0c8]/70 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#7e3c2a]"><Sparkles className="h-4 w-4" />{isEnglish ? EN_RESULT_COPY.traits : "현생에 이어진 전생 기질"}</div>
          <p className="mt-3 text-sm leading-7 text-[#523427]">{result.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(result.personality?.traits ?? []).slice(0, 4).map((trait) => <span key={trait} className="rounded-full border border-[#8e5a38]/25 bg-[#f6dca4] px-3 py-1 text-xs font-semibold text-[#6e3929]">{trait}</span>)}
          </div>
        </motion.div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <StoryCard eyebrow={isEnglish ? "Past-life record" : "전생 기록"} title={isEnglish ? "You in that era" : "그 시절의 당신"} text={story.past} />
          <StoryCard eyebrow={isEnglish ? "How people remembered you" : "사람들이 기억한 방식"} title={isEnglish ? "Your relationship style" : "관계의 기질"} text={story.relationship} />
        </div>

        {!premiumUnlocked ? (
          <section className="mt-4 border border-[#7e3c2a]/35 bg-[#432116] p-5 text-[#fff0c8] shadow-[4px_4px_0_rgba(104,59,32,.18)]">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#eabf72]">{isEnglish ? EN_RESULT_COPY.unlockEyebrow : "후원으로 여는 상세 전생 기록"}</p>
            <h2 className="mt-2 font-serif text-xl font-bold">{isEnglish ? EN_RESULT_COPY.unlockTitle : "전생의 결정적 장면을 열어 보세요"}</h2>
            <p className="mt-2 text-sm leading-6 text-[#f4dca4]/85">{isEnglish ? EN_RESULT_COPY.unlockBody : "재물 감각과 사랑의 인연, 지금 다시 꺼내 쓸 전생 미션, 내 얼굴 기반 소장 카드까지 한 번에 확인하세요."}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left text-xs text-[#f8d99b]">
              {["재물과 생존 전략", "사랑에서 지킨 약속", "현생 전생 미션", "내 전생 소장 포스터"].map((item) => <div key={item} className="border border-[#f4dca4]/15 bg-black/10 px-3 py-2 blur-[1.2px]">{item}</div>)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs font-bold">
              <a href="https://mytesttype.com/k-shaman/toss_qr.jpg" target="_blank" rel="noreferrer" className="border border-[#f4dca4]/30 bg-[#fff0c8]/10 px-3 py-3">{isEnglish ? "Toss support QR" : "Toss 후원 QR"}</a>
              <a href="https://mytesttype.com/k-shaman/paypal_qr.jpg" target="_blank" rel="noreferrer" className="border border-[#f4dca4]/30 bg-[#fff0c8]/10 px-3 py-3">{isEnglish ? "PayPal support QR" : "PayPal 후원 QR"}</a>
            </div>
            <button type="button" onClick={() => setPremiumUnlocked(true)} className="mt-3 h-11 w-full bg-[#f1c970] text-sm font-black text-[#3a1f14]">{isEnglish ? "Open full record (test)" : "테스트로 상세 기록 열기"}</button>
            <p className="mt-2 text-center text-[10px] text-[#f4dca4]/60">{isEnglish ? "During testing, the detailed result opens without support verification." : "테스트 기간에는 후원 확인 없이 상세 결과를 열 수 있습니다."}</p>
          </section>
        ) : (
          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#7e3c2a]">{isEnglish ? EN_RESULT_COPY.detail : "상세 전생 기록"}</p>
            <h2 className="mt-2 font-serif text-xl font-bold">{isEnglish ? EN_RESULT_COPY.complete : "당신의 전생 기록 완성본"}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StoryCard eyebrow={isEnglish ? "Defining scene" : "결정적 장면"} title={isEnglish ? "A hidden past-life choice" : "숨겨진 전생의 선택"} text={story.secret} />
              <StoryCard eyebrow={isEnglish ? "Livelihood record" : "생활력 기록"} title={isEnglish ? "Wealth instincts and survival" : "재물 감각과 생존 방식"} text={story.wealth} />
              <StoryCard eyebrow={isEnglish ? "Love and bonds" : "사랑의 인연"} title={isEnglish ? "What you protected in relationships" : "관계에서 끝까지 지킨 것"} text={story.love} />
              <StoryCard eyebrow={isEnglish ? "Today’s mission" : "현생 미션"} title={isEnglish ? "A quality to use this week" : "이번 주에 꺼내 쓸 기질"} text={story.mission} accent />
            </div>
            <div className="mt-4 border border-[#8e5a38]/25 bg-[#f4d89e] p-4 text-center">
              <p className="text-[10px] font-bold tracking-[.16em] text-[#85513b]">{isEnglish ? EN_RESULT_COPY.poster : "소장용 전생 포스터"}</p>
              <p className="mt-1 font-serif text-lg font-bold text-[#4a2517]">{isEnglish ? `My past-life record as a ${displayTitle}` : `${career.title}로 남긴 나의 전생 기록`}</p>
              <p className="mt-2 text-xs leading-5 text-[#684a3e]">{isEnglish ? "Share it as an SNS result card with your past-life character image." : "위 전생 캐릭터 이미지와 함께 SNS 결과 카드에 담아 공유할 수 있습니다."}</p>
            </div>
          </div>
        )}

        {imageError && (
          <div className="mt-3 text-center">
            <p className="px-3 text-[11px] leading-5 text-[#8e3f2b]">{isEnglish ? EN_RESULT_COPY.delayed : "전생 이미지 생성이 일시적으로 지연되었습니다. 결과 카드는 그대로 공유할 수 있습니다."}</p>
            <button type="button" onClick={() => setGenerationAttempt((attempt) => attempt + 1)} className="mt-2 border border-[#815039]/35 bg-[#f7dfaa]/75 px-4 py-2 text-xs font-bold text-[#50291c]">{isEnglish ? EN_RESULT_COPY.retry : "전생 이미지 다시 만들기"}</button>
          </div>
        )}
        <p className="mt-4 px-3 text-center text-[11px] leading-5 text-[#705244]">{isEnglish ? EN_RESULT_COPY.disclaimer : "당시 보상은 직업·시대·지역별 차이가 큰 현물 중심 체계였습니다. ‘현대 생활력 환산’은 역사적 급여를 확정하는 수치가 아닌, AI 전생 캐릭터 놀이를 위한 생활력 비유입니다."}</p>

        <div className="mt-5">
          <ResultShareButtons lang={i18n.language} title={isEnglish ? `I was a ${displayTitle} in a past life` : `나는 전생에 ${career.title}이었다`} url={url} summary={result.summary} service="past-life" variant="paper" />
        </div>

        <button type="button" onClick={onReset} className="mt-4 flex h-12 w-full items-center justify-center gap-2 border border-[#815039]/35 bg-[#f7dfaa]/75 text-sm font-bold text-[#50291c]">
          <RotateCcw className="h-4 w-4" />{isEnglish ? EN_RESULT_COPY.reset : "다른 전생 확인하기"}
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

function getStory(career: string, wealthStyle: string, english = false) {
  if (english) {
    const title = EN_CAREER_COPY[career]?.title ?? career;
    const style = EN_CAREER_COPY[career]?.wealthStyle ?? wealthStyle;
    return {
      past: `As a ${title}, you built trust by staying steady in your role and noticing what others missed. When work became demanding, you kept the center and filled the gaps first.`,
      relationship: "People remembered you as someone who showed care through actions. You could seem quiet at first, but once someone was on your side, you did not let them go easily.",
      wealth: `${style} means turning a repeatable strength into lasting value rather than relying on one big gamble. Today, your flow grows when skill and trust compound over time.`,
      mission: "Finish one task you have postponed for too long this week. Your past-life strength shows most clearly when you bring something to completion.",
      secret: "You feared entrusted work falling apart more than you feared hard work itself. That is why you checked the important details yourself before making the final call.",
      love: "In love, you valued someone who could share real life more than impressive words. As a bond deepens, remember to say what you need instead of only taking care of the other person.",
    };
  }
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
