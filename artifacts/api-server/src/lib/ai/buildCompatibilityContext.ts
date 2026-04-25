/**
 * buildCompatibilityContext.ts
 * 두 사람의 사주를 비교하여 명리학 기반 궁합 분석 블록을 생성한다.
 * 연지 충·합·형·원진, 천간 오행 상생·상극, 월지 관계를 계산해 AI에 주입한다.
 */

import { calcSaju, type SajuData } from "./sajuCalc.js";
import type { PartnerProfile } from "./types.js";

// ─────────────────────────────────────────────────────────────────────────────
// 두 연지(年支) 사이의 궁합 관계
// ─────────────────────────────────────────────────────────────────────────────

type BranchCompatType =
  | "삼합(三合)"     // 최상 — 같은 오행 군
  | "육합(六合)"     // 상 — 부드럽게 결합
  | "원진(怨嗔)"     // 최하 — 서로를 원망
  | "충(沖)"         // 하 — 정면 충돌
  | "동갑(同甲)"     // 중상 — 같은 띠
  | "중립";          // 무난

interface BranchCompat {
  type: BranchCompatType;
  score: number;    // 100점 만점
  label: string;    // 한글 한 줄 요약
  detail: string;   // 상세 해석
}

const SAMHAP_GROUPS = [
  [2, 6, 10],   // 인오술 — 火局
  [5, 9, 1],    // 사유축 — 金局
  [8, 0, 4],    // 신자진 — 水局
  [11, 3, 7],   // 해묘미 — 木局
];
const SAMHAP_NAMES = ["화(火)국", "금(金)국", "수(水)국", "목(木)국"];

const YUKHAP_PAIRS: [number, number][] = [
  [0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7],
];

// 원진: 자미, 축오, 인유, 묘신, 진해, 사술
const WONJIN_PAIRS: [number, number][] = [
  [0, 7], [1, 6], [2, 9], [3, 8], [4, 11], [5, 10],
];

// 충
const CHUNG_PAIRS: [number, number][] = [
  [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
];

const ZODIAC_NAMES = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];

