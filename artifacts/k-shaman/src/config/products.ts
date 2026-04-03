import type { Language } from "../types";
import { PRICE_KRW, PRICE_USD } from "./pricing";

export interface ProductConfig {
  id: string;
  name_ko: string;
  name_en: string;
  price_krw: number;
  price_usd: number;
  is_free: boolean;
  prompt_goal: string;

  // UI display fields
  icon: string;
  description: Record<Language, string>;
  features: Record<Language, string[]>;
}

export const PRODUCTS: ProductConfig[] = [
  {
    id: "daily_fortune",
    name_ko: "오늘의 운세",
    name_en: "Daily Fortune",
    price_krw: 0,
    price_usd: 0,
    is_free: true,
    prompt_goal:
      "Give a brief, uplifting daily fortune reading. Cover today's overall energy, a lucky element (color/number/direction), and one actionable piece of guidance for the day. Keep it positive and concise (3–4 sentences).",
    icon: "🌅",
    description: {
      ko: "오늘 하루의 운기를 무료로 확인해보세요.",
      en: "Check your energy and fortune for today — completely free.",
      ja: "今日の運気を無料で確認しましょう。",
      es: "Consulta tu energía y fortuna de hoy — completamente gratis.",
      pt: "Verifique sua energia e fortuna de hoje — completamente grátis.",
      fr: "Consultez votre énergie et votre fortune pour aujourd'hui — entièrement gratuit.",
    },
    features: {
      ko: ["오늘의 기운 분석", "행운 색상 & 숫자", "오늘의 조언 한마디"],
      en: ["Today's energy reading", "Lucky color & number", "One-line daily guidance"],
      ja: ["今日のエネルギー分析", "ラッキーカラー & ナンバー", "今日のアドバイス"],
      es: ["Lectura de energía de hoy", "Color y número de la suerte", "Consejo del día"],
      pt: ["Leitura de energia de hoje", "Cor e número da sorte", "Conselho do dia"],
      fr: ["Lecture d'énergie d'aujourd'hui", "Couleur et chiffre porte-bonheur", "Conseil du jour"],
    },
  },
  {
    id: "saju",
    name_ko: "사주 풀이",
    name_en: "Four Pillars (Saju)",
    price_krw: PRICE_KRW,
    price_usd: PRICE_USD,
    is_free: false,
    prompt_goal:
      "Analyze the user's Four Pillars of Destiny (사주) based on their birth date and hour. Reveal their core personality traits, life path energy, and the dominant theme of their current 10-year cycle. Frame insights in the persona's speaking style.",
    icon: "🏛️",
    description: {
      ko: "생년월일시로 당신의 사주를 풀어드려요.",
      en: "A deep reading of your birth data to reveal life path and core energy.",
      ja: "生年月日時で四柱を解読します。",
      es: "Una lectura profunda de tus datos de nacimiento para revelar tu camino vital.",
      pt: "Uma leitura profunda dos seus dados de nascimento para revelar seu caminho de vida.",
      fr: "Une lecture approfondie de vos données de naissance pour révéler votre chemin de vie.",
    },
    features: {
      ko: ["천간 & 지지 분석", "용신 파악", "현재 대운 흐름", "질문 3개 답변"],
      en: ["Heavenly Stems & Earthly Branches", "Core energy element", "Current 10-year cycle", "3 questions answered"],
      ja: ["天干・地支分析", "用神の把握", "現在の大運の流れ", "3つの質問に回答"],
      es: ["Tallos Celestiales y Ramas Terrestres", "Elemento de energía central", "Ciclo actual de 10 años", "3 preguntas respondidas"],
      pt: ["Caules Celestiais e Ramos Terrestres", "Elemento de energia central", "Ciclo atual de 10 anos", "3 perguntas respondidas"],
      fr: ["Tiges Célestes et Branches Terrestres", "Élément d'énergie central", "Cycle actuel de 10 ans", "3 questions répondues"],
    },
  },
  {
    id: "compatibility",
    name_ko: "궁합 보기",
    name_en: "Compatibility Reading",
    price_krw: PRICE_KRW,
    price_usd: PRICE_USD,
    is_free: false,
    prompt_goal:
      "Assess romantic or interpersonal compatibility between two people. Evaluate energy harmony, karmic connection, potential friction points, and the overall compatibility score. Provide one key advice for strengthening the bond.",
    icon: "💑",
    description: {
      ko: "두 사람의 기운이 얼마나 잘 맞는지 알아봐요.",
      en: "Discover how well your energy aligns with someone special.",
      ja: "二人の相性と縁を見てもらいましょう。",
      es: "Descubre qué tan bien se alinea tu energía con alguien especial.",
      pt: "Descubra o quão bem sua energia se alinha com alguém especial.",
      fr: "Découvrez à quel point votre énergie s'aligne avec quelqu'un de spécial.",
    },
    features: {
      ko: ["에너지 궁합 분석", "카르마 연결 확인", "마찰 포인트 진단", "관계 조언 제공"],
      en: ["Energy harmony score", "Karmic connection check", "Friction point diagnosis", "Relationship advice"],
      ja: ["エネルギー相性分析", "カルマ的つながり", "摩擦ポイント診断", "関係アドバイス"],
      es: ["Puntuación de armonía energética", "Verificación de conexión kármica", "Diagnóstico de fricciones", "Consejos de relación"],
      pt: ["Pontuação de harmonia energética", "Verificação de conexão kármica", "Diagnóstico de atritos", "Conselhos de relacionamento"],
      fr: ["Score d'harmonie énergétique", "Vérification de connexion karmique", "Diagnostic de friction", "Conseils de relation"],
    },
  },
  {
    id: "luck_cycle",
    name_ko: "운의 흐름",
    name_en: "Luck Cycle Reading",
    price_krw: PRICE_KRW,
    price_usd: PRICE_USD,
    is_free: false,
    prompt_goal:
      "Map out the user's current luck cycle and identify upcoming peak and low energy windows. Explain what areas of life (love, career, health, wealth) are most activated now and what to expect in the next 3–6 months.",
    icon: "🌊",
    description: {
      ko: "지금 당신의 운은 오르고 있나요, 내려가고 있나요?",
      en: "Find out where your luck cycle stands and what's coming next.",
      ja: "あなたの運気の流れを確認しましょう。",
      es: "Descubre en qué punto de tu ciclo de suerte estás y qué viene después.",
      pt: "Descubra em que ponto do seu ciclo de sorte você está e o que vem a seguir.",
      fr: "Découvrez où en est votre cycle de chance et ce qui arrive ensuite.",
    },
    features: {
      ko: ["현재 운의 방향 파악", "분야별 활성 에너지", "3~6개월 예측", "피해야 할 시기 안내"],
      en: ["Current luck direction", "Active energy by life area", "3–6 month forecast", "Low-energy period warnings"],
      ja: ["現在の運の方向", "分野別活性エネルギー", "3〜6ヶ月の予測", "注意すべき時期"],
      es: ["Dirección de suerte actual", "Energía activa por área de vida", "Pronóstico de 3-6 meses", "Advertencias de período de baja energía"],
      pt: ["Direção de sorte atual", "Energia ativa por área de vida", "Previsão de 3-6 meses", "Avisos de período de baixa energia"],
      fr: ["Direction de chance actuelle", "Énergie active par domaine de vie", "Prévisions sur 3-6 mois", "Avertissements de période de faible énergie"],
    },
  },
  {
    id: "date_selection",
    name_ko: "날짜 선택",
    name_en: "Auspicious Date Selection",
    price_krw: PRICE_KRW,
    price_usd: PRICE_USD,
    is_free: false,
    prompt_goal:
      "Help the user pick the most auspicious date for an important event (wedding, business launch, travel, exam, etc.). Evaluate upcoming dates based on their birth energy and recommend the top 2–3 favorable dates with brief reasoning.",
    icon: "📅",
    description: {
      ko: "중요한 날, 가장 좋은 날을 골라드려요.",
      en: "Pick the most auspicious date for your important event.",
      ja: "大切なイベントに最も吉日を選びます。",
      es: "Elige la fecha más auspiciosa para tu evento importante.",
      pt: "Escolha a data mais auspiciosa para o seu evento importante.",
      fr: "Choisissez la date la plus propice pour votre événement important.",
    },
    features: {
      ko: ["결혼·사업·시험 등 맞춤", "상위 2~3개 길일 추천", "피해야 할 날 안내", "이유 설명 포함"],
      en: ["Wedding, business, exam & more", "Top 2–3 auspicious dates", "Dates to avoid", "Reasoning included"],
      ja: ["結婚・仕事・試験など対応", "上位2〜3吉日推薦", "避けるべき日の案内", "理由の説明あり"],
      es: ["Bodas, negocios, exámenes y más", "Las 2-3 fechas más auspiciosas", "Fechas a evitar", "Razonamiento incluido"],
      pt: ["Casamento, negócios, exames e mais", "As 2-3 datas mais auspiciosas", "Datas a evitar", "Raciocínio incluído"],
      fr: ["Mariage, affaires, examens et plus", "Les 2-3 dates les plus propices", "Dates à éviter", "Raisonnement inclus"],
    },
  },
  {
    id: "yearly_fortune",
    name_ko: "올해의 운세",
    name_en: "Yearly Fortune",
    price_krw: PRICE_KRW,
    price_usd: PRICE_USD,
    is_free: false,
    prompt_goal:
      "Provide a full yearly fortune overview for the current year. Cover the major themes across love, career, health, and wealth. Identify the 2–3 most important turning-point months and give practical guidance for navigating the year.",
    icon: "🗓️",
    description: {
      ko: "올 한 해의 운세를 큰 흐름으로 살펴봐요.",
      en: "A complete overview of your fortune for the entire year ahead.",
      ja: "今年一年の運勢を大きな流れで見てみましょう。",
      es: "Una visión completa de tu fortuna para todo el año que viene.",
      pt: "Uma visão completa da sua fortuna para todo o ano à frente.",
      fr: "Un aperçu complet de votre fortune pour toute l'année à venir.",
    },
    features: {
      ko: ["연애·직업·건강·재물 종합", "주요 전환점 달 파악", "월별 흐름 요약", "실천 조언 포함"],
      en: ["Love, career, health & wealth", "Key turning-point months", "Monthly flow summary", "Practical guidance"],
      ja: ["恋愛・仕事・健康・財運総合", "主要転換点の月を把握", "月別の流れの要約", "実践的なアドバイス"],
      es: ["Amor, carrera, salud y riqueza", "Meses clave de inflexión", "Resumen de flujo mensual", "Orientación práctica"],
      pt: ["Amor, carreira, saúde e riqueza", "Meses-chave de virada", "Resumo do fluxo mensal", "Orientação prática"],
      fr: ["Amour, carrière, santé et richesse", "Mois-clés de tournant", "Résumé du flux mensuel", "Guidance pratique"],
    },
  },
  {
    id: "ask_anything",
    name_ko: "무엇이든 물어보세요",
    name_en: "Ask Anything",
    price_krw: PRICE_KRW,
    price_usd: PRICE_USD,
    is_free: false,
    prompt_goal:
      "Engage in a free-form spiritual Q&A session. Answer the user's question directly and intuitively in the persona's voice. Stay grounded in the user's birth data and context. Each answer should feel personal, insightful, and actionable.",
    icon: "💬",
    description: {
      ko: "신령과 실시간으로 무엇이든 나눠보세요.",
      en: "Live chat session with your spirit guide — ask anything.",
      ja: "神霊とリアルタイムで何でも話し合いましょう。",
      es: "Sesión de chat en vivo con tu guía espiritual — pregunta lo que quieras.",
      pt: "Sessão de chat ao vivo com seu guia espiritual — pergunte qualquer coisa.",
      fr: "Session de chat en direct avec votre guide spirituel — demandez n'importe quoi.",
    },
    features: {
      ko: ["무제한 질문", "실시간 채팅 세션", "30분 세션"],
      en: ["Unlimited questions", "Real-time chat", "30-minute session"],
      ja: ["無制限の質問", "リアルタイムチャット", "30分セッション"],
      es: ["Preguntas ilimitadas", "Chat en tiempo real", "Sesión de 30 minutos"],
      pt: ["Perguntas ilimitadas", "Chat em tempo real", "Sessão de 30 minutos"],
      fr: ["Questions illimitées", "Chat en temps réel", "Session de 30 minutes"],
    },
  },
];

export function getProductById(id: string): ProductConfig | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
