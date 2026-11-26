import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronDown, Sparkles, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GwansangAnalysisResult } from "@/pages/gwansang";
import { ResultShareButtons } from "@/components/ResultShareButtons";

interface ResultProps {
  result: GwansangAnalysisResult;
  image: string | null;
  onReset: () => void;
}

const PAGE_BG = "linear-gradient(175deg, #D4A96A 0%, #C49050 40%, #B8813A 100%)";

const TIER_COLORS: Record<string, string> = {
  황금룡: "#D4AF37", 청룡: "#00C8B4", 백호: "#B0B8C8", 주작: "#E05840", 현무: "#6040A0",
};
const TIER_NAMES: Record<string, Record<string, string>> = {
  en: { 황금룡: "Golden Dragon", 청룡: "Azure Dragon", 백호: "White Tiger", 주작: "Vermilion Bird", 현무: "Black Tortoise" },
  ja: { 황금룡: "黄金龍", 청룡: "青龍", 백호: "白虎", 주작: "朱雀", 현무: "玄武" },
  es: { 황금룡: "Dragón dorado", 청룡: "Dragón azul", 백호: "Tigre blanco", 주작: "Ave bermellón", 현무: "Tortuga negra" },
  "pt-BR": { 황금룡: "Dragão dourado", 청룡: "Dragão azul", 백호: "Tigre branco", 주작: "Pássaro vermilion", 현무: "Tartaruga negra" },
  fr: { 황금룡: "Dragon doré", 청룡: "Dragon azur", 백호: "Tigre blanc", 주작: "Oiseau vermillon", 현무: "Tortue noire" },
};

const API_BASE = "https://api.mytesttype.com";

type FaceResultCopy = {
  complete: string; impression: string; summary: string; wealth: string; relationship: string;
  history: string; keywords: string; activities: string; relationshipStyle: string; contrast: string;
  premium: string; premiumTitle: string; firstMeeting: string; relationshipCharm: string; workPresence: string;
  styleHint: string; sevenDay: string; fortune: string; advice: string; reset: string; unlockEyebrow: string;
  unlockTitle: string; unlockBody: string; openDetail: string; supportNote: string; toss: string; paypal: string;
  image: { aging: { action: string; loading: string; again: string }; baby: { action: string; loading: string; again: string }; anime: { action: string; loading: string; again: string } };
};

