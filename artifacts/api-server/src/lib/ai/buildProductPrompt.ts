// Server-side product config — prompt behavior per product

interface ProductPromptConfig {
  id: string;
  name_ko: string;
  name_en: string;
  is_free: boolean;
  prompt_goal: string;
  behavioral_rules: string[];
  length_requirement: string;
  structure_requirement: string | null;
}

const PAID_STRUCTURE = `
REQUIRED STRUCTURE — Include ALL of the following sections in order:

① OPENING INSIGHT
   A powerful, personal hook that immediately shows you see this person clearly.
   Not a generic greeting. Hit them with something specific and true in the very first sentence.
   (2–3 paragraphs)

② CORE INTERPRETATION
   The main spiritual analysis. This is the heart of the reading.
   Go deep — explain the energetic pattern, its origin, its current expression, and its significance.
   Tie it specifically to their birth energy and current timing.
   (3–4 paragraphs)

③ HIDDEN PATTERN / TRUTH
   The thing they have not yet fully seen or admitted to themselves.
   The layer beneath the surface. What the energy reveals that the conscious mind avoids.
   This should feel like a moment of recognition — "how did you know that?"
   (2–3 paragraphs)

④ WARNING / CAUTION
   A real risk, blind spot, or obstacle. Be honest without being cruel.
   Explain WHY this is a warning — the energetic reason behind it.
   This section must feel like genuine guidance, not superstition.
   (1–2 paragraphs)

⑤ OPPORTUNITY / TURNING POINT
   What window is opening for them? What potential is activating?
   Be specific about timing or energy window if possible.
   This should feel uplifting and actionable.
   (2–3 paragraphs)

⑥ PRACTICAL ADVICE
   Clear, concrete actions or approaches the user can actually take.
   In persona voice — not generic life advice.
   Make it specific to their situation and energy pattern.
   (2–3 paragraphs)

⑦ CLOSING LINE
   A final signature sentence in your persona's exact voice and style.
   It should linger — something the user will remember.
   (1–2 sentences)
`.trim();

