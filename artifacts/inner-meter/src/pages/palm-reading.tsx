import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Hand,
  ImagePlus,
  Loader2,
  RotateCcw,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";

type HandSide = "left" | "right";
type PalmMode = "solo" | "compatibility";
type PairPerson = "me" | "partner";
type Stage =
  | "guide"
  | "camera"
  | "preview"
  | "complete"
  | "analyzing"
  | "result";
type Tier = "free" | "premium";
type FreeResult = {
  summary: string;
  lines: Array<{ name: string; reading: string }>;
  observation: string;
  moneyStyle?: { title: string; reading: string };
  reflection: string;
};
type PremiumResult = {
  summary: string;
  lines: Array<{ name: string; reading: string }>;
  mounts?: Array<{ name: string; reading: string }>;
  patterns?: Array<{ name: string; reading: string }>;
  everyday?: string[];
  reflection: string;
};

const API_URL = "https://api.mytesttype.com/api/palm-reading";
type PalmUiCopy = {
  rightHand: string;
  leftHand: string;
  detailTitle: string;
  close: string;
  detailIntro: string;
  toss: string;
  paypal: string;
  unlock: string;
  donationNote: string;
  freeBasic: string;
  flow: string;
  moneyNote: string;
  observation: string;
  question: string;
  detailed: string;
  everyday: string;
  richer: string;
  richerIntro: string;
  openDetail: string;
  cameraError: string;
  imageOnly: string;
  sizeError: string;
  analysisError: string;
  analyzing: string;
  analyzingIntro: string;
  guide: string;
  bright: string;
  camera: string;
  choosePhoto: string;
  fitHand: string;
  takePhoto: string;
  retake: string;
  usePhoto: string;
  completed: string;
  moreHand: string;
  otherHand: string;
  startFree: string;
  privacy: string;
  backFace: string;
  seoTitle: string;
  seoDescription: string;
};

