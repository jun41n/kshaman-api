/**
 * Curated cultural-knowledge repository.
 *
 * This is intentionally structured data, not a prompt dump. Each record has a
 * domain, feature keys, provenance, and wording constraints. The model may
 * paraphrase a matched record, but it must not invent an interpretation outside
 * the retrieved records and computed observations.
 */

export type KnowledgeDomain = "palm" | "face" | "saju";
export type KnowledgeLocale = "ko" | "en" | "ja" | "es" | "pt-BR" | "fr";

export interface KnowledgeRecord {
  id: string;
  domain: KnowledgeDomain;
  tradition: string;
  topic: string;
  featureKeys: string[];
  provenance: {
    sourceId: string;
    sourceTitle: string;
    sourceLocator: string;
    claimType: "historical-tradition" | "calculation-rule" | "product-safety";
  };
  safeWording: Record<"ko" | "en", string>;
  prohibited: string[];
  status: "curated" | "review-needed";
}

export const KNOWLEDGE_RECORDS: KnowledgeRecord[] = [
  {
    id: "PALM-WESTERN-MAJOR-LINES-001",
    domain: "palm",
    tradition: "western-palmistry",
    topic: "major lines",
    featureKeys: ["heart-line", "head-line", "life-line", "major-lines"],
    provenance: {
      sourceId: "PALM-HISTORICAL-READING-001",
      sourceTitle: "Historical western palmistry terminology",
      sourceLocator: "docs/palm-reading-mvp-research.md §5, §7",
      claimType: "historical-tradition",
    },
    safeWording: {
      ko: "감정선·두뇌선·생명선은 서양 손금 전통에서 서로 다른 상징 영역을 설명할 때 사용하는 분류명입니다. 사진에서 선의 위치·연속성·깊이를 관찰한 뒤, 전통적으로는 특정 태도나 자기성찰 주제와 연결해 풀이하기도 합니다.",
      en: "The heart, head, and life lines are classification terms used in western palmistry traditions. Observe position, continuity, and apparent depth first; traditional readings may connect them with reflective themes rather than factual personality claims.",
    },
    prohibited: ["health", "lifespan", "fertility", "wealth-certainty"],
    status: "curated",
  },
  {
    id: "PALM-WESTERN-MONEY-REFLECTION-001",
    domain: "palm",
    tradition: "western-palmistry",
    topic: "money reflection",
    featureKeys: ["money-habits", "compatibility"],
    provenance: {
      sourceId: "PALM-PRODUCT-SAFETY-001",
      sourceTitle: "MyTestType palm-reading safety contract",
      sourceLocator: "docs/palm-reading-mvp-research.md §8",
      claimType: "product-safety",
    },
    safeWording: {
      ko: "손금은 재산의 양이나 미래의 수입을 판정하는 근거가 아닙니다. 결과는 소비·저축·계획을 돌아보는 가벼운 질문과 행동 아이디어로만 연결합니다.",
      en: "Palm lines are not evidence of wealth or future income. Connect the reading only to low-stakes questions and actions about spending, saving, and planning.",
    },
    prohibited: ["lottery", "investment", "income-guarantee", "debt-advice"],
    status: "curated",
  },
  {
    id: "PALM-COMPATIBILITY-001",
    domain: "palm",
    tradition: "western-palmistry",
    topic: "two-person comparison",
    featureKeys: ["compatibility", "person-pair"],
    provenance: {
      sourceId: "PALM-PRODUCT-SAFETY-001",
      sourceTitle: "MyTestType palm-reading safety contract",
      sourceLocator: "docs/palm-reading-mvp-research.md §8",
      claimType: "product-safety",
    },
    safeWording: {
      ko: "두 사람 비교는 손금의 시각적 특징을 문화적 상징으로 나란히 살펴보는 기능입니다. 끌리는 지점·대화 방식·조율할 주제를 제안할 수 있지만 궁합의 성패나 연애 결과를 단정하지 않습니다.",
      en: "A two-person comparison places visible palm features side by side as cultural symbols. It may suggest conversation styles and topics to negotiate, but it must not decide relationship success or romantic outcomes.",
    },
    prohibited: ["fidelity", "divorce", "relationship-certainty", "destiny"],
    status: "curated",
  },
  {
    id: "FACE-TRADITIONAL-REGIONS-001",
    domain: "face",
    tradition: "korean-face-reading-culture",
    topic: "visual regions",
    featureKeys: ["forehead", "eyes", "nose", "mouth", "face-regions"],
    provenance: {
      sourceId: "FACE-CULTURAL-SAFETY-001",
      sourceTitle: "MyTestType face-reading cultural wording policy",
      sourceLocator:
        "artifacts/api-server/src/routes/face-reading.ts SYSTEM_PROMPT",
      claimType: "historical-tradition",
    },
    safeWording: {
      ko: "이마·눈·코·입은 관상 문화에서 인상을 나누어 말할 때 사용하는 시각적 영역입니다. 사진에서 보이는 형태와 표정을 먼저 묘사하고, 전통 상징은 참고용으로 조건부 표현을 사용합니다.",
      en: "The forehead, eyes, nose, and mouth are visual regions used to organize impressions in face-reading traditions. Describe visible shape and expression first, then present traditional symbolism as conditional cultural reference.",
    },
    prohibited: [
      "personality-certainty",
      "health",
      "intelligence",
      "ethnicity",
      "genetics",
      "criminality",
    ],
    status: "curated",
  },
  {
    id: "FACE-TRADITIONAL-FRAMEWORK-001",
    domain: "face",
    tradition: "korean-face-reading-culture",
    topic: "samjeong and ogwan terminology",
    featureKeys: ["samjeong", "ogwan", "face-regions", "face-balance"],
    provenance: {
      sourceId: "FACE-GEMINI-RESEARCH-2026-10-28",
      sourceTitle: "관상 - 한국민족문화대백과사전",
      sourceLocator: "https://encykorea.aks.ac.kr/Article/E0004873",
      claimType: "historical-tradition",
    },
    safeWording: {
      ko: "삼정·오관은 얼굴을 상정·중정·하정과 이마·눈썹·눈·코·입·귀 같은 전통적 영역으로 나누어 말하는 관상 용어입니다. 사진에서 실제로 보이는 위치와 균형을 먼저 묘사하고, 그 상징은 문화적 참고로만 조건부 제시합니다.",
      en: "Samjeong and Ogwan are traditional face-reading terms for organizing regions such as the upper, middle, and lower face and the sensory features. Describe visible position and balance first, and present their symbolism only as conditional cultural reference.",
    },
    prohibited: ["personality-certainty", "health", "intelligence", "ethnicity", "social-status"],
    status: "curated",
  },
  {
    id: "FACE-OBSERVATION-QUALITY-001",
    domain: "face",
    tradition: "computer-vision-observation",
    topic: "image quality and observation limits",
    featureKeys: ["face-image-quality", "lighting", "camera-angle", "occlusion", "asymmetry"],
    provenance: {
      sourceId: "FACE-GEMINI-RESEARCH-2026-10-28",
      sourceTitle: "MyTestType 관상 Deep Research: CV 관측 taxonomy 및 안전 모델",
      sourceLocator: "Gemini Deep Research report, sections CV taxonomy and safety",
      claimType: "product-safety",
    },
    safeWording: {
      ko: "조명·각도·표정·가림·해상도는 얼굴 관찰의 불확실성을 크게 바꿀 수 있습니다. 조건이 좋지 않으면 특징을 단정하지 말고, 관찰 불충분 또는 재촬영 안내로 처리합니다.",
      en: "Lighting, angle, expression, occlusion, and resolution can materially change face observations. When conditions are poor, avoid firm claims and report insufficient observation or request a clearer image.",
    },
    prohibited: ["race-inference", "gender-inference", "age-judgment", "health", "criminality"],
    status: "curated",
  },
  {
    id: "PALM-WESTERN-TERMINOLOGY-001",
    domain: "palm",
    tradition: "western-palmistry",
    topic: "major lines and mounts terminology",
    featureKeys: ["heart-line", "head-line", "life-line", "fate-line", "sun-line", "mounts", "hand-shape"],
    provenance: {
      sourceId: "PALM-GEMINI-RESEARCH-2026-10-28",
      sourceTitle: "Palmistry | Hand Lines, Fate Lines & Chiromancy",
      sourceLocator: "https://www.britannica.com/topic/palmistry",
      claimType: "historical-tradition",
    },
    safeWording: {
      ko: "감정선·두뇌선·생명선·운명선·태양선과 손바닥의 언덕은 서양 손금에서 사용하는 분류명입니다. 선의 존재·연속성·위치와 손 모양을 관찰한 뒤, 전통적 상징을 자기성찰 주제로만 연결합니다.",
      en: "The heart, head, life, fate, and sun lines, along with palm mounts, are classification terms used in western palmistry. Observe presence, continuity, position, and hand shape first, then connect symbolism only to reflective themes.",
    },
    prohibited: ["lifespan", "health", "wealth-certainty", "fertility", "event-certainty"],
    status: "curated",
  },
  {
    id: "PALM-OBSERVATION-QUALITY-001",
    domain: "palm",
    tradition: "palm-image-observation",
    topic: "palm photo quality and hand orientation",
    featureKeys: ["palm-image-quality", "left-hand", "right-hand", "palm-open", "line-visibility", "lighting"],
    provenance: {
      sourceId: "PALM-GEMINI-RESEARCH-2026-10-28",
      sourceTitle: "MyTestType 손금 Deep Research: 사진 관찰 및 좌우 손 비교",
      sourceLocator: "Gemini Deep Research report, sections photo uncertainty and hand comparison",
      claimType: "product-safety",
    },
    safeWording: {
      ko: "손바닥이 충분히 펼쳐졌는지, 좌우 손이 올바르게 표시됐는지, 선명도·조명·가림이 해석에 적합한지 먼저 확인합니다. 선이 흐리거나 방향이 불명확하면 해석보다 재촬영 안내를 우선합니다.",
      en: "First check whether the palm is open, the left and right hands are labeled correctly, and line visibility, lighting, and occlusion are adequate. If lines or orientation are unclear, request a new image before interpreting.",
    },
    prohibited: ["health", "lifespan", "wealth-guarantee", "gender-rule", "certainty-from-blurry-image"],
    status: "curated",
  },
  {
    id: "PALM-HAND-COMPARISON-002",
    domain: "palm",
    tradition: "western-palmistry",
    topic: "active and non-dominant hand comparison",
    featureKeys: ["left-hand", "right-hand", "dominant-hand", "compatibility", "two-hand-comparison"],
    provenance: {
      sourceId: "PALM-GEMINI-RESEARCH-2026-10-28",
      sourceTitle: "Which Hand Do You Read in Palmistry? Active vs Passive Hands",
      sourceLocator: "https://palmistrypath.com/blog/beginner/which-hand-to-read-palmistry/",
      claimType: "historical-tradition",
    },
    safeWording: {
      ko: "일부 서양 손금 전통에서는 주로 쓰는 손과 덜 쓰는 손을 나란히 보며 현재의 선택과 타고난 성향을 비교하는 틀을 사용합니다. 이는 학파마다 다르므로 개인의 관계·성공·운명을 판정하는 규칙으로 사용하지 않습니다.",
      en: "Some western palmistry traditions compare the dominant and non-dominant hands as a framework for reflecting on current choices and inherited tendencies. Views vary by school, so this is not a rule for judging relationship outcomes, success, or destiny.",
    },
    prohibited: ["destiny", "relationship-certainty", "wealth-certainty", "gender-rule"],
    status: "curated",
  },
  {
    id: "SAJU-FIVE-ELEMENTS-001",
    domain: "saju",
    tradition: "myeongri-cultural-framework",
    topic: "five elements",
    featureKeys: ["wood", "fire", "earth", "metal", "water", "five-elements"],
    provenance: {
      sourceId: "SAJU-CALC-RULES-001",
      sourceTitle: "MyTestType deterministic Saju calculation contract",
      sourceLocator: "artifacts/api-server/src/lib/ai/sajuCalc.ts",
      claimType: "calculation-rule",
    },
    safeWording: {
      ko: "오행은 명리학에서 천간·지지의 상징을 설명하는 문화적 분류 체계입니다. 계산된 오행을 근거로 전통적 경향을 조건부로 설명하되, 과학적 성격 진단이나 결과 보장으로 표현하지 않습니다.",
      en: "The five elements are a cultural classification system used in Myeongri traditions to describe stem and branch symbolism. Use the computed element for conditional traditional themes, not scientific personality diagnosis or guaranteed outcomes.",
    },
    prohibited: [
      "medical-diagnosis",
      "wealth-guarantee",
      "legal-advice",
      "life-or-death",
    ],
    status: "curated",
  },
  {
    id: "SAJU-RELATION-001",
    domain: "saju",
    tradition: "myeongri-cultural-framework",
    topic: "branch relations",
    featureKeys: ["충", "합", "형", "branch-relation", "year-flow"],
    provenance: {
      sourceId: "SAJU-CALC-RULES-001",
      sourceTitle: "MyTestType deterministic Saju calculation contract",
      sourceLocator: "artifacts/api-server/src/lib/ai/sajuCalc.ts",
      claimType: "calculation-rule",
    },
    safeWording: {
      ko: "충·합·형 같은 관계명은 명리학 내부의 상징 용어입니다. 계산된 관계를 삶의 특정 사건이 발생한다는 예언이 아니라, 점검할 주제와 선택지를 제안하는 방식으로 사용합니다.",
      en: "Terms such as clash, combination, and penalty are symbolic relationship labels within Myeongri traditions. Use the computed relation to suggest themes and choices to review, never to predict a specific event.",
    },
    prohibited: [
      "event-certainty",
      "accident",
      "illness",
      "divorce",
      "financial-loss",
    ],
    status: "curated",
  },
];

