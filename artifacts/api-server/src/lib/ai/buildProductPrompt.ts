// Server-side product config — prompt behavior per product

interface ProductPromptConfig {
  id: string;
  name_ko: string;
  name_en: string;
  prompt_goal: string;
  behavioral_rules: string[];
}

const PRODUCT_CONFIGS: Record<string, ProductPromptConfig> = {
  daily_fortune: {
    id: "daily_fortune",
    name_ko: "오늘의 운세",
    name_en: "Daily Fortune",
    prompt_goal:
      "Give a brief, uplifting daily fortune reading. Cover today's overall energy, a lucky element (color/number/direction), and one actionable piece of guidance for the day.",
    behavioral_rules: [
      "Keep the reading concise — 3 to 4 paragraphs maximum.",
      "Lead with today's overall energy feel.",
      "Include one lucky element (color, number, or direction) naturally.",
      "End with one clear, actionable daily guidance.",
      "Tone should be light, encouraging, and energizing.",
      "This is a free reading — it should feel generous but not exhaustive.",
    ],
  },

  saju: {
    id: "saju",
    name_ko: "사주 풀이",
    name_en: "Four Pillars (Saju)",
    prompt_goal:
      "Analyze the user's Four Pillars of Destiny based on their birth date and hour. Reveal their core personality, life path energy, dominant 10-year cycle theme, and 3 key guidance points.",
    behavioral_rules: [
      "This is a premium paid reading — deliver substantial depth and detail.",
      "Open with the user's core elemental identity (based on birth year).",
      "Analyze the dominant energy pattern across their Four Pillars.",
      "Identify the current 10-year luck cycle theme and what it means for their life now.",
      "Provide 3 specific guidance points that feel personally attuned.",
      "Close with an invitation to ask follow-up questions.",
      "Length should be 5 to 7 paragraphs.",
    ],
  },

  compatibility: {
    id: "compatibility",
    name_ko: "궁합 보기",
    name_en: "Compatibility Reading",
    prompt_goal:
      "Assess romantic or interpersonal compatibility for the user. Evaluate energy harmony, karmic connection potential, and one key relationship advice.",
    behavioral_rules: [
      "This is a premium paid reading.",
      "Focus on the user's own energy compatibility patterns.",
      "Note: second person's birth data may not be provided yet — work from the user's energy profile.",
      "Describe the type of partner energy that harmonizes with them.",
      "Identify any karmic patterns that affect their relationships.",
      "End with concrete relationship advice in persona voice.",
      "Length: 4 to 6 paragraphs.",
    ],
  },

  luck_cycle: {
    id: "luck_cycle",
    name_ko: "운의 흐름",
    name_en: "Luck Cycle Reading",
    prompt_goal:
      "Map the user's current luck cycle. Identify whether their luck is rising or falling, which life areas are activated, and what to expect in the next 3 to 6 months.",
    behavioral_rules: [
      "This is a premium paid reading.",
      "Open with a clear statement about the direction of their current luck flow.",
      "Cover 4 life areas: love, career, health, and wealth — rate each briefly.",
      "Identify the next key turning point (approximate timeframe).",
      "Warn about any low-energy windows to navigate carefully.",
      "Close with a guiding perspective on how to use this cycle optimally.",
      "Length: 5 to 7 paragraphs.",
    ],
  },

  date_selection: {
    id: "date_selection",
    name_ko: "날짜 선택",
    name_en: "Auspicious Date Selection",
    prompt_goal:
      "Help the user identify the most auspicious upcoming dates for an important event. Recommend the top 2 to 3 favorable dates with reasoning and note what to avoid.",
    behavioral_rules: [
      "This is a premium paid reading.",
      "Ask what type of event the date is for if not specified (wedding, business, exam, travel).",
      "Recommend 2 to 3 specific favorable upcoming dates based on their birth energy.",
      "For each date, give a brief reason why it's favorable.",
      "Note 1 to 2 types of dates or timing patterns to avoid.",
      "Close with a blessing for the upcoming event.",
      "Be specific — not vague. Timeframes matter.",
    ],
  },

  yearly_fortune: {
    id: "yearly_fortune",
    name_ko: "올해의 운세",
    name_en: "Yearly Fortune",
    prompt_goal:
      "Provide a comprehensive yearly fortune overview. Cover love, career, health, and wealth themes. Identify the 2 to 3 most important turning-point months and give practical navigation guidance.",
    behavioral_rules: [
      "This is the most comprehensive paid reading — deliver full depth.",
      "Open with the dominant theme or energy of this year for the user.",
      "Cover each life area in its own paragraph: love, career, health, wealth.",
      "Identify 2 to 3 specific months that will be significant turning points.",
      "Provide practical action guidance for navigating the year.",
      "Close with a seasonal energy summary (which quarters to advance vs. consolidate).",
      "Length: 7 to 10 paragraphs.",
    ],
  },

  ask_anything: {
    id: "ask_anything",
    name_ko: "무엇이든 물어보세요",
    name_en: "Ask Anything",
    prompt_goal:
      "Engage in a live, free-form spiritual Q&A session. Answer each question directly, intuitively, and personally in the full persona voice. Maintain deep persona consistency across all turns.",
    behavioral_rules: [
      "This is a conversational live session — respond directly to what the user just asked.",
      "Every single reply must be fully in persona voice — no drift is acceptable.",
      "Stay grounded in the user's birth data and established context.",
      "Each answer should feel personal, specific, and insightful — not generic.",
      "Build on previous turns — show you remember the conversation's emotional arc.",
      "You may ask one follow-up question per turn to deepen the reading.",
      "If the user asks something outside your spiritual domain, redirect gently in persona voice.",
    ],
  },
};

export function buildProductPrompt(productId: string): string {
  const product = PRODUCT_CONFIGS[productId];
  if (!product) {
    return `Provide a meaningful spiritual reading for the user based on your persona.`;
  }

  return `
READING TYPE: ${product.name_ko} (${product.name_en})

READING GOAL:
${product.prompt_goal}

BEHAVIORAL RULES FOR THIS READING:
${product.behavioral_rules.map((r) => `  • ${r}`).join("\n")}
`.trim();
}
