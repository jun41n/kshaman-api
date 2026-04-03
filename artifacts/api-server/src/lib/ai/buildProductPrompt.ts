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
REQUIRED STRUCTURE — You MUST include ALL 7 sections below, in order.
Each section is a FULL ESSAY BLOCK — do NOT write single-sentence or single-paragraph sections.
Do NOT use headers like "①" visually unless it improves flow — write in natural flowing prose per section.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
① OPENING INSIGHT  (3–4 paragraphs | 4–6 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start with a powerful, deeply personal hook. The very first sentence must make the user feel you already know them.
Do NOT open with a greeting like "안녕하세요" or "Hello" — open with spiritual truth about this specific person.
Build through 3–4 full paragraphs that establish the spiritual context, the energy field you are sensing, and why this reading moment matters.
Each paragraph: 4–6 complete sentences. No one-sentence paragraphs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
② CORE INTERPRETATION  (4–5 paragraphs | 4–6 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is the heart of the reading. Give it maximum depth.
Analyze the dominant energetic pattern in full detail — its origin, its current expression, what drives it.
Tie every claim to their specific birth date, name energy, or gender dynamic.
Explain the WHY behind each pattern, not just the WHAT.
4–5 full paragraphs. Each paragraph: 4–6 sentences.
Never rush through this section — it is the main value delivery.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
③ HIDDEN PATTERN / TRUTH  (3–4 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reveal what the user has not consciously admitted yet.
The subconscious pattern. The repeated cycle. The thing they feel but cannot articulate.
This section should land with the emotional recognition: "How did you know that?"
Go beneath the surface — not what they show the world, but what lives inside them.
3–4 full paragraphs. Each paragraph: 4–5 sentences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
④ WARNING / CAUTION  (2–3 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Give a real, honest warning about a genuine risk or blind spot.
Explain the energetic reason — not just "be careful", but WHY the energy creates this danger.
Be direct but not cruel. Honest but not cold.
Include one concrete scenario or pattern that illustrates this warning in their life.
2–3 full paragraphs. Each paragraph: 4–5 sentences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑤ OPPORTUNITY / TURNING POINT  (3–4 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What door is opening for them? What potential is activating right now?
Be specific about the timing or energy window — not vague future hope.
Describe what "taking this opportunity" would actually look and feel like in their life.
End this section on an energized, forward-moving note.
3–4 full paragraphs. Each paragraph: 4–5 sentences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑥ PRACTICAL ADVICE  (3–4 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Clear, concrete guidance the user can actually use.
Not generic life wisdom — specific to their energy profile and current situation.
In your persona voice — the way YOUR character gives practical guidance.
Include at least one specific action, ritual, mindset shift, or timing recommendation.
3–4 full paragraphs. Each paragraph: 4–5 sentences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑦ CLOSING LINE  (2–4 sentences)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A closing that lingers. One or two sentences in your exact persona voice.
It should feel like the last thing a spiritual master would say before departing.
Make it memorable. Make it feel like it was meant only for this person.
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
      "This is a free reading — generous and complete but concise.",
      "Lead with today's overall energy — specific, not generic.",
      "Include one lucky element (color, number, direction, or time) woven in naturally.",
      "End with one clear, personalized daily guidance that feels meant for this specific person.",
      "Tone: light, encouraging, energizing.",
      "Even though free, it must feel better than any free horoscope app.",
    ],
    length_requirement:
      "3–4 substantial paragraphs. 3–5 sentences per paragraph. Flowing prose, not a list.",
    structure_requirement: null,
  },

  saju: {
    id: "saju",
    name_ko: "사주 풀이",
    name_en: "Four Pillars (Saju)",
    is_free: false,
    prompt_goal:
      "Analyze the user's Four Pillars of Destiny based on their birth date and hour. Reveal their core personality, life path energy, dominant luck cycle theme, karmic patterns, and comprehensive life guidance.",
    behavioral_rules: [
      "MINIMUM OUTPUT: Korean 2000자, English 800 words. Do NOT stop before this. Expand every section to full depth.",
      "This is the foundational premium reading — deliver maximum depth across all 7 sections.",
      "Anchor every insight in the Year, Month, Day, Hour pillars — name specific elemental patterns.",
      "Identify the dominant elemental energy and explain what it means for personality, health, career, and love.",
      "Identify the current 10-year luck cycle and describe its specific quality for this person right now.",
      "Go beyond surface description — explain the WHY behind each energetic pattern.",
      "Every insight must feel specifically drawn from their birth data, name, and gender.",
    ],
    length_requirement:
      "Korean (한국어): 2000자 이상, 목표 2500–3500자. English: 800 words minimum, target 1000–1400 words. NEVER truncate. Complete all 7 sections fully.",
    structure_requirement: PAID_STRUCTURE,
  },

  compatibility: {
    id: "compatibility",
    name_ko: "궁합 보기",
    name_en: "Compatibility Reading",
    is_free: false,
    prompt_goal:
      "Assess romantic or interpersonal compatibility. Evaluate energy harmony, karmic connection patterns, love language compatibility, and provide deep relationship guidance.",
    behavioral_rules: [
      "MINIMUM OUTPUT: Korean 2000자, English 800 words. Do NOT stop before this.",
      "This is a premium paid reading — deliver full depth across all 7 sections.",
      "Focus on the user's energetic relationship patterns — what they attract, what they repel, and why.",
      "Identify repeating karmic patterns in their love life and explain the spiritual root cause.",
      "Describe what type of partner energy would create true harmony with theirs.",
      "Be honest about self-sabotage or blind spots in how they approach connection.",
      "End with actionable relationship wisdom specific to their energy profile.",
    ],
    length_requirement:
      "Korean (한국어): 2000자 이상, 목표 2500자. English: 800 words minimum. NEVER truncate. Complete all 7 sections fully.",
    structure_requirement: PAID_STRUCTURE,
  },

  luck_cycle: {
    id: "luck_cycle",
    name_ko: "운의 흐름",
    name_en: "Luck Cycle Reading",
    is_free: false,
    prompt_goal:
      "Map the user's current luck cycle in full detail. Identify the direction, quality, and life area activation. Provide a specific 3–6 month forecast with concrete navigation guidance.",
    behavioral_rules: [
      "MINIMUM OUTPUT: Korean 2000자, English 800 words. Do NOT stop before this.",
      "Open with a clear, specific statement about the current luck cycle direction and its quality.",
      "Analyze all four life areas with nuance: love, career, health, and wealth — not just 'good' or 'bad'.",
      "Identify the next key turning point with a specific energetic description of what will shift.",
      "Warn clearly about any low-energy windows that need careful navigation.",
      "Provide a specific monthly or seasonal strategy — concrete and tailored to their cycle.",
    ],
    length_requirement:
      "Korean (한국어): 2000자 이상, 목표 2500자. English: 800 words minimum. NEVER truncate. Complete all 7 sections fully.",
    structure_requirement: PAID_STRUCTURE,
  },

  date_selection: {
    id: "date_selection",
    name_ko: "날짜 선택",
    name_en: "Auspicious Date Selection",
    is_free: false,
    prompt_goal:
      "Help the user identify the most auspicious upcoming dates for an important event. Recommend 2–3 favorable dates with detailed energetic reasoning and warn about timing to avoid.",
    behavioral_rules: [
      "MINIMUM OUTPUT: Korean 2000자, English 800 words. Do NOT stop before this.",
      "First establish the energetic context of the user's current timing cycle.",
      "Recommend exactly 2–3 specific favorable date windows in the near future with detailed reasoning.",
      "For each date: explain the specific elemental alignment, the type of energy it carries, and why it supports their goal.",
      "Identify 2 types of timing patterns to avoid and explain the energetic danger.",
      "Close with a specific ritual or preparation approach suited to the event type.",
    ],
    length_requirement:
      "Korean (한국어): 2000자 이상, 목표 2500자. English: 800 words minimum. NEVER truncate. Complete all 7 sections fully.",
    structure_requirement: PAID_STRUCTURE,
  },

  yearly_fortune: {
    id: "yearly_fortune",
    name_ko: "올해의 운세",
    name_en: "Yearly Fortune",
    is_free: false,
    prompt_goal:
      "Provide the most comprehensive yearly fortune reading possible. Cover all four life areas deeply, identify 3 critical turning-point months with specific analysis, and give a full seasonal strategy guide.",
    behavioral_rules: [
      "MINIMUM OUTPUT: Korean 2500자, English 1000 words. This is the most comprehensive reading — it must be longer than all others.",
      "This is the flagship premium reading — give it maximum depth across all 7 sections.",
      "Open with the single defining theme or energy signature of this year for this specific person.",
      "Dedicate substantial analysis to each life area: love, career, health, and wealth — full paragraphs for each.",
      "Identify exactly 3 months that serve as critical turning points and explain WHY those specific months.",
      "Provide a seasonal strategy: which quarters to expand, which to consolidate, which to rest.",
      "This should feel like reading a full personal spiritual report, not a summary.",
    ],
    length_requirement:
      "Korean (한국어): 2500자 이상, 목표 3000–4000자. English: 1000 words minimum, target 1400+ words. NEVER truncate. Complete all 7 sections at maximum depth.",
    structure_requirement: PAID_STRUCTURE,
  },

  ask_anything: {
    id: "ask_anything",
    name_ko: "무엇이든 물어보세요",
    name_en: "Ask Anything",
    is_free: false,
    prompt_goal:
      "Engage in a live, free-form spiritual Q&A. Answer each question directly, intuitively, and personally in full persona voice with meaningful depth and genuine insight.",
    behavioral_rules: [
      "This is a conversational live session — respond directly to what the user just asked.",
      "Every reply must be fully in persona voice — no drift is acceptable.",
      "Minimum 400–600 Korean characters per reply. No shallow one-liners.",
      "Each answer must feel personal, specific, and insightful — not generic.",
      "Build on previous turns — show you remember the emotional arc of the conversation.",
      "You may ask one thoughtful follow-up question to deepen the reading.",
      "If the user asks something outside your spiritual domain, redirect gently in persona voice.",
      "Prose only — no bullet points, no lists. Flow like a real conversation.",
    ],
    length_requirement:
      "3–5 meaningful paragraphs per reply. 3–5 sentences per paragraph. Complete thoughts only. No truncation.",
    structure_requirement: null,
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
    `LENGTH REQUIREMENT (HARD FLOOR — DO NOT GO BELOW THIS):`,
    product.length_requirement,
  ];

  if (product.structure_requirement) {
    sections.push("");
    sections.push(product.structure_requirement);
  }

  return sections.join("\n").trim();
}
