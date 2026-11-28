import { motion } from "framer-motion";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResultShareButtons } from "@/components/ResultShareButtons";
import { trackDetailView, trackSupportClick, trackResultImageSave } from "@/lib/analytics";
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

const PAST_RESULT_COPY = {
  en: EN_RESULT_COPY,
  ja: { result: "AI前世キャラクター結果", careerLabel: "あなたの前世の役割は", eraPay: "当時の報酬", modernPay: "AIによる現代生活力換算", wealthStyle: "財産を築いた方法", traits: "今に続く前世の気質", unlockEyebrow: "さらに詳しい前世記録を開く", unlockTitle: "前世の決定的な場面を見てみませんか？", unlockBody: "財産感覚、愛の記憶、今に活かせるミッション、顔をもとにしたカードを確認できます。", detail: "詳しい前世記録", complete: "あなたの前世記録・完全版", poster: "コレクション用前世ポスター", retry: "前世画像をもう一度作る", reset: "別の前世を確認する", delayed: "前世画像の生成に時間がかかっています。結果カードはそのまま共有できます。", disclaimer: "当時の報酬は職業・時代・地域によって異なります。現代生活力換算は歴史的賃金ではなく、娯楽のための比喩です。" },
  es: { result: "Resultado del personaje de vida pasada con IA", careerLabel: "Tu papel en una vida pasada fue", eraPay: "Recompensa histórica", modernPay: "Equivalente de vida actual con IA", wealthStyle: "Cómo construías tu patrimonio", traits: "Rasgos de tu vida pasada que siguen contigo", unlockEyebrow: "Desbloquea un registro más profundo", unlockTitle: "Descubre la escena decisiva de tu vida pasada", unlockBody: "Consulta tus instintos financieros, tu historia de amor, una misión para el presente y una tarjeta basada en tu rostro.", detail: "Registro detallado de vida pasada", complete: "Tu registro completo de vida pasada", poster: "Póster coleccionable de vida pasada", retry: "Crear otra imagen de vida pasada", reset: "Ver otra vida pasada", delayed: "La imagen de vida pasada está tardando. Tu tarjeta de resultado sigue lista para compartir.", disclaimer: "Las recompensas históricas variaban según oficio, época y región. El equivalente actual es una analogía de entretenimiento, no un salario histórico confirmado." },
  "pt-BR": { result: "Resultado do personagem de vida passada com IA", careerLabel: "Seu papel em uma vida passada foi", eraPay: "Recompensa histórica", modernPay: "Equivalente de vida atual com IA", wealthStyle: "Como você construía seu patrimônio", traits: "Traços da vida passada que continuam com você", unlockEyebrow: "Desbloqueie um registro mais profundo", unlockTitle: "Abra a cena decisiva da sua vida passada", unlockBody: "Veja seus instintos financeiros, sua história de amor, uma missão para o presente e um cartão baseado no seu rosto.", detail: "Registro detalhado da vida passada", complete: "Seu registro completo de vida passada", poster: "Pôster colecionável de vida passada", retry: "Criar outra imagem de vida passada", reset: "Ver outra vida passada", delayed: "A imagem da vida passada está demorando. Seu cartão de resultado continua pronto para compartilhar.", disclaimer: "As recompensas históricas variavam por profissão, época e região. O equivalente atual é uma analogia de entretenimento, não um salário histórico confirmado." },
  fr: { result: "Résultat de personnage de vie antérieure par IA", careerLabel: "Dans une vie antérieure, vous étiez", eraPay: "Récompense historique", modernPay: "Équivalent de niveau de vie actuel par IA", wealthStyle: "Comment vous construisiez votre richesse", traits: "Les traits de votre vie antérieure qui vous suivent", unlockEyebrow: "Ouvrez un dossier plus approfondi", unlockTitle: "Découvrez la scène décisive de votre vie antérieure", unlockBody: "Explorez vos instincts financiers, votre histoire d’amour, une mission pour le présent et une carte basée sur votre visage.", detail: "Dossier détaillé de vie antérieure", complete: "Votre dossier complet de vie antérieure", poster: "Affiche de vie antérieure à collectionner", retry: "Créer une autre image de vie antérieure", reset: "Voir une autre vie antérieure", delayed: "La génération de l’image prend plus de temps. Votre carte de résultat peut tout de même être partagée.", disclaimer: "Les récompenses historiques variaient selon le métier, l’époque et la région. L’équivalent actuel est une analogie ludique, pas un salaire historique confirmé." },
} as const;