function getBranchCompat(aIdx: number, bIdx: number, aZodiac: string, bZodiac: string): BranchCompat {
  if (aIdx === bIdx) {
    return {
      type: "동갑(同甲)",
      score: 72,
      label: `${aZodiac}띠 동갑 — 서로를 가장 잘 이해하는 관계`,
      detail: `같은 기운을 타고났기에 직관적으로 통한다. 그러나 같은 약점을 공유하므로 함께 흔들릴 때 버팀목이 없다는 점을 주의해야 한다.`,
    };
  }

  const isChung = CHUNG_PAIRS.some(([a, b]) =>
    (a === aIdx && b === bIdx) || (b === aIdx && a === bIdx)
  );
  if (isChung) {
    return {
      type: "충(沖)",
      score: 28,
      label: `${aZodiac}띠 ↔ ${bZodiac}띠 — 충(沖): 정면으로 부딪히는 기운`,
      detail: `충(沖)은 두 기운이 서로를 정면으로 밀어낸다. 처음엔 강한 끌림이 있지만, 시간이 지날수록 마찰이 심해지고 서로에게 상처를 준다. 변화와 충격을 함께 유발하므로 성장의 에너지가 될 수도, 파국의 씨앗이 될 수도 있다.`,
    };
  }

  const isWonjin = WONJIN_PAIRS.some(([a, b]) =>
    (a === aIdx && b === bIdx) || (b === aIdx && a === bIdx)
  );
  if (isWonjin) {
    return {
      type: "원진(怨嗔)",
      score: 18,
      label: `${aZodiac}띠 ↔ ${bZodiac}띠 — 원진(怨嗔): 쌓이는 원망`,
      detail: `원진은 궁합에서 가장 경계하는 관계다. 서로를 향한 원망과 억울함이 쌓이는 구조로, 처음엔 몰라도 함께 살다 보면 반드시 드러난다. 노력으로 버틸 수 있지만, 결혼이나 동거처럼 밀착된 관계에서는 특히 조심해야 한다.`,
    };
  }

  const samhapGroup = SAMHAP_GROUPS.findIndex(g => g.includes(aIdx) && g.includes(bIdx));
  if (samhapGroup !== -1) {
    return {
      type: "삼합(三合)",
      score: 92,
      label: `${aZodiac}띠 ↔ ${bZodiac}띠 — 삼합(三合) ${SAMHAP_NAMES[samhapGroup]}: 운명적 조합`,
      detail: `삼합(三合)은 궁합 중 가장 강력한 결합이다. ${SAMHAP_NAMES[samhapGroup]}의 기운을 함께 만들어내며, 서로가 있어야 완성되는 구조다. 사업, 연애, 결혼 어떤 관계에서든 최상의 시너지를 낸다.`,
    };
  }

  const isYukhap = YUKHAP_PAIRS.some(([a, b]) =>
    (a === aIdx && b === bIdx) || (b === aIdx && a === bIdx)
  );
  if (isYukhap) {
    return {
      type: "육합(六合)",
      score: 82,
      label: `${aZodiac}띠 ↔ ${bZodiac}띠 — 육합(六合): 자연스럽게 맞아 떨어지는 관계`,
      detail: `육합(六合)은 두 기운이 부드럽게 맞아 들어가는 관계다. 억지로 맞추지 않아도 자연스럽게 조화를 이루고, 함께할수록 안정감이 커진다. 장기적인 관계에서 신뢰가 쌓이는 구조.`,
    };
  }

  return {
    type: "중립",
    score: 55,
    label: `${aZodiac}띠 ↔ ${bZodiac}띠 — 무난한 관계`,
    detail: `두 연지 사이에 특별한 충·합·원진이 없다. 관계의 방향은 두 사람의 노력과 천간(天干) 오행 관계에 더 좌우된다.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 두 천간(天干) 오행 사이의 상생·상극
// ─────────────────────────────────────────────────────────────────────────────

type Element = "목" | "화" | "토" | "금" | "수";

function extractEl(elementStr: string): Element {
  const map: Record<string, Element> = { 목: "목", 화: "화", 토: "토", 금: "금", 수: "수" };
  for (const [k, v] of Object.entries(map)) {
    if (elementStr.includes(k)) return v;
  }
  return "토";
}

const ELEMENT_TRAITS: Record<Element, string> = {
  목: "창의적·성장 지향, 추진력이 있으나 고집과 마무리 부족",
  화: "열정적·카리스마, 표현력이 강하나 충동적이고 쉽게 식음",
  토: "안정적·신중, 신뢰를 주지만 변화를 싫어하고 결단이 느림",
  금: "원칙적·결단력, 완벽주의적이나 냉정하고 감정 표현 서툼",
  수: "직관적·유연, 공감 능력이 높으나 감정 기복이 심하고 우유부단",
};

interface StemCompat {
  relation: "상생(相生)" | "상극(相剋)" | "비화(比和)";
  score: number;
  direction: string;
  detail: string;
}

const SHENG: Record<Element, Element> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" };
const KEUK: Record<Element, Element> = { 목: "토", 토: "수", 수: "화", 화: "금", 금: "목" };

function getStemCompat(aEl: Element, bEl: Element, aName: string, bName: string): StemCompat {
  if (aEl === bEl) {
    return {
      relation: "비화(比和)",
      score: 65,
      direction: `${aEl}(${aName}) ↔ ${bEl}(${bName}) 비화`,
      detail: `두 사람의 천간 오행이 같다. 같은 기운끼리 모여 강하게 공명하지만, 부족한 부분도 함께 공유한다. 서로를 너무 잘 알기에 오히려 기대가 클 수 있다.`,
    };
  }
  if (SHENG[aEl] === bEl) {
    return {
      relation: "상생(相生)",
      score: 88,
      direction: `${aEl}(${aName})이 ${bEl}(${bName})을 생(生)한다`,
      detail: `${aName}의 ${aEl} 기운이 ${bName}의 ${bEl} 기운을 키워주는 구조다. ${aName}은 자연스럽게 ${bName}을 돕고 밀어주는 역할을 하고, ${bName}은 그 에너지를 받아 성장한다. 두 사람 사이에 자연스러운 지지 관계가 형성된다.`,
    };
  }
  if (SHENG[bEl] === aEl) {
    return {
      relation: "상생(相生)",
      score: 88,
      direction: `${bEl}(${bName})이 ${aEl}(${aName})을 생(生)한다`,
      detail: `${bName}의 ${bEl} 기운이 ${aName}의 ${aEl} 기운을 키워주는 구조다. ${bName}이 ${aName}을 자연스럽게 지지하고 보살피는 방향으로 관계가 흐른다.`,
    };
  }
  if (KEUK[aEl] === bEl) {
    return {
      relation: "상극(相剋)",
      score: 38,
      direction: `${aEl}(${aName})이 ${bEl}(${bName})을 극(剋)한다`,
      detail: `${aName}의 ${aEl} 기운이 ${bName}의 ${bEl} 기운을 억누른다. 처음엔 잘 맞아 보여도, 시간이 지나면서 ${bName}이 억압받는 느낌을 받을 수 있다. 주도권 다툼과 에너지 불균형이 관계의 주요 갈등 원인이 된다.`,
    };
  }
  if (KEUK[bEl] === aEl) {
    return {
      relation: "상극(相剋)",
      score: 38,
      direction: `${bEl}(${bName})이 ${aEl}(${aName})을 극(剋)한다`,
      detail: `${bName}의 ${bEl} 기운이 ${aName}의 ${aEl} 기운을 억누른다. ${aName}이 관계에서 에너지를 소진당하는 구조가 반복될 수 있다.`,
    };
  }
  return {
    relation: "비화(比和)",
    score: 60,
    direction: `${aEl}(${aName}) ↔ ${bEl}(${bName}) 독립`,
    detail: `두 천간 오행 간 직접적인 생극 관계가 없다. 독립적으로 흐르며, 충돌보다는 연지(年支) 관계가 이 궁합의 핵심이다.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 월지 관계 (성격 기반 궁합)
// ─────────────────────────────────────────────────────────────────────────────

function getMonthBranchNote(aMonth: string, bMonth: string): string {
  if (aMonth === bMonth) {
    return `두 사람의 월지(月支)가 같은 ${aMonth}다. 태어난 계절 기운이 같아 감정 흐름과 생활 리듬이 잘 맞는다.`;
  }
  return `${aMonth}(나)과 ${bMonth}(상대)의 월지가 다르다. 감정의 속도와 생활 리듬이 다를 수 있지만, 서로의 결핍을 보완하는 관계가 될 수 있다.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 종합 점수 + 등급
// ─────────────────────────────────────────────────────────────────────────────

function totalScore(branchScore: number, stemScore: number): { total: number; grade: string; summary: string } {
  const total = Math.round(branchScore * 0.55 + stemScore * 0.45);
  if (total >= 85) return { total, grade: "천생연분(天生緣分)", summary: "운명이 미리 짜놓은 관계다. 이 조합은 드물다." };
  if (total >= 72) return { total, grade: "좋은 궁합", summary: "자연스럽게 맞는 구조다. 노력 없이도 편안한 관계." };
  if (total >= 58) return { total, grade: "보통 궁합", summary: "큰 장애도 없고 큰 시너지도 없다. 두 사람의 노력이 결과를 결정한다." };
  if (total >= 42) return { total, grade: "주의가 필요한 궁합", summary: "구조적으로 마찰이 생기기 쉽다. 인정과 양보가 없으면 쌓인다." };
  return { total, grade: "어려운 궁합", summary: "두 기운이 충돌한다. 강한 의지와 서로에 대한 깊은 이해 없이는 유지가 어렵다." };
}

// ─────────────────────────────────────────────────────────────────────────────
// 메인 함수
// ─────────────────────────────────────────────────────────────────────────────

export function buildCompatibilityContext(
  userSaju: SajuData,
  partnerSaju: SajuData,
  userName: string,
  partnerName: string,
): string {
  // 연지 인덱스 추출 (e.g. "오(午)" → find by zodiac)
  const BRANCH_ZODIACS = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
  const aIdx = BRANCH_ZODIACS.indexOf(userSaju.yearZodiac);
  const bIdx = BRANCH_ZODIACS.indexOf(partnerSaju.yearZodiac);

  const branchCompat = getBranchCompat(aIdx, bIdx, userSaju.yearZodiac, partnerSaju.yearZodiac);

  const aEl = extractEl(userSaju.yearElement);
  const bEl = extractEl(partnerSaju.yearElement);
  const stemCompat = getStemCompat(aEl, bEl, userName, partnerName);

  const monthNote = getMonthBranchNote(userSaju.monthBranch, partnerSaju.monthBranch);
  const { total, grade, summary } = totalScore(branchCompat.score, stemCompat.score);

  const ageDiff = Math.abs(userSaju.currentAge - partnerSaju.currentAge);

  return `
══════════════════════════════════════════
궁합(宮合) 분석 데이터 — 이것이 이 독경의 전부다
══════════════════════════════════════════

【나 (${userName})】
연주: ${userSaju.yearPillar} / 띠: ${userSaju.yearZodiac}띠 / 오행: ${userSaju.yearElement} ${userSaju.yearYinYang}
월지: ${userSaju.monthBranch} (${userSaju.monthSeason})
만 나이: ${userSaju.currentAge}세
오행 성격: ${ELEMENT_TRAITS[aEl]}

【상대 (${partnerName})】
연주: ${partnerSaju.yearPillar} / 띠: ${partnerSaju.yearZodiac}띠 / 오행: ${partnerSaju.yearElement} ${partnerSaju.yearYinYang}
월지: ${partnerSaju.monthBranch} (${partnerSaju.monthSeason})
만 나이: ${partnerSaju.currentAge}세
오행 성격: ${ELEMENT_TRAITS[bEl]}

나이 차이: ${ageDiff}세

【연지(年支) 궁합 — 띠 관계】
결과: ${branchCompat.label}
점수: ${branchCompat.score}/100
해석: ${branchCompat.detail}

【천간(天干) 오행 궁합 — 에너지 흐름】
결과: ${stemCompat.direction} (${stemCompat.relation})
점수: ${stemCompat.score}/100
해석: ${stemCompat.detail}

【월지(月支) — 생활 리듬·감정 호흡】
${monthNote}

【종합 궁합 점수】
${total}점 / 100점 — ${grade}
"${summary}"

══════════════════════════════════════════
【무속인 필수 지침】
- 위의 수치와 해석을 핵심 근거로 삼아 독경할 것
- 연지 궁합 유형(${branchCompat.type})과 천간 관계(${stemCompat.relation})를 반드시 언급
- 두 사람의 이름(${userName}, ${partnerName})을 자연스럽게 불러가며 진행
- 종합 점수 ${total}점·${grade}를 독경 초반에 직접 제시
- "일반적으로 좋은 궁합입니다" 같은 뜬구름 절대 금지
- 위 데이터 기반으로만 구체적이고 소름 돋는 해석을 제공할 것
- ${branchCompat.score < 40 ? "궁합이 어렵다는 사실을 솔직하게, 그러나 희망을 완전히 꺾지 않는 방식으로 전달할 것" : "좋은 부분은 확신 있게, 주의할 부분은 날카롭게 짚어줄 것"}
══════════════════════════════════════════
`.trim();
}

export function calcPartnerSaju(partner: PartnerProfile): SajuData {
  return calcSaju(
    parseInt(partner.birthYear, 10),
    parseInt(partner.birthMonth, 10),
    parseInt(partner.birthDay, 10),
    partner.birthHour ? parseInt(partner.birthHour, 10) : undefined,
  );
}