const PALM_UI_COPY: Record<string, PalmUiCopy> = {
  ko: {
    rightHand: "오른손",
    leftHand: "왼손",
    detailTitle: "상세 손금 해설",
    close: "닫기",
    detailIntro:
      "무료 결과는 기본 선 해설을 제공합니다. 후원 후 상세 패턴과 생활 적용 아이디어를 확인할 수 있습니다.",
    toss: "Toss QR 보기",
    paypal: "PayPal QR 보기",
    unlock: "후원 후 상세 해설 보기",
    donationNote:
      "현재 후원 여부는 자동 검증되지 않으며, 자발적 후원 방식입니다.",
    freeBasic: "무료 기본 해설",
    flow: "당신의 손바닥에 보이는 흐름",
    moneyNote:
      "부를 예언하는 테스트가 아니라, 생활 습관을 돌아보는 참고 해설입니다.",
    observation: "사진 관찰",
    question: "오늘의 질문",
    detailed: "상세 해설",
    everyday: "생활 속 적용 아이디어",
    richer: "더 풍부한 상세 해설",
    richerIntro:
      "손바닥 언덕, 선의 연결 패턴, 일상 적용 아이디어를 추가로 확인하세요.",
    openDetail: "상세 해설 열기",
    cameraError: "카메라를 열 수 없습니다. 사진 업로드를 이용해주세요.",
    imageOnly: "이미지 파일만 업로드할 수 있습니다.",
    sizeError: "파일 크기는 10MB 이하로 선택해주세요.",
    analysisError: "분석 중 오류가 발생했습니다.",
    analyzing: "손금 특징을 살펴보는 중입니다",
    analyzingIntro: "사진에서 보이는 선과 형태를 정리하고 있습니다.",
    guide: "손바닥을 가이드 안에 맞춰주세요",
    bright: "손가락을 자연스럽게 펴고 밝은 곳에서 촬영하세요",
    camera: "카메라 촬영",
    choosePhoto: "사진 선택",
    fitHand: "손 전체를 점선 안에 맞춰주세요",
    takePhoto: "사진 찍기",
    retake: "다시 촬영",
    usePhoto: "이 사진 사용",
    completed: "촬영 완료",
    moreHand: "한 손만으로 진행하거나 다른 손을 한 장 더 촬영할 수 있습니다.",
    otherHand: "다른 손 촬영",
    startFree: "무료 분석 시작",
    privacy:
      "사진은 분석 요청에만 사용하며, 결과는 손금 전통을 바탕으로 한 문화·오락 목적의 참고 안내입니다. 건강·수명·재산을 확정적으로 판단하지 않습니다.",
    backFace: "관상으로 돌아가기",
    seoTitle: "AI 손금 분석",
    seoDescription:
      "손바닥 사진에서 보이는 특징을 바탕으로 손금 전통을 문화·오락 관점에서 살펴보는 MyTestType AI 손금입니다.",
  },
  en: {
    rightHand: "Right hand",
    leftHand: "Left hand",
    detailTitle: "Detailed palm reading",
    close: "Close",
    detailIntro:
      "The free result covers the main lines. Support the project to unlock detailed patterns and everyday reflections.",
    toss: "View Toss QR",
    paypal: "View PayPal QR",
    unlock: "View detailed reading after support",
    donationNote: "Support is voluntary and is not automatically verified.",
    freeBasic: "Free overview",
    flow: "The flow visible in your palm",
    moneyNote: "This is a cultural reference, not a prediction of wealth.",
    observation: "Photo observation",
    question: "Today's reflection",
    detailed: "Detailed reading",
    everyday: "Everyday ideas",
    richer: "A richer reading",
    richerIntro:
      "Explore palm mounts, connected line patterns, and ideas for everyday reflection.",
    openDetail: "Open detailed reading",
    cameraError: "Camera access is unavailable. Please upload a photo.",
    imageOnly: "Please choose an image file.",
    sizeError: "Please choose a file smaller than 10 MB.",
    analysisError: "Something went wrong during analysis.",
    analyzing: "Reading your palm",
    analyzingIntro: "Organizing the visible lines and shapes in your photo.",
    guide: "Fit your palm inside the guide",
    bright: "Spread your fingers naturally and use a bright place",
    camera: "Take with camera",
    choosePhoto: "Choose photo",
    fitHand: "Fit your whole hand inside the dotted guide",
    takePhoto: "Take photo",
    retake: "Retake",
    usePhoto: "Use this photo",
    completed: "Capture complete",
    moreHand: "You can continue with one hand or capture the other hand too.",
    otherHand: "Capture other hand",
    startFree: "Start free reading",
    privacy:
      "Photos are used only for the analysis request. Results are cultural and entertainment-oriented references, not definitive claims about health, lifespan, or wealth.",
    backFace: "Back to face reading",
    seoTitle: "AI Palm Reading",
    seoDescription:
      "Explore palm-reading traditions from a cultural and entertainment perspective with an AI palm reading from MyTestType.",
  },
  ja: {
    rightHand: "右手",
    leftHand: "左手",
    detailTitle: "手相の詳細解説",
    close: "閉じる",
    detailIntro:
      "無料結果では主な線を解説します。サポート後は詳しいパターンと日常のヒントを確認できます。",
    toss: "Toss QRを見る",
    paypal: "PayPal QRを見る",
    unlock: "サポート後に詳細を見る",
    donationNote: "サポートは任意で、自動確認は行われません。",
    freeBasic: "無料の基本解説",
    flow: "手のひらに見える流れ",
    moneyNote: "富を断定するものではなく、文化的な参考解説です。",
    observation: "写真の観察",
    question: "今日の問い",
    detailed: "詳細解説",
    everyday: "日常へのヒント",
    richer: "さらに詳しい解説",
    richerIntro: "丘や線のつながり、日常で考えるためのヒントを見てみましょう。",
    openDetail: "詳細解説を開く",
    cameraError: "カメラを開けません。写真をアップロードしてください。",
    imageOnly: "画像ファイルを選択してください。",
    sizeError: "10MB以下のファイルを選択してください。",
    analysisError: "分析中にエラーが発生しました。",
    analyzing: "手相を読み取っています",
    analyzingIntro: "写真に見える線と形を整理しています。",
    guide: "手のひらをガイドに合わせてください",
    bright: "指を自然に開き、明るい場所で撮影してください",
    camera: "カメラで撮影",
    choosePhoto: "写真を選ぶ",
    fitHand: "手全体を点線の中に合わせてください",
    takePhoto: "撮影する",
    retake: "撮り直す",
    usePhoto: "この写真を使う",
    completed: "撮影完了",
    moreHand: "片手だけでも、もう一方の手を追加しても進められます。",
    otherHand: "もう一方の手を撮影",
    startFree: "無料分析を開始",
    privacy:
      "写真は分析リクエストのみに使用します。結果は文化・娯楽目的の参考情報です。",
    backFace: "顔相に戻る",
    seoTitle: "AI手相分析",
    seoDescription:
      "MyTestTypeのAI手相分析で、手のひらの特徴を文化・娯楽の観点から見てみましょう。",
  },
  es: {
    rightHand: "Mano derecha",
    leftHand: "Mano izquierda",
    detailTitle: "Lectura detallada de la palma",
    close: "Cerrar",
    detailIntro:
      "El resultado gratuito explica las líneas principales. Apoya el proyecto para desbloquear patrones y reflexiones detalladas.",
    toss: "Ver QR de Toss",
    paypal: "Ver QR de PayPal",
    unlock: "Ver lectura detallada tras apoyar",
    donationNote: "El apoyo es voluntario y no se verifica automáticamente.",
    freeBasic: "Resumen gratuito",
    flow: "El flujo visible en tu palma",
    moneyNote: "Es una referencia cultural, no una predicción de riqueza.",
    observation: "Observación de la foto",
    question: "Reflexión de hoy",
    detailed: "Lectura detallada",
    everyday: "Ideas para el día a día",
    richer: "Una lectura más completa",
    richerIntro:
      "Explora las líneas, los montes y algunas ideas para reflexionar.",
    openDetail: "Abrir lectura detallada",
    cameraError: "No se puede abrir la cámara. Sube una foto.",
    imageOnly: "Elige un archivo de imagen.",
    sizeError: "Elige un archivo de menos de 10 MB.",
    analysisError: "Ocurrió un error durante el análisis.",
    analyzing: "Leyendo tu palma",
    analyzingIntro: "Organizando las líneas y formas visibles en tu foto.",
    guide: "Coloca la palma dentro de la guía",
    bright: "Abre los dedos de forma natural y usa un lugar luminoso",
    camera: "Usar cámara",
    choosePhoto: "Elegir foto",
    fitHand: "Coloca toda la mano dentro de la guía punteada",
    takePhoto: "Tomar foto",
    retake: "Repetir foto",
    usePhoto: "Usar esta foto",
    completed: "Captura completada",
    moreHand: "Puedes continuar con una mano o capturar también la otra.",
    otherHand: "Capturar la otra mano",
    startFree: "Comenzar lectura gratuita",
    privacy:
      "Las fotos solo se usan para la solicitud de análisis. El resultado es una referencia cultural y de entretenimiento.",
    backFace: "Volver a lectura facial",
    seoTitle: "Lectura de palma con IA",
    seoDescription:
      "Explora la tradición de la lectura de palma desde una perspectiva cultural y de entretenimiento con MyTestType.",
  },
  "pt-BR": {
    rightHand: "Mão direita",
    leftHand: "Mão esquerda",
    detailTitle: "Leitura detalhada da palma",
    close: "Fechar",
    detailIntro:
      "O resultado gratuito explica as linhas principais. Apoie o projeto para desbloquear padrões e reflexões detalhadas.",
    toss: "Ver QR do Toss",
    paypal: "Ver QR do PayPal",
    unlock: "Ver leitura detalhada após apoiar",
    donationNote: "O apoio é voluntário e não é verificado automaticamente.",
    freeBasic: "Visão geral gratuita",
    flow: "O fluxo visível na sua palma",
    moneyNote: "É uma referência cultural, não uma previsão de riqueza.",
    observation: "Observação da foto",
    question: "Reflexão de hoje",
    detailed: "Leitura detalhada",
    everyday: "Ideias para o dia a dia",
    richer: "Uma leitura mais completa",
    richerIntro: "Explore linhas, montes e ideias para refletir no cotidiano.",
    openDetail: "Abrir leitura detalhada",
    cameraError: "Não foi possível abrir a câmera. Envie uma foto.",
    imageOnly: "Escolha um arquivo de imagem.",
    sizeError: "Escolha um arquivo menor que 10 MB.",
    analysisError: "Ocorreu um erro durante a análise.",
    analyzing: "Lendo sua palma",
    analyzingIntro: "Organizando as linhas e formas visíveis na sua foto.",
    guide: "Ajuste a palma dentro do guia",
    bright: "Abra os dedos naturalmente e use um local claro",
    camera: "Usar câmera",
    choosePhoto: "Escolher foto",
    fitHand: "Ajuste a mão inteira dentro da guia pontilhada",
    takePhoto: "Tirar foto",
    retake: "Tirar novamente",
    usePhoto: "Usar esta foto",
    completed: "Captura concluída",
    moreHand: "Você pode continuar com uma mão ou capturar também a outra.",
    otherHand: "Capturar a outra mão",
    startFree: "Começar leitura gratuita",
    privacy:
      "As fotos são usadas apenas para a análise. O resultado é uma referência cultural e de entretenimento.",
    backFace: "Voltar à leitura facial",
    seoTitle: "Leitura da palma com IA",
    seoDescription:
      "Explore a tradição da leitura da palma sob uma perspectiva cultural e de entretenimento com a MyTestType.",
  },
  fr: {
    rightHand: "Main droite",
    leftHand: "Main gauche",
    detailTitle: "Lecture détaillée de la paume",
    close: "Fermer",
    detailIntro:
      "Le résultat gratuit présente les lignes principales. Soutenez le projet pour découvrir les motifs et réflexions détaillés.",
    toss: "Voir le QR Toss",
    paypal: "Voir le QR PayPal",
    unlock: "Voir la lecture détaillée après soutien",
    donationNote:
      "Le soutien est volontaire et n'est pas vérifié automatiquement.",
    freeBasic: "Aperçu gratuit",
    flow: "Le mouvement visible dans votre paume",
    moneyNote:
      "Il s'agit d'une référence culturelle, pas d'une prédiction de richesse.",
    observation: "Observation de la photo",
    question: "Question du jour",
    detailed: "Lecture détaillée",
    everyday: "Idées du quotidien",
    richer: "Une lecture plus riche",
    richerIntro:
      "Explorez les monts, les lignes et des pistes de réflexion au quotidien.",
    openDetail: "Ouvrir la lecture détaillée",
    cameraError: "Impossible d'ouvrir la caméra. Importez une photo.",
    imageOnly: "Choisissez un fichier image.",
    sizeError: "Choisissez un fichier de moins de 10 Mo.",
    analysisError: "Une erreur est survenue pendant l'analyse.",
    analyzing: "Lecture de votre paume",
    analyzingIntro:
      "Organisation des lignes et formes visibles sur votre photo.",
    guide: "Placez votre paume dans le guide",
    bright: "Écartez naturellement les doigts dans un endroit lumineux",
    camera: "Prendre avec la caméra",
    choosePhoto: "Choisir une photo",
    fitHand: "Placez toute la main dans le guide pointillé",
    takePhoto: "Prendre la photo",
    retake: "Reprendre",
    usePhoto: "Utiliser cette photo",
    completed: "Capture terminée",
    moreHand: "Vous pouvez continuer avec une main ou capturer aussi l'autre.",
    otherHand: "Capturer l'autre main",
    startFree: "Commencer la lecture gratuite",
    privacy:
      "Les photos servent uniquement à la demande d'analyse. Le résultat est une référence culturelle et de divertissement.",
    backFace: "Retour à la lecture du visage",
    seoTitle: "Lecture de paume par IA",
    seoDescription:
      "Découvrez la tradition de la lecture de paume sous un angle culturel et de divertissement avec MyTestType.",
  },
};