function getPastLifeResultCopy(language: string) {
  const locale = language.toLowerCase().startsWith("pt") ? "pt-BR" : language.split("-")[0];
  return PAST_RESULT_COPY[locale as keyof typeof PAST_RESULT_COPY] ?? PAST_RESULT_COPY.en;
}

const PAST_LABELS: Record<string, Record<string, string>> = {
  en: { record: "Past-life record", then: "You in that era", remembered: "How people remembered you", toss: "Toss support QR", paypal: "PayPal support QR", testOpen: "Open full record (test)", testNote: "During testing, the detailed result opens without support verification.", scene: "Defining scene", hidden: "A hidden past-life choice", livelihood: "Livelihood record", wealth: "Wealth instincts and survival", love: "Love and bonds", protected: "What you protected in relationships", mission: "Today’s mission", quality: "A quality to use this week", posterShare: "Share it as an SNS result card with your past-life character image", faceBased: "Character based on my face", transforming: "Creating your character", failed: "The character image could not be loaded" },
  ja: { record: "前世の記録", then: "その時代のあなた", remembered: "人々の記憶に残った姿", toss: "Toss支援QR", paypal: "PayPal支援QR", testOpen: "完全版を開く（テスト）", testNote: "テスト期間中は支援確認なしで詳細結果を開けます。", scene: "決定的な場面", hidden: "隠された前世の選択", livelihood: "暮らしの記録", wealth: "財産感覚と生き抜く力", love: "愛と縁", protected: "関係で守り続けたもの", mission: "今週のミッション", quality: "今週活かしたい気質", posterShare: "前世キャラクター画像と一緒にSNS結果カードとして共有できます。", faceBased: "顔をもとにしたキャラクター", transforming: "キャラクターを作成中", failed: "キャラクター画像を読み込めませんでした" },
  es: { record: "Registro de vida pasada", then: "Tú en aquella época", remembered: "Cómo te recordaban", toss: "QR de apoyo Toss", paypal: "QR de apoyo PayPal", testOpen: "Abrir registro completo (prueba)", testNote: "Durante la prueba, el resultado detallado se abre sin verificar apoyo.", scene: "Escena decisiva", hidden: "Una elección oculta de tu vida pasada", livelihood: "Registro de subsistencia", wealth: "Instinto financiero y supervivencia", love: "Amor y vínculos", protected: "Lo que protegías en tus relaciones", mission: "Misión para hoy", quality: "Un rasgo que usar esta semana", posterShare: "Compártelo como tarjeta de resultado con tu imagen de vida pasada.", faceBased: "Personaje basado en mi rostro", transforming: "Creando tu personaje", failed: "No se pudo cargar la imagen del personaje" },
  "pt-BR": { record: "Registro da vida passada", then: "Você naquela época", remembered: "Como as pessoas se lembravam de você", toss: "QR de apoio Toss", paypal: "QR de apoio PayPal", testOpen: "Abrir registro completo (teste)", testNote: "Durante o teste, o resultado detalhado abre sem confirmação de apoio.", scene: "Cena decisiva", hidden: "Uma escolha oculta da vida passada", livelihood: "Registro de subsistência", wealth: "Instinto financeiro e sobrevivência", love: "Amor e vínculos", protected: "O que você protegeu nos relacionamentos", mission: "Missão de hoje", quality: "Um traço para usar nesta semana", posterShare: "Compartilhe como cartão de resultado com sua imagem de vida passada.", faceBased: "Personagem baseado no meu rosto", transforming: "Criando seu personagem", failed: "Não foi possível carregar a imagem do personagem" },
  fr: { record: "Dossier de vie antérieure", then: "Vous à cette époque", remembered: "La façon dont on se souvenait de vous", toss: "QR de soutien Toss", paypal: "QR de soutien PayPal", testOpen: "Ouvrir le dossier complet (test)", testNote: "Pendant le test, le résultat détaillé s’ouvre sans vérification de soutien.", scene: "Scène décisive", hidden: "Un choix caché de votre vie antérieure", livelihood: "Dossier de subsistance", wealth: "Instinct financier et survie", love: "Amour et liens", protected: "Ce que vous protégiez dans vos relations", mission: "Mission du jour", quality: "Un trait à utiliser cette semaine", posterShare: "Partagez-la comme carte de résultat avec votre image de vie antérieure.", faceBased: "Personnage basé sur mon visage", transforming: "Création de votre personnage", failed: "Impossible de charger l’image du personnage" },
};

function pastLabel(language: string, key: string) {
  const locale = language.toLowerCase().startsWith("pt") ? "pt-BR" : language.split("-")[0];
  return PAST_LABELS[locale]?.[key] ?? PAST_LABELS.en[key] ?? key;
}

