/**
 * sajuCalc.ts
 * 생년월일로 사주 핵심 원소(천간·지지·오행·띠)를 계산해 AI에게 주입할 재료를 생성한다.
 * 정밀 절기 계산은 생략하고 양력 기준 연/월/시 주를 산출한다.
 */

export interface SajuData {
  // 연주
  yearPillar: string;       // e.g. "경오(庚午)"
  yearStem: string;         // e.g. "경(庚)"
  yearBranch: string;       // e.g. "오(午)"
  yearZodiac: string;       // e.g. "말"
  yearElement: string;      // e.g. "금(金)"
  yearYinYang: string;      // e.g. "양" | "음"

  // 월주 (양력 월 기준 월지)
  monthBranch: string;      // e.g. "묘(卯)"
  monthSeason: string;      // e.g. "봄 초"

  // 시주 (출생시간)
  hourBranch: string | null; // e.g. "자(子)" | null

  // 나이
  currentAge: number;       // 만 나이
  koreanAge: number;        // 세는 나이

  // 현재 연도
  currentYear: number;
  currentYearPillar: string; // e.g. "병오(丙午)"
  currentYearElement: string;// e.g. "화(火)"

  // 연지(年支) 2026 오(午)와의 관계
  branchRelation: BranchRelation;

  // 천간(年干) 2026 병(丙)과의 관계
  stemRelation: StemRelation;

  // 오행 상생·상극 요약
  elementInteraction: string;

  // 요약 문장 (AI 프롬프트에 직접 삽입)
  summaryForPrompt: string;
}

export interface BranchRelation {
  type: "충(沖)" | "삼합(三合)" | "육합(六合)" | "형(刑)" | "동일(同一)" | "중립";
  description: string;
  energy: "매우 강함" | "강함" | "보통" | "약함";
}

export interface StemRelation {
  type: "상생(相生)" | "상극(相剋)" | "비화(比和)";
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 기초 데이터
// ─────────────────────────────────────────────────────────────────────────────

const STEMS = [
  { ko: "갑(甲)", element: "목(木)", yinYang: "양" },
  { ko: "을(乙)", element: "목(木)", yinYang: "음" },
  { ko: "병(丙)", element: "화(火)", yinYang: "양" },
  { ko: "정(丁)", element: "화(火)", yinYang: "음" },
  { ko: "무(戊)", element: "토(土)", yinYang: "양" },
  { ko: "기(己)", element: "토(土)", yinYang: "음" },
  { ko: "경(庚)", element: "금(金)", yinYang: "양" },
  { ko: "신(辛)", element: "금(金)", yinYang: "음" },
  { ko: "임(壬)", element: "수(水)", yinYang: "양" },
  { ko: "계(癸)", element: "수(水)", yinYang: "음" },
];

const BRANCHES = [
  { ko: "자(子)", zodiac: "쥐", element: "수(水)", season: "겨울 한복판" },
  { ko: "축(丑)", zodiac: "소", element: "토(土)", season: "겨울 끝" },
  { ko: "인(寅)", zodiac: "호랑이", element: "목(木)", season: "봄 초" },
  { ko: "묘(卯)", zodiac: "토끼", element: "목(木)", season: "봄 한복판" },
  { ko: "진(辰)", zodiac: "용", element: "토(土)", season: "봄 끝" },
  { ko: "사(巳)", zodiac: "뱀", element: "화(火)", season: "여름 초" },
  { ko: "오(午)", zodiac: "말", element: "화(火)", season: "여름 한복판" },
  { ko: "미(未)", zodiac: "양", element: "토(土)", season: "여름 끝" },
  { ko: "신(申)", zodiac: "원숭이", element: "금(金)", season: "가을 초" },
  { ko: "유(酉)", zodiac: "닭", element: "금(金)", season: "가을 한복판" },
  { ko: "술(戌)", zodiac: "개", element: "토(土)", season: "가을 끝" },
  { ko: "해(亥)", zodiac: "돼지", element: "수(水)", season: "겨울 초" },
];

// 월지 (1월~12월, 양력 기준 근사값)
const MONTH_BRANCH_IDX = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1]; // Jan→인, Feb→묘, ...

// 시지 (2시간 단위)
const HOUR_BRANCH_IDX = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]; // 0시=자, 2시=축, ...

// ─────────────────────────────────────────────────────────────────────────────
// 충·합·형 관계 테이블 (2026 오午 기준)
// ─────────────────────────────────────────────────────────────────────────────

