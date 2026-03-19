import { Link } from "wouter";
import { Clock, ChevronRight } from "lucide-react";
import { Test } from "@/data/tests";
import { useTranslation } from "react-i18next";
import { useLocalizedTest } from "@/hooks/useLocalizedTest";

interface TestCardProps {
  test: Test;
}

const CATEGORY_THEME: Record<string, { card: string; badge: string; catKey: string }> = {
  '연애 테스트': {
    card: 'bg-gradient-to-br from-pink-50 to-rose-50/60 dark:from-pink-950/25 dark:to-rose-950/10 border-pink-100/80 dark:border-pink-900/30',
    badge: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
    catKey: 'catLove',
  },
  '성격 테스트': {
    card: 'bg-gradient-to-br from-indigo-50 to-blue-50/60 dark:from-indigo-950/25 dark:to-blue-950/10 border-indigo-100/80 dark:border-indigo-900/30',
    badge: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
    catKey: 'catPersonality',
  },
  '재미 테스트': {
    card: 'bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-amber-950/25 dark:to-amber-950/10 border-amber-100/80 dark:border-amber-900/30',
    badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    catKey: 'catFun',
  },
  'MBTI': {
    card: 'bg-gradient-to-br from-violet-50 to-purple-50/60 dark:from-violet-950/25 dark:to-purple-950/10 border-violet-100/80 dark:border-violet-900/30',
    badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    catKey: 'catMbti',
  },
  '운세': {
    card: 'bg-gradient-to-br from-yellow-50 to-amber-50/60 dark:from-yellow-950/25 dark:to-amber-950/10 border-yellow-100/80 dark:border-yellow-900/30',
    badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
    catKey: 'catFortune',
  },
};

const CAT_EMOJI: Record<string, string> = {
  '연애 테스트': '💕',
  '성격 테스트': '🧠',
  '재미 테스트': '⚡',
  'MBTI': '🔬',
  '운세': '🔮',
};

const PARTICIPANT_COUNTS: Record<string, { ko: string; ja: string; default: string }> = {
  'love-style-test': { ko: '2.3만', ja: '2.3万', default: '23K' },
  'attachment-style-test': { ko: '1.8만', ja: '1.8万', default: '18K' },
  'hidden-personality-test': { ko: '3.1만', ja: '3.1万', default: '31K' },
  'over-immersion-test': { ko: '1.4만', ja: '1.4万', default: '14K' },
  'how-friends-see-me-test': { ko: '2.7만', ja: '2.7万', default: '27K' },
  'intuition-vs-logic-test': { ko: '1.9만', ja: '1.9万', default: '19K' },
};

interface CardBodyProps {
  test: Test;
  theme: (typeof CATEGORY_THEME)[string] | undefined;
  catLabel: string;
  count: string | undefined;
  title: string;
  description: string;
  estimatedTime: string;
  startLabel: string;
}

function CardBody({ test, theme, catLabel, count, title, description, estimatedTime, startLabel }: CardBodyProps) {
  const { t } = useTranslation();
  return (
    <div className={`h-full rounded-[1.5rem] p-5 md:p-6 flex flex-col border transition-all duration-250 ease-out hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/8 ${theme?.card ?? 'bg-card border-border/50'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 shadow-sm flex items-center justify-center text-[1.8rem] group-hover:scale-110 transition-transform duration-250 shrink-0">
          {test.emoji}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${theme?.badge ?? 'bg-muted text-muted-foreground'}`}>
          {catLabel}
        </span>
      </div>

      <h3 className="text-base md:text-[1.05rem] font-bold text-foreground mb-1 line-clamp-2 leading-snug">
        {title}
      </h3>

      {count && (
        <p className="text-[11px] text-muted-foreground/65 mb-2 font-medium">
          👥 {count} {t('card.participants')}
        </p>
      )}

      <p className="text-muted-foreground text-[0.8rem] flex-grow line-clamp-2 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06] mt-auto">
        <div className="flex items-center text-[11px] text-muted-foreground font-medium gap-1">
          <Clock className="w-3 h-3 opacity-60" />
          {estimatedTime}
        </div>
        <div className="flex items-center text-[0.8rem] font-bold text-primary group-hover:translate-x-1 transition-transform duration-200">
          {startLabel} <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
}

export function TestCard({ test }: TestCardProps) {
  const { t, i18n } = useTranslation();
  const localTest = useLocalizedTest(test.slug);
  const theme = CATEGORY_THEME[test.category];
  const lang = i18n.language.split('-')[0];
  const countEntry = PARTICIPANT_COUNTS[test.slug];
  const count = countEntry ? (countEntry[lang as 'ko' | 'ja'] ?? countEntry.default) : undefined;
  const catKey = theme?.catKey || '';
  const catLabel = catKey ? `${CAT_EMOJI[test.category] || ''} ${t(`common.${catKey}`)}` : test.category;

  const title = localTest?.title ?? test.title;
  const description = localTest?.description ?? test.description;
  const estimatedTime = localTest?.estimatedTime ?? test.estimatedTime;
  const startLabel = t('card.start');

  const bodyProps: CardBodyProps = { test, theme, catLabel, count, title, description, estimatedTime, startLabel };

  if (test.externalUrl) {
    return (
      <a href={test.externalUrl} className="block h-full outline-none group">
        <CardBody {...bodyProps} />
      </a>
    );
  }

  return (
    <Link href={`/tests/${test.slug}`} className="block h-full outline-none group">
      <CardBody {...bodyProps} />
    </Link>
  );
}