function getPremiumHooks(title: string, language: string) {
  const locale = language.toLowerCase().startsWith("pt") ? "pt-BR" : language.split("-")[0];
  if (locale === "ja") return {
    scene: "決定的な場面",
    sceneTitle: `${title}として迎えた勝負の一日`,
    sceneText: `${title}として過ごしたある日、周囲が慌てるほどあなたは小さな違和感を先に見つけました。大きな声で指示するより、最後に必要な一手を置いて場を動かすタイプです。`,
    punch: "前世の一言",
    punchTitle: "友だちに送るなら",
    punchText: `「前世は${title}。偉そうに見えて、実は全員の忘れ物を回収していた人。」`,
    today: "現世で使う一手",
    todayTitle: "今週の実験",
    todayText: "先延ばしにした仕事をひとつだけ選び、25分で終わるところまで進めてみましょう。あなたの強みは開始より完了で光ります。",
  };
  if (locale === "es") return {
    scene: "Escena decisiva",
    sceneTitle: `El día de ${title} en que todo dependía de ti`,
    sceneText: `En una jornada de ${title}, detectabas el pequeño problema antes de que todos entraran en pánico. No necesitabas gritar: aparecías con la solución justo cuando hacía falta.`,
    punch: "Frase de tu vida pasada",
    punchTitle: "Para enviárselo a un amigo",
    punchText: `«En otra vida fui ${title}. Parecía importante, pero también recogía los paraguas de todos.»`,
    today: "Una jugada para hoy",
    todayTitle: "Experimento de esta semana",
    todayText: "Elige una tarea pendiente y llévala hasta un final pequeño y concreto. Tu fuerza aparece más al cerrar ciclos que al empezar diez cosas.",
  };
  if (locale === "pt-BR") return {
    scene: "Cena decisiva",
    sceneTitle: `O dia de ${title} em que tudo passou pelas suas mãos`,
    sceneText: `Em uma jornada como ${title}, você percebia o pequeno problema antes de todo mundo entrar em pânico. Não precisava gritar: chegava com a solução na hora certa.`,
    punch: "Frase da vida passada",
    punchTitle: "Para mandar a um amigo",
    punchText: `“Em outra vida eu fui ${title}. Parecia importante, mas também guardava o guarda-chuva de todo mundo.”`,
    today: "Uma jogada para hoje",
    todayTitle: "Experimento da semana",
    todayText: "Escolha uma tarefa adiada e leve-a até um final pequeno e concreto. Sua força aparece mais ao concluir do que ao começar dez coisas.",
  };
  if (locale === "fr") return {
    scene: "Scène décisive",
    sceneTitle: `Le jour où ${title} devait tout remettre d’aplomb`,
    sceneText: `Dans une journée de ${title}, vous repériez le petit détail qui allait tout compliquer avant les autres. Pas besoin de crier : vous arriviez avec la bonne solution au bon moment.`,
    punch: "La phrase de votre vie antérieure",
    punchTitle: "À envoyer à un ami",
    punchText: `« Dans une autre vie, j’étais ${title}. Très important en apparence, mais je gardais aussi les parapluies de tout le monde. »`,
    today: "Un geste pour aujourd’hui",
    todayTitle: "Expérience de la semaine",
    todayText: "Choisissez une tâche repoussée et amenez-la jusqu’à une petite fin concrète. Votre force brille davantage dans l’achèvement que dans le démarrage.",
  };
  if (locale === "en") return {
    scene: "Defining scene",
    sceneTitle: `The day ${title} had to save the situation`,
    sceneText: `As a ${title}, you noticed the tiny problem before everyone else started panicking. You did not need to shout; you simply arrived with the missing move at exactly the right moment.`,
    punch: "Past-life one-liner",
    punchTitle: "Send this to a friend",
    punchText: `“In a past life I was a ${title}. Very important-looking, but I also held everyone’s umbrellas.”`,
    today: "One move for today",
    todayTitle: "This week’s experiment",
    todayText: "Choose one delayed task and take it to a small, concrete finish. Your strength shows up more in completion than in starting ten things.",
  };
  return {
    scene: "결정적 장면",
    sceneTitle: `${title}였던 당신의 가장 바쁜 하루`,
    sceneText: `${title}였던 당신은 모두가 허둥대기 전에 작은 문제를 먼저 발견했습니다. 큰소리로 지시하기보다, 꼭 필요한 한 수를 마지막에 꺼내 상황을 정리하는 사람이었습니다.`,
    punch: "전생 한 줄 평",
    punchTitle: "친구에게 보내는 한마디",
    punchText: `“전생에 ${title}였대. 중요한 사람처럼 보이지만 친구들 우산도 챙겨주던 타입.”`,
    today: "현생에서 쓰는 한 수",
    todayTitle: "이번 주 실험",
    todayText: "미뤄 둔 일 하나를 골라 작게라도 끝내 보세요. 당신의 강점은 열 가지를 시작할 때보다 하나를 완성할 때 더 잘 드러납니다.",
  };
}