const PRODUCT_CONFIGS: Record<string, ProductPromptConfig> = {
  daily_fortune: {
    id: "daily_fortune",
    name_ko: "오늘의 운세",
    name_en: "Daily Fortune",
    is_free: true,
    prompt_goal:
      "Give a brief, uplifting daily fortune reading. Cover today's overall energy, a lucky element, and one actionable daily guidance.",
    behavioral_rules: [
      "This is a free reading — it should feel generous and complete but not exhaustive.",
      "Lead with today's overall energy feel — be specific, not generic.",
      "Include one lucky element (color, number, direction, or time) naturally woven in.",
      "End with one clear, personalized daily guidance that feels like it was meant for this specific person.",
      "Tone should be light, encouraging, and energizing.",
      "Even though it is free, it must feel better than any free horoscope app.",
    ],
    length_requirement: "3–4 substantial paragraphs. Not a list. Flowing, readable, warm.",
    structure_requirement: null, // Free reading — no rigid section structure
  },

  saju: {
    id: "saju",
    name_ko: "사주 풀이",
    name_en: "Four Pillars (Saju)",
    is_free: false,
    prompt_goal:
      "Analyze the user's Four Pillars of Destiny based on their birth date and hour. Reveal their core personality, life path energy, dominant 10-year cycle theme, and comprehensive guidance.",
    behavioral_rules: [
      "This is the foundational premium reading — deliver maximum depth.",
      "Begin with the user's core elemental identity derived from their birth year and season.",
      "Analyze the dominant energy pattern across the Year, Month, Day, and Hour pillars.",
      "Identify the current 10-year luck cycle theme and what it means specifically for their life right now.",
      "Go beyond surface description — explain the WHY behind each energetic pattern.",
      "Every insight must feel specifically drawn from their birth data, not generic.",
    ],
    length_requirement: "English: 700–900 words minimum. Korean: 1000–1400 characters minimum. Never truncate.",
    structure_requirement: PAID_STRUCTURE,
  },

  compatibility: {
    id: "compatibility",
    name_ko: "궁합 보기",
    name_en: "Compatibility Reading",
    is_free: false,
    prompt_goal:
      "Assess romantic or interpersonal compatibility for the user. Evaluate energy harmony, karmic connection patterns, and provide deep relationship guidance.",
    behavioral_rules: [
      "This is a premium paid reading.",
      "Focus on the user's own energetic relationship patterns — what they attract, what they repel.",
      "Identify karmic patterns that repeat in their relationships and explain the spiritual reason.",
      "Describe the type of partner energy that would create harmony with them.",
      "Be honest about any self-sabotage or blind spots in how they approach connection.",
      "End with actionable relationship wisdom specific to their energy profile.",
    ],
    length_requirement: "English: 600–800 words minimum. Korean: 900–1200 characters minimum. Never truncate.",
    structure_requirement: PAID_STRUCTURE,
  },

  luck_cycle: {
    id: "luck_cycle",
    name_ko: "운의 흐름",
    name_en: "Luck Cycle Reading",
    is_free: false,
    prompt_goal:
      "Map the user's current luck cycle in detail. Identify direction, life area activation, and provide a specific 3–6 month forecast with navigation guidance.",
    behavioral_rules: [
      "This is a premium paid reading.",
      "Open with a clear, specific statement about the current direction and quality of their luck flow.",
      "Analyze each life area with nuance: love, career, health, and wealth — not just 'good' or 'bad'.",
      "Identify the next key turning point with a specific energetic description of what will change.",
      "Warn clearly about any low-energy windows that need careful navigation.",
      "Provide a specific strategy for maximizing this particular cycle — not generic advice.",
    ],
    length_requirement: "English: 650–850 words minimum. Korean: 950–1300 characters minimum. Never truncate.",
    structure_requirement: PAID_STRUCTURE,
  },

  date_selection: {
    id: "date_selection",
    name_ko: "날짜 선택",
    name_en: "Auspicious Date Selection",
    is_free: false,
    prompt_goal:
      "Help the user identify the most auspicious upcoming dates for an important event. Recommend 2–3 favorable dates with detailed reasoning and warn about timing to avoid.",
    behavioral_rules: [
      "This is a premium paid reading.",
      "First acknowledge what type of event the reading is for (or assume a major life decision if not specified).",
      "Recommend exactly 2–3 specific favorable date windows in the near future.",
      "For each date, give detailed reasoning — the specific energetic alignment and why it supports their goal.",
      "Identify 2 types of timing patterns to avoid and explain the energetic reason.",
      "Close with a specific ritual or preparation guidance suited to the event type.",
    ],
    length_requirement: "English: 600–800 words minimum. Korean: 900–1200 characters minimum. Never truncate.",
    structure_requirement: PAID_STRUCTURE,
  },

  yearly_fortune: {
    id: "yearly_fortune",
    name_ko: "올해의 운세",
    name_en: "Yearly Fortune",
    is_free: false,
    prompt_goal:
      "Provide a comprehensive yearly fortune overview with full depth. Cover all four life areas, identify 2–3 critical turning-point months, and give a seasonal strategy guide.",
    behavioral_rules: [
      "This is the most comprehensive and valuable paid reading — deliver full maximum depth.",
      "Open with the single defining theme or energy signature of this year for this specific person.",
      "Dedicate substantial analysis to each area: love, career, health, and wealth.",
      "Identify exactly 2–3 months that will serve as critical turning points and explain WHY those months.",
      "Provide a seasonal strategy: which quarters to expand, which to consolidate, which to rest.",
      "End with a motivating perspective on how to approach this year as a whole.",
      "This should feel like a full reading document, not a summary.",
    ],
    length_requirement: "English: 900–1100 words minimum. Korean: 1300–1700 characters minimum. Never truncate.",
    structure_requirement: PAID_STRUCTURE,
  },

  ask_anything: {
    id: "ask_anything",
    name_ko: "무엇이든 물어보세요",
    name_en: "Ask Anything",
    is_free: false,
    prompt_goal:
      "Engage in a live, free-form spiritual Q&A session. Answer each question directly, intuitively, and personally in the full persona voice with meaningful depth.",
    behavioral_rules: [
      "This is a conversational live session — respond directly to what the user just asked.",
      "Every reply must be fully in persona voice — no drift is acceptable.",
      "Medium length but meaningful — no shallow one-liners, but also not an essay.",
      "Each answer should feel personal, specific, and insightful — not generic.",
      "Build on previous turns — show you remember the emotional arc of the conversation.",
      "You may ask one thoughtful follow-up question to deepen the reading.",
      "If the user asks something outside your spiritual domain, redirect gently in persona voice.",
      "Even in conversational mode, go deeper than surface — give real insight, not platitudes.",
    ],
    length_requirement: "3–5 meaningful paragraphs per reply. Complete thoughts only. No truncation.",
    structure_requirement: null, // Conversational — no rigid section structure
  },
};

export function buildProductPrompt(productId: string): string {
  const product = PRODUCT_CONFIGS[productId];
  if (!product) {
    return `Provide a meaningful spiritual reading for the user based on your persona.`;
  }

  const sections = [
    `READING TYPE: ${product.name_ko} (${product.name_en})`,
    "",
    `READING GOAL:`,
    product.prompt_goal,
    "",
    `BEHAVIORAL RULES FOR THIS READING:`,
    product.behavioral_rules.map((r) => `  • ${r}`).join("\n"),
    "",
    `LENGTH REQUIREMENT:`,
    product.length_requirement,
  ];

  if (product.structure_requirement) {
    sections.push("");
    sections.push(product.structure_requirement);
  }

  return sections.join("\n").trim();
}