const handLabel = (side: HandSide, ui: PalmUiCopy) =>
  side === "right" ? ui.rightHand : ui.leftHand;
const getPalmUiCopy = (language: string) =>
  PALM_UI_COPY[language] ??
  PALM_UI_COPY[language.split("-")[0]] ??
  PALM_UI_COPY.en;

const PALM_MODE_COPY = {
  ko: {
    solo: "나의 손금 보기",
    soloDesc: "내 손금에 담긴 재물 성향 알아보기",
    pair: "너와 나의 손금 궁합",
    pairDesc: "두 사람의 손금으로 관계 케미 알아보기",
    me: "내 손",
    partner: "상대방 손",
    pairGuide: "손바닥을 가이드 안에 맞춰주세요",
    pairInstruction: "두 사람의 오른손을 한 장씩 촬영합니다.",
  },
  en: {
    solo: "My palm reading",
    soloDesc: "Explore your personal money style",
    pair: "Our palm compatibility",
    pairDesc: "Discover the chemistry between two palms",
    me: "My hand",
    partner: "Partner's hand",
    pairGuide: "Fit the palm inside the guide",
    pairInstruction: "Capture one clear right-palm photo for each person.",
  },
  ja: {
    solo: "自分の手相を見る",
    soloDesc: "自分の金運スタイルを見てみる",
    pair: "ふたりの手相相性",
    pairDesc: "ふたりの手相で関係の相性を見る",
    me: "自分の手",
    partner: "相手の手",
    pairGuide: "手のひらをガイドに合わせてください",
    pairInstruction: "ふたりの右手を1枚ずつ撮影します。",
  },
  es: {
    solo: "Leer mi palma",
    soloDesc: "Descubre tu estilo personal con el dinero",
    pair: "Compatibilidad de nuestras palmas",
    pairDesc: "Descubre la química entre dos palmas",
    me: "Mi mano",
    partner: "Mano de la otra persona",
    pairGuide: "Coloca la palma dentro de la guía",
    pairInstruction: "Toma una foto clara de la palma derecha de cada persona.",
  },
  "pt-BR": {
    solo: "Ler minha palma",
    soloDesc: "Descubra seu estilo pessoal com o dinheiro",
    pair: "Compatibilidade das nossas palmas",
    pairDesc: "Descubra a química entre duas palmas",
    me: "Minha mão",
    partner: "Mão da outra pessoa",
    pairGuide: "Ajuste a palma dentro do guia",
    pairInstruction: "Tire uma foto nítida da palma direita de cada pessoa.",
  },
  fr: {
    solo: "Lire ma paume",
    soloDesc: "Découvrez votre style personnel avec l'argent",
    pair: "Compatibilité de nos paumes",
    pairDesc: "Découvrez la complicité entre deux paumes",
    me: "Ma main",
    partner: "Main de l'autre personne",
    pairGuide: "Placez la paume dans le guide",
    pairInstruction:
      "Prenez une photo nette de la paume droite de chaque personne.",
  },
} as const;
const getPalmModeCopy = (language: string) =>
  PALM_MODE_COPY[language as keyof typeof PALM_MODE_COPY] ??
  PALM_MODE_COPY[language.split("-")[0] as keyof typeof PALM_MODE_COPY] ??
  PALM_MODE_COPY.en;