const CAREER_TITLES: Record<string, Record<string, string>> = {
  ja: { "조선의 임금": "朝鮮王朝の王", "왕실의 책사": "王室の軍師", "암행어사": "秘密監察官", "포도대장": "都の治安隊長", "전장의 무사": "戦場の武士", "명궁": "名弓の射手", "수군 장수": "水軍の将", "유학자 선비": "儒学者", "서당 훈장": "村の先生", "궁중 화원": "宮廷画家", "궁중 악사": "宮廷音楽家", "왕실 의관": "王室の医師", "궁중 의녀": "宮廷の女医", "마을의 무당": "村の巫者", "풍수지리사": "風水師", "대장간 장인": "鍛冶職人", "도자기 장인": "陶芸職人", "대목장": "大工の棟梁", "한지 장인": "韓紙職人", "염색 장인": "染色職人", "보부상": "旅商人", "객주 주인": "宿場の主人", "약초상": "薬草商", "농사꾼": "農夫", "바다의 어부": "海の漁師", "산의 사냥꾼": "山の猟師", "나루터 뱃사공": "渡し守", "떠돌이 광대": "旅芸人", "궁중 예인": "宮廷芸人", "성실한 살림지기": "家の世話役", "비밀 정보원": "密偵" },
  es: { "조선의 임금": "Rey de Joseon", "왕실의 책사": "Estratega real", "암행어사": "Inspector secreto", "포도대장": "Comandante de seguridad", "전장의 무사": "Guerrero del campo de batalla", "명궁": "Arquero experto", "수군 장수": "Comandante naval", "유학자 선비": "Erudito confuciano", "서당 훈장": "Maestro de aldea", "궁중 화원": "Pintor de la corte", "궁중 악사": "Músico de la corte", "왕실 의관": "Médico real", "궁중 의녀": "Médica de la corte", "마을의 무당": "Chamán del pueblo", "풍수지리사": "Consejero de geomancia", "대장간 장인": "Herrero", "도자기 장인": "Artesano de cerámica", "대목장": "Maestro carpintero", "한지 장인": "Artesano del papel hanji", "염색 장인": "Artesano tintorero", "보부상": "Mercader ambulante", "객주 주인": "Dueño de posada", "약초상": "Vendedor de hierbas", "농사꾼": "Agricultor", "바다의 어부": "Pescador", "산의 사냥꾼": "Cazador de montaña", "나루터 뱃사공": "Barquero", "떠돌이 광대": "Artista ambulante", "궁중 예인": "Artista de la corte", "성실한 살림지기": "Encargado del hogar", "비밀 정보원": "Informante secreto" },
  "pt-BR": { "조선의 임금": "Rei de Joseon", "왕실의 책사": "Estrategista real", "암행어사": "Inspetor secreto", "포도대장": "Comandante de segurança", "전장의 무사": "Guerreiro do campo de batalha", "명궁": "Arqueiro habilidoso", "수군 장수": "Comandante naval", "유학자 선비": "Estudioso confucionista", "서당 훈장": "Professor da aldeia", "궁중 화원": "Pintor da corte", "궁중 악사": "Músico da corte", "왕실 의관": "Médico real", "궁중 의녀": "Médica da corte", "마을의 무당": "Xamã da aldeia", "풍수지리사": "Conselheiro de geomancia", "대장간 장인": "Ferreiro", "도자기 장인": "Artesão de cerâmica", "대목장": "Mestre carpinteiro", "한지 장인": "Artesão de papel hanji", "염색 장인": "Artesão de tingimento", "보부상": "Mercador viajante", "객주 주인": "Dono de hospedaria", "약초상": "Comerciante de ervas", "농사꾼": "Agricultor", "바다의 어부": "Pescador do mar", "산의 사냥꾼": "Caçador da montanha", "나루터 뱃사공": "Barqueiro", "떠돌이 광대": "Artista itinerante", "궁중 예인": "Artista da corte", "성실한 살림지기": "Cuidador do lar", "비밀 정보원": "Informante secreto" },
  fr: { "조선의 임금": "Roi de Joseon", "왕실의 책사": "Stratège royal", "암행어사": "Inspecteur secret", "포도대장": "Commandant de la sécurité", "전장의 무사": "Guerrier du champ de bataille", "명궁": "Archer expert", "수군 장수": "Commandant naval", "유학자 선비": "Érudit confucéen", "서당 훈장": "Maître du village", "궁중 화원": "Peintre de la cour", "궁중 악사": "Musicien de la cour", "왕실 의관": "Médecin royal", "궁중 의녀": "Médecin de la cour", "마을의 무당": "Chaman du village", "풍수지리사": "Conseiller en géomancie", "대장간 장인": "Forgeron", "도자기 장인": "Céramiste", "대목장": "Maître charpentier", "한지 장인": "Artisan du papier hanji", "염색 장인": "Artisan teinturier", "보부상": "Marchand itinérant", "객주 주인": "Aubergiste", "약초상": "Herboriste", "농사꾼": "Agriculteur", "바다의 어부": "Pêcheur en mer", "산의 사냥꾼": "Chasseur de montagne", "나루터 뱃사공": "Passeur", "떠돌이 광대": "Artiste ambulant", "궁중 예인": "Artiste de cour", "성실한 살림지기": "Intendant du foyer", "비밀 정보원": "Informateur secret" },
};