const FACE_RESULT_COPY: Record<string, FaceResultCopy> = {
  ko: { complete: "AI 관상 분석 완료", impression: "인상 유형", summary: "종합 총평", wealth: "재물 습관 미리보기", relationship: "관계 인상 상징", history: "역사 인물 분위기 매칭", keywords: "인상 키워드", activities: "활동 환경 아이디어", relationshipStyle: "관계 스타일 참고", contrast: "대조적인 인상형", premium: "개인 인상 상세 기록", premiumTitle: "첫인상, 연애, 일상에서의 내 이미지", firstMeeting: "첫 만남의 3초", relationshipCharm: "관계에서 보이는 매력", workPresence: "직장에서의 존재감", styleHint: "나를 살리는 스타일 힌트", sevenDay: "7일 자기표현 실험", fortune: "오늘의 참고 테마", advice: "오늘의 작은 행동", reset: "다시 분석하기", unlockEyebrow: "여기서부터는 더 깊은 해설", unlockTitle: "내 얼굴의 숨은 반전 포인트가 궁금하다면?", unlockBody: "재물 습관, 관계의 매력, 미래·애니메이션 이미지까지 이어서 확인할 수 있어요.", openDetail: "테스트로 상세 해설 열기", supportNote: "테스트 기간에는 후원 확인 없이 상세 결과를 열 수 있습니다.", toss: "Toss 후원 QR", paypal: "PayPal 후원 QR", image: { aging: { action: "20년 후의 나, 미리 상상해보기", loading: "미래의 모습을 상상하는 중…", again: "다른 미래의 모습 상상해보기" }, baby: { action: "따뜻한 아기 모습으로 만나보기", loading: "따뜻한 장면을 그리는 중…", again: "다른 아기 이미지 만나보기" }, anime: { action: "나를 애니 캐릭터로 변신시켜보기", loading: "나만의 캐릭터를 만드는 중…", again: "다른 캐릭터로 변신해보기" } } },
  en: { complete: "AI face reading complete", impression: "Impression type", summary: "Overall impression", wealth: "Money habit preview", relationship: "Relationship impression", history: "Historical mood match", keywords: "Impression keywords", activities: "Activity ideas", relationshipStyle: "Relationship style", contrast: "Contrasting impression", premium: "Personal impression record", premiumTitle: "Your image in first meetings, relationships and daily life", firstMeeting: "The first three seconds", relationshipCharm: "Your relationship charm", workPresence: "Your presence at work", styleHint: "Style hints that support you", sevenDay: "Seven-day self-expression experiment", fortune: "Today’s reflection theme", advice: "Today’s small action", reset: "Analyze again", unlockEyebrow: "Go deeper from here", unlockTitle: "Curious about the hidden twist in your impression?", unlockBody: "Continue to explore money habits, relationship charm and future or anime image ideas.", openDetail: "Open detailed reading (test)", supportNote: "During testing, detailed results open without support verification.", toss: "Toss support QR", paypal: "PayPal support QR", image: { aging: { action: "Imagine yourself 20 years from now", loading: "Imagining your future look…", again: "Imagine another future look" }, baby: { action: "Meet a warm baby version", loading: "Drawing a warm scene…", again: "Try another baby image" }, anime: { action: "Turn me into an anime character", loading: "Creating your character…", again: "Try another character" } } },
  ja: { complete: "AI観相分析が完了しました", impression: "印象タイプ", summary: "総合コメント", wealth: "お金の習慣プレビュー", relationship: "関係性の印象", history: "歴史人物の雰囲気マッチ", keywords: "印象キーワード", activities: "活動環境のアイデア", relationshipStyle: "関係スタイルの参考", contrast: "対照的な印象タイプ", premium: "個人印象の詳細記録", premiumTitle: "第一印象・恋愛・日常で見えるあなた", firstMeeting: "出会いの最初の3秒", relationshipCharm: "関係で見える魅力", workPresence: "仕事での存在感", styleHint: "自分を引き立てるスタイル", sevenDay: "7日間の自己表現実験", fortune: "今日の参考テーマ", advice: "今日の小さな行動", reset: "もう一度分析する", unlockEyebrow: "ここからさらに詳しく", unlockTitle: "顔の印象に隠れた意外なポイントは？", unlockBody: "お金の習慣、関係での魅力、未来やアニメのイメージまで見てみましょう。", openDetail: "詳細解説を開く（テスト）", supportNote: "テスト期間中は支援の確認なしで詳細結果を開けます。", toss: "Toss支援QR", paypal: "PayPal支援QR", image: { aging: { action: "20年後の自分を想像する", loading: "未来の姿を想像しています…", again: "別の未来の姿を想像する" }, baby: { action: "温かな赤ちゃんの姿を見る", loading: "温かな場面を描いています…", again: "別の赤ちゃん画像を見る" }, anime: { action: "アニメキャラクターに変身する", loading: "キャラクターを作っています…", again: "別のキャラクターに変身する" } } },
  es: { complete: "Lectura facial con IA completada", impression: "Tipo de impresión", summary: "Impresión general", wealth: "Vista previa de hábitos de dinero", relationship: "Impresión en las relaciones", history: "Parecido de ambiente histórico", keywords: "Palabras clave de impresión", activities: "Ideas de actividad", relationshipStyle: "Estilo de relación", contrast: "Impresión contrastante", premium: "Registro personal de impresión", premiumTitle: "Tu imagen en el primer encuentro, las relaciones y el día a día", firstMeeting: "Los primeros tres segundos", relationshipCharm: "Tu encanto en las relaciones", workPresence: "Tu presencia en el trabajo", styleHint: "Pistas de estilo que te favorecen", sevenDay: "Experimento de autoexpresión de 7 días", fortune: "Tema de reflexión de hoy", advice: "Pequeña acción de hoy", reset: "Analizar de nuevo", unlockEyebrow: "Descubre una lectura más profunda", unlockTitle: "¿Te intriga el giro oculto de tu impresión?", unlockBody: "Explora tus hábitos de dinero, tu encanto en las relaciones e ideas de imágenes futuras o de anime.", openDetail: "Abrir lectura detallada (prueba)", supportNote: "Durante la prueba, el resultado detallado se abre sin verificar apoyo.", toss: "QR de apoyo Toss", paypal: "QR de apoyo PayPal", image: { aging: { action: "Imagina tu aspecto dentro de 20 años", loading: "Imaginando tu futuro…", again: "Imaginar otro futuro" }, baby: { action: "Conoce una versión de bebé cálida", loading: "Dibujando una escena cálida…", again: "Probar otra imagen de bebé" }, anime: { action: "Convertirme en personaje de anime", loading: "Creando tu personaje…", again: "Probar otro personaje" } } },
  "pt-BR": { complete: "Leitura facial com IA concluída", impression: "Tipo de impressão", summary: "Impressão geral", wealth: "Prévia dos hábitos financeiros", relationship: "Impressão nos relacionamentos", history: "Clima de personagem histórico", keywords: "Palavras-chave da impressão", activities: "Ideias de atividades", relationshipStyle: "Referência de estilo de relacionamento", contrast: "Impressão contrastante", premium: "Registro pessoal da impressão", premiumTitle: "Sua imagem no primeiro encontro, nos relacionamentos e no dia a dia", firstMeeting: "Os primeiros três segundos", relationshipCharm: "Seu charme nos relacionamentos", workPresence: "Sua presença no trabalho", styleHint: "Dicas de estilo que valorizam você", sevenDay: "Experimento de autoexpressão de 7 dias", fortune: "Tema de reflexão de hoje", advice: "Pequena ação de hoje", reset: "Analisar novamente", unlockEyebrow: "Aprofunde sua leitura", unlockTitle: "Curioso sobre o ponto surpreendente da sua impressão?", unlockBody: "Veja hábitos financeiros, charme nos relacionamentos e ideias de imagens futuras ou de anime.", openDetail: "Abrir leitura detalhada (teste)", supportNote: "Durante o teste, o resultado detalhado abre sem confirmação de apoio.", toss: "QR de apoio Toss", paypal: "QR de apoio PayPal", image: { aging: { action: "Imagine você daqui a 20 anos", loading: "Imaginando seu futuro…", again: "Imaginar outro futuro" }, baby: { action: "Conheça uma versão bebê acolhedora", loading: "Desenhando uma cena acolhedora…", again: "Tentar outra imagem de bebê" }, anime: { action: "Transforme-me em personagem de anime", loading: "Criando seu personagem…", again: "Tentar outro personagem" } } },
  fr: { complete: "Lecture du visage par IA terminée", impression: "Type d’impression", summary: "Impression générale", wealth: "Aperçu des habitudes financières", relationship: "Impression relationnelle", history: "Ambiance d’un personnage historique", keywords: "Mots-clés de l’impression", activities: "Idées d’activités", relationshipStyle: "Style relationnel", contrast: "Impression contrastée", premium: "Dossier personnel d’impression", premiumTitle: "Votre image au premier contact, dans les relations et au quotidien", firstMeeting: "Les trois premières secondes", relationshipCharm: "Votre charme relationnel", workPresence: "Votre présence au travail", styleHint: "Conseils de style qui vous mettent en valeur", sevenDay: "Expérience d’expression personnelle sur 7 jours", fortune: "Thème de réflexion du jour", advice: "Petite action du jour", reset: "Analyser à nouveau", unlockEyebrow: "Approfondissez votre lecture", unlockTitle: "Curieux de découvrir le détail surprenant de votre impression ?", unlockBody: "Explorez vos habitudes financières, votre charme relationnel et des idées d’images futures ou animées.", openDetail: "Ouvrir la lecture détaillée (test)", supportNote: "Pendant le test, le résultat détaillé s’ouvre sans vérification de soutien.", toss: "QR de soutien Toss", paypal: "QR de soutien PayPal", image: { aging: { action: "Imaginez-vous dans 20 ans", loading: "Imagination de votre futur…", again: "Imaginer un autre futur" }, baby: { action: "Découvrez une version bébé chaleureuse", loading: "Création d’une scène chaleureuse…", again: "Voir une autre image bébé" }, anime: { action: "Transformez-moi en personnage animé", loading: "Création de votre personnage…", again: "Essayer un autre personnage" } } },
};

