import { Layout } from "@/components/layout";

/* ── 연락처 ──────────────────────────────── */
const CONTACT_EMAIL = "meaningout_d@naver.com";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-black text-foreground mb-8">개인정보처리방침</h1>

        <div className="prose prose-sm sm:prose-base dark:prose-invert prose-purple max-w-none bg-card p-8 rounded-3xl border border-border shadow-sm">
          <p className="text-muted-foreground mb-6">시행일: 2025년 1월 1일</p>

          <h3>1. 수집하는 개인정보 항목</h3>
          <p>
            InnerMeter는 회원가입 없이 이용 가능한 서비스입니다. 테스트 이용 시 사용자가 입력하는
            답변은 오직 결과 도출만을 위해 브라우저에서 일시적으로 처리되며, 당사의 서버로
            전송되거나 저장되지 않습니다.
          </p>

          <h3>2. 쿠키(Cookie) 및 로컬 스토리지 이용</h3>
          <p>
            서비스의 원활한 제공과 사용자의 편의(다크 모드 설정, 결과 임시 저장 등)를 위해
            브라우저의 로컬 스토리지(Local Storage)를 사용할 수 있습니다. 이는 사용자의 기기에
            저장되며 개인을 식별할 수 있는 정보를 포함하지 않습니다.
          </p>

          <h3>3. 외부 분석 도구</h3>
          <p>
            서비스 이용 통계 및 오류 분석을 위해 구글 애널리틱스(Google Analytics) 등과 같은
            외부 분석 도구를 사용할 수 있습니다. 이 과정에서 익명화된 방문 데이터가 수집될 수
            있습니다.
          </p>

          <h3>4. 개인정보의 제3자 제공</h3>
          <p>당사는 원칙적으로 사용자의 개인정보를 외부로 제공하지 않습니다.</p>

          <h3>5. 개인정보 관련 문의</h3>
          <p>
            개인정보 처리와 관련된 문의사항은 아래 이메일로 연락해주세요.
            영업일 기준 2~3일 이내 회신 드립니다.
          </p>
          <p>
            이메일:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:opacity-80 transition-opacity">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
