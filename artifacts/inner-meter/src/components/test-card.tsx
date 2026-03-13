import { Link } from "wouter";
import { Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Test } from "@/data/tests";

interface TestCardProps {
  test: Test;
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Link href={`/tests/${test.slug}`} className="block h-full outline-none group">
      <div className="
        h-full bg-card rounded-2xl p-6 md:p-8 flex flex-col
        border border-border/50
        shadow-sm shadow-primary/5
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1
      ">
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
            {test.emoji}
          </div>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium rounded-full px-3">
            {test.category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {test.title}
        </h3>
        
        <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-6 leading-relaxed">
          {test.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="flex items-center text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {test.estimatedTime}
          </div>
          <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
            시작하기 <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