const PALM_HERO_COPY = {
  ko: {
    eyebrow: "✦ AI 손금 분석 ✦",
    lead: "손금으로 보는",
    title: "부자테스트",
    subtitle: "내 손금에 숨은 재물운은 어떤 모습일까?",
    instruction: "손을 펼친 정면 사진으로 부자테스트를 시작해보세요.",
    badge: "당신의 손금에 숨겨진 가능성은?",
  },
  en: {
    eyebrow: "✦ AI PALM READING ✦",
    lead: "YOUR PALM",
    title: "WEALTH TEST",
    subtitle: "What does your palm reveal about your money energy?",
    instruction:
      "Start your wealth test with a clear, front-facing palm photo.",
    badge: "What possibility is hidden in your palm?",
  },
  ja: {
    eyebrow: "✦ AI 手相リーディング ✦",
    lead: "手相で見る",
    title: "お金のタイプ診断",
    subtitle: "あなたの手相に隠れた金運の傾向は？",
    instruction: "手のひらを正面から撮影して診断を始めましょう。",
    badge: "あなたの手相に隠れた可能性は？",
  },
  es: {
    eyebrow: "✦ LECTURA DE PALMA CON IA ✦",
    lead: "TU PALMA REVELA",
    title: "TU ESTILO DE RIQUEZA",
    subtitle: "¿Qué tendencia financiera muestra tu palma?",
    instruction: "Empieza con una foto clara de tu palma de frente.",
    badge: "¿Qué posibilidad esconde tu palma?",
  },
  "pt-BR": {
    eyebrow: "✦ LEITURA DA PALMA COM IA ✦",
    lead: "SUA PALMA REVELA",
    title: "SEU ESTILO DE RIQUEZA",
    subtitle: "O que sua palma mostra sobre sua relação com o dinheiro?",
    instruction: "Comece com uma foto nítida da palma voltada para a câmera.",
    badge: "Que possibilidade está escondida na sua palma?",
  },
  fr: {
    eyebrow: "✦ LECTURE DE PAUME PAR IA ✦",
    lead: "VOTRE PAUME RÉVÈLE",
    title: "VOTRE STYLE DE RICHESSE",
    subtitle: "Que révèle votre paume sur votre rapport à l'argent ?",
    instruction:
      "Commencez avec une photo nette de votre paume face à l'objectif.",
    badge: "Quelle possibilité se cache dans votre paume ?",
  },
} as const;