function getFaceResultCopy(language: string): FaceResultCopy {
  return FACE_RESULT_COPY[language] ?? FACE_RESULT_COPY[language.split("-")[0]] ?? FACE_RESULT_COPY.en;
}
function getTierName(tier: string, language: string) {
  const map = TIER_NAMES[language] ?? TIER_NAMES[language.split("-")[0]];
  return map?.[tier] ?? tier;
}

function SectionCard({ icon, title, children, delay = 0, accent = "hsl(15,65%,28%)" }: {
  icon: string; title: string; children: React.ReactNode; delay?: number; accent?: string;
}) {
  return (
    <motion.div className="p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <span style={{ fontSize: 14 }}>{icon}</span>
        <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: accent }}>{title}</p>
      </div>
      {children}
    </motion.div>
  );
}

function SupportUnlockCard({ onUnlock, copy }: { onUnlock: () => void; copy: FaceResultCopy }) {
  return (
    <motion.div
      className="my-4 p-5 text-center"
      style={{ background: "rgba(255,235,185,0.62)", border: "1px solid rgba(140,90,20,0.30)", boxShadow: "4px 4px 0 rgba(104,59,32,.12)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>{copy.unlockEyebrow}</p>
      <h3 className="mt-1 text-lg font-black" style={{ color: "hsl(25,50%,18%)" }}>{copy.unlockTitle}</h3>
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "hsl(25,35%,32%)" }}>
        {copy.unlockBody}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
        <a href="https://mytesttype.com/k-shaman/toss_qr.jpg" target="_blank" rel="noreferrer" className="border border-[#8e5a38]/35 bg-[#f9e5b5] px-3 py-2 font-semibold text-[#4a2517]">{copy.toss}</a>
        <a href="https://mytesttype.com/k-shaman/paypal_qr.jpg" target="_blank" rel="noreferrer" className="border border-[#8e5a38]/35 bg-[#f9e5b5] px-3 py-2 font-semibold text-[#4a2517]">{copy.paypal}</a>
      </div>
      <button type="button" onClick={onUnlock} className="mt-4 h-11 border border-[#4a2517] bg-[#3b1d17] px-5 text-sm font-bold text-[#fff0c8] shadow-[3px_3px_0_#9b5a3b]">{copy.openDetail}</button>
      <p className="mt-2 text-[10px] text-[#705244]">{copy.supportNote}</p>
    </motion.div>
  );
}

