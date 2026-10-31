export type PastLifeCareer = {
  name: string;
  title: string;
  icon: string;
  eraPay: string;
  modernPay: string;
  wealthStyle: string;
  description: string;
};

// These are entertainment-era translations, not historical wage claims. The
// display keeps the historical payment method separate from the modern analogy.
export const PAST_LIFE_CAREERS: PastLifeCareer[] = [
  { name: "임금", title: "조선의 임금", icon: "👑", eraPay: "국가 재정과 왕실 자원", modernPay: "월 1,500만원+", wealthStyle: "국가 운영형", description: "판을 읽고 큰 결정을 내리던 중심 인물" },
  { name: "왕실 책사", title: "왕실의 책사", icon: "📜", eraPay: "관직 녹봉·왕실 하사", modernPay: "월 750만~1,000만원", wealthStyle: "지식·인맥 축적형", description: "말보다 전략으로 판을 움직이던 조언가" },
  { name: "암행어사", title: "암행어사", icon: "🕵️", eraPay: "관료 녹봉·임무 경비", modernPay: "월 650만~850만원", wealthStyle: "명예·실무형", description: "겉보다 속을 보는 감각으로 문제를 찾던 인물" },
  { name: "포도대장", title: "포도대장", icon: "🛡️", eraPay: "관직 녹봉·군관 보상", modernPay: "월 600만~800만원", wealthStyle: "책임·성과형", description: "위기에서 질서를 세우던 지휘관" },
  { name: "전장의 무사", title: "전장의 무사", icon: "⚔️", eraPay: "군량·포목·공훈 포상", modernPay: "월 450만~650만원", wealthStyle: "공훈·성과형", description: "결단이 빠르고 사람을 지키는 데 강했던 전사" },
  { name: "궁수", title: "명궁", icon: "🏹", eraPay: "군량·훈련 보상", modernPay: "월 380만~550만원", wealthStyle: "집중·기술형", description: "한 번 정한 목표를 끝까지 겨누던 기술자" },
  { name: "수군 장수", title: "수군 장수", icon: "⛵", eraPay: "군관 녹봉·전공 포상", modernPay: "월 500만~720만원", wealthStyle: "리더십·위기관리형", description: "흐름이 거센 곳에서 방향을 잡던 리더" },
  { name: "선비", title: "유학자 선비", icon: "📚", eraPay: "교육 수입·후원·관직 녹봉", modernPay: "월 350만~550만원", wealthStyle: "지식·평판형", description: "생각을 오래 다듬고 말에 무게를 두던 사람" },
  { name: "서당 훈장", title: "서당 훈장", icon: "✒️", eraPay: "곡물·포목·교육 사례", modernPay: "월 320만~480만원", wealthStyle: "교육·신뢰형", description: "사람의 가능성을 길러내는 데 기쁨을 찾던 스승" },
  { name: "화원", title: "궁중 화원", icon: "🎨", eraPay: "관청 보수·작품 사례", modernPay: "월 350만~650만원", wealthStyle: "창작·의뢰형", description: "남들이 지나치는 장면을 자기만의 눈으로 남기던 예술가" },
  { name: "궁중 악사", title: "궁중 악사", icon: "🎶", eraPay: "관청 보수·행사 사례", modernPay: "월 300만~500만원", wealthStyle: "재능·무대형", description: "분위기를 읽고 사람의 마음을 움직이던 연주자" },
  { name: "의관", title: "왕실 의관", icon: "🩺", eraPay: "관직 녹봉·왕실 하사", modernPay: "월 650만~900만원", wealthStyle: "전문성·신뢰형", description: "작은 신호를 놓치지 않고 돌봄으로 답하던 전문가" },
  { name: "의녀", title: "궁중 의녀", icon: "🌿", eraPay: "관청 보수·의료 사례", modernPay: "월 420만~620만원", wealthStyle: "기술·돌봄형", description: "침착한 손끝으로 위기 속 사람을 보살피던 인물" },
  { name: "무당", title: "마을의 무당", icon: "🔮", eraPay: "곡물·포목·의례 사례", modernPay: "월 280만~650만원", wealthStyle: "관계·신뢰형", description: "사람들의 불안을 듣고 의미를 건네던 이야기꾼" },
  { name: "풍수지리사", title: "풍수지리사", icon: "🧭", eraPay: "의뢰 사례·토지 자문", modernPay: "월 400만~700만원", wealthStyle: "자문·안목형", description: "장소와 사람 사이의 흐름을 읽어내던 설계자" },
  { name: "대장장이", title: "대장간 장인", icon: "⚒️", eraPay: "품삯·철물 판매", modernPay: "월 380만~620만원", wealthStyle: "기술·제작형", description: "손으로 불가능을 쓸모 있는 물건으로 바꾸던 장인" },
  { name: "도공", title: "도자기 장인", icon: "🏺", eraPay: "관청 공물·작품 판매", modernPay: "월 360만~650만원", wealthStyle: "기술·브랜드형", description: "느린 시간을 견디며 완성도를 쌓아 올리던 제작자" },
  { name: "목수", title: "대목장", icon: "🪚", eraPay: "품삯·건축 의뢰", modernPay: "월 420만~680만원", wealthStyle: "기술·현장형", description: "전체 구조를 보고 단단하게 세우는 데 능했던 사람" },
  { name: "한지 장인", title: "한지 장인", icon: "📄", eraPay: "공물·납품·판매", modernPay: "월 300만~500만원", wealthStyle: "기술·꾸준함형", description: "섬세한 반복으로 오래 남을 것을 만들던 장인" },
  { name: "염색 장인", title: "염색 장인", icon: "🧵", eraPay: "품삯·포목 납품", modernPay: "월 320만~520만원", wealthStyle: "감각·제작형", description: "색과 결의 차이를 알아보는 감각이 뛰어난 창작자" },
  { name: "보부상", title: "보부상", icon: "🎒", eraPay: "물품 거래 이익", modernPay: "월 250만~800만원", wealthStyle: "상업·확장형", description: "낯선 곳에서도 기회를 찾고 사람을 연결하던 상인" },
  { name: "객주", title: "객주 주인", icon: "🏪", eraPay: "중개 수수료·숙박 수입", modernPay: "월 450만~900만원", wealthStyle: "중개·네트워크형", description: "정보와 사람의 흐름을 연결해 가치를 만들던 운영자" },
  { name: "약초상", title: "약초상", icon: "🌱", eraPay: "약재 거래 이익", modernPay: "월 350만~700만원", wealthStyle: "안목·상업형", description: "희귀한 가치를 알아보고 필요한 곳에 전하던 사람" },
  { name: "농부", title: "농사꾼", icon: "🌾", eraPay: "수확물·소작 수입", modernPay: "월 220만~480만원", wealthStyle: "토지·꾸준함형", description: "계절을 읽고 꾸준함으로 생활을 지탱하던 사람" },
  { name: "어부", title: "바다의 어부", icon: "🐟", eraPay: "어획물 판매", modernPay: "월 250만~550만원", wealthStyle: "현장·변동형", description: "변하는 물결 속에서도 타이밍을 놓치지 않던 생계형 모험가" },
  { name: "사냥꾼", title: "산의 사냥꾼", icon: "🦌", eraPay: "사냥물·가죽 판매", modernPay: "월 230만~500만원", wealthStyle: "자립·감각형", description: "조용히 관찰하다 결정적 순간에 움직이던 사람" },
  { name: "뱃사공", title: "나루터 뱃사공", icon: "🚣", eraPay: "나루삯·운송 사례", modernPay: "월 260만~500만원", wealthStyle: "생활·연결형", description: "사람과 장소를 오가며 세상의 소식을 가장 먼저 알던 인물" },
  { name: "광대", title: "떠돌이 광대", icon: "🎭", eraPay: "공연 사례·후원", modernPay: "월 200만~650만원", wealthStyle: "재능·바이럴형", description: "사람이 모인 곳의 공기를 바꾸던 자유로운 예인" },
  { name: "기생", title: "궁중 예인", icon: "🪭", eraPay: "연회 사례·후원", modernPay: "월 300만~700만원", wealthStyle: "예술·관계형", description: "말과 예술로 사람의 마음을 사로잡던 표현가" },
  { name: "노비", title: "성실한 살림지기", icon: "🧺", eraPay: "의식주 제공·소속 보상", modernPay: "월 180만~260만원", wealthStyle: "생활 유지형", description: "가장 가까운 자리에서 살림과 사람을 지켜내던 인물" },
  { name: "밀사", title: "비밀 정보원", icon: "🗝️", eraPay: "임무 경비·비밀 포상", modernPay: "월 450만~750만원", wealthStyle: "정보·기회형", description: "눈에 띄지 않게 핵심을 파악하고 움직이던 해결사" },
];

export function getPastLifeCareer(seed: string): PastLifeCareer {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = ((hash << 5) - hash + seed.charCodeAt(index)) | 0;
  }
  return PAST_LIFE_CAREERS[Math.abs(hash) % PAST_LIFE_CAREERS.length];
}
