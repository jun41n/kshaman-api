import { Link } from "wouter";
import { Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Test } from "@/data/tests";

interface TestCardProps {
  test: Test;
  compact?: boolean;
}

const CATEGORY_STYLES: Record<string, { bg: string; dot: string }> = {
  '연애 테스트': { bg: 'bg-pink-50 dark:bg-pink-950/20', dot: 'bg-pink-400' },
  '성격 테스트': { bg: 'bg-indigo-50 dark:bg-indigo-950/20', dot: 'bg-indigo-400' },
  '재미 테스트': { bg: 'bg-amber-50 dark:bg-amber-950/20', dot: 'bg-amber-400' },
};

const PARTICIPANT_COUNTS: Record<string, string> = {
  'love-style-test': '2.3만명',
  'attachment-style-test': '1.8만명',
  'hidden-personality-test': '3.1만명',
  'over-immersion-test': '1.4만명',
  'how-friends-see-me-test': '2.7만명',
  'intuition-vs-logic-test': '1.9만명',
};

export function TestCard({ test }: TestCardProps) {
  const style = CATEGORY_STYLES[test.category] || { bg: 'bg-muted/40', dot: 'bg-primary' };
  const count = PARTICIPANT_COUNTS[test.slug];

  return (
    <Link href={`/tests/${test.slug}`} className="block h-full outline-none group">
      <div className={`
        h-full rounded-2xl p-6 flex flex-col
        border border-border/50
        shadow-sm
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1
        ${style.bg}
      `}>
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
            {test.emoji}
          </div>
          <Badge variant="secondary" className="bg-white/70 dark:bg-black/20 text-muted-foreground font-medium rounded-full px-3 text-xs border-0 shadow-none">
            {test.category}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-1.5 line-clamp-2 leading-snug">
          {test.title}
        </h3>

        {count && (
          <p className="text-xs text-muted-foreground/70 mb-2 font-medium">👥 {count} 참여</p>
        )}
        
        <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-5 leading-relaxed">
          {test.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 mt-auto">
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5 mr-1 opacity-60" />
            {test.estimatedTime}
          </div>
          <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
            시작하기 <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