function getPalmHeroCopy(language: string) {
  return (
    PALM_HERO_COPY[language as keyof typeof PALM_HERO_COPY] ??
    PALM_HERO_COPY[language.split("-")[0] as keyof typeof PALM_HERO_COPY] ??
    PALM_HERO_COPY.en
  );
}

function PaymentSheet({
  onClose,
  onUnlock,
}: {
  onClose: () => void;
  onUnlock: () => void;
}) {
  const { i18n } = useTranslation();
  const ui = getPalmUiCopy(i18n.language);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 sm:items-center"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-3xl bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{ui.detailTitle}</h2>
          <button type="button" onClick={onClose} aria-label={ui.close}>
            <X />
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {ui.detailIntro}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href="https://mytesttype.com/k-shaman/toss_qr.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border p-3 text-center text-sm font-semibold"
          >
            {ui.toss}
          </a>
          <a
            href="https://mytesttype.com/k-shaman/paypal_qr.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border p-3 text-center text-sm font-semibold"
          >
            {ui.paypal}
          </a>
        </div>
        <button
          type="button"
          onClick={onUnlock}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground"
        >
          <Sparkles className="h-5 w-5" /> {ui.unlock}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {ui.donationNote}
        </p>
      </div>
    </div>
  );
}

function ResultView({
  images,
  free,
  premium,
  onPremium,
}: {
  images: Record<HandSide, string | null>;
  free: FreeResult;
  premium: PremiumResult | null;
  onPremium: () => void;
}) {
  const { i18n } = useTranslation();
  const ui = getPalmUiCopy(i18n.language);
  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm font-semibold text-primary">{ui.freeBasic}</p>
        <h1 className="mt-1 text-2xl font-bold">{ui.flow}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {free.summary}
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        {free.lines.map((line) => (
          <article
            key={line.name}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <h2 className="font-bold">{line.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {line.reading}
            </p>
          </article>
        ))}
      </section>
      {free.moneyStyle && (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold tracking-wide text-amber-800">
            💰 {free.moneyStyle.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-950">
            {free.moneyStyle.reading}
          </p>
          <p className="mt-2 text-[11px] text-amber-800/70">{ui.moneyNote}</p>
        </section>
      )}
      <section className="rounded-2xl bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
        <b>{ui.observation}:</b> {free.observation}
        <br />
        <b>{ui.question}:</b> {free.reflection}
      </section>
      {premium ? (
        <>
          <section className="rounded-3xl border border-primary/30 bg-primary/5 p-5">
            <p className="text-sm font-semibold text-primary">{ui.detailed}</p>
            <p className="mt-2 leading-relaxed">{premium.summary}</p>
          </section>
          <section className="grid gap-3 sm:grid-cols-2">
            {[...(premium.mounts ?? []), ...(premium.patterns ?? [])].map(
              (item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.reading}
                  </p>
                </article>
              ),
            )}
          </section>
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-bold">{ui.everyday}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {(premium.everyday ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              {premium.reflection}
            </p>
          </section>
        </>
      ) : (
        <section className="rounded-3xl border border-primary/30 bg-primary/5 p-5 text-center">
          <Sparkles className="mx-auto h-7 w-7 text-primary" />
          <h2 className="mt-2 font-bold">{ui.richer}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{ui.richerIntro}</p>
          <button
            type="button"
            onClick={onPremium}
            className="mt-4 h-11 rounded-xl bg-primary px-5 font-semibold text-primary-foreground"
          >
            {ui.openDetail}
          </button>
        </section>
      )}
      <div className="grid grid-cols-2 gap-3">
        {(["right", "left"] as HandSide[]).map(
          (hand) =>
            images[hand] && (
              <img
                key={hand}
                src={images[hand] as string}
                alt={`${handLabel(hand, ui)} analysis photo`}
                className="aspect-square rounded-2xl border border-border object-cover"
              />
            ),
        )}
      </div>
    </div>
  );
}

