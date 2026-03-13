import { Layout } from "@/components/layout";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
            <Mail className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            문의하기
          </h1>
        </div>

        {/* 본문 */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8 text-foreground/80 leading-relaxed text-base">

          <section>
            <p>InnerMeter 서비스와 관련된 문의는 아래 이메일로 보내주세요.</p>
          </section>

          <section>
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:opacity-80 transition-opacity break-all"
            >
              <Mail className="w-5 h-5 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </section>

          <section>
            <p>가능한 빠르게 답변드리겠습니다.</p>
            <p className="mt-3">감사합니다.</p>
          </section>

        </div>

      </div>
    </Layout>
  );
}