function getLocalizedCareer(career: ReturnType<typeof getPastLifeCareer>, language: string) {
  const locale = language.toLowerCase().startsWith("pt") ? "pt-BR" : language.split("-")[0];
  if (locale === "en") return EN_CAREER_COPY[career.title] ?? { title: career.title, eraPay: career.eraPay, wealthStyle: career.wealthStyle, description: career.description };
  const title = CAREER_TITLES[locale]?.[career.title];
  if (!title) return null;
  const fields = {
    ja: { eraPay: "現物・手当・依頼料などの時代の報酬", wealthStyle: "技術と信頼を積み上げる型", description: `${title}として、周囲を観察しながら自分の役割を着実に果たした人。` },
    es: { eraPay: "Recompensa histórica en bienes, honorarios o apoyo", wealthStyle: "Construir con habilidad y confianza", description: `Como ${title}, cumplías tu papel con constancia y observabas lo que otros pasaban por alto.` },
    "pt-BR": { eraPay: "Recompensa histórica em bens, taxas ou apoio", wealthStyle: "Construir com habilidade e confiança", description: `Como ${title}, você cumpria seu papel com constância e percebia o que outros não viam.` },
    fr: { eraPay: "Récompense historique en biens, honoraires ou soutien", wealthStyle: "Construire par le savoir-faire et la confiance", description: `En tant que ${title}, vous teniez votre rôle avec constance et remarquiez ce que les autres manquaient.` },
  } as const;
  return { title, ...fields[locale as keyof typeof fields] };
}

