import { Link } from "wouter";
import { Clock, ChevronRight } from "lucide-react";
import { Test } from "@/data/tests";
import { useTranslation } from "react-i18next";
import { useLocalizedTest } from "@/hooks/useLocalizedTest";

interface TestCardProps {
  test: Test;
}

const CATEGORY_THEME: Record<string, {
  border: string;
  gradient: string;
  badge: string;
  btn: string;
  accent: string;
  iconBg: string;
  catKey: string;
}> = {
  '연애 테스트': {
    border: 'border-pink-400/40 dark:border-pink-500/50',
    gradient: 'from-pink-500/10 to-rose-400/5 dark:from-pink-600/20 dark:to-rose-500/5',
    badge: 'bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30',
    btn: 'from-pink-500 to-rose-500',
    accent: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-50 dark:bg-pink-500/20',
    catKey: 'catLove',
  },
  '성격 테스트': {
    border: 'border-indigo-400/40 dark:border-indigo-500/50',
    gradient: 'from-indigo-500/10 to-blue-400/5 dark:from-indigo-600/20 dark:to-blue-500/5',
    badge: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30',
    btn: 'from-indigo-500 to-blue-500',
    accent: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/20',
    catKey: 'catPersonality',
  },
  '재미 테스트': {
    border: 'border-orange-400/40 dark:border-orange-500/50',
    gradient: 'from-orange-500/10 to-amber-400/5 dark:from-orange-600/20 dark:to-amber-500/5',
    badge: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30',
    btn: 'from-orange-500 to-amber-400',
    accent: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-50 dark:bg-orange-500/20',
    catKey: 'catFun',
  },
  'MBTI': {
    border: 'border-violet-400/40 dark:border-violet-500/50',
    gradient: 'from-violet-500/10 to-purple-400/5 dark:from-violet-600/20 dark:to-purple-500/5',
    badge: 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30',
    btn: 'from-violet-500 to-purple-500',
    accent: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-50 dark:bg-violet-500/20',
    catKey: 'catMbti',
  },
  '운세': {
    border: 'border-teal-400/40 dark:border-teal-500/50',
    gradient: 'from-teal-500/10 to-emerald-400/5 dark:from-teal-600/20 dark:to-emerald-500/5',
    badge: 'bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30',
    btn: 'from-teal-500 to-emerald-500',
    accent: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-50 dark:bg-teal-500/20',
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
    <div className={`relative h-full rounded-[1.5rem] p-5 md:p-6 flex flex-col border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-white/5 backdrop-blur-sm ${theme?.border ?? 'border-border/50'}`}>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme?.gradient ?? 'from-transparent to-transparent'} pointer-events-none`} />

      <div className="relative flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center text-[1.8rem] group-hover:scale-110 transition-transform duration-250 shrink-0 ${theme?.iconBg ?? 'bg-muted'}`}>
          {test.emoji}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${theme?.badge ?? 'bg-muted text-muted-foreground'}`}>
          {catLabel}
        </span>
      </div>

      <h3 className="relative text-base md:text-[1.05rem] font-bold text-foreground mb-1 line-clamp-2 leading-snug">
        {title}
      </h3>

      {count && (
        <p className="relative text-[11px] text-muted-foreground/65 mb-2 font-medium">
          👥 {count} {t('card.participants')}
        </p>
      )}

      <p className="relative text-muted-foreground text-[0.8rem] flex-grow line-clamp-2 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="relative mt-auto">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium mb-3">
          <Clock className="w-3 h-3 opacity-60" />
          {estimatedTime}
        </div>
        <div className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${theme?.btn ?? 'from-primary to-primary'} text-white text-sm font-bold text-center flex items-center justify-center gap-1 shadow-md group-hover:shadow-lg transition-shadow`}>
          {startLabel} <ChevronRight className="w-3.5 h-3.5" />
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

  if (test.slug === 'pet-type-test') {
    return (
      <Link href="/pet-test" className="block h-full outline-none group">
        <CardBody {...bodyProps} />
      </Link>
    );
  }

  return (
    <Link href={`/tests/${test.slug}`} className="block h-full outline-none group">
      <CardBody {...bodyProps} />
    </Link>
  );
}
