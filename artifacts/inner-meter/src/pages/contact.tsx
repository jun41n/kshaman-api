import { Layout } from "@/components/layout";
import { Mail, MessageSquare, Handshake } from "lucide-react";

/* ── 연락처 ──────────────────────────────── */
const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
            <Mail className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            문의 및 제휴
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            새로운 테스트 아이디어, 콘텐츠 제휴, 광고 문의 등<br className="hidden sm:block" />
            모든 문의를 이메일로 받고 있어요.
          </p>
        </div>

        {/* 이메일 카드 */}
        <div className="bg-card border border-border rounded-[1.75rem] p-8 shadow-sm mb-8 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-3">공식 문의 이메일</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:opacity-80 transition-opacity break-all"
          >
            <Mail className="w-5 h-5 shrink-0" />
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            영업일 기준 2~3일 이내 회신 드립니다.
          </p>
        </div>

        {/* 문의 유형 */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-violet-50 dark:bg-violet-950/25 border border-violet-100 dark:border-violet-900/30 rounded-[1.5rem] p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-foreground">일반 문의</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <li>· 테스트 결과에 대한 의견 및 피드백</li>
              <li>· 새로운 테스트 아이디어 제안</li>
              <li>· 오류 신고 및 개선 요청</li>
              <li>· 개인정보 관련 문의</li>
            </ul>
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/25 border border-pink-100 dark:border-pink-900/30 rounded-[1.5rem] p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                <Handshake className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-foreground">제휴 문의</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <li>· 콘텐츠 협업 및 공동 제작</li>
              <li>· 광고 및 스폰서십</li>
              <li>· 미디어·언론 취재 요청</li>
              <li>· 비즈니스 파트너십</li>
            </ul>
          </div>
        </div>

        {/* 안내 */}
        <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
          문의 시 문의 유형과 내용을 함께 적어주시면<br className="hidden sm:block" />
          더 빠르고 정확하게 답변 드릴 수 있어요.
        </p>
      </div>
    </Layout>
  );
}
