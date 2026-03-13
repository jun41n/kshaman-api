import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Sparkles, Activity, ShieldCheck, Heart, Mail } from "lucide-react";

/* ── 연락처 ──────────────────────────────── */
const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        {/* 헤더 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5">InnerMeter 소개</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            나를 알아가는 가장 재미있고 다정한 방법.<br />
            당신의 내면을 긍정적인 언어로 측정합니다.
          </p>
        </div>

        {/* 본문 */}
        <div className="prose prose-purple dark:prose-invert max-w-none mb-14">
          <p className="text-lg text-foreground/80 leading-relaxed text-center mb-12">
            바쁘게 돌아가는 현대 사회 속에서 우리는 정작 <strong>나 자신이 어떤 사람인지, 어떤 마음 상태인지</strong> 놓치며 살아갑니다.
            InnerMeter는 무겁고 딱딱한 심리검사 대신, 누구나 가볍고 재미있게 참여할 수 있는 다채로운 테스트를 통해 당신의 숨겨진 성향을 찾아드립니다.
          </p>

          <div className="grid md:grid-cols-3 gap-5 not-prose mb-14">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">정확하고 트렌디한</h3>
              <p className="text-sm text-muted-foreground">다양한 심리 이론을 바탕으로 트렌디한 밈과 결합하여 높은 공감대를 형성합니다.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">따뜻하고 다정한</h3>
              <p className="text-sm text-muted-foreground">결과가 어떻든 비난하지 않습니다. 당신의 있는 그대로의 모습을 긍정적으로 바라봅니다.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">안전한 데이터</h3>
              <p className="text-sm text-muted-foreground">어떠한 개인정보나 선택 결과도 서버에 영구 보관되지 않으므로 안심하고 즐기세요.</p>
            </div>
          </div>

          {/* 문의 및 제휴 */}
          <div className="not-prose bg-violet-50 dark:bg-violet-950/25 border border-violet-100 dark:border-violet-900/30 rounded-[1.5rem] p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white">
                <Mail className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-lg text-foreground">문의 및 제휴</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              새로운 테스트 아이디어, 콘텐츠 제휴, 광고 문의 등 모든 문의를 이메일로 받고 있어요.
              영업일 기준 2~3일 이내로 회신 드립니다.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-bold text-primary hover:opacity-80 transition-opacity text-sm"
            >
              <Mail className="w-4 h-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3">
              <Link href="/contact" className="text-xs font-semibold text-primary/70 hover:text-primary transition-colors">
                문의 페이지 자세히 보기 →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