export function PastLifeResult({ result, image, onReset }: Props) {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.toLowerCase().startsWith("en");
  const isKorean = i18n.language.toLowerCase().startsWith("ko");
  const copy = getPastLifeResultCopy(i18n.language);
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
  const careerCopy = isKorean ? null : getLocalizedCareer(career, i18n.language);
  const displayTitle = careerCopy?.title ?? career.title;
  const displayEraPay = careerCopy?.eraPay ?? career.eraPay;
  const displayWealthStyle = careerCopy?.wealthStyle ?? career.wealthStyle;
  const displayDescription = careerCopy?.description ?? career.description;
  const story = getStory(career.title, career.wealthStyle, i18n.language);
  const premiumHooks = getPremiumHooks(displayTitle, i18n.language);
  const shareTitle = isKorean ? `나는 전생에 ${career.title}이었다` : `${displayTitle} · ${copy.result}`;
  const shareSummary = premiumUnlocked
    ? [result.summary, story.secret, premiumHooks.punchText, premiumHooks.todayText].filter(Boolean).join("\n\n")
    : result.summary;

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
          body: JSON.stringify({ imageBase64: image, type: "pastLife", career: career.title, language: i18n.language }),
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
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#84422e]">{isKorean ? "AI 전생 캐릭터 결과" : copy.result}</p>
            <div className="relative mt-4 overflow-hidden border border-[#8e5a38]/30 bg-[#e3be7d]">
              {generatedImage ? (
                <img src={generatedImage} alt={`${displayTitle} past-life character`} className="aspect-[4/3] w-full object-cover sm:aspect-square" />
              ) : image ? (
                <div className="relative aspect-[4/3] sm:aspect-square">
                  <img src={image} alt="전생 캐릭터 생성에 사용할 얼굴" className="h-full w-full object-cover blur-[2px] opacity-55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#4a2517]/45 px-5 text-[#fff0c8]">
                    {generating ? <Loader2 className="h-7 w-7 animate-spin" /> : <span className="text-2xl">{career.icon}</span>}
                    <p className="text-center text-sm font-bold">{generating ? (isKorean ? `${career.title}의 모습으로 변신 중` : `${pastLabel(i18n.language, "transforming")} · ${displayTitle}`) : (isKorean ? "전생 캐릭터 이미지를 불러오지 못했습니다" : pastLabel(i18n.language, "failed"))}</p>
                  </div>
                </div>
              ) : <div className="flex aspect-[4/3] items-center justify-center text-6xl sm:aspect-square">{career.icon}</div>}
              {image && <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-[#f4dca4]/60 bg-[#342016]/80 px-2 py-1.5 text-left text-[10px] font-bold text-[#fff0c8]"><img src={image} alt={isKorean ? "원본 얼굴" : "Original face"} className="h-7 w-7 rounded-full object-cover" />{isKorean ? "내 얼굴 기반 전생 캐릭터" : pastLabel(i18n.language, "faceBased")}</div>}
            </div>
            <h1 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">{isKorean ? "당신의 전생 직업은" : copy.careerLabel}</h1>
            <p className="mt-1 font-serif text-4xl font-bold text-[#914430] sm:text-5xl">{displayTitle}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5d4031]">{displayDescription}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="mt-5 grid gap-3 sm:grid-cols-3">
          <InfoCard label={isKorean ? "당시 보상" : copy.eraPay} value={displayEraPay} />
          <InfoCard label={isKorean ? "AI 전생 생활력 환산" : copy.modernPay} value={career.modernPay} emphasis />
          <InfoCard label={isKorean ? "재산을 쌓는 방식" : copy.wealthStyle} value={displayWealthStyle} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mt-4 border border-[#8e5a38]/25 bg-[#fff0c8]/70 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#7e3c2a]"><Sparkles className="h-4 w-4" />{isKorean ? "현생에 이어진 전생 기질" : copy.traits}</div>
          <p className="mt-3 text-sm leading-7 text-[#523427]">{result.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(result.personality?.traits ?? []).slice(0, 4).map((trait) => <span key={trait} className="rounded-full border border-[#8e5a38]/25 bg-[#f6dca4] px-3 py-1 text-xs font-semibold text-[#6e3929]">{trait}</span>)}
          </div>
        </motion.div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <StoryCard eyebrow={isKorean ? "전생 기록" : pastLabel(i18n.language, "record")} title={isKorean ? "그 시절의 당신" : pastLabel(i18n.language, "then")} text={story.past} />
          <StoryCard eyebrow={isKorean ? "사람들이 기억한 방식" : pastLabel(i18n.language, "remembered")} title={isKorean ? "관계의 기질" : pastLabel(i18n.language, "record")} text={story.relationship} />
        </div>

        {!premiumUnlocked ? (
          <section className="mt-4 border border-[#7e3c2a]/35 bg-[#432116] p-5 text-[#fff0c8] shadow-[4px_4px_0_rgba(104,59,32,.18)]">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#eabf72]">{isKorean ? "후원으로 여는 상세 전생 기록" : copy.unlockEyebrow}</p>
            <h2 className="mt-2 font-serif text-xl font-bold">{isKorean ? "전생의 결정적 장면을 열어 보세요" : copy.unlockTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-[#f4dca4]/85">{isKorean ? "재물 감각과 사랑의 인연, 지금 다시 꺼내 쓸 전생 미션, 내 얼굴 기반 소장 카드까지 한 번에 확인하세요." : copy.unlockBody}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left text-xs text-[#f8d99b]">
              {["재물과 생존 전략", "사랑에서 지킨 약속", "현생 전생 미션", "내 전생 소장 포스터"].map((item) => <div key={item} className="border border-[#f4dca4]/15 bg-black/10 px-3 py-2 blur-[1.2px]">{item}</div>)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs font-bold">
              <a href="https://mytesttype.com/k-shaman/toss_qr.jpg" target="_blank" rel="noreferrer" onClick={() => trackSupportClick({ service: "past-life", method: "toss" })} className="border border-[#f4dca4]/30 bg-[#fff0c8]/10 px-3 py-3">{isKorean ? "Toss 후원 QR" : pastLabel(i18n.language, "toss")}</a>
              <a href="https://mytesttype.com/k-shaman/paypal_qr.jpg" target="_blank" rel="noreferrer" onClick={() => trackSupportClick({ service: "past-life", method: "paypal" })} className="border border-[#f4dca4]/30 bg-[#fff0c8]/10 px-3 py-3">{isKorean ? "PayPal 후원 QR" : pastLabel(i18n.language, "paypal")}</a>
            </div>
            <button type="button" onClick={() => { trackDetailView({ service: "past-life" }); setPremiumUnlocked(true); }} className="mt-3 h-11 w-full bg-[#f1c970] text-sm font-black text-[#3a1f14]">{isKorean ? "테스트로 상세 기록 열기" : pastLabel(i18n.language, "testOpen")}</button>
            <p className="mt-2 text-center text-[10px] text-[#f4dca4]/60">{isKorean ? "테스트 기간에는 후원 확인 없이 상세 결과를 열 수 있습니다." : pastLabel(i18n.language, "testNote")}</p>
          </section>
        ) : (
          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#7e3c2a]">{isKorean ? "상세 전생 기록" : copy.detail}</p>
            <h2 className="mt-2 font-serif text-xl font-bold">{isKorean ? "당신의 전생 기록 완성본" : copy.complete}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StoryCard eyebrow={isKorean ? "결정적 장면" : pastLabel(i18n.language, "scene")} title={isKorean ? "숨겨진 전생의 선택" : pastLabel(i18n.language, "hidden")} text={story.secret} />
              <StoryCard eyebrow={isKorean ? "생활력 기록" : pastLabel(i18n.language, "livelihood")} title={isKorean ? "재물 감각과 생존 방식" : pastLabel(i18n.language, "wealth")} text={story.wealth} />
              <StoryCard eyebrow={isKorean ? "사랑의 인연" : pastLabel(i18n.language, "love")} title={isKorean ? "관계에서 끝까지 지킨 것" : pastLabel(i18n.language, "protected")} text={story.love} />
              <StoryCard eyebrow={isKorean ? "현생 미션" : pastLabel(i18n.language, "mission")} title={isKorean ? "이번 주에 꺼내 쓸 기질" : pastLabel(i18n.language, "quality")} text={story.mission} accent />
              <StoryCard eyebrow={premiumHooks.scene} title={premiumHooks.sceneTitle} text={premiumHooks.sceneText} />
              <StoryCard eyebrow={premiumHooks.punch} title={premiumHooks.punchTitle} text={premiumHooks.punchText} accent />
              <StoryCard eyebrow={premiumHooks.today} title={premiumHooks.todayTitle} text={premiumHooks.todayText} />
            </div>
            <div className="mt-4 border border-[#8e5a38]/25 bg-[#f4d89e] p-4 text-center">
              <p className="text-[10px] font-bold tracking-[.16em] text-[#85513b]">{isKorean ? "소장용 전생 포스터" : copy.poster}</p>
              <p className="mt-1 font-serif text-lg font-bold text-[#4a2517]">{isEnglish ? `My past-life record as a ${displayTitle}` : `${career.title}로 남긴 나의 전생 기록`}</p>
              <p className="mt-2 text-xs leading-5 text-[#684a3e]">{isKorean ? "위 전생 캐릭터 이미지와 함께 SNS 결과 카드에 담아 공유할 수 있습니다." : pastLabel(i18n.language, "posterShare")}</p>
            </div>
          </div>
        )}

        {imageError && (
          <div className="mt-3 text-center">
            <p className="px-3 text-[11px] leading-5 text-[#8e3f2b]">{isKorean ? "전생 이미지 생성이 일시적으로 지연되었습니다. 결과 카드는 그대로 공유할 수 있습니다." : copy.delayed}</p>
            <button type="button" onClick={() => setGenerationAttempt((attempt) => attempt + 1)} className="mt-2 border border-[#815039]/35 bg-[#f7dfaa]/75 px-4 py-2 text-xs font-bold text-[#50291c]">{isKorean ? "전생 이미지 다시 만들기" : copy.retry}</button>
          </div>
        )}
        <p className="mt-4 px-3 text-center text-[11px] leading-5 text-[#705244]">{isKorean ? "당시 보상은 직업·시대·지역별 차이가 큰 현물 중심 체계였습니다. ‘현대 생활력 환산’은 역사적 급여를 확정하는 수치가 아닌, AI 전생 캐릭터 놀이를 위한 생활력 비유입니다." : copy.disclaimer}</p>

        <div className="mt-5">
          <ResultShareButtons lang={i18n.language} title={shareTitle} url={url} summary={shareSummary} image={generatedImage ?? image} service="past-life" variant="paper" />
          {(generatedImage ?? image) && (
            <a className="mt-3 flex h-11 w-full items-center justify-center border border-[#815039]/35 bg-[#f7dfaa]/75 text-sm font-bold text-[#50291c]" href={generatedImage ?? image ?? undefined} download="mytesttype-past-life-result.png" onClick={() => trackResultImageSave({ test_slug: "past_life", result_key: career.title, result_title: displayTitle })}>
              {isKorean ? "전생 결과 이미지 저장" : copy.poster}
            </a>
          )}
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

function getStory(career: string, wealthStyle: string, language = "ko") {
  const locale = language.toLowerCase().startsWith("pt") ? "pt-BR" : language.split("-")[0];
  if (locale !== "ko") {
    const title = CAREER_TITLES[locale]?.[career] ?? EN_CAREER_COPY[career]?.title ?? career;
    const style = EN_CAREER_COPY[career]?.wealthStyle ?? wealthStyle;
    if (locale === "ja") return {
      past: `${title}として、周囲が見落とす小さな変化に気づきながら、自分の役割を着実に果たしました。忙しい時ほど中心を保ち、足りないところを先に埋める人でした。`,
      relationship: "言葉より行動で気持ちを示す人として記憶されています。静かに見えても、一度大切だと思った人を簡単には手放しませんでした。",
      wealth: "技術と信頼を積み重ね、ひとつの大勝負ではなく続けられる強みを価値に変える感覚です。",
      mission: "今週は先延ばしにしていたことをひとつ完成させてみましょう。",
      secret: "大変さよりも、任されたことが崩れてしまう瞬間を恐れていました。だから重要な場面では自分で確認してから決断しました。",
      love: "華やかな言葉より、現実を一緒に過ごせる安心感を大切にしました。必要な気持ちも少しずつ言葉にすると、縁が深まります。",
    };
    if (locale === "es") return {
      past: `Como ${title}, construías confianza al mantenerte firme en tu papel y notar lo que otros no veían. En los momentos difíciles, mantenías el centro y cubrías primero los pequeños huecos.`,
      relationship: "Te recordaban como alguien que demostraba cariño con hechos. Podías parecer reservado al principio, pero no abandonabas fácilmente a quien considerabas de los tuyos.",
      wealth: "Tu forma de construir riqueza convertía una habilidad repetible en valor duradero, en vez de depender de una sola apuesta.",
      mission: "Esta semana termina una tarea que llevas demasiado tiempo posponiendo.",
      secret: "Temías más que se desordenara un encargo de confianza que el trabajo duro. Por eso comprobabas los detalles importantes antes de decidir.",
      love: "En el amor valorabas compartir la vida real más que las palabras llamativas. A medida que el vínculo crece, expresa también lo que necesitas.",
    };
    if (locale === "pt-BR") return {
      past: `Como ${title}, você construía confiança ao cumprir seu papel com firmeza e perceber o que outros não viam. Nos momentos difíceis, mantinha o equilíbrio e preenchia primeiro as pequenas lacunas.`,
      relationship: "As pessoas se lembravam de você por demonstrar carinho com atitudes. Podia parecer reservado no início, mas não abandonava quem considerava parte da sua equipe.",
      wealth: "Sua forma de construir riqueza transformava uma habilidade repetível em valor duradouro, em vez de depender de uma única aposta.",
      mission: "Nesta semana, conclua uma tarefa que você vem adiando há muito tempo.",
      secret: "Você temia mais que um compromisso de confiança saísse do controle do que o trabalho difícil. Por isso verificava os detalhes antes da decisão final.",
      love: "No amor, você valorizava compartilhar a vida real mais do que palavras impressionantes. Conforme o vínculo cresce, diga também o que você precisa.",
    };
    if (locale === "fr") return {
      past: `En tant que ${title}, vous inspiriez confiance en tenant votre rôle avec constance et en remarquant ce que les autres ne voyaient pas. Dans les moments difficiles, vous gardiez le cap et combliez d’abord les petits manques.`,
      relationship: "On se souvenait de vous comme d’une personne qui exprimait son attention par ses actes. Réservé au début, vous ne laissiez pas facilement partir les personnes importantes.",
      wealth: "Votre façon de construire votre richesse transformait une force répétable en valeur durable plutôt que de miser sur un seul grand coup.",
      mission: "Cette semaine, terminez une tâche que vous repoussez depuis trop longtemps.",
      secret: "Vous craigniez davantage qu’une mission confiée se désorganise que le travail difficile. Vous vérifiiez donc vous-même les détails importants avant de décider.",
      love: "En amour, vous privilégiez le partage de la vie réelle aux belles paroles. Quand le lien se renforce, pensez aussi à exprimer vos besoins.",
    };
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