export default function PalmReading() {
  const { i18n } = useTranslation();
  const ui = getPalmUiCopy(i18n.language);
  const modeCopy = getPalmModeCopy(i18n.language);
  const hero = getPalmHeroCopy(i18n.language);
  const [mode, setMode] = useState<PalmMode>("solo");
  const [pairPerson, setPairPerson] = useState<PairPerson>("me");
  const [side, setSide] = useState<HandSide>("right");
  const [stage, setStage] = useState<Stage>("guide");
  const [preview, setPreview] = useState<string | null>(null);
  const [captures, setCaptures] = useState<Record<HandSide, string | null>>({
    left: null,
    right: null,
  });
  const [pairCaptures, setPairCaptures] = useState<
    Record<PairPerson, string | null>
  >({
    me: null,
    partner: null,
  });
  const [free, setFree] = useState<FreeResult | null>(null);
  const [premium, setPremium] = useState<PremiumResult | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);
  useEffect(() => stopCamera, [stopCamera]);
  useEffect(() => {
    if (stage !== "camera") return;
    let cancelled = false;
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(ui.cameraError);
      setStage("guide");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      })
      .then(async (stream) => {
        if (cancelled)
          return stream.getTracks().forEach((track) => track.stop());
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      })
      .catch(() => {
        setError(ui.cameraError);
        setStage("guide");
      });
    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [stage, stopCamera]);
  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) return setError(ui.imageOnly);
    if (file.size > 10 * 1024 * 1024) return setError(ui.sizeError);
    const reader = new FileReader();
    reader.onload = () => {
      setError(null);
      setPreview(String(reader.result));
      setStage("preview");
    };
    reader.readAsDataURL(file);
  };
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPreview(canvas.toDataURL("image/jpeg", 0.88));
    stopCamera();
    setStage("preview");
  };
  const confirmCapture = () => {
    if (!preview) return;
    if (mode === "compatibility") {
      setPairCaptures((current) => ({ ...current, [pairPerson]: preview }));
    } else {
      setCaptures((current) => ({ ...current, [side]: preview }));
    }
    setStage("complete");
  };
  const analyze = async (tier: Tier) => {
    const images =
      mode === "compatibility"
        ? Object.entries(pairCaptures)
            .filter(([, value]) => value)
            .map(([person, imageBase64]) => ({
              person,
              side: "right",
              imageBase64,
            }))
        : Object.entries(captures)
            .filter(([, value]) => value)
            .map(([hand, imageBase64]) => ({
              person: "me",
              side: hand,
              imageBase64,
            }));
    if (!images.length || (mode === "compatibility" && images.length < 2))
      return;
    setPaymentOpen(false);
    setError(null);
    setStage("analyzing");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images, tier, mode, language: i18n.language }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(ui.analysisError);
      if (tier === "free") setFree(data.result);
      else setPremium(data.result);
      setStage("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : ui.analysisError);
      setStage(free ? "result" : "complete");
    }
  };
  return (
    <Layout showAd>
      <SeoHead
        title={ui.seoTitle}
        description={ui.seoDescription}
        path="/palm-reading/"
      />
      <main className="mx-auto w-full max-w-xl pb-8">
        <section className="relative mb-6 overflow-hidden rounded-[1.75rem] border border-amber-200/80 bg-gradient-to-br from-[#fff8e6] via-[#fffdf7] to-[#fcecff] px-5 py-7 text-center shadow-lg shadow-primary/10">
          <span className="pointer-events-none absolute left-3 top-2 text-2xl text-amber-400/70">
            ✦
          </span>
          <span className="pointer-events-none absolute right-4 top-5 text-xl text-fuchsia-300/80">
            ✧
          </span>
          <span className="pointer-events-none absolute bottom-3 left-8 text-lg text-violet-300/70">
            ✦
          </span>
          <span className="pointer-events-none absolute bottom-2 right-8 text-2xl text-amber-300/70">
            ◇
          </span>
          <div className="relative mx-auto max-w-md">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-700/80">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {mode === "compatibility" ? (
                <>
                  <span className="block text-slate-800">{modeCopy.pair}</span>
                  <span className="mt-1 block bg-gradient-to-r from-amber-600 via-orange-500 to-fuchsia-500 bg-clip-text text-4xl font-black text-transparent drop-shadow-sm sm:text-5xl">
                    ♥
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-slate-800">{hero.lead}</span>
                  <span className="mt-1 block bg-gradient-to-r from-amber-600 via-orange-500 to-fuchsia-500 bg-clip-text text-4xl font-black text-transparent drop-shadow-sm sm:text-5xl">
                    {hero.title}
                  </span>
                </>
              )}
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-relaxed text-slate-600">
              {mode === "compatibility" ? modeCopy.pairDesc : hero.subtitle}
              <br />
              <span className="font-normal text-slate-500">
                {mode === "compatibility"
                  ? modeCopy.pairInstruction
                  : hero.instruction}
              </span>
            </p>
            <div className="mx-auto mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md">
              ✦ {hero.badge} ✦
            </div>
          </div>
        </section>
        {stage !== "result" && (
          <section className="mb-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setMode("solo");
                setStage("guide");
                setPreview(null);
                setError(null);
                setFree(null);
                setPremium(null);
              }}
              className={`rounded-2xl border p-4 text-left transition ${mode === "solo" ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card"}`}
            >
              <span className="block font-bold">{modeCopy.solo}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {modeCopy.soloDesc}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("compatibility");
                setPairPerson("me");
                setStage("guide");
                setPreview(null);
                setError(null);
                setFree(null);
                setPremium(null);
              }}
              className={`rounded-2xl border p-4 text-left transition ${mode === "compatibility" ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card"}`}
            >
              <span className="block font-bold">{modeCopy.pair}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {modeCopy.pairDesc}
              </span>
            </button>
          </section>
        )}
        {stage === "result" && free ? (
          <ResultView
            images={
              mode === "solo"
                ? captures
                : { right: pairCaptures.me, left: pairCaptures.partner }
            }
            free={free}
            premium={premium}
            onPremium={() => setPaymentOpen(true)}
          />
        ) : stage === "analyzing" ? (
          <section className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <h2 className="mt-4 font-bold">{ui.analyzing}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {ui.analyzingIntro}
            </p>
          </section>
        ) : (
          <>
            <div className="mb-4 flex gap-2 rounded-2xl bg-muted/60 p-1">
              {(mode === "solo"
                ? (["right", "left"] as HandSide[])
                : (["me", "partner"] as PairPerson[])
              ).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (mode === "solo") setSide(item as HandSide);
                    else setPairPerson(item as PairPerson);
                    setStage("guide");
                    setPreview(null);
                    setError(null);
                  }}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold ${(mode === "solo" ? side === item : pairPerson === item) ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {mode === "solo"
                    ? handLabel(item as HandSide, ui)
                    : item === "me"
                      ? modeCopy.me
                      : modeCopy.partner}{" "}
                  {(mode === "solo"
                    ? captures[item as HandSide]
                    : pairCaptures[item as PairPerson]) && (
                    <Check className="ml-1 inline h-4 w-4 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
            {stage === "guide" && (
              <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-muted/40">
                  <div className="absolute inset-7 rounded-[38%] border-2 border-dashed border-primary/50" />
                  <div className="relative flex flex-col items-center gap-3 text-center text-muted-foreground">
                    <Hand
                      className={`h-28 w-28 text-primary/70 ${side === "right" ? "-scale-x-100" : ""}`}
                      strokeWidth={1.2}
                    />
                    <p className="text-sm font-semibold">
                      {mode === "compatibility"
                        ? `${pairPerson === "me" ? modeCopy.me : modeCopy.partner} ${modeCopy.pairGuide}`
                        : `${handLabel(side, ui)} ${ui.guide}`}
                    </p>
                    <p className="text-xs">
                      {mode === "compatibility"
                        ? modeCopy.pairInstruction
                        : ui.bright}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setStage("camera");
                    }}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    <Camera className="h-5 w-5" /> {ui.camera}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold"
                  >
                    <Upload className="h-5 w-5" /> {ui.choosePhoto}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(event) =>
                      event.target.files?.[0] && readFile(event.target.files[0])
                    }
                  />
                </div>
              </section>
            )}
            {stage === "camera" && (
              <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="relative overflow-hidden rounded-2xl bg-black">
                  <video
                    ref={videoRef}
                    className="aspect-square w-full object-cover"
                    playsInline
                    muted
                  />
                  <div className="pointer-events-none absolute inset-[9%] rounded-[38%] border-2 border-dashed border-white/80" />
                  <p className="absolute bottom-3 left-0 right-0 text-center text-xs font-semibold text-white">
                    {ui.fitHand}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground"
                >
                  <Camera className="h-5 w-5" /> {ui.takePhoto}
                </button>
              </section>
            )}
            {stage === "preview" && preview && (
              <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <img
                  src={preview}
                  alt={`${handLabel(side, ui)} palm preview`}
                  className="aspect-square w-full rounded-2xl bg-muted object-contain"
                />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setStage("guide");
                    }}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border font-semibold"
                  >
                    <RotateCcw className="h-5 w-5" /> {ui.retake}
                  </button>
                  <button
                    type="button"
                    onClick={confirmCapture}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground"
                  >
                    <Check className="h-5 w-5" /> {ui.usePhoto}
                  </button>
                </div>
              </section>
            )}
            {stage === "complete" && (
              <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
                <Check className="mx-auto h-8 w-8 text-emerald-600" />
                <h2 className="mt-2 font-bold">
                  {mode === "compatibility"
                    ? `${pairPerson === "me" ? modeCopy.me : modeCopy.partner} ${ui.completed}`
                    : `${handLabel(side, ui)} ${ui.completed}`}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {ui.moreHand}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (mode === "compatibility") {
                        setPairPerson(pairPerson === "me" ? "partner" : "me");
                      } else {
                        setSide(side === "right" ? "left" : "right");
                      }
                      setPreview(null);
                      setStage("guide");
                    }}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background font-semibold"
                  >
                    <ImagePlus className="h-5 w-5" />{" "}
                    {mode === "compatibility"
                      ? pairPerson === "me"
                        ? modeCopy.partner
                        : modeCopy.me
                      : ui.otherHand}
                  </button>
                  <button
                    type="button"
                    onClick={() => analyze("free")}
                    disabled={
                      mode === "compatibility" &&
                      !(pairCaptures.me && pairCaptures.partner)
                    }
                    className="h-11 rounded-xl bg-primary font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {ui.startFree}
                  </button>
                </div>
              </section>
            )}
          </>
        )}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive"
          >
            {error}
          </p>
        )}
        <div className="mt-5 rounded-2xl bg-muted/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {ui.privacy}
        </div>
        <Link
          href="/gwansang/"
          className="mt-5 block text-center text-sm text-muted-foreground underline underline-offset-4"
        >
          {ui.backFace}
        </Link>
        <canvas ref={canvasRef} className="hidden" />
      </main>
      {paymentOpen && (
        <PaymentSheet
          onClose={() => setPaymentOpen(false)}
          onUnlock={() => analyze("premium")}
        />
      )}
    </Layout>
  );
}
