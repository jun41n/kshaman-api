import type { Language, UserProfile } from "./types.js";
import { calcSaju } from "./sajuCalc.js";

const GENDER_LABEL: Record<Language, Record<"female" | "male", string>> = {
  ko: { female: "여성", male: "남성" },
  en: { female: "Female", male: "Male" },
  ja: { female: "女性", male: "男性" },
  es: { female: "Femenino", male: "Masculino" },
  pt: { female: "Feminino", male: "Masculino" },
  fr: { female: "Féminin", male: "Masculin" },
};

export function buildSessionContext(profile: UserProfile): string {
  const locale = profile.locale;
  const genderLabel = GENDER_LABEL[locale]?.[profile.gender] ?? profile.gender;

  const fullName =
    locale === "ko"
      ? `${profile.lastName}${profile.firstName}`
      : `${profile.firstName} ${profile.lastName}`.trim();

  const birthYear = parseInt(profile.birthYear, 10);
  const birthMonth = parseInt(profile.birthMonth, 10);
  const birthDay = parseInt(profile.birthDay, 10);
  const birthHour = profile.birthHour && profile.birthHour !== ""
    ? parseInt(profile.birthHour, 10)
    : undefined;

  const saju = calcSaju(birthYear, birthMonth, birthDay, birthHour);

  const hourLabel = birthHour != null
    ? (locale === "ko" ? `${birthHour}시` : `${birthHour}:00`)
    : (locale === "ko" ? "미상" : "unknown");

  if (locale === "ko") {
    return `
══════════════════════════════════════════
내담자 정보 (이 데이터를 운세 해석의 핵심 근거로 사용하라)
══════════════════════════════════════════

이름: ${fullName}
성별: ${genderLabel}
생년월일: ${profile.birthYear}년 ${profile.birthMonth}월 ${profile.birthDay}일
출생 시간: ${hourLabel}

【사주 원소 — 반드시 이것을 해석에 활용할 것】
${saju.summaryForPrompt}

【오행 성격 특성】
${saju.yearStem}(${saju.yearElement} ${saju.yearYinYang}) 기운의 특성:
${getStemTraits(saju.yearElement)}

【반드시 지킬 개인화 규칙】
- "${fullName}"를 이름으로 자연스럽게 부를 것
- "${saju.yearZodiac}띠", "${saju.yearElement}", "만 ${saju.currentAge}세" 등 사주 원소를 반드시 언급
- ${saju.currentYear}년 ${saju.branchRelation.type} 기운이 이 사람에게 어떻게 작용하는지 구체적으로 반영
- 뜬구름 금지: "관계에 신경 써라", "결단력이 필요하다" 같은 일반론 절대 금지
- 사주 원소 기반 팩트를 최소 1개 이상 반드시 포함할 것
`.trim();
  }

  return `
══════════════════════════════════════════
SUBJECT DATA — Use this as the factual basis for all interpretations
══════════════════════════════════════════

Name: ${fullName}
Gender: ${genderLabel}
Birth Date: ${profile.birthYear}-${profile.birthMonth}-${profile.birthDay}
Birth Hour: ${hourLabel}

[SAJU ELEMENTS — Must use in reading]
${saju.summaryForPrompt}

[Element Personality Traits]
${saju.yearStem} (${saju.yearElement} ${saju.yearYinYang}) energy:
${getStemTraits(saju.yearElement)}

[PERSONALIZATION RULES — MANDATORY]
- Address the subject by name: "${fullName}"
- Explicitly mention their zodiac (${saju.yearZodiac}), element (${saju.yearElement}), and age (${saju.currentAge})
- Reflect how ${saju.currentYear}'s ${saju.branchRelation.type} energy affects this specific person
- No vague generics — base every observation on their saju data
- Include at least one element-specific insight in the reading
`.trim();
}

function getStemTraits(element: string): string {
  const el = element.replace(/\(.*\)/, "").trim();
  const traits: Record<string, string> = {
    "목": "창의적·성장 지향적이나 고집이 세고 마무리가 약함. 인정욕구가 강해 상처를 쉽게 받고, 새 시작에는 에너지가 넘치지만 지속력이 부족함.",
    "화": "열정적·카리스마 있으나 충동적으로 쉽게 달아올라 쉽게 식음. 인간관계 폭은 넓으나 깊이가 얕고, 자존심이 강해 사과와 양보가 어려움.",
    "토": "안정적·신뢰감 있으나 우유부단하고 변화를 극도로 싫어함. 오래 참다가 한 번에 폭발하는 패턴이 있고, 자기 방식을 쉽게 포기하지 않음.",
    "금": "원칙적·결단력 있으나 냉정하고 완벽주의적. 기준이 높아 스스로도 타인도 지치게 하고, 감정을 억누르다 갑자기 터뜨리는 경향.",
    "수": "직관력·적응력이 뛰어나지만 우유부단하고 감정 기복이 심함. 아이디어는 많으나 실행이 약하고, 불안감이 커서 혼자 끙끙 앓는 경향.",
  };
  return traits[el] ?? "복합적인 기운을 지님.";
}