function localized(record: KnowledgeRecord, locale: string): string {
  return record.safeWording[locale === "ko" ? "ko" : "en"];
}

export function retrieveKnowledge(
  domain: KnowledgeDomain,
  featureKeys: string[],
  locale: string,
  limit = 6,
): { ruleIds: string[]; context: string } {
  const requested = new Set(featureKeys);
  const matches = KNOWLEDGE_RECORDS.filter(
    (record) => record.domain === domain && record.status === "curated",
  )
    .map((record) => ({
      record,
      score: record.featureKeys.reduce(
        (score, key) => score + (requested.has(key) ? 2 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ record }) => record);

  const context =
    matches.length === 0
      ? "No curated knowledge matched. Do not invent a tradition-specific interpretation."
      : matches
          .map((record) =>
            [
              `[${record.id}] tradition=${record.tradition}; topic=${record.topic}`,
              `PROVENANCE: ${record.provenance.sourceId} (${record.provenance.sourceLocator})`,
              `SAFE REFERENCE: ${localized(record, locale)}`,
              `DO NOT CLAIM: ${record.prohibited.join(", ")}`,
            ].join("\n"),
          )
          .join("\n\n");

  return { ruleIds: matches.map((record) => record.id), context };
}

export function buildKnowledgeContext(
  domain: KnowledgeDomain,
  featureKeys: string[],
  locale: string,
): { ruleIds: string[]; text: string } {
  const result = retrieveKnowledge(domain, featureKeys, locale);
  return {
    ruleIds: result.ruleIds,
    text: [
      "=== CURATED KNOWLEDGE ONLY ===",
      "Use the following retrieved cultural references as the only tradition-specific basis.",
      "Paraphrase them conservatively. If a requested claim is not supported, omit it.",
      result.context,
      "=== END CURATED KNOWLEDGE ===",
    ].join("\n"),
  };
}
