import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { MBTI_SEO, ALL_MBTI_TYPES, type MbtiType } from "@/data/mbti-seo";

interface Props {
  mbtiType: string;
}

const SECTION_LABELS: Record<string, Record<string, string>> = {
  ko: {
    traits: "성격 특징",
    strengths: "장점",
    weaknesses: "단점",
    relationships: "연애 스타일",
    careers: "직업 추천",
    compatibility: "궁합",
    explore: "다른 MBTI 유형 탐색하기",
    exploreDesc: "나와 다른 유형은 어떤 성격일까? 16가지 유형을 모두 알아보세요.",
  },
  en: {
    traits: "Personality Traits",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    relationships: "Relationship Style",
    careers: "Career Recommendations",
    compatibility: "Compatibility",
    explore: "Explore Other MBTI Types",
    exploreDesc: "Curious about other personality types? Discover all 16 MBTI types.",
  },
  ja: {
    traits: "性格の特徴",
    strengths: "長所",
    weaknesses: "短所",
    relationships: "恋愛スタイル",
    careers: "おすすめの職業",
    compatibility: "相性",
    explore: "他のMBTIタイプを探る",
    exploreDesc: "他のタイプはどんな性格？16タイプすべてを見てみましょう。",
  },
  es: {
    traits: "Rasgos de Personalidad",
    strengths: "Fortalezas",
    weaknesses: "Debilidades",
    relationships: "Estilo en las Relaciones",
    careers: "Carreras Recomendadas",
    compatibility: "Compatibilidad",
    explore: "Explorar Otros Tipos MBTI",
    exploreDesc: "¿Curioso por otros tipos de personalidad? Descubre los 16 tipos MBTI.",
  },
  pt: {
    traits: "Traços de Personalidade",
    strengths: "Pontos Fortes",
    weaknesses: "Pontos Fracos",
    relationships: "Estilo nos Relacionamentos",
    careers: "Carreiras Recomendadas",
    compatibility: "Compatibilidade",
    explore: "Explorar Outros Tipos MBTI",
    exploreDesc: "Curioso sobre outros tipos de personalidade? Descubra todos os 16 tipos MBTI.",
  },
};

const SECTION_ICONS: Record<string, string> = {
  traits: "🧠",
  strengths: "✨",
  weaknesses: "⚡",
  relationships: "💕",
  careers: "💼",
  compatibility: "🤝",
};

export function MbtiSeoContent({ mbtiType }: Props) {
  const { i18n } = useTranslation();
  const rawLang = i18n.language?.split("-")[0] ?? "ko";
  const lang = ["ko", "en", "ja", "es", "pt"].includes(rawLang) ? rawLang : "ko";

  const content = MBTI_SEO[lang]?.[mbtiType];
  const labels = SECTION_LABELS[lang] ?? SECTION_LABELS.en;

  if (!content) return null;

  const sections = [
    { key: "traits", label: `${mbtiType} ${labels.traits}` },
    { key: "strengths", label: `${mbtiType} ${labels.strengths}` },
    { key: "weaknesses", label: `${mbtiType} ${labels.weaknesses}` },
    { key: "relationships", label: `${mbtiType} ${labels.relationships}` },
    { key: "careers", label: `${mbtiType} ${labels.careers}` },
    { key: "compatibility", label: `${mbtiType} ${labels.compatibility}` },
  ] as const;

  const otherTypes = ALL_MBTI_TYPES.filter(t => t !== mbtiType);

  return (
    <section className="mt-10 space-y-6" aria-label={`${mbtiType} SEO Content`}>

      {/* ── Content sections ── */}
      {sections.map(({ key, label }) => (
        <div
          key={key}
          className="bg-card border border-border rounded-[1.5rem] p-6 shadow-sm"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xl leading-none">{SECTION_ICONS[key]}</span>
            <h2 className="text-lg font-bold text-foreground">{label}</h2>
          </div>
          <p className="text-[0.93rem] text-muted-foreground leading-relaxed break-keep">
            {content[key]}
          </p>
        </div>
      ))}

      {/* ── Internal links: all 16 types ── */}
      <div className="bg-card border border-border rounded-[1.5rem] p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-1">{labels.explore}</h2>
        <p className="text-xs text-muted-foreground mb-5">{labels.exploreDesc}</p>
        <div className="flex flex-wrap gap-2">
          {(ALL_MBTI_TYPES as readonly MbtiType[]).map(type => (
            <Link
              key={type}
              href={`/results/mbti-test?result=${type}`}
              className={`
                px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition-colors
                ${type === mbtiType
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:bg-primary/10 hover:border-primary/40"
                }
              `}
            >
              {type}
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
