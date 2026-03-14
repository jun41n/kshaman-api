import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();
  return (
    <Layout>
      <SeoHead title={t('seo.terms.title')} description={t('seo.terms.desc')} path="/terms" />
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">이용약관</h1>
        
        <div className="prose prose-sm sm:prose-base dark:prose-invert prose-purple max-w-none bg-card p-8 rounded-3xl border border-border shadow-sm">
          <p className="text-muted-foreground mb-6">시행일: 2025년 1월 1일</p>

          <h3>제 1 조 (목적)</h3>
          <p>본 약관은 InnerMeter(이하 "회사")가 제공하는 심리 테스트 및 타로 관련 서비스(이하 "서비스")의 이용과 관련하여 회사와 사용자 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</p>

          <h3>제 2 조 (서비스의 성격)</h3>
          <p>회사가 제공하는 성격, 연애 등의 심리 테스트와 타로 서비스는 <strong>오락 및 재미(Entertainment)</strong>를 주 목적으로 제작되었습니다. 본 서비스의 결과는 의학적, 심리학적, 전문적 진단이나 상담을 대체할 수 없으며, 사용자는 테스트 결과에 전적으로 의존하여 중요한 결정을 내려서는 안 됩니다.</p>

          <h3>제 3 조 (저작권)</h3>
          <p>서비스 내 제공되는 모든 콘텐츠(질문, 결과 설명, 이미지, 디자인 등)에 대한 저작권 및 지적재산권은 회사에 있습니다. 사용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다. (단, 서비스 내 포함된 '공유하기' 기능을 통한 소셜 미디어 공유는 예외로 합니다.)</p>

          <h3>제 4 조 (면책조항)</h3>
          <p>회사는 무료로 제공되는 서비스 이용과 관련하여 사용자에게 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다. 또한, 서비스 이용으로 인한 사용자 간의 분쟁에 개입할 의무가 없으며 이로 인한 손해를 배상할 책임이 없습니다.</p>

          <h3>제 5 조 (약관의 변경)</h3>
          <p>회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있으며, 변경된 약관은 서비스 화면에 공지함으로써 효력이 발생합니다.</p>
        </div>
      </div>
    </Layout>
  );
}