function AccordionCard({ icon, title, children, delay = 0, accent = "hsl(15,65%,28%)" }: {
  icon: string; title: string; children: React.ReactNode; delay?: number; accent?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="overflow-hidden" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <button className="w-full flex items-center justify-between px-4 py-3.5" onClick={() => setOpen((o) => !o)}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 14 }}>{icon}</span>
          <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: accent }}>{title}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} style={{ color: accent }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaceImageCard({
  icon, title, description, accent, delay, uploadedImage, type, copy, language,
}: {
  icon: string; title: string; description: string; accent: string;
  delay: number; uploadedImage: string | null; type: "aging" | "baby" | "anime"; copy: FaceResultCopy; language: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imageCopy = copy.image[type];

  const generate = useCallback(async () => {
    if (!uploadedImage) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/generate-face-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: uploadedImage, type, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "생성 실패");
      setGeneratedImage(data.imageBase64);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [uploadedImage, type, language]);

  return (
    <motion.div className="overflow-hidden"
      style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <button className="w-full flex items-center justify-between px-4 py-3.5" onClick={() => setOpen((o) => !o)}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 14 }}>{icon}</span>
          <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: accent }}>{title}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} style={{ color: accent }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-4 pb-4 space-y-3">
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{description}</p>
              {!generatedImage ? (
                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-[14px] font-black transition-all active:scale-[0.97]"
                  style={{
                    background: loading
                      ? "linear-gradient(135deg, #8B5E3C, #6B3E1E)"
                      : "linear-gradient(135deg, #C47C2A, #9B4F0F)",
                    color: "#FFF5E0",
                    boxShadow: loading ? "none" : "0 3px 12px rgba(140,70,10,0.45)",
                    opacity: loading ? 0.75 : 1,
                    border: "none",
                  }}>
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> {imageCopy.loading} (30s)</>
                  ) : (
                    <><Sparkles size={15} /> ✦ {imageCopy.action}</>
                  )}
                </button>
              ) : (
                <div className="space-y-2">
                  <motion.img
                    src={generatedImage}
                    alt={title}
                    className="w-full rounded-xl object-cover"
                    style={{ maxHeight: 320, border: `1.5px solid ${accent}33` }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <button
                    onClick={() => { setGeneratedImage(null); }}
                    className="w-full h-9 rounded-xl text-[12px] font-semibold"
                    style={{ background: "rgba(100,55,10,0.1)", color: "hsl(25,40%,38%)" }}>
                    {imageCopy.again}
                  </button>
                </div>
              )}
              {error && <p className="text-[12px] text-center" style={{ color: "hsl(0,60%,40%)" }}>{error}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function GwansangResult({ result, image, onReset }: ResultProps) {
  const { i18n } = useTranslation();
  const copy = getFaceResultCopy(i18n.language);
  const tierName = result.dragonface?.tier ? getTierName(result.dragonface.tier, i18n.language) : "";
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const tierColor = result.dragonface?.tier ? (TIER_COLORS[result.dragonface.tier] ?? "hsl(15,65%,28%)") : "hsl(15,65%,28%)";

  return (
    <div className="pb-12" style={{ background: PAGE_BG }}>

      <div className="relative px-5 pt-8 pb-4 flex flex-col items-center">
        {image && (
          <motion.div className="w-20 h-20 rounded-full overflow-hidden mb-3"
            style={{ border: "2.5px solid rgba(140,70,15,0.5)", boxShadow: "0 4px 16px rgba(60,20,5,0.3)" }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}>
            <img src={image} alt="face" className="w-full h-full object-cover" />
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-center">
          <img
            src={`${import.meta.env.BASE_URL}gwansang.png`}
            alt="관상"
            className="h-8 w-auto object-contain mx-auto mb-1"
            style={{ filter: "drop-shadow(1px 1px 3px rgba(60,25,5,0.3))" }}
          />
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(15,60%,30%)" }}>{copy.complete}</p>
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">

        {result.dragonface && (
          <motion.div className="p-5 mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ background: "linear-gradient(135deg, rgba(140,65,15,0.15), rgba(100,45,10,0.12))", border: `1.5px solid ${tierColor}44` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 18 }}>🐉</span>
                <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>{copy.impression}</p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-black" style={{ background: `${tierColor}22`, color: tierColor, border: `1px solid ${tierColor}66` }}>
                {tierName}
              </div>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,45%,22%)" }}>{result.dragonface.reading}</p>
          </motion.div>
        )}

        <div className="mb-4">
          <SectionCard icon="◎" title={copy.summary} delay={0.24} accent="hsl(15,60%,30%)">
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,50%,18%)" }}>{result.summary}</p>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">

          {result.wealth && (
            <motion.div className="p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-1 mb-0.5">
                <span style={{ fontSize: 13 }}>💰</span>
                <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>💰 {copy.wealth}</p>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(25,45%,25%)" }}>{result.wealth.reading}</p>
            </motion.div>
          )}

          {result.love && (
            <motion.div className="p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}>
              <div className="flex items-center gap-1 mb-0.5">
                <span style={{ fontSize: 13 }}>💕</span>
                <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "hsl(350,60%,32%)" }}>{copy.relationship}</p>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(25,45%,25%)" }}>{result.love.reading}</p>
            </motion.div>
          )}

          {result.eyes && (
            <motion.div className="p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.37 }}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(15,65%,30%)", fontSize: 13 }}>◈</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,65%,30%)" }}>{result.eyes.title}</span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,25%)" }}>{result.eyes.reading}</p>
            </motion.div>
          )}

          {result.nose && (
            <motion.div className="p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(25,60%,32%)", fontSize: 13 }}>◇</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(25,60%,32%)" }}>{result.nose.title}</span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,25%)" }}>{result.nose.reading}</p>
            </motion.div>
          )}

          {result.mouth && (
            <motion.div className="p-4" style={{ background: "rgba(255,235,185,0.5)", border: "1px solid rgba(140,90,20,0.22)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.43 }}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(5,62%,32%)", fontSize: 13 }}>◉</span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(5,62%,32%)" }}>{result.mouth.title}</span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,25%)" }}>{result.mouth.reading}</p>
            </motion.div>
          )}

          {premiumUnlocked && result.historical && (
            <SectionCard icon="🏛️" title={copy.history} delay={0.55} accent="hsl(25,55%,28%)">
              <div className="mb-2">
                <p className="text-base font-black" style={{ color: "hsl(25,60%,14%)" }}>{result.historical.person}</p>
              </div>
              <p className="text-[11px] mb-2" style={{ color: "hsl(25,35%,42%)" }}>{result.historical.era}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,45%,22%)" }}>{result.historical.reading}</p>
            </SectionCard>
          )}

          {premiumUnlocked && result.personality && (
            <SectionCard icon="🔮" title={copy.keywords} delay={0.6} accent="hsl(260,45%,38%)">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-sm font-black" style={{ color: "hsl(260,45%,30%)" }}>{result.personality.type}</p>
                {result.personality.traits?.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: "rgba(100,60,180,0.12)", color: "hsl(260,45%,35%)" }}>{t}</span>
                ))}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{result.personality.reading}</p>
            </SectionCard>
          )}

          {premiumUnlocked && result.career && (
            <SectionCard icon="💼" title={copy.activities} delay={0.64} accent="hsl(200,55%,28%)">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {result.career.jobs?.map((job) => (
                  <span key={job} className="px-3 py-1 rounded-full text-[12px] font-semibold"
                    style={{ background: "rgba(0,100,140,0.1)", color: "hsl(200,55%,28%)", border: "1px solid rgba(0,100,140,0.2)" }}>
                    {job}
                  </span>
                ))}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{result.career.reading}</p>
            </SectionCard>
          )}

          {premiumUnlocked && result.compatibility && (
            <AccordionCard icon="🤝" title={copy.relationshipStyle} delay={0.68} accent="hsl(140,45%,28%)">
              <p className="text-sm font-bold mb-1.5" style={{ color: "hsl(140,45%,25%)" }}>{copy.contrast}: {result.compatibility.best}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,40%,22%)" }}>{result.compatibility.reading}</p>
            </AccordionCard>
          )}

          {premiumUnlocked && result.aging && (
            <FaceImageCard
              icon="⏳" title={copy.image.aging.action} type="aging"
              description={`${result.aging.decade} — ${result.aging.reading}`}
              accent="hsl(35,55%,28%)" delay={0.72} uploadedImage={image} copy={copy} language={i18n.language}
            />
          )}

          {premiumUnlocked && result.baby && (
            <FaceImageCard
              icon="👶" title={copy.image.baby.action} type="baby"
              description={result.baby.reading}
              accent="hsl(350,50%,32%)" delay={0.75} uploadedImage={image} copy={copy} language={i18n.language}
            />
          )}

          {premiumUnlocked && result.anime && (
            <FaceImageCard
              icon="✨" title={copy.image.anime.action} type="anime"
              description={`${result.anime.character} — ${result.anime.reading}`}
              accent="hsl(280,45%,35%)" delay={0.78} uploadedImage={image} copy={copy} language={i18n.language}
            />
          )}
        </div>

        {!premiumUnlocked && <SupportUnlockCard onUnlock={() => setPremiumUnlocked(true)} copy={copy} />}

        {premiumUnlocked && (
          <div className="mb-4">
            <p className="text-[11px] font-bold tracking-[.16em] text-[#7e3c2a]">{copy.premium}</p>
            <h2 className="mt-1 font-serif text-xl font-bold text-[#3f281d]">{copy.premiumTitle}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <FacePremiumCard title={copy.firstMeeting} text={result.premium?.firstMeeting ?? result.personality?.reading ?? result.eyes?.reading ?? result.summary} />
              <FacePremiumCard title={copy.relationshipCharm} text={result.premium?.relationshipRhythm ?? result.compatibility?.reading ?? result.mouth?.reading ?? "Relationship report is being prepared."} />
              <FacePremiumCard title={copy.workPresence} text={result.premium?.workPresence ?? result.career?.reading ?? result.historical?.reading ?? "Activity report is being prepared."} />
            </div>
            {result.premium && <div className="mt-3 grid gap-3 md:grid-cols-2">
              <FacePremiumCard title={copy.styleHint} text={result.premium.styleDirection} />
              <FacePremiumCard title={copy.sevenDay} text={result.premium.sevenDayPrompt} />
            </div>}
            <p className="mt-4 text-sm leading-6 text-[#604133]">사진에서 느껴지는 인상과 전통 관상 문화의 상징을 가볍게 연결한 개인화 결과입니다.</p>
          </div>
        )}

        {result.fortune && (
          <div className="mb-3">
            <SectionCard icon="🌟" title={copy.fortune} delay={0.82} accent="hsl(15,60%,30%)">
              <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,45%,22%)" }}>{result.fortune.reading}</p>
            </SectionCard>
          </div>
        )}

        {result.advice && (
          <motion.div className="p-5 mb-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86 }}
            style={{ background: "linear-gradient(135deg, rgba(140,65,15,0.15), rgba(100,45,10,0.1))", border: "1px solid rgba(140,65,15,0.25)" }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ color: "hsl(15,65%,30%)", fontSize: 12 }}>✦</span>
              <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(15,60%,30%)" }}>{copy.advice}</p>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "hsl(25,50%,18%)" }}>{result.advice}</p>
          </motion.div>
        )}

        <div className="mb-4">
          <ResultShareButtons
            lang={i18n.language}
            title={result.dragonface?.tier ? `${copy.impression}: ${tierName}` : copy.complete}
            url="https://mytesttype.com/gwansang/"
            summary={result.summary}
            image={image}
            service="face"
            variant="paper"
          />
        </div>

        <motion.button
          onClick={onReset}
          className="w-full h-[50px] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          style={{ background: "rgba(100,55,10,0.14)", border: "1px solid rgba(140,90,20,0.3)", color: "hsl(25,40%,32%)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.97 }}>
          <RotateCcw size={15} />
          {copy.reset}
        </motion.button>
      </div>
    </div>
  );
}

function FacePremiumCard({ title, text }: { title: string; text: string }) {
  return <article className="border border-[#8e5a38]/20 bg-[#fff0c8]/70 p-4"><h3 className="text-sm font-bold text-[#7e3c2a]">{title}</h3><p className="mt-2 text-xs leading-6 text-[#604133]">{text}</p></article>;
}