function getBranchRelation(birthBranchIdx: number): BranchRelation {
  const currentBranchIdx = 6; // 오(午) = 2026

  // 충 (서로 마주보는 관계)
  const CHUNG_PAIRS: [number, number][] = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  const isChung = CHUNG_PAIRS.some(([a,b]) => (a === birthBranchIdx && b === currentBranchIdx) || (b === birthBranchIdx && a === currentBranchIdx));

  // 삼합 (인오술 = 2,6,10 / 사유축 = 5,9,1 / 신자진 = 8,0,4 / 해묘미 = 11,3,7)
  const SAMHAP_GROUPS = [[2,6,10],[5,9,1],[8,0,4],[11,3,7]];
  const mySamhap = SAMHAP_GROUPS.find(g => g.includes(birthBranchIdx));
  const isSamhap = mySamhap?.includes(currentBranchIdx) && birthBranchIdx !== currentBranchIdx;

  // 육합 (자축, 인해, 묘술, 진유, 사신, 오미)
  const YUKHAP_PAIRS: [number, number][] = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  const isYukhap = YUKHAP_PAIRS.some(([a,b]) => (a === birthBranchIdx && b === currentBranchIdx) || (b === birthBranchIdx && a === currentBranchIdx));

  // 동일
  if (birthBranchIdx === currentBranchIdx) {
    return {
      type: "동일(同一)",
      description: `출생 연지와 ${new Date().getFullYear()}년의 연지가 같은 오(午)다. 36년 만에 돌아온 기운의 귀환으로, 태어날 때의 에너지가 그대로 부활한다. 변화의 기폭제가 되는 해.`,
      energy: "매우 강함",
    };
  }

  if (isChung) {
    return {
      type: "충(沖)",
      description: `출생 연지가 ${new Date().getFullYear()}년 오(午) 기운과 정면으로 충돌한다. 안정된 것이 흔들리고, 억눌렸던 것이 터진다. 변화를 강제당하는 해.`,
      energy: "매우 강함",
    };
  }

  if (isSamhap && mySamhap) {
    const isFire = mySamhap.includes(6);
    return {
      type: "삼합(三合)",
      description: `출생 연지가 ${new Date().getFullYear()}년 오(午)와 ${isFire ? "화(火) 삼합" : "삼합"}을 이룬다. 같은 무리의 기운이 합쳐져 에너지가 배가된다.`,
      energy: "강함",
    };
  }

  if (isYukhap) {
    return {
      type: "육합(六合)",
      description: `출생 연지가 ${new Date().getFullYear()}년 오(午)와 육합한다. 부드럽게 연결되어 흐름이 순조롭고 인연이 이어지는 기운.`,
      energy: "강함",
    };
  }

  // 형(刑) - 인사신, 축술미, 자묘
  const HYUNG = [[2,5,8],[1,10,7],[0,3]];
  const myHyung = HYUNG.find(g => g.includes(birthBranchIdx));
  if (myHyung?.includes(currentBranchIdx)) {
    return {
      type: "형(刑)",
      description: `출생 연지가 ${new Date().getFullYear()}년 오(午)와 형(刑)의 관계다. 갑작스러운 사건, 법적·신체적 문제가 발생할 수 있어 각별히 주의해야 한다.`,
      energy: "강함",
    };
  }

  return {
    type: "중립",
    description: `출생 연지와 ${new Date().getFullYear()}년 오(午) 기운이 특별한 간섭 없이 병존한다. 큰 외부 충격보다는 내면의 변화가 주요 동력이 된다.`,
    energy: "보통",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 오행 상생·상극
// ─────────────────────────────────────────────────────────────────────────────

type Element = "목" | "화" | "토" | "금" | "수";

function extractElement(elementStr: string): Element {
  const map: Record<string, Element> = { 목: "목", 화: "화", 토: "토", 금: "금", 수: "수" };
  for (const [k, v] of Object.entries(map)) {
    if (elementStr.includes(k)) return v;
  }
  return "토";
}

function getStemRelation(birthStemEl: Element, currentStemEl: Element): StemRelation {
  if (birthStemEl === currentStemEl) {
    return { type: "비화(比和)", description: `출생 천간 오행(${birthStemEl})과 ${new Date().getFullYear()}년 천간 오행(${currentStemEl})이 같다. 같은 기운이 겹쳐 개성이 더욱 두드러지는 해.` };
  }
  // 상생: 목→화, 화→토, 토→금, 금→수, 수→목
  const SHENG: Record<Element, Element> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" };
  if (SHENG[birthStemEl] === currentStemEl) {
    return { type: "상생(相生)", description: `출생 천간 오행(${birthStemEl})이 ${new Date().getFullYear()}년 천간 오행(${currentStemEl})을 생(生)한다. 자신의 에너지가 이 해를 돕는 형국으로, 주도적 기운이 강해진다.` };
  }
  if (SHENG[currentStemEl] === birthStemEl) {
    return { type: "상생(相生)", description: `${new Date().getFullYear()}년 천간 오행(${currentStemEl})이 출생 천간 오행(${birthStemEl})을 생(生)한다. 외부에서 에너지를 받아 성장하는 해.` };
  }
  // 상극: 목→토, 토→수, 수→화, 화→금, 금→목
  const KEUK: Record<Element, Element> = { 목: "토", 토: "수", 수: "화", 화: "금", 금: "목" };
  if (KEUK[birthStemEl] === currentStemEl || KEUK[currentStemEl] === birthStemEl) {
    return { type: "상극(相剋)", description: `출생 천간 오행(${birthStemEl})과 ${new Date().getFullYear()}년 천간 오행(${currentStemEl})이 서로 극(剋)한다. 에너지 충돌로 결정 장면에서 갈등이 심화될 수 있다.` };
  }
  return { type: "비화(比和)", description: `오행 간 직접적 생극 관계가 없어 독자적으로 흐른다.` };
}

// ─────────────────────────────────────────────────────────────────────────────
// 메인 계산 함수
// ─────────────────────────────────────────────────────────────────────────────

export function calcSaju(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour?: number,
): SajuData {
  const stemIdx = ((birthYear - 4) % 10 + 10) % 10;
  const branchIdx = ((birthYear - 4) % 12 + 12) % 12;

  const stem = STEMS[stemIdx];
  const branch = BRANCHES[branchIdx];

  const monthBranchIdx = MONTH_BRANCH_IDX[birthMonth - 1];
  const monthBranchData = BRANCHES[monthBranchIdx];

  const hourBranchData = birthHour != null ? BRANCHES[HOUR_BRANCH_IDX[birthHour]] : null;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  let age = currentYear - birthYear;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  const curStemIdx = ((currentYear - 4) % 10 + 10) % 10;
  const curBranchIdx = ((currentYear - 4) % 12 + 12) % 12;
  const curStem = STEMS[curStemIdx];
  const curBranch = BRANCHES[curBranchIdx];
  const currentYearPillar = `${curStem.ko}${curBranch.ko}`;

  const branchRelation = getBranchRelation(branchIdx);
  const stemRelation = getStemRelation(
    extractElement(stem.element),
    extractElement(curStem.element),
  );

  const elementInteraction = `${stem.element}(출생 천간) × ${curStem.element}(${currentYear}년 천간) → ${stemRelation.type}`;

  const summaryForPrompt = `
▶ 연주(年柱): ${stem.ko}${branch.ko} → 띠: ${branch.zodiac}띠 / 오행: ${stem.element} / ${stem.yinYang}
▶ 월지(月支): ${monthBranchData.ko} — ${monthBranchData.season}에 태어난 기운
${hourBranchData ? `▶ 시지(時支): ${hourBranchData.ko}` : "▶ 시지(時支): 미상"}
▶ 만 나이: ${age}세 (세는나이 ${age + 1}세)
▶ ${currentYear}년 연주: ${currentYearPillar} — ${curBranch.zodiac}띠 해, 오행 ${curStem.element}
▶ 연지 관계: ${branchRelation.type} — ${branchRelation.description}
▶ 천간 오행 관계: ${elementInteraction} — ${stemRelation.description}
`.trim();

  return {
    yearPillar: `${stem.ko}${branch.ko}`,
    yearStem: stem.ko,
    yearBranch: branch.ko,
    yearZodiac: branch.zodiac,
    yearElement: stem.element,
    yearYinYang: stem.yinYang,
    monthBranch: monthBranchData.ko,
    monthSeason: monthBranchData.season,
    hourBranch: hourBranchData?.ko ?? null,
    currentAge: age,
    koreanAge: age + 1,
    currentYear,
    currentYearPillar,
    currentYearElement: curStem.element,
    branchRelation,
    stemRelation,
    elementInteraction,
    summaryForPrompt,
  };
}
