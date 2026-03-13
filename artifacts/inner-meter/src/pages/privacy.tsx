import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";

const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            개인정보 처리방침
          </h1>
        </div>

        {/* 본문 */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8 text-foreground/80 leading-relaxed text-base">

          <section>
            <p>InnerMeter는 사용자의 개인정보를 중요하게 생각합니다.</p>
            <p className="mt-3">
              본 사이트는 서비스 제공을 위해 최소한의 정보만을 수집합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-foreground mb-4">수집 가능한 정보</h2>
            <ul className="space-y-2.5">
              {['생년월일', '성별', '국가'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              이 정보는 테스트 결과 생성 목적으로만 사용됩니다.
            </p>
          </section>

          <section>
            <p>
              InnerMeter는 사용자의 개인정보를 외부에 판매하거나 공유하지 않습니다.
            </p>
          </section>

          <section>
            <p>
              또한 Google Analytics와 같은 도구를 통해 방문 통계를 수집할 수 있습니다.
            </p>
            <p className="mt-3">
              이 정보는 사이트 개선 및 사용자 경험 향상을 위해 사용됩니다.
            </p>
          </section>

          <section>
            <p>사용자는 언제든지 사이트 이용을 중단할 수 있습니다.</p>
            <p className="mt-3">
              문의 사항이 있는 경우{' '}
              <Link href="/contact" className="font-semibold text-primary hover:opacity-80 transition-opacity">
                Contact 페이지
              </Link>
              를 통해 연락할 수 있습니다.
            </p>
          </section>

          <div className="pt-4 border-t border-border text-sm text-muted-foreground">
            문의 이메일:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:opacity-80 transition-opacity">
              {CONTACT_EMAIL}
            </a>
          </div>

        </div>

      </div>
    </Layout>
  );
}
