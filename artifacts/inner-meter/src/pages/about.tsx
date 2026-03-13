import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";

const TESTS = [
  'MBTI 성격 테스트',
  '애착 유형 테스트',
  '직관 vs 논리 테스트',
  '과몰입 테스트',
  '테토 vs 에겐 테스트',
  '내 인생이 풀리는 나이 테스트',
  'K-Shaman Reading',
];

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            InnerMeter 소개
          </h1>
        </div>

        {/* 본문 */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8 text-foreground/80 leading-relaxed text-base">

          <section>
            <p>
              InnerMeter는 다양한 성격 테스트와 흥미로운 심리 콘텐츠를 제공하는 플랫폼입니다.
            </p>
            <p className="mt-3">
              사용자는 간단한 질문을 통해 자신의 성향, 심리 유형, 그리고 인생 흐름을 재미있게 확인할 수 있습니다.
            </p>
          </section>

          <section>
            <p>
              InnerMeter의 콘텐츠는 엔터테인먼트와 자기 탐색을 목적으로 제공됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-foreground mb-4">제공되는 테스트 예시</h2>
            <ul className="space-y-2.5">
              {TESTS.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p>
              우리는 사람들이 자신을 더 재미있게 이해하고 친구들과 결과를 공유할 수 있는 경험을 제공하는 것을 목표로 합니다.
            </p>
          </section>

        </div>

        {/* 하단 링크 */}
        <div className="flex items-center justify-center gap-6 mt-8 text-sm font-semibold text-muted-foreground">
          <Link href="/contact" className="hover:text-primary transition-colors">문의하기 →</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">개인정보처리방침 →</Link>
        </div>

      </div>
    </Layout>
  );
}
