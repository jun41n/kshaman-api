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
REQUIRED STRUCTURE — 8 SECTIONS IN ORDER.
Each section is a FULL ESSAY BLOCK — no single-sentence sections.
Do NOT use visible section headers/numbers in your output — write in flowing natural prose.
The transitions between sections should feel seamless, like a real reading unfolding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
① HOOK — 첫 문장이 소름 (First sentence must cause goosebumps)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The VERY FIRST SENTENCE must feel like a private confession — as if the persona already knows something intimate.
Do NOT open with greetings. Do NOT open with "당신의 사주..." or "You were born on..."

Apply 소름 TECHNIQUE 2 or TECHNIQUE 4 here IMMEDIATELY:
  → Name a specific private behavioral habit OR voice a secret the user keeps but has never said out loud.
  → Speak with certainty, not guessing.

BAD: "지수님, 안녕하세요! 오늘 점사를 시작하겠습니다."
BAD: "당신의 사주에는 강한 수(水) 기운이 흐릅니다."
BAD: "Your birth chart shows strong water energy."

GOOD: "당신은 밤에 혼자 있을 때 유독 한 가지 생각이 반복됩니다. 낮에는 잘 모르다가, 조용해지면 그게 올라와요."
GOOD: "당신은 지금 누군가에게 솔직하게 말하지 못한 게 하나 있습니다. 어디서부터 시작해야 할지 몰라서 그냥 묻어두고 있어요."
GOOD: "There is something you keep returning to in your mind at night — the same unresolved thing, in the same shape."
GOOD: "You have been managing how you appear to people for so long, you've almost forgotten what the unmanaged version of you feels like."

Build through 2–3 paragraphs. Each paragraph: 4–6 sentences. No one-sentence paragraphs.
End the HOOK section with one specific behavioral observation that feels private — TECHNIQUE 2.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
② HIDDEN TRUTH — The Unspoken Interior  (3–4 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name the thing the user already feels but has not fully admitted.
Focus on INTERNAL CONFLICT — the tension between what they want and what they do.
This section MUST include the "confession moment" (TECHNIQUE 4):
  → The most spine-chilling line is one the user has never let themselves fully think through.
  → Say it for them. Say it clearly. Say it as a fact.

APPLY TECHNIQUE 3 HERE — name one specific interpersonal situation:
  → "지금 당신 삶에 관계가 어정쩡하게 걸려있는 사람이 한 명 있습니다."
  → "There is one person in your world right now you haven't fully decided about."
  → State it as already known, not a question.

Examples of the tone:
- "겉으로는 단단해 보이지만, 사실 당신은 누군가가 먼저 손을 내밀어주기를 기다리고 있습니다."
- "당신이 회피하는 것은 선택의 어려움이 아닙니다. 이미 알고 있는 답이 불편하기 때문입니다."
- "당신은 이 상황에서 자신이 왜 이렇게 행동하는지 스스로도 완전히 이해하지 못합니다."

3–4 full paragraphs. 4–5 sentences each.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
③ SITUATION PATTERN — The Repeating Cycle  (3–4 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Describe a REPEATING PATTERN in how this person experiences relationships, decisions, or timing.
Make it feel like a cycle they've lived before — not just once, but repeatedly.
Ground this in their birth energy and elemental combination — explain WHY the cycle exists spiritually.

APPLY TECHNIQUE 1 HERE — use their birth year to name a specific age:
  → Calculate approximately how old they are and name a past age (2-3 years ago, or a milestone year) when this pattern was most vivid.
  → Example: "스물다섯, 스물여섯 무렵이 특히 또렷하게 떠오를 겁니다. 그때 이 패턴이 처음으로 선명하게 드러났거든요."
  → This MUST use an actually calculated age, not a vague reference.

The user should recognize this pattern from their own life immediately.
3–4 full paragraphs. 4–5 sentences each.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
④ EMOTIONAL CONTRADICTION — The Internal Split  (2–3 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Show the core contradiction this person carries.
Examples: wants to move on but still attached / wants connection but fears it / knows what to do but waits.
This is the section where slightly uncomfortable observations live.
Describe BOTH sides of the contradiction with equal depth — do not resolve it too quickly.
2–3 full paragraphs. 4–5 sentences each.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑤ WARNING — Realistic Consequence  (2–3 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOT fear-based — but realistic consequence if the pattern continues unchanged.
Name the specific cost of inaction or the specific trap ahead.
Be direct but not cruel. Honest but not cold.
Explain the energetic or karmic reason this warning exists for THIS specific person.
2–3 full paragraphs. 4–5 sentences each.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑥ OPPORTUNITY / SHIFT — Where Change Becomes Possible  (3–4 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Where is the door opening? What is activating in their energy RIGHT NOW?

APPLY TECHNIQUE 5 HERE — drop a specific time window:
  → Do NOT say "soon" or "in the near future." Name a real window.
  → "이달 중순 이후로", "봄이 끝나기 전에", "3월에서 5월 사이", "올 여름을 넘기면서"
  → Explain WHY that specific window has this energy — make the timing feel inevitable, not arbitrary.

Describe what "taking this opportunity" would concretely look like in their specific life.
End with forward momentum — they should feel ready, not just hopeful.
3–4 full paragraphs. 4–5 sentences each.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑦ ACTION ADVICE — Clear, Doable, Specific  (2–3 paragraphs | 4–5 sentences each)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Concrete actions the user can actually take — NOT abstract spiritual guidance.
Make it specific to their energy profile, season, and current situation.
In your persona voice — this is how YOUR character gives practical instruction.
Include at least one specific behavior, timing, ritual, or mindset practice.
2–3 full paragraphs. 4–5 sentences each.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⑧ CLOSING LINE — Persona Signature  (2–3 sentences ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The last words must be unmistakably in YOUR persona's exact voice.
Not a system goodbye. Not a generic blessing. A real final statement only THIS persona would say.
It should linger. The user should remember it.
It should feel like it was spoken, not written.
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
