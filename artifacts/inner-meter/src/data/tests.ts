export interface TestOption {
  label: string;
  scores: Record<string, number>;
}

export interface TestQuestion {
  id: number;
  text: string;
  options: TestOption[];
}

export type LocalizedString = { ko: string; en: string; ja: string; es: string; 'pt-BR': string; fr: string };

export interface TestResult {
  key: string;
  title: string;
  summary: string;
  description: string;
  strengths: string[];
  caution: string[];
  shareText: string;
  recommendedTests: string[];
  relationshipStyle?: LocalizedString;
  compatibleVibe?: LocalizedString;
  careers?: string[];
}

export interface Test {
  slug: string;
  title: string;
  description: string;
  category: '성격 테스트' | '연애 테스트' | '재미 테스트' | 'MBTI' | '운세';
  estimatedTime: string;
  emoji: string;
  questions: TestQuestion[];
  results: TestResult[];
  calculateResult: (scores: Record<string, number>) => string;
}

const _tests: Test[] = [
  {
    slug: 'love-style-test',
    title: '나의 진짜 연애 성향은?',
    description: '어떤 연애를 추구하는지 당신의 숨겨진 연애 세포를 분석해 드려요.',
    category: '연애 테스트',
    estimatedTime: '3분',
    emoji: '💕',
    questions: [
      {
        id: 1,
        text: '마음에 드는 사람을 발견했을 때, 나는?',
        options: [
          { label: '먼저 다가가서 호감을 확실히 표현한다', scores: { direct: 2, romance: 0 } },
          { label: '자연스럽게 눈을 마주치며 신호를 보낸다', scores: { direct: 1, romance: 1 } },
          { label: '그 사람 주변을 서성이며 기회를 노린다', scores: { direct: 0, romance: 1 } },
          { label: '멀리서 몰래 지켜보며 혼자 좋아한다', scores: { direct: -1, romance: 2 } }
        ]
      },
      {
        id: 2,
        text: '썸 타는 상대가 오늘따라 연락이 없다면?',
        options: [
          { label: '"바쁜가?" 쿨하게 먼저 뭐하는지 물어본다', scores: { direct: 2, romance: 0 } },
          { label: '연락 올 때까지 다른 일 하며 기다린다', scores: { direct: 1, romance: -1 } },
          { label: '의미심장한 카톡 상메나 인스타 스토리를 올린다', scores: { direct: 0, romance: 1 } },
          { label: '"내가 뭐 잘못했나?" 온갖 상상의 나래를 펼친다', scores: { direct: -1, romance: 2 } }
        ]
      },
      {
        id: 3,
        text: '기념일이 다가온다! 데이트 코스 준비는?',
        options: [
          { label: '상대방이 좋아할 만한 완벽한 이벤트를 기획한다', scores: { direct: 1, romance: 2 } },
          { label: '가고 싶었던 예쁜 식당을 미리 예약해둔다', scores: { direct: 1, romance: 1 } },
          { label: '서로 편하게 상의해서 같이 정한다', scores: { direct: 2, romance: -1 } },
          { label: '당일 기분에 따라 즉흥적으로 결정한다', scores: { direct: 0, romance: -2 } }
        ]
      },
      {
        id: 4,
        text: '상대방에게 서운한 점이 생겼을 때 나는?',
        options: [
          { label: '그 자리에서 바로 조목조목 이야기한다', scores: { direct: 2, romance: -1 } },
          { label: '감정을 정리한 뒤 대화로 풀어나간다', scores: { direct: 1, romance: 0 } },
          { label: '티를 내며 상대가 먼저 물어보길 기다린다', scores: { direct: -1, romance: 1 } },
          { label: '일단 참아본다. 시간이 지나면 괜찮아질 테니까', scores: { direct: -2, romance: 2 } }
        ]
      },
      {
        id: 5,
        text: '연인과 첫 데이트! 가장 중요하게 생각하는 것은?',
        options: [
          { label: '로맨틱하고 분위기 있는 장소', scores: { direct: 0, romance: 2 } },
          { label: '서로의 취향이 잘 맞는 대화 주제', scores: { direct: 1, romance: 1 } },
          { label: '재미있고 활동적인 이색 데이트', scores: { direct: 2, romance: 0 } },
          { label: '조용하고 어색하지 않은 편안함', scores: { direct: -1, romance: 0 } }
        ]
      },
      {
        id: 6,
        text: '친구들이 연애 상담을 부탁한다면, 나의 반응은?',
        options: [
          { label: '현실적인 조언과 해결책을 폭격한다', scores: { direct: 2, romance: -2 } },
          { label: '같이 화내주며 폭풍 공감해준다', scores: { direct: 0, romance: 2 } },
          { label: '객관적으로 상황을 판단해준다', scores: { direct: 1, romance: -1 } },
          { label: '일단 묵묵히 다 들어준다', scores: { direct: -1, romance: 1 } }
        ]
      },
      {
        id: 7,
        text: '이상형의 조건 중 포기할 수 없는 단 하나는?',
        options: [
          { label: '티키타카가 잘 맞는 대화 코드', scores: { direct: 2, romance: 0 } },
          { label: '나만 바라보는 다정함과 세심함', scores: { direct: 0, romance: 2 } },
          { label: '확실한 미래 계획과 가치관', scores: { direct: 2, romance: -1 } },
          { label: '바라만 봐도 설레는 외모', scores: { direct: -1, romance: 1 } }
        ]
      },
      {
        id: 8,
        text: '사랑에 빠진 내 모습은 보통 어떤가요?',
        options: [
          { label: '내 모든 것을 퍼주는 해바라기', scores: { direct: 0, romance: 2 } },
          { label: '적당한 밀당을 즐기는 고수', scores: { direct: 2, romance: 0 } },
          { label: '표현은 서툴지만 뒤에서 챙겨주는 츤데레', scores: { direct: -1, romance: -1 } },
          { label: '친구처럼 편안하게 스며드는 스타일', scores: { direct: 1, romance: -1 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const d = scores.direct || 0;
      const r = scores.romance || 0;
      if (d >= 4 && r >= 3) return 'direct-romantic';
      if (d >= 4 && r < 3) return 'direct-realist';
      if (d < 4 && r >= 3) return 'passive-romantic';
      return 'passive-realist';
    },
    results: [
      {
        key: 'direct-romantic',
        title: '불도저 로맨티시스트',
        summary: '사랑 앞에서는 거침없이 직진하는 낭만파!',
        description: '좋아하는 마음을 숨기지 않고 듬뿍 표현하는 스타일이에요. 사랑에 빠지면 영화 속 주인공처럼 로맨틱한 이벤트를 준비하고 상대방을 기쁘게 하는 데서 행복을 느낍니다. 밀당보다는 솔직한 감정 표현이 당신의 강력한 무기예요.',
        strengths: ['호감을 확실히 표현함', '이벤트와 서프라이즈에 강함', '열정적인 사랑꾼'],
        caution: ['감정이 너무 앞서 상처받기 쉬워요', '상대방의 템포를 맞춰주는 것도 필요해요'],
        shareText: '나의 연애 성향은 "불도저 로맨티시스트" 💘 너의 연애 세포도 확인해봐!',
        recommendedTests: ['attachment-style-test', 'hidden-personality-test', 'intuition-vs-logic-test']
      },
      {
        key: 'direct-realist',
        title: '쿨한 현실주의 연애러',
        summary: '감정 낭비 NO! 쿨하고 확실한 관계가 좋아',
        description: '애매한 썸이나 밀당을 싫어하는 명쾌한 성격이에요. 좋아하는 사람이 생기면 확실하게 관계를 정립하고 싶어 합니다. 오글거리는 이벤트보다는 실용적인 선물이나 편안한 일상 데이트를 훨씬 선호하는 담백한 사랑꾼입니다.',
        strengths: ['대화가 시원시원함', '갈등 해결이 빠름', '안정적이고 편안한 연애'],
        caution: ['가끔은 달콤한 빈말도 필요해요', '너무 현실적이면 상대가 서운해할 수 있어요'],
        shareText: '나의 연애 성향은 "쿨한 현실주의 연애러" 😎 너의 연애 세포도 확인해봐!',
        recommendedTests: ['intuition-vs-logic-test', 'how-friends-see-me-test', 'over-immersion-test']
      },
      {
        key: 'passive-romantic',
        title: '상상 속의 로맨티시스트',
        summary: '마음속으로는 이미 로맨스 영화 100편 찍음 🎬',
        description: '겉으로는 티를 잘 내지 않지만, 마음속에는 따뜻한 낭만이 가득 찬 사람이에요. 짝사랑을 오래 하기도 하고, 작은 스킨십이나 말 한마디에 큰 의미를 부여하며 설레어 합니다. 한번 마음을 열면 누구보다 다정하고 세심한 연인이 됩니다.',
        strengths: ['상대방의 기분을 잘 파악함', '세심한 배려의 달인', '한결같은 순애보'],
        caution: ['표현하지 않으면 아무도 몰라요', '혼자 상처받고 단정 짓지 마세요'],
        shareText: '나의 연애 성향은 "상상 속의 로맨티시스트" ✨ 너의 연애 세포도 확인해봐!',
        recommendedTests: ['attachment-style-test', 'over-immersion-test', 'hidden-personality-test']
      },
      {
        key: 'passive-realist',
        title: '신중한 마이웨이 연애러',
        summary: '사랑도 내 삶의 일부일 뿐! 내 페이스가 중요해',
        description: '연애를 시작하기까지 오랜 시간이 걸리는 신중한 타입이에요. 금방 불타오르기보다는 서서히 스며드는 편안한 관계를 추구합니다. 연애를 하더라도 나의 개인 시간과 영역은 반드시 존중받아야 직성이 풀리는 독립적인 성향을 가졌습니다.',
        strengths: ['감정 기복이 적어 안정적임', '신중하게 관계를 맺음', '서로의 생활을 존중함'],
        caution: ['연애에 무관심해 보일 수 있어요', '관계의 진전이 너무 느릴 수 있습니다'],
        shareText: '나의 연애 성향은 "신중한 마이웨이 연애러" ☕ 너의 연애 세포도 확인해봐!',
        recommendedTests: ['hidden-personality-test', 'how-friends-see-me-test', 'intuition-vs-logic-test']
      }
    ]
  },
  {
    slug: 'attachment-style-test',
    title: '나의 애착 유형 테스트',
    description: '관계 속에서 나는 어떤 모습일까? 나의 안정, 불안, 회피 점수를 알아보세요.',
    category: '성격 테스트',
    estimatedTime: '4분',
    emoji: '🤝',
    questions: [
      {
        id: 1,
        text: '연인이 갑자기 "우리 생각할 시간을 갖자"라고 한다면?',
        options: [
          { label: '알았어. 내버려 두면 해결되겠지 (회피)', scores: { avoidant: 3, anxious: 0, secure: 0 } },
          { label: '내가 뭐 잘못했어? 헤어지자는 거야? (불안)', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '어떤 부분 때문에 그래? 대화로 풀자 (안정)', scores: { avoidant: 0, anxious: 0, secure: 3 } }
        ]
      },
      {
        id: 2,
        text: '나에게 있어 "혼자만의 시간"이란?',
        options: [
          { label: '반드시 필요하고 방해받고 싶지 않다', scores: { avoidant: 3, anxious: 0, secure: 1 } },
          { label: '혼자 있으면 외롭고 누군가와 함께하고 싶다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '좋기도 하지만, 함께하는 시간도 소중하다', scores: { avoidant: 1, anxious: 0, secure: 3 } }
        ]
      },
      {
        id: 3,
        text: '연인이 다른 이성과 친하게 지내는 모습을 보면?',
        options: [
          { label: '별 생각 없다. 질투는 소모적인 감정이다', scores: { avoidant: 2, anxious: 0, secure: 2 } },
          { label: '너무 불안하고 나에 대한 마음이 식었을까 걱정된다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '조금 신경 쓰이지만 선만 넘지 않으면 괜찮다', scores: { avoidant: 0, anxious: 1, secure: 3 } }
        ]
      },
      {
        id: 4,
        text: '가까운 사람에게 나의 약점이나 비밀을 털어놓는 것은?',
        options: [
          { label: '절대 안 한다. 짐이 되거나 약점이 잡힐 뿐이다', scores: { avoidant: 3, anxious: 0, secure: 0 } },
          { label: '모두 털어놓고 100% 위로받고 싶다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '신뢰하는 사람에게라면 자연스럽게 말할 수 있다', scores: { avoidant: 0, anxious: 0, secure: 3 } }
        ]
      },
      {
        id: 5,
        text: '연락의 빈도에 대해 어떻게 생각하나요?',
        options: [
          { label: '연락은 최소한의 안부면 충분하다', scores: { avoidant: 3, anxious: 0, secure: 0 } },
          { label: '무엇을 하는지 항상 공유하고 끊임없이 이어져야 한다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '서로 바쁠 땐 이해하고, 여유로울 때 편하게 연락한다', scores: { avoidant: 1, anxious: 1, secure: 3 } }
        ]
      },
      {
        id: 6,
        text: '연인과 심하게 다툰 직후, 나의 행동은?',
        options: [
          { label: '자리를 피하고 혼자 동굴로 들어간다', scores: { avoidant: 3, anxious: 0, secure: 0 } },
          { label: '상대가 떠날까 봐 당장 매달리고 먼저 사과한다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '잠시 감정을 가라앉히고 대화로 풀려고 시도한다', scores: { avoidant: 0, anxious: 0, secure: 3 } }
        ]
      },
      {
        id: 7,
        text: '관계가 너무 깊어지는 것에 대해 어떻게 느끼나요?',
        options: [
          { label: '부담스럽고 나의 자율성이 사라질까 두렵다', scores: { avoidant: 3, anxious: 0, secure: 0 } },
          { label: '상대방이 나를 완전히 받아줄지 확신이 안 서 두렵다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '자연스러운 과정이라 생각하며 기쁘게 받아들인다', scores: { avoidant: 0, anxious: 0, secure: 3 } }
        ]
      },
      {
        id: 8,
        text: '상대방이 나에게 칭찬과 사랑을 듬뿍 표현할 때?',
        options: [
          { label: '의도가 있나 싶고 왠지 어색하고 오글거린다', scores: { avoidant: 3, anxious: 0, secure: 0 } },
          { label: '기쁘지만 이 마음이 변할까 봐 마음 한구석이 불안하다', scores: { avoidant: 0, anxious: 3, secure: 0 } },
          { label: '고맙게 받아들이고 나도 애정을 표현한다', scores: { avoidant: 0, anxious: 0, secure: 3 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const a = scores.avoidant || 0;
      const x = scores.anxious || 0;
      const s = scores.secure || 0;
      if (s >= 15) return 'secure';
      if (a > x && a >= 10) return 'avoidant';
      if (x > a && x >= 10) return 'anxious';
      return 'mixed';
    },
    results: [
      {
        key: 'secure',
        title: '흔들리지 않는 멘탈, 안정 애착',
        summary: '신뢰와 존중을 바탕으로 한 건강한 관계의 정석',
        description: '당신은 자신과 타인에 대해 긍정적인 인식을 가지고 있습니다. 관계에서 적당한 친밀감을 즐기면서도 혼자만의 시간 역시 편안하게 보낼 수 있습니다. 거절당하거나 상처받는 것을 크게 두려워하지 않으며, 갈등이 생겨도 대화로 성숙하게 풀어나가는 능력을 갖추고 있네요.',
        strengths: ['높은 자존감', '원활한 소통 능력', '건강한 경계선 유지'],
        caution: ['가끔 불안형이나 회피형 파트너를 이해하기 어려울 수 있어요', '너무 이성적인 대처가 상대에겐 차갑게 보일 때도 있습니다'],
        shareText: '나의 애착 유형은 상위 1% 건강한 멘탈 "안정 애착" 🛡️ 너는 어떤 유형이야?',
        recommendedTests: ['love-style-test', 'intuition-vs-logic-test', 'how-friends-see-me-test']
      },
      {
        key: 'anxious',
        title: '사랑이 고픈 해바라기, 불안 애착',
        summary: '나를 떠나지 마! 관계에 에너지를 쏟는 타입',
        description: '타인과 친밀해지는 것을 강하게 원하며, 혼자 있는 것을 견디기 힘들어합니다. 상대방의 사소한 행동이나 연락 빈도에 민감하게 반응하고, "나를 정말 사랑하는 걸까?"하며 끊임없이 확인받고 싶어 합니다. 그만큼 파트너에게 헌신적이고 세심하지만 상처를 잘 받는 여린 마음의 소유자입니다.',
        strengths: ['깊은 공감 능력', '사랑에 진심인 순애보', '파트너의 감정 변화를 잘 알아챔'],
        caution: ['스스로의 가치를 타인의 사랑에서 찾지 마세요', '혼자서도 행복할 수 있는 취미를 만들어보세요'],
        shareText: '나의 애착 유형은 애정 듬뿍 "불안 애착" 🌻 너는 어떤 유형이야?',
        recommendedTests: ['over-immersion-test', 'love-style-test', 'hidden-personality-test']
      },
      {
        key: 'avoidant',
        title: '나만의 우주가 소중해, 회피 애착',
        summary: '다치기 싫어서 마음의 문을 반쯤 닫아둔 독립가',
        description: '타인과 너무 가까워지는 것을 불편해하며, 나의 독립성과 자율성을 지키는 것을 가장 중요하게 생각합니다. 누군가 내 영역을 침범하거나 감정적으로 의존해 오면 부담을 느끼고 거리를 두려 합니다. 상처받는 것을 방어하기 위해 겉으로는 쿨하고 독립적인 척하지만, 사실은 깊은 관계를 두려워하는 것일 수 있습니다.',
        strengths: ['자립심이 강함', '감정에 휘둘리지 않음', '혼자서도 잘 지냄'],
        caution: ['갈등을 피하고 동굴로 숨는 습관은 관계를 단절시켜요', '감정을 솔직하게 표현하는 연습이 필요해요'],
        shareText: '나의 애착 유형은 마이웨이 "회피 애착" 🐱 너는 어떤 유형이야?',
        recommendedTests: ['hidden-personality-test', 'intuition-vs-logic-test', 'love-style-test']
      },
      {
        key: 'mixed',
        title: '왔다갔다 감정 롤러코스터, 혼합(공포-회피) 애착',
        summary: '다가오면 밀어내고, 멀어지면 다가가고 싶은 복잡한 마음',
        description: '친밀한 관계를 갈망하면서도 동시에 깊은 관계가 되는 것을 두려워하는 모순된 감정을 가졌습니다. 상대가 멀어지면 버림받을까 불안해하고, 막상 상대가 다가오면 상처받을까 봐 밀어내는 패턴을 보일 수 있습니다. 과거의 상처가 방어기제로 작용하고 있을 가능성이 높습니다.',
        strengths: ['타인의 아픔에 깊이 공감함', '인간관계에 대해 진지하게 고민함', '조심성이 많아 큰 실수를 피함'],
        caution: ['스스로의 감정을 객관적으로 바라보는 연습이 필요해요', '믿을 수 있는 사람에게 천천히 마음을 여는 시도를 해보세요'],
        shareText: '나의 애착 유형은 롤러코스터 "혼합 애착" 🎢 너는 어떤 유형이야?',
        recommendedTests: ['attachment-style-test', 'hidden-personality-test', 'over-immersion-test']
      }
    ]
  },
  {
    slug: 'hidden-personality-test',
    title: '내 안의 숨은 성격 찾기',
    description: '사회생활 모드 페르소나 뒤에 숨겨진 당신의 진짜 본성은?',
    category: '성격 테스트',
    estimatedTime: '3분',
    emoji: '🎭',
    questions: [
      {
        id: 1,
        text: '새로운 모임에 나갔을 때 나의 행동은?',
        options: [
          { label: '분위기를 주도하며 먼저 말을 건넨다', scores: { e_score: 2, i_score: 0 } },
          { label: '누가 말을 걸어줄 때까지 조용히 웃고만 있는다', scores: { e_score: 0, i_score: 2 } },
          { label: '친해 보이는 몇 명하고만 깊게 대화한다', scores: { e_score: 1, i_score: 1 } }
        ]
      },
      {
        id: 2,
        text: '주말을 보내는 가장 이상적인 방법은?',
        options: [
          { label: '집 밖으로 안 나가고 넷플릭스 정주행', scores: { e_score: 0, i_score: 2 } },
          { label: '핫플 카페 투어와 친구들과의 수다', scores: { e_score: 2, i_score: 0 } },
          { label: '오전에만 잠깐 나가 놀고 오후엔 꿀휴식', scores: { e_score: 1, i_score: 1 } }
        ]
      },
      {
        id: 3,
        text: '사람들이 보는 나의 첫인상은?',
        options: [
          { label: '친화력 갑! 인싸 그 자체', scores: { e_score: 2, i_score: 0 } },
          { label: '다가가기 힘든 냉미남/냉미녀', scores: { e_score: 0, i_score: 2 } },
          { label: '조용하고 참해 보인다는 소리를 듣는다', scores: { e_score: 1, i_score: 2 } }
        ]
      },
      {
        id: 4,
        text: '스트레스를 받는 상황! 나는 어떻게 푸는 편인가?',
        options: [
          { label: '친구들을 만나 미친듯이 놀고 떠든다', scores: { e_score: 2, i_score: 0 } },
          { label: '혼자 방 불 끄고 좋아하는 음악 듣기', scores: { e_score: 0, i_score: 2 } },
          { label: '혼자 드라이브나 산책을 다녀온다', scores: { e_score: 1, i_score: 2 } }
        ]
      },
      {
        id: 5,
        text: '단체 톡방에 알림이 100개 쌓여있을 때?',
        options: [
          { label: '신나서 대화의 흐름을 파악하고 바로 참여한다', scores: { e_score: 2, i_score: 0 } },
          { label: '조용히 읽기만 하거나 아예 무음 처리한다', scores: { e_score: 0, i_score: 2 } },
          { label: '내 이름이 언급된 곳이 있나만 확인한다', scores: { e_score: 0, i_score: 1 } }
        ]
      },
      {
        id: 6,
        text: '여행지에서 나는 어떤 스타일?',
        options: [
          { label: '현지인들과도 금방 친구가 되는 글로벌 인싸', scores: { e_score: 2, i_score: 0 } },
          { label: '이어폰 꽂고 풍경을 감상하는 혼행족', scores: { e_score: 0, i_score: 2 } },
          { label: '계획된 일정대로 동행자와 소소하게 즐기는 타입', scores: { e_score: 1, i_score: 1 } }
        ]
      },
      {
        id: 7,
        text: '나의 진짜 모습을 아는 사람은?',
        options: [
          { label: '내 주변 모든 사람이 아는 투명한 인간!', scores: { e_score: 2, i_score: 0 } },
          { label: '정말 친한 극소수의 친구 1~2명뿐', scores: { e_score: 0, i_score: 2 } },
          { label: '가족조차도 내 진짜 모습은 잘 모를 것이다', scores: { e_score: -1, i_score: 3 } }
        ]
      },
      {
        id: 8,
        text: '갑자기 약속이 취소되었을 때 나의 기분은?',
        options: [
          { label: '아싸! 오늘 집에서 뒹굴어야지 (행복)', scores: { e_score: 0, i_score: 3 } },
          { label: '아쉬워하며 바로 다른 친구를 불러낸다', scores: { e_score: 3, i_score: 0 } },
          { label: '조금 아쉽지만 나만의 시간을 즐긴다', scores: { e_score: 1, i_score: 1 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const e = scores.e_score || 0;
      const i = scores.i_score || 0;
      if (e > i && e >= 12) return 'extrovert';
      if (i > e && i >= 12) return 'introvert';
      if (e > 8 && i > 8) return 'chameleon';
      return 'balanced';
    },
    results: [
      {
        key: 'extrovert',
        title: '에너지 뿜뿜 찐외향인',
        summary: '사람들과 함께할 때 에너지가 충전되는 파워 인싸!',
        description: '당신은 숨길 수 없는 외향성의 소유자입니다. 사람들과 소통하고 교류하는 과정에서 삶의 활력을 얻습니다. 새로운 사람을 만나는 것을 두려워하지 않고 오히려 즐기며, 모임에서 늘 분위기 메이커 역할을 톡톡히 해냅니다. 혼자 있는 시간보다 함께 나누는 시간이 훨씬 즐거운 타입이네요.',
        strengths: ['엄청난 친화력', '긍정적인 에너지 전파', '넓은 인맥'],
        caution: ['가끔은 나 자신을 돌보는 혼자만의 시간도 필요해요', '타인의 시선을 너무 의식하지 마세요'],
        shareText: '나의 숨은 성격은 "에너지 뿜뿜 찐외향인" 🌟 너도 확인해봐!',
        recommendedTests: ['how-friends-see-me-test', 'love-style-test', 'over-immersion-test']
      },
      {
        key: 'introvert',
        title: '평화로운 방구석 요정 (찐내향인)',
        summary: '침대와 한 몸일 때 가장 행복한 프로 집순이/집돌이',
        description: '겉으로 사회생활을 잘 해내더라도, 사실 당신의 진짜 에너지는 혼자 조용히 쉴 때 충전됩니다. 시끄러운 술자리보다는 따뜻한 이불 속과 넷플릭스를 사랑합니다. 친한 소수의 사람들과 깊은 관계를 맺는 것을 선호하며, 생각과 감정이 깊고 풍부한 사람입니다.',
        strengths: ['깊이 있는 사고와 통찰력', '타인의 말을 잘 경청함', '혼자서도 지루하지 않음'],
        caution: ['가끔은 익숙한 영역 밖으로 나가보는 것도 좋아요', '너무 오랫동안 혼자 고립되지 않게 주의하세요'],
        shareText: '나의 숨은 성격은 "평화로운 방구석 요정" 🧚 너도 확인해봐!',
        recommendedTests: ['attachment-style-test', 'intuition-vs-logic-test', 'love-style-test']
      },
      {
        key: 'chameleon',
        title: '눈치백단 카멜레온형',
        summary: '상황에 따라 외향과 내향을 자유자재로 넘나드는 스파이',
        description: '당신은 외향성과 내향성의 특징을 모두 뚜렷하게 가지고 있습니다. 분위기를 띄워야 할 땐 누구보다 파워 인싸처럼 놀지만, 집에 돌아가면 철저한 내향인으로 돌변하여 방전된 체력을 채웁니다. 상대방과 상황에 맞춰 나의 텐션을 조절할 수 있는 엄청난 사회적 스킬의 소유자입니다.',
        strengths: ['뛰어난 상황 대처 능력', '누구와도 잘 어울릴 수 있음', '눈치가 아주 빠름'],
        caution: ['페르소나를 자주 바꾸다 보면 쉽게 지칠 수 있어요', '진짜 나의 모습이 무엇인지 혼란스러울 때가 있어요'],
        shareText: '나의 숨은 성격은 "눈치백단 카멜레온" 🦎 너도 확인해봐!',
        recommendedTests: ['how-friends-see-me-test', 'hidden-personality-test', 'over-immersion-test']
      },
      {
        key: 'balanced',
        title: '평온한 균형형 인간 (앰비버트)',
        summary: '적당히 놀고 적당히 쉬는 게 제일 좋은 평화주의자',
        description: '외향과 내향 어느 한쪽으로 크게 치우치지 않은 안정적인 밸런스를 가지고 있습니다. 사람들을 만나는 것도 좋고, 혼자 쉬는 것도 나름대로 즐깁니다. 상황에 크게 스트레스받지 않으며 물 흐르듯 자연스럽게 환경에 적응하는 무던한 성격의 소유자입니다.',
        strengths: ['감정의 기복이 적음', '호불호가 강하지 않아 유연함', '편안한 인상'],
        caution: ['이도 저도 아닌 우유부단한 사람으로 보일 수 있어요', '강렬한 열정을 쏟을 무언가를 찾아보는 것도 추천해요'],
        shareText: '나의 숨은 성격은 "평온한 균형형 인간" ⚖️ 너도 확인해봐!',
        recommendedTests: ['attachment-style-test', 'intuition-vs-logic-test', 'how-friends-see-me-test']
      }
    ]
  },
  {
    slug: 'over-immersion-test',
    title: '나의 과몰입 성향은?',
    description: '드라마 하나 보면 밤새고 마는 당신... 과몰입의 끝을 달리고 있나요?',
    category: '재미 테스트',
    estimatedTime: '2분',
    emoji: '🌀',
    questions: [
      {
        id: 1,
        text: '새로운 드라마 정주행을 시작했다!',
        options: [
          { label: '밥 먹을 때 한 편씩 천천히 본다', scores: { score: 0 } },
          { label: '결말이 궁금해서 새벽까지 밤새워 다 본다', scores: { score: 3 } },
          { label: '보면서 실시간으로 트위터나 커뮤니티 반응을 챙겨본다', scores: { score: 5 } }
        ]
      },
      {
        id: 2,
        text: '좋아하는 아이돌이나 배우가 생기면?',
        options: [
          { label: '유튜브 알고리즘에 뜨면 보는 정도', scores: { score: 0 } },
          { label: '과거 출연작, 직캠, 예능까지 모조리 찾아본다', scores: { score: 3 } },
          { label: '이미 굿즈 결제하고 콘서트 티켓팅 연습 중', scores: { score: 5 } }
        ]
      },
      {
        id: 3,
        text: '친구가 썰을 풀다가 "아 맞다, 그 얘기 해줬나?" 하고 말을 끊으면?',
        options: [
          { label: '"안 해줬어 빨리 말해봐!" (평온)', scores: { score: 0 } },
          { label: '"아 뭔데 빨리!! 현기증 난단 말이야" (흥분)', scores: { score: 3 } },
          { label: '말 안 해주면 오늘 밤에 잠 못 잠 (집착)', scores: { score: 5 } }
        ]
      },
      {
        id: 4,
        text: '내 최애 캐릭터가 작품 속에서 죽었다...',
        options: [
          { label: '"헐 불쌍하네" 하고 다음 화를 튼다', scores: { score: 0 } },
          { label: '며칠 동안 우울해서 일상생활이 불가하다', scores: { score: 5 } },
          { label: '작가 인스타 찾아가서 왜 죽였냐고 원망한다 (마음속으로)', scores: { score: 4 } }
        ]
      },
      {
        id: 5,
        text: 'MBTI나 성격 테스트를 대하는 자세는?',
        options: [
          { label: '그냥 재미로 한 번 해보고 잊어버린다', scores: { score: 0 } },
          { label: '친구들한테 공유해서 결과 다 수집한다', scores: { score: 3 } },
          { label: '내 성격에 완벽히 빙의해서 MBTI 밈을 하루종일 본다', scores: { score: 5 } }
        ]
      },
      {
        id: 6,
        text: '노래 하나에 꽂히면 어떻게 듣나요?',
        options: [
          { label: '플레이리스트에 넣고 셔플로 듣는다', scores: { score: 0 } },
          { label: '질릴 때까지 그 한 곡만 무한 반복 재생한다', scores: { score: 4 } },
          { label: '가사 해석, 뮤비 해석, 라이브 무대까지 싹 다 분석한다', scores: { score: 5 } }
        ]
      },
      {
        id: 7,
        text: '꿈속에서 너무 생생하고 흥미진진한 모험을 했다.',
        options: [
          { label: '일어나자마자 "개꿈이네" 하고 잊어버린다', scores: { score: 0 } },
          { label: '일어나서 메모장에 꿈 내용을 적어둔다', scores: { score: 3 } },
          { label: '다시 자서 꿈의 다음 편을 이어서 꾸려고 노력한다', scores: { score: 5 } }
        ]
      },
      {
        id: 8,
        text: '친구와 말싸움을 한 날 밤, 침대에 누웠다.',
        options: [
          { label: '내일 화해해야지.. (스르륵 꿀잠)', scores: { score: 0 } },
          { label: '"아까 거기서 그 말을 했어야 했는데!!" 이불킥 작렬', scores: { score: 4 } },
          { label: '이미 머릿속에서 시뮬레이션으로 친구와 100분 토론 중', scores: { score: 5 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const s = scores.score || 0;
      if (s >= 32) return 'extreme';
      if (s >= 20) return 'high';
      if (s >= 10) return 'medium';
      return 'realist';
    },
    results: [
      {
        key: 'extreme',
        title: '프로 과몰입러 (현실로그아웃)',
        summary: '이 구역의 몰입 왕! 내 인생은 매일이 시트콤 팝콘각',
        description: '당신은 상상력과 감수성이 풍부하여 한 번 무언가에 꽂히면 끝을 보는 ‘심해 잠수부’ 스타일입니다. 드라마, 덕질, 친구의 썰 등 모든 것에 200% 이입하여 함께 울고 웃습니다. 세상의 모든 자극을 스펀지처럼 흡수하는 당신의 일상은 지루할 틈이 없겠네요!',
        strengths: ['풍부한 공감 능력', '미친 집중력과 덕력', '다채로운 상상력'],
        caution: ['현실의 일과를 놓칠 수 있으니 알람을 맞춰두세요', '타인의 감정까지 과도하게 흡수해 감정 소모가 큽니다'],
        shareText: '나의 과몰입 성향은 "프로 과몰입러" 🌀 너는 어느 정도야?',
        recommendedTests: ['hidden-personality-test', 'attachment-style-test', 'how-friends-see-me-test']
      },
      {
        key: 'high',
        title: '선택적 과몰입러',
        summary: '평소엔 정상, 내가 꽂힌 분야에서만 광기 오픈',
        description: '평소에는 이성적이고 차분한 척하지만, 내가 관심 있는 특정 분야에 버튼이 눌리면 무서운 몰입력을 보여줍니다. 최애돌, 인생 드라마 등 ‘내 것’이라는 확신이 드는 순간 현생을 잠시 미뤄두고 빠져드는 스타일! 맺고 끊음이 확실한 선택적 열정꾼입니다.',
        strengths: ['관심 분야의 전문가 수준 지식', '흥미 있는 일에는 엄청난 효율', '스트레스 해소법이 확실함'],
        caution: ['관심 없는 분야에는 너무 무심해 보일 수 있어요', '꽂히면 지갑이 얇아지는 속도가 빠릅니다'],
        shareText: '나의 과몰입 성향은 "선택적 과몰입러" 👀 너는 어느 정도야?',
        recommendedTests: ['love-style-test', 'intuition-vs-logic-test', 'hidden-personality-test']
      },
      {
        key: 'medium',
        title: '적당한 몰입러',
        summary: '재미는 재미일 뿐! 현생 챙기는 밸런스형',
        description: '즐길 때는 즐기고, 끊어야 할 때는 확실히 끊는 건강한 마인드의 소유자입니다. 아무리 재밌는 드라마라도 내일 출근을 위해 12시에는 끄고 잘 수 있는 자제력을 갖췄습니다. 현실의 삶과 취미 생활의 균형을 아주 잘 맞추는 타입이네요.',
        strengths: ['자기 통제력이 강함', '감정 소모가 적음', '현생과 덕생의 완벽한 조화'],
        caution: ['가끔은 이성을 놓고 미친 듯이 놀아보는 것도 좋아요', '프로 과몰입러 친구들을 볼 때 신기해할 수 있어요'],
        shareText: '나의 과몰입 성향은 "적당한 몰입러" ☕ 너는 어느 정도야?',
        recommendedTests: ['intuition-vs-logic-test', 'how-friends-see-me-test', 'attachment-style-test']
      },
      {
        key: 'realist',
        title: '흔들리지 않는 극현실주의자',
        summary: '드라마는 드라마일 뿐, 나의 감정은 동요하지 않지',
        description: '감정에 쉽게 휩쓸리지 않는 단단하고 차분한 바위 같은 사람입니다. 영화에서 슬픈 장면이 나와도 "CG네", "배우들 연기 잘하네"라며 분석적인 시각을 유지합니다. 상상보다는 팩트와 현실을 중요하게 생각하는 진정한 T(사고형)의 기운이 느껴지네요.',
        strengths: ['객관적이고 냉철한 판단력', '남들보다 스트레스를 덜 받음', '언제나 평정심 유지'],
        caution: ['공감 능력이 부족하다는 오해를 살 수 있어요', '너무 현실만 따지면 삶의 낭만이 줄어들 수 있어요'],
        shareText: '나의 과몰입 성향은 "극현실주의자" 🗿 너는 어느 정도야?',
        recommendedTests: ['intuition-vs-logic-test', 'love-style-test', 'attachment-style-test']
      }
    ]
  },
  {
    slug: 'how-friends-see-me-test',
    title: '친구들이 생각하는 나의 포지션',
    description: '우리 무리에서 나는 어떤 역할을 맡고 있을까?',
    category: '재미 테스트',
    estimatedTime: '3분',
    emoji: '👥',
    questions: [
      {
        id: 1,
        text: '친구들과 만날 약속을 잡을 때 나는?',
        options: [
          { label: '"이번 주 주말 언제 시간 돼?" 방장을 자처한다', scores: { energy: 3, reliability: 1 } },
          { label: '단톡방에 장소, 시간 투표를 올려서 정리한다', scores: { energy: 1, reliability: 3 } },
          { label: '"나는 아무 때나 좋아!" 시간과 장소에 그냥 맞춘다', scores: { energy: 0, reliability: 0 } },
          { label: '누가 물어보면 그제서야 스케줄을 확인한다', scores: { energy: -1, reliability: -1 } }
        ]
      },
      {
        id: 2,
        text: '술자리가 무르익었을 때 나의 모습은?',
        options: [
          { label: '테이블 가운데서 마이크 잡고 떠드는 주역', scores: { energy: 3, humor: 2 } },
          { label: '취한 친구들 물 먹이고 챙겨주는 엄마/아빠', scores: { energy: 0, reliability: 3 } },
          { label: '친구들 노는 거 보면서 낄낄대며 리액션 봇 변신', scores: { energy: 1, humor: 1 } },
          { label: '구석에서 안주 푸파하며 핸드폰 하기', scores: { energy: -2, reliability: 0 } }
        ]
      },
      {
        id: 3,
        text: '친구가 우울하다며 새벽에 전화가 온다면?',
        options: [
          { label: '"야 당장 나와!" 일단 불러내서 텐션을 올린다', scores: { energy: 3, reliability: 1 } },
          { label: '끝까지 묵묵히 다 들어주며 깊게 위로한다', scores: { energy: 0, reliability: 3 } },
          { label: '웃긴 짤이나 밈을 보내면서 기분을 풀어주려 한다', scores: { energy: 1, humor: 3 } },
          { label: '"자냐?" 하고 다음날 아침에 전화한다', scores: { energy: -1, reliability: 0 } }
        ]
      },
      {
        id: 4,
        text: '친구들 사이에서 내 유머 타율은?',
        options: [
          { label: '숨만 쉬어도 빵빵 터지는 예능캐', scores: { humor: 4, energy: 2 } },
          { label: '조용히 있다가 한마디씩 툭 던지는데 그게 레전드', scores: { humor: 3, energy: -1 } },
          { label: '내가 웃기기보단 남들 말에 리액션을 잘 해줌', scores: { humor: 0, reliability: 1 } },
          { label: '주로 친구들에게 몰이당하고 놀림받는 타격감 좋은 캐', scores: { humor: 2, energy: 0 } }
        ]
      },
      {
        id: 5,
        text: '여행지 숙소에서 아침이 밝았다. 나는?',
        options: [
          { label: '제일 먼저 일어나서 친구들 다 깨우기', scores: { energy: 3, reliability: 1 } },
          { label: '일어나서 묵묵히 어젯밤 흔적 치우고 물 끓여놓기', scores: { energy: 0, reliability: 3 } },
          { label: '친구들이 깨울 때까지 절대 못 일어남', scores: { energy: -2, reliability: -1 } },
          { label: '침대에 누운 채로 핸드폰 하면서 남들 씻는 거 구경함', scores: { energy: -1, reliability: 0 } }
        ]
      },
      {
        id: 6,
        text: '친구가 생일 선물을 물어볼 때 나는?',
        options: [
          { label: '원하는 거 1, 2, 3위 리스트 정리해서 보내줌', scores: { reliability: 2, humor: 0 } },
          { label: '"네가 주는 거면 다 좋아~" (진심임)', scores: { reliability: 1, energy: 1 } },
          { label: '"현찰이 최고지ㅋㅋ" 장난치며 농담하기', scores: { humor: 2, energy: 1 } },
          { label: '"진짜 안 줘도 되는데..." 미안해서 거절하다 결국 받음', scores: { reliability: 0, energy: -1 } }
        ]
      },
      {
        id: 7,
        text: '친구들이 나를 찾을 때는 보통 어떤 상황?',
        options: [
          { label: '갑자기 심심해서 놀 사람 필요할 때', scores: { energy: 3, humor: 1 } },
          { label: '진지한 고민 상담이나 조언이 필요할 때', scores: { reliability: 3, energy: 0 } },
          { label: '우울해서 웃고 싶거나 기분전환 필요할 때', scores: { humor: 3, energy: 1 } },
          { label: '자료 조사나 정보가 필요할 때 (인간 지식인)', scores: { reliability: 2, energy: -1 } }
        ]
      },
      {
        id: 8,
        text: '단체 사진을 찍을 때 나의 위치는?',
        options: [
          { label: '맨 앞이나 센터에서 가장 요란한 포즈 취하기', scores: { energy: 3, humor: 2 } },
          { label: '카메라 들고 애들 예쁘게 찍어주느라 바쁨', scores: { reliability: 3, energy: 0 } },
          { label: '가장자리에서 소심한 브이', scores: { energy: -1, reliability: 0 } },
          { label: '이상한 표정 짓고 엽사 남기기', scores: { humor: 3, energy: 1 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const e = scores.energy || 0;
      const r = scores.reliability || 0;
      const h = scores.humor || 0;
      
      if (h >= 10 && e >= 5) return 'mood-maker';
      if (r >= 10) return 'parent';
      if (h >= 8 && e <= 2) return 'hidden-comedian';
      if (e <= 0 && r <= 5) return 'observer';
      
      return 'mood-maker'; // fallback
    },
    results: [
      {
        key: 'mood-maker',
        title: '인간 비타민 (분위기 메이커)',
        summary: '네가 없으면 모임이 안 돌아가! 확신의 에너자이저',
        description: '친구들 사이에서 절대 빠져선 안 될 인간 비타민입니다! 특유의 높은 텐션과 유머 감각으로 분위기를 주도하며, 어색한 분위기도 단숨에 깨버리는 매력을 가졌어요. 어디서든 눈에 띄며 모임의 활력을 책임지는 완벽한 예능 캐릭터입니다.',
        strengths: ['주변 사람을 웃게 만드는 능력', '지치지 않는 체력', '어색함 제로 친화력'],
        caution: ['가끔은 조용히 분위기를 타는 것도 매력적이에요', '에너지를 너무 쓰다 혼자 있을 때 급방전 될 수 있어요'],
        shareText: '친구들이 보는 내 포지션은 "인간 비타민 분위기 메이커" 🍋 너희가 볼 때도 그래?',
        recommendedTests: ['hidden-personality-test', 'over-immersion-test', 'love-style-test']
      },
      {
        key: 'parent',
        title: '든든한 기둥 (엄마/아빠 역할)',
        summary: '술자리 뒷수습부터 고민 상담까지, 무리의 듬직한 보호자',
        description: '친구들 사이에서 유독 어른스럽고 책임감이 강해 \'엄마\' 혹은 \'아빠\'로 불릴 확률이 높습니다. 술 취한 친구를 챙기고, 꼼꼼하게 일정을 조율하며, 누군가 힘들어할 때 가장 먼저 달려가 어깨를 내어주는 따뜻한 사람입니다. 친구들이 당신을 아주 깊게 신뢰하고 있어요.',
        strengths: ['뛰어난 책임감과 배려심', '위기 상황 대처 능력', '신뢰도 100%'],
        caution: ['남을 챙기느라 정작 나 자신을 놓치고 있진 않나요?', '가끔은 친구들에게 기대는 모습도 보여주세요'],
        shareText: '친구들이 보는 내 포지션은 "든든한 기둥 보호자" 🛡️ 내가 널 이렇게 챙긴다!',
        recommendedTests: ['attachment-style-test', 'intuition-vs-logic-test', 'hidden-personality-test']
      },
      {
        key: 'hidden-comedian',
        title: '타격감 MAX (숨은 예능캐)',
        summary: '가만히 있다가 한 마디 툭 던지면 빵 터지는 씬스틸러',
        description: '평소에는 얌전해 보이지만 가끔 입을 열면 레전드 어록을 갱신하는 타격감 쩌는 캐릭터입니다. 억지로 웃기려 하지 않아도 뿜어져 나오는 독특한 아우라와 팩트폭력, 혹은 엉뚱한 매력으로 무리의 씬스틸러 역할을 톡톡히 해냅니다. 알면 알수록 진국인 스타일이에요.',
        strengths: ['허를 찌르는 유머 감각', '독특한 세계관', '부담스럽지 않은 편안함'],
        caution: ['팩트폭력이 가끔 친구의 뼈를 너무 때릴 수 있어요', '반응이 좋다고 무리수를 두지 마세요'],
        shareText: '친구들이 보는 내 포지션은 "타격감 MAX 숨은 예능캐" 🎤 나 쫌 웃기지?',
        recommendedTests: ['over-immersion-test', 'intuition-vs-logic-test', 'how-friends-see-me-test']
      },
      {
        key: 'observer',
        title: '무해한 관찰자 (리액션 장인)',
        summary: '구석에서 방긋방긋 웃으며 모든 것을 지켜보는 평화주의자',
        description: '무리에서 크게 목소리를 내진 않지만, 누구보다 친구들의 이야기에 귀 기울이고 환하게 웃어주는 무해한 존재입니다. 당신이 있는 것만으로도 모임이 한결 부드럽고 편안해집니다. 갈등을 싫어하며 둥글둥글한 성격이라 적이 없는 완벽한 평화주의자예요.',
        strengths: ['경청의 달인', '최고의 리액션', '누구에게나 호감을 주는 무해함'],
        caution: ['가끔은 당신의 의견과 주장을 강하게 말해도 좋아요', '존재감이 너무 흐릿해지지 않게 주의하세요'],
        shareText: '친구들이 보는 내 포지션은 "무해한 관찰자 리액션 장인" 👀 늘 지켜보고 있다!',
        recommendedTests: ['attachment-style-test', 'hidden-personality-test', 'love-style-test']
      }
    ]
  },
  {
    slug: 'intuition-vs-logic-test',
    title: '내 머릿속의 직관 vs 논리',
    description: '결정의 순간, 당신을 움직이는 건 차가운 이성일까, 번뜩이는 직감일까?',
    category: '성격 테스트',
    estimatedTime: '3분',
    emoji: '🧠',
    questions: [
      {
        id: 1,
        text: '새로운 전자기기를 샀을 때, 가장 먼저 하는 행동은?',
        options: [
          { label: '일단 이것저것 눌러보며 직감적으로 작동법을 익힌다', scores: { intuition: 3, logic: 0 } },
          { label: '기본적인 기능부터 켜보고 메뉴얼을 슬쩍 본다', scores: { intuition: 1, logic: 1 } },
          { label: '설명서를 1페이지부터 꼼꼼히 정독한다', scores: { intuition: 0, logic: 3 } },
          { label: '유튜브에서 전문가의 리뷰와 사용법 영상을 정독한다', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 2,
        text: '친구가 "나 요새 썸타는 것 같아!" 라고 말하면 내 첫 질문은?',
        options: [
          { label: '"헐 대박! 누군데? 느낌 어때? 잘 될 거 같아?"', scores: { intuition: 3, logic: 0 } },
          { label: '"어떻게 만났는데? 연락은 자주 해?"', scores: { intuition: 1, logic: 2 } },
          { label: '"썸이라고 판단한 명확한 근거가 뭐야?"', scores: { intuition: 0, logic: 3 } },
          { label: '"그 사람 뭐 하는 사람이야? 정보 좀 줘봐"', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 3,
        text: '식당을 고를 때 나의 방식은?',
        options: [
          { label: '지나가다 간판이나 냄새가 끌리는 곳으로 즉흥적으로 들어간다', scores: { intuition: 3, logic: 0 } },
          { label: '별점과 방문자 리뷰를 꼼꼼히 교차 검증하고 분석해서 간다', scores: { intuition: 0, logic: 3 } },
          { label: '검색해보고 제일 맛있어 보이는 사진이 있는 곳으로 간다', scores: { intuition: 2, logic: 1 } },
          { label: '가성비와 위치, 대기 시간 등 효율을 따져본다', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 4,
        text: '퍼즐이나 추리 게임을 할 때 나는?',
        options: [
          { label: '전체적인 그림이나 패턴을 한눈에 파악하려고 한다', scores: { intuition: 3, logic: 0 } },
          { label: '주어진 단서를 하나하나 나열해 놓고 논리적으로 소거한다', scores: { intuition: 0, logic: 3 } },
          { label: '촉이 오는 단서부터 집중적으로 파고든다', scores: { intuition: 2, logic: 1 } },
          { label: '규칙을 완전히 이해할 때까지 행동하지 않는다', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 5,
        text: '복잡한 문제를 해결해야 할 때, 나의 사고 과정은?',
        options: [
          { label: '갑자기 번뜩이는 아이디어나 영감이 떠오른다', scores: { intuition: 3, logic: 0 } },
          { label: '원인부터 결과까지 체계적인 순서도로 정리한다', scores: { intuition: 0, logic: 3 } },
          { label: '비슷한 과거의 경험이나 직감을 바탕으로 유추한다', scores: { intuition: 2, logic: 1 } },
          { label: '데이터와 수치를 모아 확률이 높은 쪽을 선택한다', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 6,
        text: '"이 사람 왠지 좋은 사람인 것 같아" 라는 판단의 기준은?',
        options: [
          { label: '눈빛, 말투, 분위기에서 느껴지는 강력한 나의 직감', scores: { intuition: 3, logic: 0 } },
          { label: '그동안 그 사람이 보여준 행동과 언행의 일관성', scores: { intuition: 0, logic: 3 } },
          { label: '나와 얼마나 대화 코드가 핑퐁이 잘 맞는지', scores: { intuition: 2, logic: 1 } },
          { label: '주변 사람들의 객관적인 평가와 평판', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 7,
        text: '영화를 볼 때, 내가 감탄하는 포인트는?',
        options: [
          { label: '영화가 주는 묵직한 메시지와 상징적인 미장센', scores: { intuition: 3, logic: 0 } },
          { label: '앞뒤가 딱딱 맞는 완벽한 떡밥 회수와 치밀한 플롯', scores: { intuition: 0, logic: 3 } },
          { label: '가슴을 울리는 등장인물들의 감정선', scores: { intuition: 2, logic: 1 } },
          { label: '현실 고증이 완벽하게 된 디테일한 연출', scores: { intuition: 0, logic: 2 } }
        ]
      },
      {
        id: 8,
        text: '누군가를 설득해야 할 때, 나의 주특기는?',
        options: [
          { label: '상대의 감정을 건드리고 큰 그림(비전)을 제시한다', scores: { intuition: 3, logic: 0 } },
          { label: '반박 불가한 팩트와 수치, 논거를 준비한다', scores: { intuition: 0, logic: 3 } },
          { label: '열정적인 어조와 확신에 찬 눈빛으로 압도한다', scores: { intuition: 2, logic: 1 } },
          { label: '장단점을 표로 정리해서 객관적으로 비교해 준다', scores: { intuition: 0, logic: 2 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const i = scores.intuition || 0;
      const l = scores.logic || 0;
      
      if (i > l && i - l >= 8) return 'extreme-intuition';
      if (l > i && l - i >= 8) return 'extreme-logic';
      if (i > l) return 'emotional-logic'; // 직관 우세형
      return 'balanced-thinker'; // 논리 우세형
    },
    results: [
      {
        key: 'extreme-intuition',
        title: '번뜩이는 영감! 완전 직관형',
        summary: '"내 촉은 틀리지 않아" 느낌표로 세상을 보는 사람',
        description: '복잡한 설명이나 데이터 없이도, 본능적으로 정답을 찾아내는 탁월한 직감의 소유자입니다. 나무보다는 숲을 보는 능력이 뛰어나며 통찰력과 상상력이 매우 풍부합니다. 논리적으로 설명할 순 없지만 결과적으로 당신의 초기 판단이 맞았음이 증명되는 신기한 경험을 자주 합니다.',
        strengths: ['뛰어난 창의력과 영감', '전체를 꿰뚫어 보는 통찰력', '빠른 의사 결정'],
        caution: ['가끔은 직감이 틀릴 때를 대비해 크로스체크가 필요해요', '남들을 설득할 때는 조금 더 구체적인 근거가 필요합니다'],
        shareText: '나의 사고 방식은 느낌 빡! "완전 직관형" ✨ 네 뇌구조도 궁금해!',
        recommendedTests: ['hidden-personality-test', 'over-immersion-test', 'how-friends-see-me-test']
      },
      {
        key: 'extreme-logic',
        title: '칼같은 이성! 완전 논리형',
        summary: '"근거가 뭐야?" 데이터와 팩트로 세상을 해독하는 사람',
        description: '당신의 머릿속은 정교한 알고리즘으로 돌아가고 있습니다. 감정이나 막연한 느낌보다는 확실한 데이터, 인과관계, 합리성을 최우선으로 여깁니다. 복잡하게 꼬인 문제도 차근차근 분석하여 최적의 해답을 찾아내는 데 탁월한 능력을 발휘하는 진정한 뇌섹남/뇌섹녀입니다.',
        strengths: ['빈틈없는 분석력', '객관적이고 공정한 판단', '문제 해결의 마스터'],
        caution: ['가끔은 정답이 없는 감정적인 영역도 존재함을 인정해야 해요', '너무 팩트폭력을 날리면 주변이 상처받을 수 있습니다'],
        shareText: '나의 사고 방식은 팩트 폭격기 "완전 논리형" 🤖 네 뇌구조도 궁금해!',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'hidden-personality-test']
      },
      {
        key: 'emotional-logic',
        title: '따뜻한 통찰가! 감성 직관형',
        summary: '이해심과 통찰력을 동시에 지닌 부드러운 카리스마',
        description: '직관을 바탕으로 하되, 사람의 감정과 상황의 맥락을 논리적으로 연결할 줄 아는 유연한 사고방식을 가졌습니다. 눈치가 빠르면서도 이를 타인을 배려하는 방향으로 사용할 줄 압니다. 느낌적인 느낌을 그럴듯한 언어로 설명해내는 뛰어난 전달력을 갖추고 있네요.',
        strengths: ['사람의 마음을 잘 읽어냄', '유연하고 포용력 있는 사고', '설득력 있는 화술'],
        caution: ['논리와 감정 사이에서 혼자 내적 갈등을 겪을 때가 많아요', '결정을 내리기 전 생각이 너무 많아질 수 있습니다'],
        shareText: '나의 사고 방식은 부드러운 카리스마 "감성 직관형" 🎨 네 뇌구조도 궁금해!',
        recommendedTests: ['how-friends-see-me-test', 'love-style-test', 'attachment-style-test']
      },
      {
        key: 'balanced-thinker',
        title: '황금 비율! 균형형 사고자',
        summary: '머리는 차갑게, 가슴은 뜨겁게! 이성과 직감의 완벽한 조화',
        description: '상황에 따라 직관과 논리를 스위치 켜듯 자유롭게 활용하는 능력자입니다. 아이디어를 떠올릴 때는 직관을 사용하고, 그것을 실행할 때는 철저한 논리를 적용합니다. 극단적으로 치우치지 않기 때문에 어떤 상황이나 그룹에서도 훌륭한 중재자나 기획자 역할을 해냅니다.',
        strengths: ['뛰어난 현실 감각과 상상력의 밸런스', '어떤 환경에도 잘 적응함', '합리적인 의사결정'],
        caution: ['모든 걸 완벽하게 조율하려다 스스로 피곤해질 수 있어요', '때로는 한쪽으로 완전히 미쳐보는 경험도 필요합니다'],
        shareText: '나의 사고 방식은 완벽한 밸런스 "균형형 사고자" ⚖️ 네 뇌구조도 궁금해!',
        recommendedTests: ['attachment-style-test', 'hidden-personality-test', 'intuition-vs-logic-test']
      }
    ]
  },
  {
    slug: 'mbti-test',
    title: '나의 MBTI는 무엇일까?',
    description: '12개 질문으로 알아보는 나의 진짜 MBTI 유형. 솔직하게 답할수록 더 정확해요.',
    category: 'MBTI',
    estimatedTime: '4분',
    emoji: '🧠',
    questions: [
      {
        id: 1,
        text: '사람들과 오래 있고 나면 나는?',
        options: [
          { label: '더 신나고 에너지가 올라온다', scores: { ei: 2 } },
          { label: '혼자만의 시간이 절실해진다', scores: { ei: -2 } }
        ]
      },
      {
        id: 2,
        text: '처음 보는 사람이 많은 자리에서 나는?',
        options: [
          { label: '먼저 말 걸고 빠르게 어울린다', scores: { ei: 2 } },
          { label: '분위기를 파악하며 조용히 있는다', scores: { ei: -2 } }
        ]
      },
      {
        id: 3,
        text: '힘든 일이 있을 때 나는?',
        options: [
          { label: '친구에게 털어놓으면 마음이 풀린다', scores: { ei: 2 } },
          { label: '혼자 조용히 정리할 시간이 필요하다', scores: { ei: -2 } }
        ]
      },
      {
        id: 4,
        text: '무언가를 설명할 때 나는?',
        options: [
          { label: '구체적인 사례와 실제 경험을 들어 말한다', scores: { sn: 2 } },
          { label: '비유와 큰 그림으로 이야기하는 편이다', scores: { sn: -2 } }
        ]
      },
      {
        id: 5,
        text: '결정할 때 더 믿는 건?',
        options: [
          { label: '검증된 사실과 실제 경험', scores: { sn: 2 } },
          { label: '직감과 가능성에 대한 느낌', scores: { sn: -2 } }
        ]
      },
      {
        id: 6,
        text: '끌리는 대화 주제는?',
        options: [
          { label: '요즘 사는 이야기, 실용적인 정보 교환', scores: { sn: 2 } },
          { label: '"만약에~", 미래 가능성, 아이디어 토론', scores: { sn: -2 } }
        ]
      },
      {
        id: 7,
        text: '친구가 "나 진짜 힘들어"라고 하면 나는?',
        options: [
          { label: '왜 그렇게 됐는지 분석하고 해결책을 찾아준다', scores: { tf: 2 } },
          { label: '"맞아, 진짜 힘들었겠다"라며 일단 공감한다', scores: { tf: -2 } }
        ]
      },
      {
        id: 8,
        text: '중요한 결정을 할 때 나는?',
        options: [
          { label: '감정은 잠시 옆에 두고 논리적으로 분석한다', scores: { tf: 2 } },
          { label: '내 감정과 관련된 사람들 기분도 꼭 고려한다', scores: { tf: -2 } }
        ]
      },
      {
        id: 9,
        text: '누군가 명백히 틀렸을 때 나는?',
        options: [
          { label: '솔직하게 뭐가 잘못됐는지 말해준다', scores: { tf: 2 } },
          { label: '상처받을까봐 돌려서 부드럽게 말한다', scores: { tf: -2 } }
        ]
      },
      {
        id: 10,
        text: '일정이나 약속을 잡을 때 나는?',
        options: [
          { label: '미리 정해두고 달력에 표시해야 편하다', scores: { jp: 2 } },
          { label: '대충 정해두고 그때그때 조율하면 된다', scores: { jp: -2 } }
        ]
      },
      {
        id: 11,
        text: '여행을 계획한다면 나는?',
        options: [
          { label: '숙소, 식당, 동선을 미리 완벽하게 짜둔다', scores: { jp: 2 } },
          { label: '방향만 대충 잡고 현지에서 즉흥적으로', scores: { jp: -2 } }
        ]
      },
      {
        id: 12,
        text: '마감이나 기한에 대해 나는?',
        options: [
          { label: '기한 훨씬 전에 끝내야 마음이 편하다', scores: { jp: 2 } },
          { label: '마감이 다가와야 집중력이 제대로 올라온다', scores: { jp: -2 } }
        ]
      }
    ],
    calculateResult: (scores) => {
      const e = (scores.ei ?? 0) >= 0 ? 'E' : 'I';
      const s = (scores.sn ?? 0) >= 0 ? 'S' : 'N';
      const t = (scores.tf ?? 0) >= 0 ? 'T' : 'F';
      const j = (scores.jp ?? 0) >= 0 ? 'J' : 'P';
      return `${e}${s}${t}${j}`;
    },
    results: [
      {
        key: 'ENTJ',
        title: '타고난 전략가 (ENTJ)',
        summary: '태어나서 지금까지 항상 팀장... 솔직히 그게 편해',
        description: '목표를 정하면 반드시 이루고야 마는 의지의 인간. 카리스마와 추진력이 넘쳐서 자연스럽게 주변을 이끌게 됩니다. 비효율을 못 참고 계획을 세우면 무조건 실행하며, 성취에서 에너지를 얻고 멈추는 법을 잘 모릅니다. 리더 자리가 딱 맞는 사람이에요.',
        strengths: ['탁월한 리더십과 강력한 추진력', '복잡한 상황을 빠르게 구조화하는 전략적 사고', '목표 달성에 대한 집요한 집중력'],
        caution: ['너무 직설적이어서 상대방이 상처받는 줄 모를 때가 있어요', '효율만 강조하다 보면 사람의 감정이 놓이기 쉽습니다'],
        shareText: '나는 타고난 전략가 "ENTJ" 🦁 당신의 MBTI는?',
        recommendedTests: ['hidden-personality-test', 'how-friends-see-me-test', 'intuition-vs-logic-test'],
        relationshipStyle: { ko: '연애도 목표를 정하고 전략적으로 접근합니다. 표현은 직접적이지만 책임감 하나만큼은 완벽하고, 상대방이 인정해줄 때 더 깊이 헌신해요.', en: 'Approaches love with strategy and clear goals. Direct in expression but deeply devoted—thrives when a partner recognizes their dedication.', ja: '恋愛も目標を持って戦略的に取り組みます。表現は直接的ですが責任感は完璧で、認めてもらえるほど深く献身します。', es: 'Aborda el amor con estrategia y metas claras. Directo en la expresión pero profundamente comprometido cuando su pareja lo reconoce.', 'pt-BR': 'Aborda o amor com estratégia e metas claras. Direto na expressão mas profundamente comprometido quando o parceiro o reconhece.', fr: 'Approaches love with strategy and clear goals. Direct in expression but deeply devoted—thrives when a partner recognizes their dedication.' },
        compatibleVibe: { ko: 'INFP, INTP — 나의 강한 방향성을 부드럽게 채워줄 유형과 잘 맞아요', en: 'INFP, INTP — Types who gently balance your strong drive with warmth and flexibility', ja: 'INFP, INTP — 強い方向性を優しく補ってくれるタイプと相性◎', es: 'INFP, INTP — Tipos que equilibran suavemente tu fuerte sentido de dirección', 'pt-BR': 'INFP, INTP — Tipos que equilibram suavemente o seu forte senso de direção', fr: 'INFP, INTP — Types who gently balance your strong drive with warmth and flexibility' }
      },
      {
        key: 'ENTP',
        title: '끝없는 아이디어 뱅크 (ENTP)',
        summary: '"어? 이거 재밌겠는데?"를 하루에 15번 하는 사람',
        description: '세상 모든 것에 "왜?"와 "근데 이렇게 하면 어때?"를 달고 사는 호기심 폭발형 인간. 토론을 놀이처럼 즐기고 반박당할수록 더 신이 납니다. 아이디어는 무한하지만 완성하는 건 별개의 문제이고, 지루한 건 진짜 못 참아요.',
        strengths: ['어떤 상황에서도 창의적인 해결책을 찾아내는 능력', '지적 호기심이 폭발적이고 학습 속도가 빠름', '날카로운 유머와 뛰어난 말솜씨'],
        caution: ['완성하지 못한 프로젝트가 폴더에 쌓여있을 가능성 높음', '토론 모드로 달려들어 상대방을 지치게 할 때가 있어요'],
        shareText: '나는 아이디어 뱅크 "ENTP" 💡 당신의 MBTI는?',
        recommendedTests: ['intuition-vs-logic-test', 'hidden-personality-test', 'how-friends-see-me-test'],
        relationshipStyle: { ko: '지적 대화와 논쟁을 즐기는 연애 스타일. 다양한 이야기를 나눌 수 있는 관계에서 가장 빛납니다.', en: 'Loves intellectual debate and stimulating conversation in relationships. Shines brightest with a partner who can keep up mentally.', ja: '知的な会話や議論を楽しむ恋愛スタイル。様々な話ができる関係で最も輝きます。', es: 'Disfruta del debate intelectual en el amor. Brilla más con una pareja que pueda seguir su ritmo mental.', 'pt-BR': 'Disfruta do debate intelectual no amor. Brilha mais com um parceiro que consiga acompanhar seu ritmo mental.', fr: 'Loves intellectual debate and stimulating conversation in relationships. Shines brightest with a partner who can keep up mentally.' },
        compatibleVibe: { ko: 'INFJ, INTJ — 나의 발산적 에너지를 수렴해줄 깊이 있는 유형과 잘 어울려요', en: 'INFJ, INTJ — Deep thinkers who channel your scattered energy into focus', ja: 'INFJ, INTJ — 発散するエネルギーを収束させてくれる深みのあるタイプ', es: 'INFJ, INTJ — Pensadores profundos que canalizan tu energía dispersa', 'pt-BR': 'INFJ, INTJ — Pensadores profundos que canalizam a sua energia dispersa', fr: 'INFJ, INTJ — Deep thinkers who channel your scattered energy into focus' }
      },
      {
        key: 'ENFJ',
        title: '사람들의 빛나는 조력자 (ENFJ)',
        summary: '남 걱정을 내 걱정보다 먼저 하는 참사랑 인간',
        description: '주변 사람이 빛나도록 돕는 것에서 진짜 행복을 찾는 유형. 공감 능력이 뛰어나고 사람 사이의 갈등을 감지하는 레이더가 예민합니다. 타인을 위해 에너지를 쏟다 보면 정작 자신의 필요를 놓치는 경우가 생기니 주의가 필요해요.',
        strengths: ['뛰어난 공감 능력과 사람을 끌어당기는 따뜻한 매력', '조직 내 갈등을 자연스럽게 중재하는 능력', '상대방의 잠재력을 알아보고 성장시키는 힘'],
        caution: ['거절을 못 해서 자신을 너무 소진시킬 때가 있어요', '사람들의 기대에 부응하려다 스트레스가 쌓입니다'],
        shareText: '나는 따뜻한 조력자 "ENFJ" 🌟 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'how-friends-see-me-test'],
        relationshipStyle: { ko: '깊고 의미 있는 연애를 추구합니다. 상대방의 성장을 진심으로 응원하며 함께 더 나은 사람이 되고 싶어하는 헌신적인 연인이에요.', en: "Seeks deep, meaningful love. Sincerely cheers on a partner's growth and strives to grow together.", ja: '深く意味のある恋愛を求めます。相手の成長を心から応援し、共に高め合える献身的な恋人です。', es: 'Busca un amor profundo y significativo. Apoya el crecimiento de su pareja y quiere crecer juntos.', 'pt-BR': 'Busca um amor profundo e significativo. Apoia o crescimento do parceiro e quer crescer juntos.', fr: "Seeks deep, meaningful love. Sincerely cheers on a partner's growth and strives to grow together." },
        compatibleVibe: { ko: 'INFP, ISFP — 나의 따뜻함을 온전히 받아들이고 순수하게 감동받는 유형과 맞아요', en: 'INFP, ISFP — Types who fully embrace your warmth and are genuinely moved by it', ja: 'INFP, ISFP — 温かさを丸ごと受け取り、純粋に感動してくれるタイプ', es: 'INFP, ISFP — Tipos que reciben tu calidez con autenticidad y gratitud', 'pt-BR': 'INFP, ISFP — Tipos que recebem o seu calor com autenticidade e gratidão', fr: 'INFP, ISFP — Types who fully embrace your warmth and are genuinely moved by it' }
      },
      {
        key: 'ENFP',
        title: '낭만 넘치는 자유 영혼 (ENFP)',
        summary: '오늘도 설레는 거 하나 발견했음 ✨ 내일도 발견할 예정',
        description: '매일이 새롭고 신나는 세계. 열정과 호기심이 넘치고 사람들에게 에너지와 영감을 나눠주는 게 특기입니다. 관심사가 너무 많아서 한 가지에만 집중하는 게 세상에서 제일 어렵고, 반복되는 일상은 진짜 힘들어요.',
        strengths: ['넘치는 열정과 사람들에게 영감을 주는 에너지', '창의적이고 다양한 시각으로 문제를 바라보는 능력', '진심 어린 공감과 따뜻한 지지'],
        caution: ['흥미가 식으면 빠르게 손을 놓는 경향이 있어요', '미루다 보면 마감 직전에 터지는 경우가 자주 생깁니다'],
        shareText: '나는 낭만 자유 영혼 "ENFP" 🌈 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'over-immersion-test', 'hidden-personality-test'],
        relationshipStyle: { ko: '처음 감정이 폭발하는 썸 단계를 가장 설레게 즐깁니다. 관계가 깊어질수록 자유와 진심 사이에서 균형을 잡으려 노력해요.', en: 'Thrives in the electric early stages of romance. Balances freedom and sincerity as the relationship deepens.', ja: '感情が爆発する初期のときめき期が最も輝きます。関係が深まるにつれ自由と誠実さのバランスを大切にします。', es: 'Disfruta al máximo la etapa inicial del romance. Busca equilibrar libertad y sinceridad a medida que la relación profundiza.', 'pt-BR': 'Curte ao máximo a fase inicial do romance. Busca equilibrar liberdade e sinceridade conforme o relacionamento se aprofunda.', fr: 'Thrives in the electric early stages of romance. Balances freedom and sincerity as the relationship deepens.' },
        compatibleVibe: { ko: 'INTJ, INFJ — 나의 에너지를 묵묵히 받아주고 방향을 잡아줄 유형과 잘 맞아요', en: 'INTJ, INFJ — Types who quietly absorb your energy and give you direction', ja: 'INTJ, INFJ — エネルギーを黙って受け止め、方向性を示してくれるタイプ', es: 'INTJ, INFJ — Tipos que absorben tu energía y te dan dirección con calma', 'pt-BR': 'INTJ, INFJ — Tipos que absorvem a sua energia e lhe dão direção com calma', fr: 'INTJ, INFJ — Types who quietly absorb your energy and give you direction' }
      },
      {
        key: 'ESTJ',
        title: '규칙과 질서의 수호자 (ESTJ)',
        summary: '계획대로 안 되면 일단 숨부터 참음',
        description: '체계와 규칙을 사랑하고 해야 할 일 목록을 지우는 쾌감을 아는 사람. 약속 시간 5분 전에 도착하고 맡은 일은 끝까지 해내는 책임감의 화신입니다. 주변이 어수선하거나 계획이 틀어지면 속이 타들어가는 걸 느끼기도 해요.',
        strengths: ['탁월한 실행력과 흔들리지 않는 책임감', '조직과 시스템을 효율적으로 운영하는 능력', '일관된 원칙과 높은 신뢰감'],
        caution: ['변화에 유연하게 적응하는 게 스트레스가 될 수 있어요', '내 기준으로 타인을 평가하다 관계가 어색해질 때가 있습니다'],
        shareText: '나는 강직한 수호자 "ESTJ" 📋 당신의 MBTI는?',
        recommendedTests: ['how-friends-see-me-test', 'hidden-personality-test', 'intuition-vs-logic-test'],
        relationshipStyle: { ko: '안정적이고 신뢰할 수 있는 파트너. 감정 표현은 서툴 수 있지만 행동으로 진심을 보여주는 든든한 연인이에요.', en: 'A stable, reliable partner. May struggle with words but shows love through dependable, consistent actions.', ja: '安定感と信頼感のあるパートナー。感情表現は苦手でも行動で愛情をしっかり示します。', es: 'Pareja estable y confiable. Puede no ser elocuente, pero demuestra amor con acciones sólidas y constantes.', 'pt-BR': 'Parceiro estável e confiável. Pode não ser eloquente, mas demonstra amor com ações sólidas e constantes.', fr: 'A stable, reliable partner. May struggle with words but shows love through dependable, consistent actions.' },
        compatibleVibe: { ko: 'ISFP, ISTP — 나의 강한 계획성 옆에서 여유로운 균형을 맞춰줄 유형과 잘 어울려요', en: 'ISFP, ISTP — Types who bring a relaxed balance alongside your structured drive', ja: 'ISFP, ISTP — 計画的な性格の隣で余裕のあるバランスをとってくれるタイプ', es: 'ISFP, ISTP — Tipos que aportan equilibrio relajado junto a tu sentido de estructura', 'pt-BR': 'ISFP, ISTP — Tipos que trazem equilíbrio tranquilo ao lado do seu senso de estrutura', fr: 'ISFP, ISTP — Types who bring a relaxed balance alongside your structured drive' }
      },
      {
        key: 'ESFJ',
        title: '모두의 분위기 메이커 (ESFJ)',
        summary: '다 같이 즐거워야 진짜 즐거운 거지',
        description: '그룹 분위기를 주도하고 모두가 행복한지 가장 먼저 체크하는 타입. 타인을 배려하는 게 자연스럽고 칭찬받으면 진짜 열심히 합니다. 갈등이나 비판을 받으면 마음이 오래 걸리는 편이고, 인정받고 싶은 마음도 크게 있어요.',
        strengths: ['분위기를 따뜻하게 만드는 탁월한 소통 능력', '주변 사람들의 필요를 먼저 알아채는 섬세한 센스', '약속과 의리를 소중히 여기는 성실함'],
        caution: ['남들 눈치를 너무 봐서 내 의견을 말하기 힘들 때가 있어요', '비판에 민감하게 반응해서 상처를 오래 간직합니다'],
        shareText: '나는 따뜻한 분위기 메이커 "ESFJ" 🎉 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'how-friends-see-me-test', 'attachment-style-test'],
        relationshipStyle: { ko: '헌신적이고 따뜻한 연인. 기념일을 절대 잊지 않으며 상대방이 편안하게 느낄 수 있도록 늘 세심하게 노력합니다.', en: 'Devoted and warm. Never forgets anniversaries and always works to make a partner feel comfortable and loved.', ja: '献身的で温かい恋人。記念日は絶対に忘れず、相手が心地よくいられるよう細やかに気遣います。', es: 'Amante dedicado y cálido. Nunca olvida los aniversarios y siempre se esfuerza por hacer sentir cómoda a su pareja.', 'pt-BR': 'Amante dedicado e caloroso. Nunca esquece os aniversários e sempre se esforça para fazer o parceiro se sentir confortável.', fr: 'Devoted and warm. Never forgets anniversaries and always works to make a partner feel comfortable and loved.' },
        compatibleVibe: { ko: 'ISFP, INFP — 나의 헌신에 감동받고 진심으로 화답하는 감성형과 잘 맞아요', en: 'ISFP, INFP — Emotional types genuinely moved by your devotion who respond wholeheartedly', ja: 'ISFP, INFP — 献身に感動し、心から応えてくれる感性豊かなタイプ', es: 'ISFP, INFP — Tipos sensibles que se conmueven de verdad con tu entrega y responden con el corazón', 'pt-BR': 'ISFP, INFP — Tipos sensíveis que se emocionam de verdade com o seu carinho genuíno', fr: 'ISFP, INFP — Emotional types genuinely moved by your devotion who respond wholeheartedly' }
      },
      {
        key: 'ESTP',
        title: '현장을 지배하는 행동파 (ESTP)',
        summary: '생각은 나중에, 일단 해보고 고치면 됨',
        description: '이론보다 실전, 계획보다 즉흥이 맞는 현장형 인간. 눈앞의 상황을 빠르게 파악하고 재빠르게 대응하는 능력이 탁월합니다. 지루한 이론 강의나 기나긴 회의는 질색이고, 실제로 뛰어들어야 실력이 발휘됩니다. 위기의 순간에 특히 빛나는 타입이에요.',
        strengths: ['어떤 상황도 빠르게 파악하고 대처하는 위기 대응력', '에너지 넘치는 실행력과 대담한 추진력', '현실적이고 실용적인 문제 해결 능력'],
        caution: ['장기 계획이나 반복되는 루틴이 진짜 힘들게 느껴질 수 있어요', '감정적인 부분을 너무 무시하다 관계에서 오해가 생길 수 있습니다'],
        shareText: '나는 현장 마스터 "ESTP" ⚡ 당신의 MBTI는?',
        recommendedTests: ['over-immersion-test', 'how-friends-see-me-test', 'love-style-test'],
        relationshipStyle: { ko: '연애도 즉흥적이고 활기차게. 함께 새로운 경험을 즐기는 것을 중요하게 생각하며 자유롭고 재미있는 관계를 선호해요.', en: 'Spontaneous and energetic in love. Values sharing new experiences and prefers a free, fun-filled relationship.', ja: '恋愛も即興的で活発。新しい体験を一緒に楽しむことを大切にし、自由で楽しい関係を好みます。', es: 'Espontáneo y enérgico en el amor. Valora compartir nuevas experiencias y prefiere relaciones libres y divertidas.', 'pt-BR': 'Espontâneo e energético no amor. Valoriza compartilhar novas experiências com o parceiro.', fr: 'Spontaneous and energetic in love. Values sharing new experiences and prefers a free, fun-filled relationship.' },
        compatibleVibe: { ko: 'ISFJ, ISTJ — 나의 즉흥적인 에너지를 안전하게 잡아줄 안정적인 유형과 잘 맞아요', en: 'ISFJ, ISTJ — Steady types who safely ground your spontaneous energy', ja: 'ISFJ, ISTJ — 即興的なエネルギーを安全に受け止め安定させてくれるタイプ', es: 'ISFJ, ISTJ — Tipos estables que anclan con seguridad tu energía espontánea', 'pt-BR': 'ISFJ, ISTJ — Tipos estáveis que ancoram com segurança a sua energia', fr: 'ISFJ, ISTJ — Steady types who safely ground your spontaneous energy' }
      },
      {
        key: 'ESFP',
        title: '어디서든 파티 주인공 (ESFP)',
        summary: '내가 있어야 파티지, 내가 가면 파티가 되지',
        description: '존재 자체가 에너지인 사람. 분위기를 띄우고 모두를 웃게 만드는 재주가 타고났습니다. 현재 순간을 즐기는 걸 최우선으로 하고, 무겁고 지루한 분위기는 자연스럽게 밝게 전환시켜버립니다. 계획보다는 지금 이 순간의 행복이 가장 중요해요.',
        strengths: ['넘치는 유머와 사람들을 즐겁게 만드는 에너지', '새로운 경험에 대한 열린 마음과 도전 정신', '지금 이 순간에 온전히 집중하는 능력'],
        caution: ['미래 계획이나 장기 목표를 놓치기 쉬워요', '힘든 상황을 외면하다 문제가 커질 수 있습니다'],
        shareText: '나는 파티 주인공 "ESFP" 🎊 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'over-immersion-test', 'how-friends-see-me-test'],
        relationshipStyle: { ko: '사랑받고 또 사랑해주는 것을 적극적으로 즐기는 스타일. 함께하는 순간 하나하나를 특별하게 만들어줍니다.', en: 'Actively enjoys loving and being loved. Makes every moment together feel special and memorable.', ja: '愛されることも愛することも積極的に楽しみます。一緒に過ごす瞬間ひとつひとつを特別にしてくれます。', es: 'Disfruta activamente amar y ser amado. Hace que cada momento juntos sea especial e inolvidable.', 'pt-BR': 'Gosta ativamente de amar e ser amado. Faz de cada momento especial com presença e alegria.', fr: 'Actively enjoys loving and being loved. Makes every moment together feel special and memorable.' },
        compatibleVibe: { ko: 'ISFJ, ISTJ — 나의 화려함 뒤에서 든든하게 지원해줄 유형과 잘 어울려요', en: 'ISFJ, ISTJ — Reliable types who steadily support you behind the scenes', ja: 'ISFJ, ISTJ — 華やかさの裏でしっかりとサポートしてくれるタイプ', es: 'ISFJ, ISTJ — Tipos confiables que te apoyan firmemente entre bastidores', 'pt-BR': 'ISFJ, ISTJ — Tipos confiáveis que o apoiam firmemente a cada passo', fr: 'ISFJ, ISTJ — Reliable types who steadily support you behind the scenes' }
      },
      {
        key: 'INTJ',
        title: '모든 걸 계획한 음모론자 (INTJ)',
        summary: '5년 후의 나를 이미 계획했는데 방해하지 마',
        description: '철저한 계획과 큰 그림을 동시에 그리는 전략의 달인. 말 수가 적지만 한 마디 한 마디에 무게가 있고, 혼자 깊이 사고하는 시간이 꼭 필요합니다. 비효율적인 것들을 보면 속으로 이미 개선안을 짜고 있으며, 남들의 평가보다는 자기 기준이 훨씬 중요해요.',
        strengths: ['치밀한 전략적 사고와 장기적 비전 설계 능력', '독립적이고 자기 주도적인 삶의 태도', '높은 집중력과 독보적인 지적 깊이'],
        caution: ['고집이 세서 다른 의견을 받아들이기 어려울 때가 있어요', '사람들과 따뜻하게 소통하는 부분이 힘들게 느껴질 수 있습니다'],
        shareText: '나는 전략적 음모론자 "INTJ" 🎯 당신의 MBTI는?',
        recommendedTests: ['intuition-vs-logic-test', 'hidden-personality-test', 'attachment-style-test'],
        relationshipStyle: { ko: '관계에 신중하게 접근하지만 한번 마음을 열면 깊고 진지한 연인이 됩니다. 말보다 행동으로 사랑을 표현하는 타입이에요.', en: 'Cautious about relationships, but once open, becomes a deeply devoted partner. Expresses love through actions, not words.', ja: '関係には慎重ですが、心を開いたら深く真剣な恋人に。言葉より行動で愛情を表現するタイプです。', es: 'Cauteloso en las relaciones, pero una vez abierto, se convierte en una pareja profundamente comprometida. Expresa el amor con hechos, no palabras.', 'pt-BR': 'Cauteloso nos relacionamentos, mas uma vez aberto, torna-se um parceiro confiável para a vida toda.', fr: 'Cautious about relationships, but once open, becomes a deeply devoted partner. Expresses love through actions, not words.' },
        compatibleVibe: { ko: 'ENFP, ENTP — 나의 닫힌 세계를 밝고 창의적으로 열어줄 유형과 잘 맞아요', en: 'ENFP, ENTP — Types who creatively and cheerfully open up your closed world', ja: 'ENFP, ENTP — 閉じた世界を明るく創造的に開いてくれるタイプ', es: 'ENFP, ENTP — Tipos que abren tu mundo cerrado de manera creativa y alegre', 'pt-BR': 'ENFP, ENTP — Tipos que abrem o seu mundo fechado de forma criativa', fr: 'ENFP, ENTP — Types who creatively and cheerfully open up your closed world' }
      },
      {
        key: 'INTP',
        title: '끊임없이 분석하는 사색가 (INTP)',
        summary: '잠들기 전 아무도 안 물어본 질문을 혼자 해결 중',
        description: '세상을 이해하려는 끊임없는 호기심의 인간. 복잡한 문제를 파고들면서 희열을 느끼고, 겉으로는 조용해 보이지만 머릿속은 항상 풀가동 중입니다. 감정 표현보다 논리와 분석이 편하고, 정해진 틀보다 자유로운 사고를 좋아해요.',
        strengths: ['깊이 있는 논리적 분석과 개념화 능력', '창의적이고 독창적인 아이디어 생산', '광범위하고 다양한 분야에 걸친 지적 호기심'],
        caution: ['생각이 너무 많아서 결정을 내리지 못하고 멈춰있을 때가 있어요', '사회적 에너지 소모가 크고 감정 표현이 서툴 수 있습니다'],
        shareText: '나는 사색하는 분석가 "INTP" 🔬 당신의 MBTI는?',
        recommendedTests: ['intuition-vs-logic-test', 'hidden-personality-test', 'over-immersion-test'],
        relationshipStyle: { ko: '관계에서 깊은 지적 교감을 가장 중요하게 여깁니다. 말 대신 관심 어린 분석과 배려로 사랑을 표현하는 독특한 스타일이에요.', en: 'Values deep intellectual connection above all in relationships. Expresses love through thoughtful analysis and quiet, attentive care.', ja: '関係では深い知的共鳴を最も大切にします。言葉の代わりに、気づかいのある分析と配慮で愛を表現する独特なスタイルです。', es: 'Valora la conexión intelectual profunda por encima de todo. Expresa el amor a través del análisis reflexivo y el cuidado silencioso.', 'pt-BR': 'Valoriza a conexão intelectual profunda acima de tudo. Cresce em relacionamentos com debate e compreensão mútua.', fr: 'Values deep intellectual connection above all in relationships. Expresses love through thoughtful analysis and quiet, attentive care.' },
        compatibleVibe: { ko: 'ENTJ, ENFJ — 나의 흩어진 에너지를 방향 잡아줄 리더십 있는 유형과 잘 어울려요', en: 'ENTJ, ENFJ — Leaders who give structure and direction to your scattered energy', ja: 'ENTJ, ENFJ — 散らかったエネルギーに方向性を与えてくれるリーダーシップのあるタイプ', es: 'ENTJ, ENFJ — Líderes que orientan y estructuran tu energía dispersa', 'pt-BR': 'ENTJ, ENFJ — Líderes que orientam e estruturam a sua energia dispersa', fr: 'ENTJ, ENFJ — Leaders who give structure and direction to your scattered energy' }
      },
      {
        key: 'INFJ',
        title: '인류를 이해하는 신비주의자 (INFJ)',
        summary: '말 안 해도 네 마음 다 알아... 무섭지?',
        description: '사람의 본질을 꿰뚫어보는 직관력을 가진 드문 유형. 이상과 가치관이 뚜렷하고 세상을 더 나은 곳으로 만들고 싶다는 열망이 있습니다. 공감 능력이 뛰어나지만 타인의 감정에 너무 깊이 빠져들어 지치기도 해요. 혼자만의 시간이 없으면 빠르게 방전됩니다.',
        strengths: ['사람의 심리와 상황을 꿰뚫는 통찰력', '강한 가치관과 깊고 섬세한 공감 능력', '조용하지만 주변에 강력한 영향력'],
        caution: ['완벽주의와 이상주의가 지나쳐서 스스로 번아웃될 수 있어요', '속마음을 잘 드러내지 않아 오해를 살 때가 있습니다'],
        shareText: '나는 신비로운 예언자 "INFJ" 🔮 당신의 MBTI는?',
        recommendedTests: ['attachment-style-test', 'hidden-personality-test', 'love-style-test'],
        relationshipStyle: { ko: '깊고 의미 있는 연결을 원하며 표면적인 관계는 금방 지루해집니다. 진심이 통하는 사람을 만나면 온 마음을 다해 헌신해요.', en: 'Craves deep, meaningful connection and grows bored quickly with superficiality. Gives everything to someone who truly understands.', ja: '深く意味のある繋がりを求め、表面的な関係はすぐに飽きます。本当に心が通じる人には全力で献身します。', es: 'Anhela conexiones profundas; se aburre rápido de lo superficial. Se entrega por completo a quien lo comprende de verdad.', 'pt-BR': 'Anseia conexões profundas; fica entediado rapidamente com o superficial.', fr: 'Craves deep, meaningful connection and grows bored quickly with superficiality. Gives everything to someone who truly understands.' },
        compatibleVibe: { ko: 'ENFP, ENTP — 나의 진지함을 가볍고 따뜻하게 받아줄 유형과 잘 맞아요', en: 'ENFP, ENTP — Types who receive your seriousness with warmth and lightness', ja: 'ENFP, ENTP — 真剣さを軽やかに温かく受け止めてくれるタイプ', es: 'ENFP, ENTP — Tipos que reciben tu seriedad con calidez y ligereza', 'pt-BR': 'ENFP, ENTP — Tipos que recebem a sua seriedade com calor e leveza', fr: 'ENFP, ENTP — Types who receive your seriousness with warmth and lightness' }
      },
      {
        key: 'INFP',
        title: '감성 충만한 이상주의자 (INFP)',
        summary: '세상이 내 마음처럼만 됐으면 진짜 좋겠다...',
        description: '나만의 이상과 가치를 누구보다 소중히 여기는 감성형 인간. 겉으로는 조용해 보이지만 내면에는 광활한 우주가 펼쳐져 있습니다. 진정성 없는 사람이나 억지스러운 상황에 금방 에너지가 떨어지고, 의미 있는 일에는 누구보다 진심을 쏟아요.',
        strengths: ['깊은 공감 능력과 진정성 있는 감수성', '창의적이고 독창적인 상상력', '나만의 확고한 가치관과 신념'],
        caution: ['이상과 현실의 괴리에 혼자 힘들어하는 경우가 많아요', '비판을 개인적으로 받아들여서 오래 상처받을 수 있습니다'],
        shareText: '나는 감성 이상주의자 "INFP" 🌙 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'hidden-personality-test', 'attachment-style-test'],
        relationshipStyle: { ko: '사랑하면 온 마음을 주는 유형. 진심과 감정을 중시하고 관계에서 깊은 유대와 이해를 원합니다.', en: 'Gives everything when in love. Values sincerity and emotion, seeking deep bonds and mutual understanding above all.', ja: '愛すると全てを捧げるタイプ。誠実さと感情を大切にし、深い絆と理解を求めます。', es: 'Lo da todo cuando ama. Valora la sinceridad y la emoción, buscando vínculos profundos y comprensión mutua.', 'pt-BR': 'Dá tudo de si quando ama. Valoriza a sinceridade e a emoção, buscando laços profundos e compreensão mútua.', fr: 'Gives everything when in love. Values sincerity and emotion, seeking deep bonds and mutual understanding above all.' },
        compatibleVibe: { ko: 'ENFJ, ENTJ — 나를 이해하고 세상을 헤쳐나가도록 이끌어줄 리더형과 잘 맞아요', en: 'ENFJ, ENTJ — Leaders who understand you and guide you confidently through the world', ja: 'ENFJ, ENTJ — 理解してくれ、世界を共に切り開いてくれるリーダータイプ', es: 'ENFJ, ENTJ — Líderes que te comprenden y te guían con confianza por el mundo', 'pt-BR': 'ENFJ, ENTJ — Líderes que o compreendem e o guiam com confiança pelo mundo', fr: 'ENFJ, ENTJ — Leaders who understand you and guide you confidently through the world' }
      },
      {
        key: 'ISTJ',
        title: '믿음직한 철벽 완벽주의자 (ISTJ)',
        summary: '했다고 하면 무조건 한다. 그게 나야.',
        description: '책임감과 신뢰성이 삶의 핵심 가치인 사람. 정해진 규칙과 절차를 철저히 따르고 맡은 일은 끝까지 완수합니다. 감정보다는 사실과 데이터를 신뢰하고, 갑작스러운 변화보다 예측 가능한 환경에서 가장 편안함을 느껴요.',
        strengths: ['압도적인 책임감과 흔들리지 않는 신뢰성', '체계적이고 꼼꼼한 업무 처리 능력', '오랜 시간 쌓아온 깊은 전문성'],
        caution: ['변화나 새로운 방식에 적응하는 데 시간이 오래 걸릴 수 있어요', '감정 표현이 서툴어서 오해를 살 때가 있습니다'],
        shareText: '나는 믿을 수 있는 완벽주의자 "ISTJ" 🏛️ 당신의 MBTI는?',
        recommendedTests: ['how-friends-see-me-test', 'hidden-personality-test', 'love-style-test'],
        relationshipStyle: { ko: '천천히 마음을 열지만, 한번 열면 평생 든든한 파트너가 됩니다. 행동으로 사랑을 보여주는 묵직한 스타일이에요.', en: 'Slow to open up, but once they do, a lifelong dependable partner. Shows love through steady, reliable actions rather than words.', ja: '心を開くのは遅いですが、一度開けば生涯の頼れるパートナーに。行動でどっしりと愛情を示すスタイルです。', es: 'Tarda en abrirse, pero una vez que lo hace, es un compañero confiable de por vida. Muestra el amor con acciones sólidas y constantes.', 'pt-BR': 'Demora para se abrir, mas uma vez que o faz, é um parceiro confiável para a vida toda.', fr: 'Slow to open up, but once they do, a lifelong dependable partner. Shows love through steady, reliable actions rather than words.' },
        compatibleVibe: { ko: 'ESFP, ESTP — 나의 진중함을 재미있게 흔들어줄 활동적인 유형과 잘 어울려요', en: 'ESFP, ESTP — Active, fun-loving types who lighten up your serious side', ja: 'ESFP, ESTP — 真剣さを楽しく揺さぶってくれる活動的なタイプ', es: 'ESFP, ESTP — Tipos activos y divertidos que aligeras tu lado serio', 'pt-BR': 'ESFP, ESTP — Tipos ativos e divertidos que aliviam o seu lado sério', fr: 'ESFP, ESTP — Active, fun-loving types who lighten up your serious side' }
      },
      {
        key: 'ISFJ',
        title: '조용한 헌신의 수호 천사 (ISFJ)',
        summary: '내가 챙겨야 마음이 편한 사람이에요',
        description: '주변 사람들을 세심하게 챙기고 기억하는 따뜻한 마음의 소유자. 조용하게 뒤에서 모든 것을 든든하게 지원하고, 작은 배려 하나하나에 진심을 담습니다. 자신의 필요보다 남의 필요를 먼저 생각하다 보면 어느새 지쳐버리는 경우도 생겨요.',
        strengths: ['따뜻하고 세심한 배려 능력', '안정적이고 꾸준한 헌신과 성실함', '뛰어난 관찰력과 섬세한 기억력'],
        caution: ['거절하는 것이 너무 힘들어서 자신을 혹사시킬 수 있어요', '참고 또 참다가 갑자기 폭발할 수 있습니다'],
        shareText: '나는 조용한 수호 천사 "ISFJ" 💝 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'how-friends-see-me-test'],
        relationshipStyle: { ko: '깊은 헌신과 세심함으로 상대방을 감동시키는 연인. 소소한 기념일도 기억하고 진심으로 챙깁니다.', en: 'Moves a partner with deep devotion and attention to detail. Remembers even small anniversaries and celebrates them sincerely.', ja: '深い献身と細やかさで相手を感動させる恋人。小さな記念日も覚えて心から大切にします。', es: 'Conmueve a su pareja con dedicación profunda y atención al detalle. Recuerda hasta los pequeños aniversarios y los celebra de corazón.', 'pt-BR': 'Comove o parceiro com dedicação profunda e atenção aos detalhes. Lembra até os pequenos aniversários.', fr: 'Moves a partner with deep devotion and attention to detail. Remembers even small anniversaries and celebrates them sincerely.' },
        compatibleVibe: { ko: 'ESTP, ESFP — 나의 조용함을 밝고 활기차게 채워줄 유형과 잘 어울려요', en: 'ESTP, ESFP — Bright, energetic types who fill your quietness with life', ja: 'ESTP, ESFP — 静けさを明るく活気よく満たしてくれるタイプ', es: 'ESTP, ESFP — Tipos brillantes y enérgicos que llenan tu quietud con vida', 'pt-BR': 'ESTP, ESFP — Tipos brilhantes e energéticos que preenchem a sua quietude com vida', fr: 'ESTP, ESFP — Bright, energetic types who fill your quietness with life' }
      },
      {
        key: 'ISTP',
        title: '조용하지만 손재주 만렙 (ISTP)',
        summary: '말보다 행동이 먼저고, 행동보다 분석이 먼저임',
        description: '겉으로는 조용하지만 손이 먼저 움직이는 실전형 분석가. 복잡한 기계나 시스템이 어떻게 작동하는지 파악하는 걸 좋아합니다. 감정 표현은 서툴지만 위기 상황에서 침착하게 최적의 판단을 내리는 게 특기예요. 자유롭게 움직일 공간이 있어야 제대로 살 수 있어요.',
        strengths: ['위기에서 냉정하게 최선의 선택을 하는 능력', '뛰어난 손재주와 기술적 문제 해결력', '자유롭고 독립적인 사고방식'],
        caution: ['감정 표현이 너무 부족해서 상대방이 답답해할 수 있어요', '장기 계획이나 반복 업무를 오래 유지하기 힘들 수 있습니다'],
        shareText: '나는 침착한 분석가 "ISTP" 🔧 당신의 MBTI는?',
        recommendedTests: ['intuition-vs-logic-test', 'hidden-personality-test', 'over-immersion-test'],
        relationshipStyle: { ko: '자유를 중시하는 연애 스타일. 말보다 행동으로 챙기며 상대방의 독립성도 존중하는 여유로운 파트너예요.', en: "Values freedom in love. Cares through actions over words and genuinely respects a partner's independence.", ja: '自由を重視する恋愛スタイル。言葉より行動でケアし、相手の独立性も尊重するゆとりあるパートナーです。', es: 'Valora la libertad en el amor. Cuida con acciones más que palabras y respeta genuinamente la independencia de su pareja.', 'pt-BR': 'Valoriza a liberdade no amor. Cuida com ações mais do que palavras e respeita a independência do parceiro.', fr: "Values freedom in love. Cares through actions over words and genuinely respects a partner's independence." },
        compatibleVibe: { ko: 'ESFJ, ESTJ — 나의 방향성 없는 일상을 따뜻하게 정리해줄 계획형과 잘 어울려요', en: 'ESFJ, ESTJ — Planners who warmly bring order to your directionless daily life', ja: 'ESFJ, ESTJ — 方向性のない日常を温かく整理してくれる計画型タイプ', es: 'ESFJ, ESTJ — Planificadores que ordenan calurosamente tu vida cotidiana', 'pt-BR': 'ESFJ, ESTJ — Planejadores que organizam calorosamente a sua vida cotidiana', fr: 'ESFJ, ESTJ — Planners who warmly bring order to your directionless daily life' }
      },
      {
        key: 'ISFP',
        title: '오늘도 감성 충전 중인 예술가 (ISFP)',
        summary: '말은 별로 없지만 보이는 것에 다 감동받음',
        description: '조용하게 자신만의 감성 세계를 살아가는 자유로운 영혼. 아름다운 것과 진정성 있는 경험에 강하게 반응하며, 틀에 박힌 규칙보다 자유로운 표현을 소중히 여깁니다. 말보다 행동이나 예술로 감정을 표현하고, 강요받는 상황에 매우 약해요.',
        strengths: ['독특하고 섬세한 감수성과 예술적 재능', '다른 사람의 감정과 분위기를 포착하는 예민함', '자신만의 확고한 미적 취향'],
        caution: ['갈등 상황을 피하다가 해결이 늦어지는 경우가 많아요', '미래 계획보다 지금 감정에 집중하다 준비가 부족해질 수 있습니다'],
        shareText: '나는 감성 아티스트 "ISFP" 🎨 당신의 MBTI는?',
        recommendedTests: ['love-style-test', 'hidden-personality-test', 'attachment-style-test'],
        relationshipStyle: { ko: '표현은 적지만 작은 행동 하나하나에 사랑을 담는 타입. 상대방의 취향을 세심하게 기억하고 배려합니다.', en: "Quiet in expression but pours love into small, thoughtful gestures. Remembers a partner's preferences with remarkable care.", ja: '表現は少ないですが、小さな行動ひとつひとつに愛情を込めます。相手の好みを細やかに覚え気遣います。', es: 'Reservado en expresión, pero llena de amor cada pequeño gesto. Recuerda con cuidado las preferencias de su pareja.', 'pt-BR': 'Reservado na expressão, mas cheio de amor em cada pequeno gesto. Lembra as preferências do parceiro com cuidado.', fr: "Quiet in expression but pours love into small, thoughtful gestures. Remembers a partner's preferences with remarkable care." },
        compatibleVibe: { ko: 'ENTJ, ESFJ — 나의 부드러운 감성을 리드해줄 결단력 있는 유형과 잘 맞아요', en: 'ENTJ, ESFJ — Decisive types who lead and channel your gentle sensitivity', ja: 'ENTJ, ESFJ — 優しい感性をリードしてくれる決断力のあるタイプ', es: 'ENTJ, ESFJ — Tipos decididos que lideran y canalizan tu sensibilidad suave', 'pt-BR': 'ENTJ, ESFJ — Tipos decididos que lideram e canalizam a sua sensibilidade suave', fr: 'ENTJ, ESFJ — Decisive types who lead and channel your gentle sensitivity' }
      }
    ]
  },
  /* ═══════════════════════════════════════════════ */
  /* 운명 나이 테스트                                  */
  /* ═══════════════════════════════════════════════ */
  {
    slug: 'destiny-age-test',
    title: '내 인생이 풀리는 나이 테스트',
    description: '당신의 인생 흐름이 바뀌는 나이를 확인해보세요.',
    category: '운세',
    estimatedTime: '2분',
    emoji: '🌟',
    questions: [
      {
        id: 1,
        text: '카카오톡 알림이 잔뜩 쌓여있을 때 나의 반응은?',
        options: [
          { label: '바로 확인하고 전부 읽는다', scores: { y_score: 3 } },
          { label: '중요한 것만 골라서 확인한다', scores: { t_score: 3 } },
          { label: '나중에 한꺼번에 확인한다', scores: { w_score: 3 } },
          { label: '알림 자체를 꺼놓는 편이다', scores: { s_score: 3 } },
        ],
      },
      {
        id: 2,
        text: '친구가 갑자기 "내일 여행 가자!"고 하면?',
        options: [
          { label: '오케이! 당장 짐 싼다', scores: { y_score: 3 } },
          { label: '일정 확인 후 가능하면 간다', scores: { t_score: 3 } },
          { label: '미리 계획된 것이 아니면 부담스럽다', scores: { w_score: 3 } },
          { label: '여행보다 집이 더 좋다', scores: { s_score: 3 } },
        ],
      },
      {
        id: 3,
        text: '예상치 못한 돈이 생겼을 때 가장 먼저 하는 것은?',
        options: [
          { label: '쇼핑이나 먹고 싶었던 걸 즐긴다', scores: { y_score: 3 } },
          { label: '여행이나 강의 등 경험에 투자한다', scores: { t_score: 3 } },
          { label: '저축이나 투자를 우선 생각한다', scores: { w_score: 3 } },
          { label: '지금도 충분해서 특별히 계획 없다', scores: { s_score: 3 } },
        ],
      },
      {
        id: 4,
        text: '힘든 일이 생겼을 때 나는?',
        options: [
          { label: '친구한테 전화해서 털어놓는다', scores: { y_score: 3 } },
          { label: '혼자 생각 정리하고 해결책을 찾는다', scores: { t_score: 3 } },
          { label: '시간이 약이라 생각하고 기다린다', scores: { w_score: 3 } },
          { label: '그냥 받아들이고 흘려보낸다', scores: { s_score: 3 } },
        ],
      },
      {
        id: 5,
        text: '나에게 가장 중요한 것은?',
        options: [
          { label: '재미와 설렘, 지금 이 순간', scores: { y_score: 3 } },
          { label: '성장과 발전, 더 나은 미래', scores: { t_score: 3 } },
          { label: '안정과 균형, 소중한 관계들', scores: { w_score: 3 } },
          { label: '자유와 여유, 내 방식대로 사는 것', scores: { s_score: 3 } },
        ],
      },
      {
        id: 6,
        text: 'SNS를 어떻게 사용하는 편인가요?',
        options: [
          { label: '거의 매일 올리고 소식도 자주 본다', scores: { y_score: 3 } },
          { label: '가끔 올리되 양질의 콘텐츠 위주로', scores: { t_score: 3 } },
          { label: '거의 올리지 않고 가끔 확인만', scores: { w_score: 3 } },
          { label: 'SNS 자체에 별로 관심이 없다', scores: { s_score: 3 } },
        ],
      },
      {
        id: 7,
        text: '나에게 "좋은 하루"란?',
        options: [
          { label: '많은 것을 경험하고 설레는 날', scores: { y_score: 3 } },
          { label: '계획한 일을 다 해낸 날', scores: { t_score: 3 } },
          { label: '좋아하는 사람과 따뜻하게 보낸 날', scores: { w_score: 3 } },
          { label: '아무것도 안 하고 편안하게 쉰 날', scores: { s_score: 3 } },
        ],
      },
      {
        id: 8,
        text: '5년 후 나의 모습을 상상하면?',
        options: [
          { label: '아직 미래는 너무 먼 이야기...', scores: { y_score: 3 } },
          { label: '원하는 커리어와 라이프를 이루고 있을 것 같다', scores: { t_score: 3 } },
          { label: '지금보다 더 여유롭고 안정된 삶', scores: { w_score: 3 } },
          { label: '지금과 크게 달라도, 달라지지 않아도 괜찮다', scores: { s_score: 3 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const y = scores.y_score || 0;
      const t = scores.t_score || 0;
      const w = scores.w_score || 0;
      const s = scores.s_score || 0;
      const max = Math.max(y, t, w, s);
      if (max === s) return 'age-50s';
      if (max === w) return 'age-40s';
      if (max === t) return 'age-30s';
      return 'age-20s';
    },
    results: [
      {
        key: 'age-20s',
        title: '찬란한 20대 에너지',
        summary: '지금 이 순간을 온몸으로 불태우는 청춘의 화신!',
        description: '당신의 삶 에너지는 20대의 열정과 감성 그 자체입니다. 새로운 것에 호기심이 넘치고 실수를 두려워하기보다 경험을 소중히 여깁니다. 지금이 당신 인생에서 가장 반짝이는 시기예요. 마음이 이끄는 대로 최대한 많은 것을 경험하고, 이 에너지를 놓치지 마세요. 인생의 큰 도전들을 두려움 없이 마주할 수 있는 용기가 빛나는 타입입니다.',
        strengths: ['뜨거운 열정과 실행력', '새로운 경험에 대한 개방성', '감성적인 공감 능력'],
        caution: ['충동적인 결정으로 후회할 수 있어요', '장기적인 관점도 함께 키워보세요'],
        shareText: '내 인생 에너지는 "찬란한 20대" ✨ 너는?',
        recommendedTests: ['love-style-test', 'how-friends-see-me-test', 'teto-egen-test'],
      },
      {
        key: 'age-30s',
        title: '균형 잡힌 30대 에너지',
        summary: '성장과 안정, 두 마리 토끼를 잡는 현실주의 챔피언!',
        description: '당신은 열정과 이성이 균형 있게 조화를 이루는 30대 에너지의 소유자입니다. 감성에만 흘러가지 않고 냉철하게 분석하면서도 도전을 두려워하지 않아요. 커리어와 인간관계 모두 중요하게 생각하며 더 나은 내일을 위해 꾸준히 노력하는 타입입니다. 지금이 당신 인생이 가장 가파르게 성장하는 시기예요!',
        strengths: ['전략적 사고와 실행력의 균형', '명확한 목표 설정', '성장 지향적 마인드'],
        caution: ['가끔은 결과보다 과정도 즐겨보세요', '완벽을 추구하다 지칠 수 있어요'],
        shareText: '내 인생 에너지는 "균형 잡힌 30대" 🌱 너는?',
        recommendedTests: ['attachment-style-test', 'intuition-vs-logic-test', 'teto-egen-test'],
      },
      {
        key: 'age-40s',
        title: '원숙한 40대 에너지',
        summary: '이미 많은 것을 알고 있는 인생의 고수!',
        description: '당신은 삶의 깊이와 여유를 동시에 지닌 40대 에너지를 가지고 있습니다. 더 이상 남의 시선에 흔들리지 않고 자신만의 가치와 기준으로 살아갑니다. 인간관계에서도 넓이보다 깊이를 추구하며 중요한 것과 그렇지 않은 것을 명확히 구분할 줄 알아요. 당신의 지혜와 통찰력은 주변 사람들에게 큰 힘이 됩니다.',
        strengths: ['깊은 통찰력과 지혜', '흔들리지 않는 자기 기준', '안정감 있는 관계력'],
        caution: ['새로운 변화에 열린 마음을 유지해보세요', '가끔은 즉흥적으로 즐겨봐요'],
        shareText: '내 인생 에너지는 "원숙한 40대" 🌿 너는?',
        recommendedTests: ['hidden-personality-test', 'love-style-test', 'attachment-style-test'],
      },
      {
        key: 'age-50s',
        title: '달관한 50대 에너지',
        summary: '이미 인생의 모든 답을 알고 있는 것 같은 현자!',
        description: '당신은 많은 것을 내려놓은 듯 초연한 50대 에너지를 지니고 있습니다. 더 이상 작은 일에 흔들리지 않고 인생의 큰 흐름을 꿰뚫어 보는 통찰력이 있어요. 조용하지만 깊은 존재감을 지니고 있으며 지금 이 순간의 소중함을 누구보다 잘 알고 있습니다. 주변 사람들에게 버팀목 같은 존재가 되어주고 있을 거예요.',
        strengths: ['큰 그림을 보는 관조적 시각', '감정에 흔들리지 않는 평정심', '진정한 자기 이해'],
        caution: ['때로는 더 적극적으로 표현해보세요', '주변 사람들과의 연결을 놓치지 마세요'],
        shareText: '내 인생 에너지는 "달관한 50대" 🌾 너는?',
        recommendedTests: ['hidden-personality-test', 'intuition-vs-logic-test', 'attachment-style-test'],
      },
    ],
  },

  /* ═══════════════════════════════════════════════ */
  /* 테토 vs 에겐 테스트                              */
  /* ═══════════════════════════════════════════════ */
  {
    slug: 'teto-egen-test',
    title: '테토 vs 에겐 테스트',
    description: '당신은 직진형 테토일까요, 분석형 에겐일까요?',
    category: '성격 테스트',
    estimatedTime: '2분',
    emoji: '⚖️',
    questions: [
      {
        id: 1,
        text: '좋아하는 사람이 생겼을 때 나는?',
        options: [
          { label: '바로 마음을 표현하거나 행동으로 보여준다', scores: { teto_score: 2 } },
          { label: '좋아하는 마음을 꼭꼭 숨기며 혼자 고민한다', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 2,
        text: '길을 가다가 갑자기 비가 쏟아지면?',
        options: [
          { label: '편의점으로 뛰어가며 상황을 즐긴다', scores: { teto_score: 2 } },
          { label: '일기예보 안 봤던 게 후회되면서 당황한다', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 3,
        text: '친구와 의견이 다를 때 나는?',
        options: [
          { label: '바로 내 생각을 말하고 설득한다', scores: { teto_score: 2 } },
          { label: '일단 들어보고 천천히 내 의견을 정리한다', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 4,
        text: '새 드라마나 게임을 시작할 때?',
        options: [
          { label: '정보 없이 일단 시작해봐', scores: { teto_score: 2 } },
          { label: '후기와 평점을 꼼꼼히 확인하고 시작', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 5,
        text: '화가 났을 때 나는?',
        options: [
          { label: '감정이 얼굴에 바로 드러난다', scores: { teto_score: 2 } },
          { label: '겉으로는 괜찮아 보이지만 속으로 끓는다', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 6,
        text: '여행 스타일은?',
        options: [
          { label: '대략적인 목적지만 정하고 즉흥적으로', scores: { teto_score: 2 } },
          { label: '교통편, 숙소, 맛집까지 꼼꼼하게 계획', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 7,
        text: 'SNS에 악플이 달렸다면?',
        options: [
          { label: '기분 나쁘면 바로 맞댓글이나 삭제한다', scores: { teto_score: 2 } },
          { label: '혼자 상처받고 왜 이런 말을 했는지 분석한다', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 8,
        text: '친구들 사이에서 나는?',
        options: [
          { label: '분위기를 주도하거나 빠른 결정을 내리는 편', scores: { teto_score: 2 } },
          { label: '신중하게 의견 내고 중재 역할을 하는 편', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 9,
        text: '영화를 보고 난 뒤 나는?',
        options: [
          { label: '재밌었다/별로였다 간단히 결론 내린다', scores: { teto_score: 2 } },
          { label: '의미, 연출, 배우 연기 등 꼼꼼히 분석한다', scores: { eigen_score: 2 } },
        ],
      },
      {
        id: 10,
        text: '일을 할 때 나는?',
        options: [
          { label: '완벽하지 않아도 일단 시작하고 수정한다', scores: { teto_score: 2 } },
          { label: '충분히 준비된 후 완성도 있게 진행한다', scores: { eigen_score: 2 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const t = scores.teto_score || 0;
      const e = scores.eigen_score || 0;
      const total = t + e;
      const tPct = total > 0 ? t / total : 0.5;
      if (tPct >= 0.8) return 'pure-teto';
      if (tPct >= 0.6) return 'teto-lean';
      if (tPct <= 0.2) return 'pure-eigen';
      if (tPct <= 0.4) return 'eigen-lean';
      return 'balanced-te';
    },
    results: [
      {
        key: 'pure-teto',
        title: '직진 파워 — 순혈 테토',
        summary: '망설임 없이 달려드는 직진형 인간계의 정수!',
        description: '당신은 테토(직진형) 에너지가 넘쳐흐르는 타입입니다. 생각보다 행동이 먼저 나오고, 감정이 솔직하게 표현되며, 분위기를 이끄는 것을 좋아합니다. "일단 해보자"가 인생 모토이며 후회보다는 경험을 택하는 스타일이에요. 에너지가 넘치고 주변을 활기차게 만드는 존재감이 특징입니다.',
        strengths: ['폭발적인 실행력과 추진력', '솔직하고 명쾌한 감정 표현', '분위기를 이끄는 리더십'],
        caution: ['충동적인 결정으로 후회할 때도 있어요', '상대의 속도를 맞춰주는 배려도 중요해요'],
        shareText: '나는 직진형 "순혈 테토" 🔥 너는 테토? 에겐?',
        recommendedTests: ['love-style-test', 'how-friends-see-me-test', 'over-immersion-test'],
      },
      {
        key: 'teto-lean',
        title: '감성 테토 — 테토 우세형',
        summary: '직진 기본에 따뜻한 감성까지 갖춘 매력쟁이!',
        description: '테토 성향이 우세하지만 에겐의 사려 깊음도 겸비한 매력적인 유형입니다. 평소에는 활발하고 직관적으로 행동하지만, 중요한 결정에서는 한 번 더 생각하는 여유가 있어요. 주변에서 "왜 이렇게 매력 있어?"라는 말을 자주 들을 것 같은 밸런스형 테토입니다.',
        strengths: ['행동력과 사려 깊음의 균형', '유연한 커뮤니케이션', '다양한 상황 적응력'],
        caution: ['가끔 결정을 너무 오래 미루지 마세요', '직관을 더 믿어봐도 좋아요'],
        shareText: '나는 "감성 테토" ⚡ 테토 성향이 우세해!',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'hidden-personality-test'],
      },
      {
        key: 'eigen-lean',
        title: '따뜻한 에겐 — 에겐 우세형',
        summary: '분석은 기본, 마음 따뜻함까지 갖춘 이상형 유형!',
        description: '에겐 성향이 우세하지만 테토의 온기도 품고 있는 균형 잡힌 유형입니다. 신중하고 계획적이지만 딱딱하지 않고 따뜻한 감성을 지니고 있어요. 분석적으로 생각하되 행동력도 갖추고 있어 실제로 업무와 인간관계 모두에서 높은 평가를 받는 타입입니다.',
        strengths: ['철저한 준비성과 계획력', '따뜻하고 섬세한 배려심', '신뢰를 쌓는 일관성'],
        caution: ['가끔은 계획 없이 즉흥적으로 즐겨봐요', '완벽을 추구하다 지칠 수 있어요'],
        shareText: '나는 "따뜻한 에겐" 🧊 에겐 성향이 우세해!',
        recommendedTests: ['attachment-style-test', 'intuition-vs-logic-test', 'hidden-personality-test'],
      },
      {
        key: 'pure-eigen',
        title: '분석 마스터 — 순혈 에겐',
        summary: '모든 것을 꼼꼼히 따지는 전략적 분석가!',
        description: '당신은 에겐(분석형) 에너지가 가득한 타입입니다. 무엇이든 꼼꼼하게 파악하고 충분한 준비 후 행동하는 신중파예요. 감정보다는 논리가 앞서며 말보다 결과물로 실력을 증명하는 스타일입니다. 깊이 있는 사고와 철저한 준비성은 어디서도 빛을 발합니다.',
        strengths: ['뛰어난 분석력과 판단력', '철저한 준비와 완성도', '논리적 문제 해결 능력'],
        caution: ['지나친 분석이 결정을 늦출 수 있어요', '감정 표현을 조금 더 열어보는 것도 좋아요'],
        shareText: '나는 분석형 "순혈 에겐" 🔭 너는 테토? 에겐?',
        recommendedTests: ['intuition-vs-logic-test', 'hidden-personality-test', 'attachment-style-test'],
      },
      {
        key: 'balanced-te',
        title: '하이브리드형 — 테토에겐',
        summary: '테토와 에겐, 두 에너지를 완벽하게 활용하는 X맨!',
        description: '테토와 에겐의 비율이 거의 5:5인 균형형입니다. 상황에 따라 직진 모드와 분석 모드를 자유롭게 전환할 수 있어 다양한 상황에서 강점을 발휘해요. 한 마디로 "예측 불가능한 매력"의 소유자. 주변에서 가끔 당신이 어떤 사람인지 헷갈려할 수 있지만, 그게 오히려 당신의 큰 매력이에요.',
        strengths: ['상황 대처 유연성', '테토·에겐 장점을 모두 활용', '다채로운 매력'],
        caution: ['이도 저도 아닌 것처럼 보일 때가 있어요', '자신의 진짜 스타일을 탐색해보세요'],
        shareText: '나는 "하이브리드 테토에겐" ⚖️ 50:50 완벽 밸런스!',
        recommendedTests: ['hidden-personality-test', 'love-style-test', 'how-friends-see-me-test'],
      },
    ],
  },
  // ── 빌런 유형 테스트 ──────────────────────────────────────────────
  {
    slug: 'villain-type-test',
    title: '내 안의 빌런 유형은?',
    description: '당신 안에 숨어있는 빌런 캐릭터, 어떤 유형일까요?',
    category: '재미 테스트',
    estimatedTime: '2분',
    emoji: '😈',
    questions: [
      {
        id: 1,
        text: '단체 카톡방에서 아무도 내 의견에 반응을 안 해준다. 나는?',
        options: [
          { label: '무시하고 다음 화제로 넘어간다', scores: { narcissist: 0, obsessive: 0, cold: 1, timid: 2 } },
          { label: '다시 한번 더 어필해본다', scores: { narcissist: 2, obsessive: 1, cold: 0, timid: 0 } },
          { label: '속으로는 열받지만 아무렇지 않은 척', scores: { narcissist: 0, obsessive: 2, cold: 1, timid: 1 } },
          { label: '조용히 읽씹한 사람 명단을 확인한다', scores: { narcissist: 1, obsessive: 3, cold: 1, timid: 0 } },
        ],
      },
      {
        id: 2,
        text: '좋아하는 사람이 다른 이성과 친하게 지낸다. 나는?',
        options: [
          { label: '쿨하게 넘긴다. 내가 먼저 다가가면 되지', scores: { narcissist: 2, obsessive: 0, cold: 0, timid: 0 } },
          { label: '그 이성이 누군지 SNS까지 파헤친다', scores: { narcissist: 0, obsessive: 3, cold: 0, timid: 0 } },
          { label: '나는 관심 없는 척하며 점수를 조용히 뺀다', scores: { narcissist: 0, obsessive: 0, cold: 3, timid: 0 } },
          { label: '혼자 속앓이만 하고 아무것도 못 한다', scores: { narcissist: 0, obsessive: 0, cold: 0, timid: 3 } },
        ],
      },
      {
        id: 3,
        text: '내가 열심히 한 프로젝트에서 다른 사람이 칭찬을 받았다!',
        options: [
          { label: '"그건 사실 제가 한 건데요?" 공개적으로 밝힌다', scores: { narcissist: 3, obsessive: 0, cold: 1, timid: 0 } },
          { label: '그 사람의 다음 실수를 은근히 기다린다', scores: { narcissist: 0, obsessive: 1, cold: 3, timid: 0 } },
          { label: '웃으면서 축하해주지만 속은 부글부글', scores: { narcissist: 1, obsessive: 0, cold: 1, timid: 2 } },
          { label: '"저도 기여했는데..." 작게 중얼거리다 포기', scores: { narcissist: 0, obsessive: 0, cold: 0, timid: 3 } },
        ],
      },
      {
        id: 4,
        text: '친구가 약속 시간보다 30분 늦게 나타났다!',
        options: [
          { label: '"30분 늦은 거 알지? 다음엔 그냥 혼자 간다" 직구', scores: { narcissist: 2, obsessive: 0, cold: 2, timid: 0 } },
          { label: '"뭐하다 이렇게 늦었어?" 이유를 꼬치꼬치 캔다', scores: { narcissist: 0, obsessive: 3, cold: 0, timid: 0 } },
          { label: '"괜찮아~" 웃지만 오늘 내내 쌀쌀맞게 군다', scores: { narcissist: 0, obsessive: 1, cold: 3, timid: 0 } },
          { label: '"괜찮아..." 진짜로 그냥 넘어간다 (마음속으론 상처)', scores: { narcissist: 0, obsessive: 0, cold: 0, timid: 3 } },
        ],
      },
      {
        id: 5,
        text: '내 SNS 팔로워가 갑자기 200명 줄었다!',
        options: [
          { label: '"누가 언팔한 거야?" 바로 확인 앱 깔아서 추적', scores: { narcissist: 2, obsessive: 3, cold: 0, timid: 0 } },
          { label: '그냥 넘긴다. 어차피 내 콘텐츠가 좋으면 돌아옴', scores: { narcissist: 3, obsessive: 0, cold: 2, timid: 0 } },
          { label: '"혹시 내가 뭘 잘못 올렸나?" 게시물을 다 뒤진다', scores: { narcissist: 0, obsessive: 2, cold: 0, timid: 2 } },
          { label: '별로 신경 안 쓰인다. SNS가 뭐 대수야', scores: { narcissist: 0, obsessive: 0, cold: 2, timid: 1 } },
        ],
      },
      {
        id: 6,
        text: '회의 중에 내 아이디어가 채택되지 않았다. 나는?',
        options: [
          { label: '"제 아이디어가 더 낫다고 생각합니다만..." 재어필', scores: { narcissist: 3, obsessive: 0, cold: 1, timid: 0 } },
          { label: '채택된 아이디어를 낸 사람이 미워진다', scores: { narcissist: 0, obsessive: 2, cold: 2, timid: 0 } },
          { label: '겉으로는 괜찮은 척하고 퇴근 후 혼자 뾰로통', scores: { narcissist: 0, obsessive: 1, cold: 2, timid: 2 } },
          { label: '"그런가봐..." 하고 조용히 수긍한다', scores: { narcissist: 0, obsessive: 0, cold: 0, timid: 3 } },
        ],
      },
      {
        id: 7,
        text: '연인이 내 생일을 깜빡했다! 반응은?',
        options: [
          { label: '"야 오늘 내 생일이야" 바로 통보하고 선물 요구', scores: { narcissist: 3, obsessive: 0, cold: 0, timid: 0 } },
          { label: '잊은 이유가 뭔지 캐묻고 섭섭함을 장문으로 전송', scores: { narcissist: 0, obsessive: 3, cold: 0, timid: 0 } },
          { label: '아무렇지 않은 척하다가 나중에 다른 걸로 풀어낸다', scores: { narcissist: 0, obsessive: 0, cold: 3, timid: 0 } },
          { label: '서운하지만... 말을 못 하겠어서 혼자 운다', scores: { narcissist: 0, obsessive: 0, cold: 0, timid: 3 } },
        ],
      },
      {
        id: 8,
        text: '나는 솔직히 말해서, 나 자신에 대해 어떻게 생각해?',
        options: [
          { label: '솔직히 나는 꽤 매력적이고 특별한 사람이라고 생각한다', scores: { narcissist: 3, obsessive: 0, cold: 1, timid: 0 } },
          { label: '좋아하는 사람/것에 대해 너무 집착하는 경향이 있다', scores: { narcissist: 0, obsessive: 3, cold: 0, timid: 0 } },
          { label: '감정을 잘 드러내지 않고 냉정한 편이다', scores: { narcissist: 0, obsessive: 0, cold: 3, timid: 0 } },
          { label: '하고 싶은 말이 있어도 잘 못 하는 편이다', scores: { narcissist: 0, obsessive: 0, cold: 0, timid: 3 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const s = scores as Record<string, number>;
      const candidates: [string, number][] = [
        ['narcissist', s.narcissist || 0],
        ['obsessive', s.obsessive || 0],
        ['cold', s.cold || 0],
        ['timid', s.timid || 0],
      ];
      candidates.sort((a, b) => b[1] - a[1]);
      return candidates[0][0];
    },
    results: [
      {
        key: 'narcissist',
        title: '자기애형 빌런 — 나르시시스트',
        summary: '"나는 특별해" 아우라가 흘러넘치는 자기 중심 빌런',
        description: '당신의 빌런 유형은 자기애형 나르시시스트입니다. 자신이 특별하고 뛰어나다는 확신이 있으며, 칭찬과 인정이 삶의 에너지원이에요. 사람들의 시선을 즐기고 주목받기를 좋아하지만, 그게 때론 지나쳐 주변을 피곤하게 만들 수 있습니다. 드라마로 치면 주인공 자리를 절대 양보 안 하는 그 캐릭터!',
        strengths: ['강한 자신감과 추진력', '자기 PR 능력 탁월', '목표를 향한 집요한 행동력'],
        caution: ['타인의 감정을 놓칠 수 있어요', '칭찬에 너무 의존하지 않도록 주의'],
        shareText: '내 안의 빌런은 "자기애형 나르시시스트" 😈 너는 어떤 빌런이야?',
        recommendedTests: ['hidden-personality-test', 'how-friends-see-me-test', 'love-style-test'],
      },
      {
        key: 'obsessive',
        title: '집착형 빌런 — 스토커 감성',
        summary: '"아직 안 봤어?" 읽씹 추적 전문 집착 빌런',
        description: '당신의 빌런 유형은 집착형입니다. 좋아하는 사람이나 상황에 과도하게 집중하며, 모든 것을 파악하고 싶어하는 성향이 있어요. 관심이 너무 깊어 상대방에게 부담이 될 수 있지만, 이 집착의 뿌리엔 따뜻한 애정이 있습니다. 다만 그 강도를 조절하는 연습이 필요해요.',
        strengths: ['강한 충성심과 헌신', '관심 있는 것에 깊은 이해력', '디테일에 강한 관찰력'],
        caution: ['선을 넘지 않도록 감정 조절이 필요해요', '상대방의 공간을 존중하는 연습을'],
        shareText: '내 안의 빌런은 "집착형 스토커 감성" 🔍 너는 어떤 빌런이야?',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'over-immersion-test'],
      },
      {
        key: 'cold',
        title: '냉혹한 전략가 빌런 — 아이스퀸/킹',
        summary: '"괜찮아" 웃지만 속으로는 점수판 꽉 채우는 냉철 빌런',
        description: '당신의 빌런 유형은 냉혹한 전략가입니다. 감정을 쉽게 드러내지 않고, 불만이 있어도 표면적으로는 쿨한 척하는 경향이 있어요. 하지만 속으로는 치밀하게 계산하고 있죠. 드라마 속 무표정으로 모든 걸 장악하는 그 인물이 바로 당신의 빌런 페르소나입니다.',
        strengths: ['냉정한 판단력', '감정에 휘둘리지 않는 이성', '전략적 사고'],
        caution: ['감정 억누르기가 스트레스가 될 수 있어요', '가끔 속마음을 표현해보세요'],
        shareText: '내 안의 빌런은 "냉혹한 아이스퀸/킹" 🧊 너는 어떤 빌런이야?',
        recommendedTests: ['intuition-vs-logic-test', 'attachment-style-test', 'hidden-personality-test'],
      },
      {
        key: 'timid',
        title: '소심 빌런 — 마음 속에만 있는 반항아',
        summary: '속으로는 빌런, 겉으론 천사인 소심 반항아',
        description: '당신의 빌런 유형은 소심 빌런입니다. 마음 속으로는 하고 싶은 말이 엄청 많지만, 실제로 행동으로 옮기기가 어려워요. 상처를 받아도 참고, 억울해도 꾹 삼키는 경우가 많죠. 외면은 착하고 순한 사람이지만, 이불 속에서는 매일 밤 시뮬레이션 복수극을 펼치는 숨은 빌런!',
        strengths: ['갈등을 피하는 평화주의', '타인에 대한 깊은 배려심', '인내심과 참을성'],
        caution: ['억누른 감정이 한꺼번에 터질 수 있어요', '자기 주장을 연습해보세요'],
        shareText: '내 안의 빌런은 "소심 마음 속 반항아" 🫠 너는 어떤 빌런이야?',
        recommendedTests: ['hidden-personality-test', 'how-friends-see-me-test', 'attachment-style-test'],
      },
    ],
  },

  // ── 극T 극F 테스트 ──────────────────────────────────────────────
  {
    slug: 'extreme-tf-test',
    title: '나는 극T일까 극F일까?',
    description: 'MBTI T/F를 넘어서 — 나는 얼마나 극단적인 T 혹은 F일까요?',
    category: '성격 테스트',
    estimatedTime: '2분',
    emoji: '🧠',
    questions: [
      {
        id: 1,
        text: '친구가 "나 오늘 완전 망했어..."라고 카톡을 보냈다.',
        options: [
          { label: '"뭐가 문제야? 어떻게 된 거야?" 원인부터 파악', scores: { T: 2, F: 0 } },
          { label: '"어머 어머 무슨 일이야 얼른 말해봐 ㅠㅠ" 공감 폭발', scores: { T: 0, F: 2 } },
          { label: '"힘들겠다 ㅠ 뭐가 문제인지 같이 생각해보자"', scores: { T: 1, F: 1 } },
          { label: '"완전 망했어? 어느 정도야?" 스케일 확인 먼저', scores: { T: 2, F: 0 } },
        ],
      },
      {
        id: 2,
        text: '슬픈 영화를 봤을 때 나는?',
        options: [
          { label: '전혀 안 운다. 픽션인걸 아니까', scores: { T: 3, F: 0 } },
          { label: '살짝 눈물이 맺히지만 참는다', scores: { T: 2, F: 1 } },
          { label: '조용히 눈물 흘린다', scores: { T: 0, F: 2 } },
          { label: '펑펑 운다. 여운이 며칠 간다', scores: { T: 0, F: 3 } },
        ],
      },
      {
        id: 3,
        text: '연인이 "오늘 내가 더 예쁜 것 같아?"라고 물어본다면?',
        options: [
          { label: '"오늘따라 더 예쁜 것 같기도 하고 그냥 평소 같기도 하고"', scores: { T: 3, F: 0 } },
          { label: '"당연하지! 늘 예뻐~" 칭찬 폭격', scores: { T: 0, F: 3 } },
          { label: '"응 오늘 특히 더 예쁜데?" 자연스럽게 맞장구', scores: { T: 0, F: 2 } },
          { label: '"더? 어제랑 달라진 게 있어?" 비교 분석 시작', scores: { T: 2, F: 0 } },
        ],
      },
      {
        id: 4,
        text: '친구들 사이에서 갈등이 생겼다. 나의 역할은?',
        options: [
          { label: '양쪽 주장을 듣고 누가 논리적으로 옳은지 판단', scores: { T: 3, F: 0 } },
          { label: '양쪽 모두 공감해주며 감정을 달래주는 역할', scores: { T: 0, F: 3 } },
          { label: '실질적인 해결책을 제시하며 중재', scores: { T: 2, F: 1 } },
          { label: '분위기를 부드럽게 만들어 갈등을 녹임', scores: { T: 0, F: 2 } },
        ],
      },
      {
        id: 5,
        text: '선물을 받을 때 더 중요한 것은?',
        options: [
          { label: '내가 실제로 필요한 물건인지, 실용성이 중요', scores: { T: 3, F: 0 } },
          { label: '상대방이 나를 얼마나 생각했는지, 마음이 중요', scores: { T: 0, F: 3 } },
          { label: '둘 다 중요하지만 굳이 고르면 마음', scores: { T: 0, F: 1 } },
          { label: '둘 다 중요하지만 굳이 고르면 실용성', scores: { T: 1, F: 0 } },
        ],
      },
      {
        id: 6,
        text: '후배가 실수를 했다. 어떻게 피드백하나요?',
        options: [
          { label: '"이 부분이 틀렸고, 이렇게 고쳐야 해" 직접적으로', scores: { T: 3, F: 0 } },
          { label: '"많이 당황했겠다. 괜찮아? 다음엔 이렇게 해봐"', scores: { T: 0, F: 3 } },
          { label: '"수고했어. 다만 이 부분은 이렇게 바꾸면 더 좋을 것 같아"', scores: { T: 1, F: 1 } },
          { label: '일단 칭찬해주고 나서 조심스럽게 피드백', scores: { T: 0, F: 2 } },
        ],
      },
      {
        id: 7,
        text: '오늘 길을 걷다 갑자기 눈물이 나올 것 같은 기분이 들었다.',
        options: [
          { label: '이런 적 거의 없다. 왜 울어?', scores: { T: 3, F: 0 } },
          { label: '이성적으로 원인을 찾으려 노력한다', scores: { T: 2, F: 0 } },
          { label: '그냥 감정이 흐르게 둔다', scores: { T: 0, F: 2 } },
          { label: '공감 되는 노래 틀고 눈물을 흘린다', scores: { T: 0, F: 3 } },
        ],
      },
      {
        id: 8,
        text: '친구가 "솔직히 말해줘. 내 발표 어땠어?"라고 물어본다.',
        options: [
          { label: '"솔직히? 이 부분이랑 저 부분이 좀 아쉬웠어"', scores: { T: 3, F: 0 } },
          { label: '"와 진짜 잘했어! 긴장했을 텐데 수고했다~"', scores: { T: 0, F: 3 } },
          { label: '"잘한 부분도 많고, 아쉬운 부분도 있었어"', scores: { T: 1, F: 1 } },
          { label: '"전체적으로 괜찮았어. 다음엔 목소리 좀 더 크게?"', scores: { T: 1, F: 2 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const T = scores.T || 0;
      const F = scores.F || 0;
      const total = T + F;
      const tPct = total > 0 ? T / total : 0.5;
      if (tPct >= 0.75) return 'extreme-T';
      if (tPct >= 0.55) return 'T-lean';
      if (tPct <= 0.25) return 'extreme-F';
      return 'F-lean';
    },
    results: [
      {
        key: 'extreme-T',
        title: '극T — 팩트와 논리의 사람',
        summary: '"그래서 결론이 뭐야?" 감정보다 논리가 먼저인 이성의 신',
        description: '당신은 극T 성향으로, 감정보다 논리와 팩트를 우선합니다. 감정적인 호소보다 명확한 근거와 데이터가 있어야 납득하는 스타일이에요. 공감보다는 해결책을, 위로보다는 조언을 먼저 건네는 유형입니다. 이성적이고 효율적이지만, 때로는 주변이 "얘는 왜 이렇게 차갑지?" 오해하기도 해요.',
        strengths: ['뛰어난 논리적 사고력', '감정에 흔들리지 않는 판단력', '문제 해결에 강함'],
        caution: ['공감 표현을 의식적으로 연습해보세요', '"그래서?" 보다 "힘들었겠다"가 먼저일 때도 있어요'],
        shareText: '나는 "극T" 🧠 팩트와 논리로 움직이는 사람! 너는?',
        recommendedTests: ['intuition-vs-logic-test', 'hidden-personality-test', 'teto-egen-test'],
      },
      {
        key: 'T-lean',
        title: 'T 우세 — 이성적인 따뜻한 사람',
        summary: '논리가 기본, 가끔 감성도 챙기는 균형 잡힌 이성형',
        description: '논리와 이성이 우세하지만, F의 따뜻함도 품고 있는 유형입니다. 평소에는 냉정하게 판단하지만 중요한 순간엔 상대방 마음도 챙길 줄 아는 사람이에요. 지나치게 감정적이지도, 너무 차갑지도 않은 현실적인 밸런스형 T입니다.',
        strengths: ['이성과 감성의 균형', '논리적이지만 유연한 소통', '신뢰감 있는 조언자'],
        caution: ['감정 표현에 좀 더 솔직해지면 관계가 깊어져요', 'T 본능이 과할 때 잠깐 멈춰보세요'],
        shareText: '나는 "T 우세형" 📊 논리가 기본이지만 감성도 있어! 너는?',
        recommendedTests: ['teto-egen-test', 'how-friends-see-me-test', 'hidden-personality-test'],
      },
      {
        key: 'F-lean',
        title: 'F 우세 — 감성 충만한 공감자',
        summary: '공감이 먼저, 해결은 두 번째인 따뜻한 감성파',
        description: '공감 능력이 뛰어나고 타인의 감정에 민감한 유형입니다. 상대방이 힘들 때 자연스럽게 위로의 말이 나오고, 분위기를 부드럽게 만드는 재주가 있어요. 논리보다 관계와 감정을 중시하며, 주변 사람들에게 "마음이 따뜻한 사람"으로 기억됩니다.',
        strengths: ['탁월한 공감 능력', '관계를 소중히 여기는 마음', '따뜻하고 배려 깊은 소통'],
        caution: ['때로는 이성적 판단도 필요해요', '타인 감정에 너무 몰입해 지칠 수 있어요'],
        shareText: '나는 "F 우세형" 💛 공감이 먼저인 따뜻한 사람! 너는?',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'how-friends-see-me-test'],
      },
      {
        key: 'extreme-F',
        title: '극F — 감성과 공감의 화신',
        summary: '"나도 몰라 그냥 눈물 나" 감정이 먼저인 공감 만렙',
        description: '당신은 극F 성향으로, 감정과 공감이 삶의 중심입니다. 상대방의 기분 변화를 누구보다 빨리 알아채고, 말하지 않아도 마음을 읽어내는 놀라운 감수성을 지니고 있어요. 슬픈 영화에서는 제일 먼저 울고, 친구 고민을 들을 때 같이 아파하는 사람. 이 세상의 공감 충전소 같은 존재예요.',
        strengths: ['풍부한 감수성과 공감 능력', '세심한 관찰력', '관계 속에서 빛나는 따뜻함'],
        caution: ['타인 감정을 너무 흡수해 소진될 수 있어요', '이성적 판단이 필요한 순간을 구분해요'],
        shareText: '나는 "극F" 🥹 감성과 공감의 화신! 너는 극T? 극F?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'over-immersion-test'],
      },
    ],
  },

  // ── 오지랖 지수 테스트 ──────────────────────────────────────────
  {
    slug: 'meddling-test',
    title: '내 오지랖 지수는 몇 레벨?',
    description: '나는 쿨한 편인가, 아니면 오지랖 만렙인가? 지금 바로 확인해보세요.',
    category: '재미 테스트',
    estimatedTime: '2분',
    emoji: '👀',
    questions: [
      {
        id: 1,
        text: '친구가 짝사랑하는 사람 얘기를 들었다. 나는?',
        options: [
          { label: '"잘 되길 바라~" 하고 끝낸다', scores: { score: 0 } },
          { label: '"그 사람 SNS 좀 같이 봐봐" 상대방 파악 나선다', scores: { score: 3 } },
          { label: '"내가 다리 놔줄까?" 직접 개입 시도', scores: { score: 5 } },
          { label: '"고백해! 내가 분위기 잡아줄게" 작전 회의 소집', scores: { score: 7 } },
        ],
      },
      {
        id: 2,
        text: '카페에서 옆 테이블 커플이 싸우고 있다!',
        options: [
          { label: '이어폰 꽂고 내 할 일 한다', scores: { score: 0 } },
          { label: '자연스럽게 귀를 열고 내용을 파악한다', scores: { score: 3 } },
          { label: '혹시 도움이 필요한지 살짝 눈으로 살핀다', scores: { score: 2 } },
          { label: '"괜찮으세요?" 말을 건넬 뻔했다', scores: { score: 5 } },
        ],
      },
      {
        id: 3,
        text: '친구가 자기 남자친구 얘기를 안 해줬는데, SNS 보니까 사귄 것 같다!',
        options: [
          { label: '말해줄 때까지 기다린다', scores: { score: 0 } },
          { label: '"야 근데 너 요즘 남자친구 생겼어?" 슬쩍 물어본다', scores: { score: 3 } },
          { label: '"나한테 왜 말 안 했어!!" 섭섭함 표출', scores: { score: 5 } },
          { label: '공통 지인한테 먼저 확인해본다', scores: { score: 7 } },
        ],
      },
      {
        id: 4,
        text: '가족 중 한 명이 다이어트를 결심했다. 나는?',
        options: [
          { label: '응원만 해준다', scores: { score: 0 } },
          { label: '"이 방법이 효과 있대" 정보를 공유한다', scores: { score: 2 } },
          { label: '식단표를 짜줄 정도로 관여한다', scores: { score: 5 } },
          { label: '"그거 먹으면 안 되지 않아?" 간식 통제까지 한다', scores: { score: 7 } },
        ],
      },
      {
        id: 5,
        text: '친구가 내가 보기에 별로인 사람과 사귀기 시작했다.',
        options: [
          { label: '친구 선택이니까 응원만 해준다', scores: { score: 0 } },
          { label: '"그 사람 좀 이상한 것 같던데..." 걱정을 살짝 전한다', scores: { score: 3 } },
          { label: '"걔 별로야 왜 사귀어?" 직접적으로 말한다', scores: { score: 6 } },
          { label: '"그 사람 뒷조사 해봤어?" 정보 공유에 나선다', scores: { score: 8 } },
        ],
      },
      {
        id: 6,
        text: '직장 동료가 업무를 좀 비효율적으로 하는 것 같다!',
        options: [
          { label: '내 업무에만 집중한다', scores: { score: 0 } },
          { label: '"혹시 이렇게 해보면 어때?" 한 번만 제안한다', scores: { score: 2 } },
          { label: '여러 번 방법을 알려주며 개선을 유도한다', scores: { score: 5 } },
          { label: '팀장에게 슬쩍 말해서 체계를 잡아준다', scores: { score: 7 } },
        ],
      },
      {
        id: 7,
        text: '길에서 모르는 사람이 길을 잃은 것 같다.',
        options: [
          { label: '상대방이 물어볼 때까지 기다린다', scores: { score: 0 } },
          { label: '눈이 마주치면 "도움이 필요하세요?" 먼저 묻는다', scores: { score: 2 } },
          { label: '물어보지 않아도 먼저 다가가 말을 건넨다', scores: { score: 4 } },
          { label: '같이 목적지까지 동행할 준비가 돼 있다', scores: { score: 6 } },
        ],
      },
      {
        id: 8,
        text: '오지랖에 대한 나의 철학은?',
        options: [
          { label: '남의 일에 끼어드는 건 예의에 어긋난다', scores: { score: 0 } },
          { label: '필요할 때만 돕는 게 진짜 배려', scores: { score: 1 } },
          { label: '관심이 있어야 오지랖도 있는 법', scores: { score: 4 } },
          { label: '오지랖은 사랑이야. 내가 다 도와줄게!', scores: { score: 7 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const s = scores.score || 0;
      if (s >= 35) return 'meddling-4';
      if (s >= 22) return 'meddling-3';
      if (s >= 10) return 'meddling-2';
      return 'meddling-1';
    },
    results: [
      {
        key: 'meddling-4',
        title: '오지랖 만렙 — 마을 이장님',
        summary: '이 동네 모든 일은 내가 다 알고 있어! 관심 엔드리스',
        description: '당신은 오지랖 만렙으로, 주변 모든 일에 관심을 갖고 적극적으로 개입하는 유형입니다. 본인은 도움을 주고 싶다고 생각하지만, 상대방은 가끔 "부담스럽다"고 느낄 수 있어요. 하지만 당신의 오지랖 뒤에는 진심 어린 애정이 있다는 거, 다들 알고 있답니다. 다만 선을 좀 더 지키는 연습이 필요해요!',
        strengths: ['넘치는 관심과 애정', '커뮤니티를 이어주는 연결자', '도움이 필요할 때 제일 먼저 나타남'],
        caution: ['때로는 상대방이 혼자 해결할 시간이 필요해요', '관심과 개입의 경계를 의식해보세요'],
        shareText: '내 오지랖 지수는 "만렙 마을 이장님" 👀 너는 몇 레벨이야?',
        recommendedTests: ['how-friends-see-me-test', 'love-style-test', 'attachment-style-test'],
      },
      {
        key: 'meddling-3',
        title: '오지랖 3레벨 — 관심 많은 친구',
        summary: '궁금한 게 많고, 도와주고 싶은 게 많은 정 많은 유형',
        description: '관심이 많아서 자연스럽게 주변 상황을 파악하게 되는 유형입니다. 친한 사람일수록 더 많이 개입하려는 경향이 있고, 혼자 해결하도록 두기보다는 함께 해결하고 싶어해요. 오지랖이 있지만 악의는 전혀 없는 정 많고 따뜻한 사람!',
        strengths: ['주변 상황 파악력이 뛰어남', '먼저 도움의 손을 내밀 줄 아는 사람', '정이 많고 유대감이 강함'],
        caution: ['의도가 좋아도 상대방 입장에서 생각해보세요', '물어봐야 할 때와 먼저 나설 때를 구분해요'],
        shareText: '내 오지랖 지수는 "관심 많은 친구" 3레벨! 너는 몇 레벨이야?',
        recommendedTests: ['how-friends-see-me-test', 'attachment-style-test', 'love-style-test'],
      },
      {
        key: 'meddling-2',
        title: '오지랖 2레벨 — 필요할 때만 나서는 쿨한 사람',
        summary: '관심은 있지만 선 지키는 것도 확실한 쿨가이/쿨걸',
        description: '타인에 대한 관심이 있지만, 지나치게 개입하지 않고 적절한 선을 지킬 줄 아는 유형입니다. 도움이 필요할 때는 적극적으로 나서지만, 상대방의 자율성도 존중합니다. "도움이 필요하면 말해"라는 메시지를 전할 줄 아는 성숙한 관계형이에요.',
        strengths: ['적절한 선 지키기', '상대방 자율성 존중', '필요한 순간에 정확히 나타남'],
        caution: ['가끔은 먼저 다가가는 용기도 필요해요', '너무 쿨하면 무관심해 보일 수 있어요'],
        shareText: '내 오지랖 지수는 "쿨한 2레벨"! 너는 몇 레벨이야? 👀',
        recommendedTests: ['hidden-personality-test', 'intuition-vs-logic-test', 'how-friends-see-me-test'],
      },
      {
        key: 'meddling-1',
        title: '오지랖 1레벨 — 마이웨이 무관심파',
        summary: '남의 일에 에너지 쓸 시간에 내 거나 챙긴다! 쿨한 개인주의자',
        description: '타인의 일에 개입하거나 관여하는 것을 최소화하는 개인주의형 스타일입니다. 자신의 영역을 명확히 하고, 남의 사생활을 존중하는 것을 중요하게 생각해요. "각자의 삶은 스스로 해결해야 한다"는 철학을 갖고 있는 유형으로, 불필요한 갈등이나 에너지 낭비를 피합니다.',
        strengths: ['명확한 경계선', '불필요한 갈등 없음', '자기 삶에 집중하는 에너지 관리'],
        caution: ['가끔 주변 사람들이 외롭게 느낄 수 있어요', '관심을 표현하는 것도 관계에 도움이 돼요'],
        shareText: '내 오지랖 지수는 "마이웨이 1레벨"! 너는 몇 레벨이야? 👀',
        recommendedTests: ['hidden-personality-test', 'attachment-style-test', 'teto-egen-test'],
      },
    ],
  },

  // ── 내면 아이 테스트 ────────────────────────────────────────────
  {
    slug: 'inner-child-test',
    title: '내 마음 속 몇 살 아이가 살고 있을까?',
    description: '당신의 내면에는 어떤 나이의 아이가 숨어있을까요?',
    category: '성격 테스트',
    estimatedTime: '2분',
    emoji: '🧸',
    questions: [
      {
        id: 1,
        text: '갑자기 아무것도 하기 싫은 날이 찾아왔다. 나는?',
        options: [
          { label: '그냥 모든 걸 던져두고 유튜브+과자로 하루를 보낸다', scores: { inner_free: 3, rebel: 1, teen: 0, adult: 0 } },
          { label: '"왜 이렇게 사는 거지?" 허무함이 밀려온다', scores: { inner_free: 0, rebel: 3, teen: 1, adult: 0 } },
          { label: '좋아하는 음악 틀고 감성에 젖어든다', scores: { inner_free: 0, rebel: 0, teen: 3, adult: 1 } },
          { label: '그래도 최소한의 할 일 목록이라도 정리한다', scores: { inner_free: 0, rebel: 0, teen: 0, adult: 3 } },
        ],
      },
      {
        id: 2,
        text: '어릴 때 좋아했던 것이 생각났다. 지금도 하고 싶나요?',
        options: [
          { label: '당연하지! 지금 당장 해도 재밌을 것 같아', scores: { inner_free: 3, rebel: 0, teen: 1, adult: 0 } },
          { label: '"그땐 그랬지..." 씁쓸하고 그리운 감정이 든다', scores: { inner_free: 0, rebel: 2, teen: 2, adult: 0 } },
          { label: '추억은 추억으로 남겨두고 싶다', scores: { inner_free: 0, rebel: 1, teen: 1, adult: 3 } },
          { label: '어떻게 하면 지금 다시 할 수 있을지 찾아본다', scores: { inner_free: 1, rebel: 0, teen: 2, adult: 2 } },
        ],
      },
      {
        id: 3,
        text: '누군가 나한테 규칙을 강요하면?',
        options: [
          { label: '"왜요?!" 즉각 반발하거나 무시해버린다', scores: { inner_free: 2, rebel: 3, teen: 0, adult: 0 } },
          { label: '"납득이 안 되면 따르기 어렵다"는 생각이 든다', scores: { inner_free: 0, rebel: 2, teen: 2, adult: 1 } },
          { label: '알겠다고 하고 나중에 혼자 불만을 삭힌다', scores: { inner_free: 0, rebel: 1, teen: 2, adult: 1 } },
          { label: '이유를 물어보고 합리적이면 받아들인다', scores: { inner_free: 0, rebel: 0, teen: 1, adult: 3 } },
        ],
      },
      {
        id: 4,
        text: '친구들이 나를 어떻게 표현할 것 같나요?',
        options: [
          { label: '"천진난만하고 에너지 넘침"', scores: { inner_free: 3, rebel: 0, teen: 0, adult: 0 } },
          { label: '"자기만의 색깔이 뚜렷하고 반항적인 면이 있음"', scores: { inner_free: 0, rebel: 3, teen: 0, adult: 0 } },
          { label: '"감성적이고 감수성이 풍부함"', scores: { inner_free: 0, rebel: 0, teen: 3, adult: 0 } },
          { label: '"믿음직하고 현실적인 편"', scores: { inner_free: 0, rebel: 0, teen: 0, adult: 3 } },
        ],
      },
      {
        id: 5,
        text: '일이 계획대로 되지 않았을 때 나는?',
        options: [
          { label: '"에이 뭐 어때" 하고 다른 방법을 즉흥적으로 찾는다', scores: { inner_free: 3, rebel: 1, teen: 0, adult: 0 } },
          { label: '"이게 왜 이렇게 됐지?" 화나고 짜증난다', scores: { inner_free: 0, rebel: 3, teen: 1, adult: 0 } },
          { label: '실망감과 아쉬움에 잠시 멍하니 있는다', scores: { inner_free: 0, rebel: 0, teen: 3, adult: 1 } },
          { label: '원인을 분석하고 다음 계획을 세운다', scores: { inner_free: 0, rebel: 0, teen: 0, adult: 3 } },
        ],
      },
      {
        id: 6,
        text: '혼자만의 시간이 생겼을 때 가장 하고 싶은 건?',
        options: [
          { label: '유튜브, 게임, 간식 — 그냥 내가 하고 싶은 것만', scores: { inner_free: 3, rebel: 1, teen: 0, adult: 0 } },
          { label: '아무도 모르는 곳에 혼자 가고 싶다', scores: { inner_free: 0, rebel: 3, teen: 1, adult: 0 } },
          { label: '좋아하는 음악·영화·책으로 감성 충전', scores: { inner_free: 0, rebel: 0, teen: 3, adult: 1 } },
          { label: '밀린 일이나 자기계발에 집중', scores: { inner_free: 0, rebel: 0, teen: 0, adult: 3 } },
        ],
      },
      {
        id: 7,
        text: '감정을 표현하는 나의 방식은?',
        options: [
          { label: '느끼는 대로 바로바로 표현한다', scores: { inner_free: 3, rebel: 1, teen: 0, adult: 0 } },
          { label: '직접 말하기보다 행동이나 태도로 나타낸다', scores: { inner_free: 0, rebel: 2, teen: 2, adult: 0 } },
          { label: '글, 노래, 그림 등 감성적인 방식으로 표현', scores: { inner_free: 0, rebel: 0, teen: 3, adult: 1 } },
          { label: '감정을 정리한 후 차분하게 말로 전달한다', scores: { inner_free: 0, rebel: 0, teen: 1, adult: 3 } },
        ],
      },
      {
        id: 8,
        text: '지금의 나에게 가장 필요한 것은?',
        options: [
          { label: '아무 걱정 없이 신나게 노는 시간', scores: { inner_free: 3, rebel: 0, teen: 1, adult: 0 } },
          { label: '세상에 화내도 되는 공간과 자유', scores: { inner_free: 0, rebel: 3, teen: 1, adult: 0 } },
          { label: '나를 완전히 이해해주는 단 한 사람', scores: { inner_free: 0, rebel: 0, teen: 3, adult: 1 } },
          { label: '앞으로 나아가게 해주는 명확한 방향성', scores: { inner_free: 0, rebel: 0, teen: 0, adult: 3 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const s = scores as Record<string, number>;
      const candidates: [string, number][] = [
        ['inner-free', s.inner_free || 0],
        ['rebel', s.rebel || 0],
        ['teen', s.teen || 0],
        ['adult', s.adult || 0],
      ];
      candidates.sort((a, b) => b[1] - a[1]);
      return candidates[0][0];
    },
    results: [
      {
        key: 'inner-free',
        title: '7살의 자유로운 아이',
        summary: '세상이 놀이터! 호기심과 에너지가 넘치는 영원한 어린이',
        description: '당신 마음 속에는 7살의 순수하고 자유로운 아이가 살고 있어요. 세상을 놀이터처럼 바라보고, 지금 이 순간을 즐기는 것이 가장 중요한 가치입니다. 규칙보다는 자유를, 계획보다는 즉흥을, 진지함보다는 웃음을 선택하는 유형이에요. 당신과 함께 있으면 왠지 신나는 일이 생길 것 같은 기분이 든답니다.',
        strengths: ['순수한 에너지와 낙천성', '지금 이 순간을 즐기는 능력', '주변을 밝게 만드는 존재감'],
        caution: ['무책임해 보일 수 있는 순간도 있어요', '현실적인 책임도 함께 챙겨봐요'],
        shareText: '내 마음 속엔 "7살 자유로운 아이"가 살고 있어! 🧸 너는?',
        recommendedTests: ['over-immersion-test', 'how-friends-see-me-test', 'villain-type-test'],
      },
      {
        key: 'rebel',
        title: '13살의 반항기 아이',
        summary: '"왜요?" 세상에 부딪히며 나만의 방식을 찾는 반항아',
        description: '당신 마음 속에는 13살의 반항기 아이가 살고 있어요. 세상의 규칙과 기대에 의문을 품고, 자신만의 방식으로 살고 싶은 강한 욕구가 있습니다. 부당하다고 느끼는 것에 저항하고, 자신의 정체성을 탐색하는 중이에요. 이 반항기 에너지가 때로는 창의성과 독창성의 원천이 되기도 합니다.',
        strengths: ['강한 자아와 정체성', '불의에 저항하는 용기', '자신만의 독특한 관점'],
        caution: ['모든 것을 적으로 돌리지 않도록 에너지를 조절해요', '함께하는 사람들과 공감하는 연습도 필요해요'],
        shareText: '내 마음 속엔 "13살 반항기 아이"가 살고 있어! 🔥 너는?',
        recommendedTests: ['villain-type-test', 'hidden-personality-test', 'teto-egen-test'],
      },
      {
        key: 'teen',
        title: '17살의 감성 청춘',
        summary: '모든 것이 벅차고 아름다운, 감수성 가득한 청춘 감성',
        description: '당신 마음 속에는 17살의 감성 넘치는 청춘이 살고 있어요. 세상의 아름다움과 슬픔에 깊이 공감하고, 모든 것이 의미 있고 특별하게 느껴지는 풍부한 감수성을 가지고 있습니다. 좋아하는 것에 깊이 빠져들고, 이해받고 싶은 마음이 큰 유형이에요. 이 감성이 예술적 감각과 깊은 관계의 원천이 됩니다.',
        strengths: ['풍부한 감수성과 공감력', '깊이 있는 관계와 유대감', '예술적 감각과 창의성'],
        caution: ['감정의 기복이 클 수 있어요', '현실적인 부분도 함께 챙기면 더 균형 잡힌 삶이 돼요'],
        shareText: '내 마음 속엔 "17살 감성 청춘"이 살고 있어! 🌙 너는?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'over-immersion-test'],
      },
      {
        key: 'adult',
        title: '25살의 성숙한 어른아이',
        summary: '철들었지만 여전히 성장 중인, 현실과 감성 사이 어딘가',
        description: '당신 마음 속에는 25살의 성숙하고 현실적인 어른아이가 살고 있어요. 감정보다는 이성을, 즉흥보다는 계획을 선호하며, 책임감을 중요하게 여깁니다. 어른처럼 생각하고 행동하지만, 가끔은 어린 시절로 돌아가고 싶은 그리움이 있는 유형이에요. 성숙하면서도 아직 배우고 성장하고 있는 중입니다.',
        strengths: ['책임감과 신뢰성', '현실적이고 합리적인 판단', '목표 지향적인 삶의 방식'],
        caution: ['가끔은 계획 없이 즉흥적으로 즐겨봐요', '자신에게 너무 엄격하지 않아도 괜찮아요'],
        shareText: '내 마음 속엔 "25살 성숙한 어른아이"가 살고 있어! 🌱 너는?',
        recommendedTests: ['hidden-personality-test', 'intuition-vs-logic-test', 'teto-egen-test'],
      },
    ],
  },

  // ── 연애 빌런 유형 테스트 ───────────────────────────────────────
  {
    slug: 'love-villain-test',
    title: '나는 어떤 연애 빌런일까?',
    description: '사랑하면 누구나 빌런이 된다. 당신은 어떤 유형의 연애 빌런인가요?',
    category: '연애 테스트',
    estimatedTime: '2분',
    emoji: '💔',
    questions: [
      {
        id: 1,
        text: '연인이 SNS에 이성 친구와 찍은 사진을 올렸다!',
        options: [
          { label: '"누구야?" 바로 캐묻고 관계를 파악한다', scores: { clingy: 1, cold: 0, jealous: 3, love_free: 0 } },
          { label: '며칠 동안 연락을 줄이며 은근히 토라진다', scores: { clingy: 0, cold: 3, jealous: 1, love_free: 0 } },
          { label: '"나 그 사람이 좀 거슬려..." 솔직하게 말한다', scores: { clingy: 2, cold: 0, jealous: 2, love_free: 0 } },
          { label: '별로 신경 안 쓴다. 그냥 친구겠지', scores: { clingy: 0, cold: 0, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 2,
        text: '연인이 3시간 동안 답장을 안 한다!',
        options: [
          { label: '"뭐해? 자? 바빠?" 연속으로 카톡을 보낸다', scores: { clingy: 3, cold: 0, jealous: 1, love_free: 0 } },
          { label: '나도 읽고 답장 안 해버린다 (보복 읽씹)', scores: { clingy: 0, cold: 3, jealous: 1, love_free: 0 } },
          { label: '"혹시 나한테 화났어?" 불안해서 다시 물어본다', scores: { clingy: 2, cold: 0, jealous: 2, love_free: 0 } },
          { label: '그냥 기다린다. 사람한테 연락 강요하면 안 되지', scores: { clingy: 0, cold: 1, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 3,
        text: '연인이 "나 오늘 친구들이랑 놀거야"라고 했다.',
        options: [
          { label: '"몇 시에 끝나? 누구랑?" 일정을 파악한다', scores: { clingy: 2, cold: 0, jealous: 2, love_free: 0 } },
          { label: '"그래, 재밌게 놀아" 하고는 왠지 기분이 안 좋다', scores: { clingy: 0, cold: 2, jealous: 2, love_free: 0 } },
          { label: '"나는?" 하고 살짝 섭섭함을 표현한다', scores: { clingy: 3, cold: 0, jealous: 1, love_free: 0 } },
          { label: '"오케이! 나도 내 친구들 만나야지~"', scores: { clingy: 0, cold: 0, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 4,
        text: '연인이 예전 이성 친구와 밥을 먹었다고 한다.',
        options: [
          { label: '그 자리에서 헤어질 수도 있다', scores: { clingy: 1, cold: 0, jealous: 3, love_free: 0 } },
          { label: '"그래" 하고 한 달간 마음의 문을 닫는다', scores: { clingy: 0, cold: 3, jealous: 1, love_free: 0 } },
          { label: '"왜 말 안 했어?" 서운함을 표현한다', scores: { clingy: 2, cold: 0, jealous: 2, love_free: 0 } },
          { label: '서로 신뢰가 있으면 이런 건 괜찮다고 생각한다', scores: { clingy: 0, cold: 0, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 5,
        text: '연인이 최근 들어 나에게 좀 소홀한 것 같다.',
        options: [
          { label: '"우리 요즘 왜 이래?" 원인 파악에 나선다', scores: { clingy: 2, cold: 0, jealous: 2, love_free: 0 } },
          { label: '나도 거리를 두며 소홀하게 대한다', scores: { clingy: 0, cold: 3, jealous: 1, love_free: 0 } },
          { label: '만나서 솔직하게 감정을 전달한다', scores: { clingy: 1, cold: 0, jealous: 1, love_free: 2 } },
          { label: '그럴 수도 있지. 조금 지켜본다', scores: { clingy: 0, cold: 1, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 6,
        text: '연인의 휴대폰을 우연히 볼 기회가 생겼다.',
        options: [
          { label: '살짝이라도 보고 싶은 충동이 강하게 든다', scores: { clingy: 1, cold: 0, jealous: 3, love_free: 0 } },
          { label: '볼 마음이 없다. 알면 더 복잡해질 것 같아서', scores: { clingy: 0, cold: 2, jealous: 0, love_free: 1 } },
          { label: '보면 안 된다고 생각하면서도 신경이 쓰인다', scores: { clingy: 2, cold: 0, jealous: 2, love_free: 0 } },
          { label: '관심 없다. 서로 프라이버시를 지켜야지', scores: { clingy: 0, cold: 0, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 7,
        text: '이별을 통보받는다면 나는?',
        options: [
          { label: '"왜? 어디서부터 잘못됐어?" 매달리며 이유를 캔다', scores: { clingy: 3, cold: 0, jealous: 1, love_free: 0 } },
          { label: '"그래" 쿨하게 받아들이지만 속은 완전 무너진다', scores: { clingy: 0, cold: 3, jealous: 0, love_free: 0 } },
          { label: '"다른 사람 생겼어?" 의심부터 든다', scores: { clingy: 0, cold: 0, jealous: 3, love_free: 0 } },
          { label: '슬프지만 상대 의사를 존중하고 받아들인다', scores: { clingy: 0, cold: 0, jealous: 0, love_free: 3 } },
        ],
      },
      {
        id: 8,
        text: '내가 생각하는 이상적인 연애는?',
        options: [
          { label: '하루에 여러 번 연락하고 자주 보는 밀착형 연애', scores: { clingy: 3, cold: 0, jealous: 1, love_free: 0 } },
          { label: '서로 독립적이고 적당한 거리가 있는 연애', scores: { clingy: 0, cold: 2, jealous: 0, love_free: 2 } },
          { label: '서로에게 완전히 집중하는 일편단심 연애', scores: { clingy: 1, cold: 0, jealous: 3, love_free: 0 } },
          { label: '각자 자유를 존중하며 함께하는 파트너십 연애', scores: { clingy: 0, cold: 0, jealous: 0, love_free: 3 } },
        ],
      },
    ],
    calculateResult: (scores) => {
      const s = scores as Record<string, number>;
      const candidates: [string, number][] = [
        ['clingy', s.clingy || 0],
        ['cold', s.cold || 0],
        ['jealous', s.jealous || 0],
        ['love-free', s.love_free || 0],
      ];
      candidates.sort((a, b) => b[1] - a[1]);
      return candidates[0][0];
    },
    results: [
      {
        key: 'clingy',
        title: '집착형 연애 빌런',
        summary: '"나만 봐" 애정 넘치지만 가끔 숨막히게 만드는 집착 빌런',
        description: '당신의 연애 빌런 유형은 집착형입니다. 연인에 대한 애정이 넘쳐서 자연스럽게 많은 시간과 연락을 원하게 됩니다. 사랑하기 때문에 모든 것을 알고 싶고, 항상 함께 있고 싶은 마음이 크죠. 이 열정적인 사랑이 상대방에게는 때로 부담이 될 수 있지만, 그 진심만큼은 의심할 여지가 없어요.',
        strengths: ['넘치는 애정 표현', '연인을 최우선으로 생각하는 헌신', '열정적인 사랑'],
        caution: ['연인에게도 개인 시간이 필요해요', '사랑과 집착의 경계를 인식해봐요'],
        shareText: '나는 "집착형 연애 빌런" 💕 너는 어떤 연애 빌런이야?',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'meddling-test'],
      },
      {
        key: 'cold',
        title: '냉각형 연애 빌런',
        summary: '"그래" 한 글자로 마음을 닫는 감정 온도 0도 빌런',
        description: '당신의 연애 빌런 유형은 냉각형입니다. 상처받거나 불만이 생기면 감정을 직접 표현하기보다 거리를 두고 차갑게 대하는 경향이 있어요. 속으로는 상처받고 힘든데, 겉으로는 아무렇지 않은 척하는 것이 특기입니다. 연인이 "왜 이렇게 차가워졌어?"라며 당황한 경험이 있을 것 같네요.',
        strengths: ['감정적으로 휘둘리지 않는 안정감', '충동적인 행동을 자제하는 자기 통제력'],
        caution: ['감정을 솔직하게 표현해야 관계가 발전해요', '차갑게 구는 것은 상대방을 더 힘들게 해요'],
        shareText: '나는 "냉각형 연애 빌런" 🧊 너는 어떤 연애 빌런이야?',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'hidden-personality-test'],
      },
      {
        key: 'jealous',
        title: '질투형 연애 빌런',
        summary: '"그 사람은 누구야?" 사랑이 깊을수록 질투도 깊어지는 질투 빌런',
        description: '당신의 연애 빌런 유형은 질투형입니다. 연인에 대한 사랑이 강한 만큼, 다른 이성에 대한 경계심도 강합니다. "나 말고 다른 사람이 생기면 어떡하지?"라는 불안감이 자주 찾아오고, 연인의 주변 이성 관계에 민감하게 반응해요. 이 질투심의 뿌리에는 상대방을 잃고 싶지 않은 진심 어린 사랑이 있습니다.',
        strengths: ['연인을 소중히 여기는 깊은 마음', '관계에 진지하게 임하는 자세'],
        caution: ['질투가 지나치면 신뢰를 무너뜨려요', '상대방을 믿는 연습이 필요해요'],
        shareText: '나는 "질투형 연애 빌런" 😤 너는 어떤 연애 빌런이야?',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'villain-type-test'],
      },
      {
        key: 'love-free',
        title: '자유영혼 연애 빌런',
        summary: '"각자 자유롭게" 개인주의 연애의 달인, 근데 왜 빌런이야?',
        description: '당신의 연애 빌런 유형은 자유영혼형입니다. 서로의 독립성을 존중하고 개인 공간을 중요하게 생각하는 건강한 연애관을 가지고 있어요. 하지만 이 쿨함이 지나치면 연인이 "나에게 관심이 없는 건가?" 외로움을 느낄 수 있습니다. 자유와 연결감의 밸런스가 이 빌런의 숙제예요.',
        strengths: ['건강한 독립성과 개인 공간 존중', '집착하지 않는 성숙한 연애관', '상대방에게 부담을 주지 않음'],
        caution: ['때로는 더 표현하고 더 관심을 보여줘도 좋아요', '자유를 중시하다 정서적 거리가 멀어질 수 있어요'],
        shareText: '나는 "자유영혼 연애 빌런" 🦋 너는 어떤 연애 빌런이야?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'extreme-tf-test'],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════
     LOVE LANGUAGE TEST
  ═══════════════════════════════════════════════════ */
  {
    slug: 'love-language-test',
    title: '나의 사랑 언어는?',
    description: '당신이 사랑받는다고 느끼는 방식은 5가지입니다. 당신의 진짜 사랑 언어를 알아보세요.',
    category: '연애 테스트',
    estimatedTime: '3분',
    emoji: '💌',
    questions: [
      {
        id: 1,
        text: '연인이 어떻게 할 때 가장 사랑받는다고 느끼나요?',
        options: [
          { label: '"오늘 진짜 예뻤어, 최고야" 같은 칭찬 한마디', scores: { words: 2, acts: 0, gifts: 0, time: 0 } },
          { label: '내가 피곤할 때 조용히 집안일을 대신 해줄 때', scores: { words: 0, acts: 2, gifts: 0, time: 0 } },
          { label: '아무 이유 없이 깜짝 선물을 사다 줄 때', scores: { words: 0, acts: 0, gifts: 2, time: 0 } },
          { label: '폰 내려놓고 오직 나에게만 집중하는 시간', scores: { words: 0, acts: 0, gifts: 0, time: 2 } },
        ],
      },
      {
        id: 2,
        text: '힘든 하루를 보낸 날, 연인에게 가장 바라는 것은?',
        options: [
          { label: '"많이 힘들었지? 고생했어"라는 위로의 말', scores: { words: 2, acts: 0, touch: 0, time: 0 } },
          { label: '말없이 저녁을 차려주거나 안마를 해줌', scores: { words: 0, acts: 2, touch: 0, time: 0 } },
          { label: '조용히 꼭 안아주는 것', scores: { words: 0, acts: 0, touch: 2, time: 0 } },
          { label: '아무것도 안 해도 그냥 옆에 있어줌', scores: { words: 0, acts: 0, touch: 0, time: 2 } },
        ],
      },
      {
        id: 3,
        text: '기념일에 가장 감동받을 것 같은 이벤트는?',
        options: [
          { label: '내 이름이 적힌 손편지나 진심 어린 긴 문자', scores: { words: 2, gifts: 0, touch: 0, time: 0 } },
          { label: '내가 갖고 싶다고 했던 걸 기억해 준 선물', scores: { words: 0, gifts: 2, touch: 0, time: 0 } },
          { label: '아침에 눈 뜨자마자 해주는 포옹과 키스', scores: { words: 0, gifts: 0, touch: 2, time: 0 } },
          { label: '휴대폰 없이 온종일 둘만의 특별한 하루', scores: { words: 0, gifts: 0, touch: 0, time: 2 } },
        ],
      },
      {
        id: 4,
        text: '멀리 사는 연인이 보고 싶을 때, 가장 그리운 것은?',
        options: [
          { label: '"보고 싶어, 사랑해"라는 갑작스러운 연락', scores: { words: 2, acts: 0, touch: 0, time: 0 } },
          { label: '내가 힘들 때 달려와 문제를 해결해 주던 것', scores: { words: 0, acts: 2, touch: 0, time: 0 } },
          { label: '"생각났어"하며 보내준 선물 택배', scores: { words: 0, acts: 0, gifts: 2, time: 0 } },
          { label: '아무 말 없이 오래 통화하던 그 시간', scores: { words: 0, acts: 0, gifts: 0, time: 2 } },
        ],
      },
      {
        id: 5,
        text: '상대방에게 내 사랑을 표현할 때 가장 자연스러운 방식은?',
        options: [
          { label: '"사랑해, 네가 없으면 안 돼" 같은 말', scores: { words: 2, acts: 0, gifts: 0, touch: 0 } },
          { label: '청소, 요리, 심부름 등 직접 도와주기', scores: { words: 0, acts: 2, gifts: 0, touch: 0 } },
          { label: '취향에 맞는 선물이나 깜짝 이벤트', scores: { words: 0, acts: 0, gifts: 2, touch: 0 } },
          { label: '손 잡기, 어깨동무, 스킨십으로 표현', scores: { words: 0, acts: 0, gifts: 0, touch: 2 } },
        ],
      },
      {
        id: 6,
        text: '데이트 후 집에 돌아와서 가장 기억에 남는 장면은?',
        options: [
          { label: '그날 나에게 해준 칭찬이나 고백 같은 말', scores: { words: 2, acts: 0, gifts: 0, time: 0 } },
          { label: '무거운 짐 들어주기 등 자연스러운 배려 행동', scores: { words: 0, acts: 2, gifts: 0, time: 0 } },
          { label: '"먹고 싶다" 했던 디저트를 몰래 사다 준 것', scores: { words: 0, acts: 0, gifts: 2, time: 0 } },
          { label: '벤치에 나란히 앉아 말없이 함께한 그 시간', scores: { words: 0, acts: 0, gifts: 0, time: 2 } },
        ],
      },
      {
        id: 7,
        text: '바쁜 상대가 나를 신경 쓴다는 걸 느끼는 순간은?',
        options: [
          { label: '쉬는 시간에 짧게 "생각났어" 문자를 보낼 때', scores: { words: 2, acts: 0, touch: 0, time: 0 } },
          { label: '내 힘든 일을 기억하고 먼저 도와줄 때', scores: { words: 0, acts: 2, touch: 0, time: 0 } },
          { label: '퇴근하고 들어오자마자 꼭 안아줄 때', scores: { words: 0, acts: 0, touch: 2, time: 0 } },
          { label: '바빠도 30분이라도 꼭 만나려 할 때', scores: { words: 0, acts: 0, touch: 0, time: 2 } },
        ],
      },
      {
        id: 8,
        text: '싸운 후 화해할 때 가장 마음이 풀리는 것은?',
        options: [
          { label: '"미안해, 사랑해" 진심 어린 말을 들을 때', scores: { words: 2, gifts: 0, touch: 0, time: 0 } },
          { label: '좋아하는 음식이나 작은 선물을 들고 올 때', scores: { words: 0, gifts: 2, touch: 0, time: 0 } },
          { label: '말없이 손 잡아주거나 꼭 안아줄 때', scores: { words: 0, gifts: 0, touch: 2, time: 0 } },
          { label: '조용히 옆에 앉아 내 말을 다 들어줄 때', scores: { words: 0, gifts: 0, touch: 0, time: 2 } },
        ],
      },
      {
        id: 9,
        text: '연인이 나를 위해 해준 것 중 가장 감사했던 기억은?',
        options: [
          { label: '힘들 때 써준 응원 편지나 메모', scores: { words: 2, acts: 0, gifts: 0, time: 0 } },
          { label: '내 몫까지 도맡아 해결해 준 일', scores: { words: 0, acts: 2, gifts: 0, time: 0 } },
          { label: '이유 없이 사다 준 내 최애 간식이나 선물', scores: { words: 0, acts: 0, gifts: 2, time: 0 } },
          { label: '아무 말 없이 내 곁에 오래 있어준 그 시간', scores: { words: 0, acts: 0, gifts: 0, time: 2 } },
        ],
      },
      {
        id: 10,
        text: '이상적인 주말 데이트라면?',
        options: [
          { label: '카페에서 서로 하고 싶은 말 다 쏟아내는 수다 데이트', scores: { words: 2, acts: 0, gifts: 0, touch: 0 } },
          { label: '내가 원하는 걸 직접 해주는 서프라이즈 이벤트', scores: { words: 0, acts: 2, gifts: 0, touch: 0 } },
          { label: '소소한 선물을 교환하며 쇼핑하는 데이트', scores: { words: 0, acts: 0, gifts: 2, touch: 0 } },
          { label: '손 잡고 산책하거나 집에서 붙어서 뒹구는 스킨십 데이트', scores: { words: 0, acts: 0, gifts: 0, touch: 2 } },
        ],
      },
    ],
    results: [
      {
        key: 'words',
        title: '말로 사랑받는 언어형',
        summary: '"사랑해" 한마디가 세상 어떤 선물보다 소중한 당신!',
        description: '당신의 사랑 언어는 "확인의 말(Words of Affirmation)"입니다. 칭찬, 감사, 사랑의 고백 등 언어적 표현에서 사랑을 가장 강하게 느낍니다. 연인이 진심 어린 말 한마디를 건넬 때 마음이 가득 차오르고, 반대로 부정적인 말은 다른 유형보다 더 깊이 상처가 됩니다. 파트너에게도 자신의 언어로 솔직하게 마음을 표현해주세요.',
        strengths: ['진심 어린 칭찬과 감사 표현에 민감하게 반응', '언어로 감정을 주고받는 소통 능력이 뛰어남', '파트너의 말 한마디를 오래 기억하고 소중히 여김'],
        caution: ['부정적인 말이나 비판에 상처받기 쉬워요', '파트너도 같은 방식으로 표현하길 기대하지 않도록 해요'],
        shareText: '나의 사랑 언어는 "말(Words)" 💬 너는 어떤 사랑 언어야?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'mbti-test'],
      },
      {
        key: 'acts',
        title: '행동으로 사랑받는 봉사형',
        summary: '말보다 행동! "해줬어" 한마디에 심장이 뛰는 타입',
        description: '당신의 사랑 언어는 "봉사 행위(Acts of Service)"입니다. 연인이 직접 행동으로 도움을 줄 때 사랑을 가장 크게 느낍니다. 말보다 결과로 증명하는 실천적인 사랑에 감동받으며, 상대가 내 편의를 위해 무언가를 해줄 때 "이 사람이 나를 진짜 사랑하는구나"를 확인합니다. 작은 배려 행동 하나에 크게 감사하는 사람입니다.',
        strengths: ['실질적인 도움과 배려 행동에 깊이 감동받음', '파트너를 위해 직접 무언가를 해주는 것에 능숙', '사랑을 말이 아닌 행동으로 증명하는 관계를 원함'],
        caution: ['말로 표현하는 것도 상대에게 중요할 수 있어요', '상대가 잘 움직이지 않을 때 무관심으로 오해하지 마세요'],
        shareText: '나의 사랑 언어는 "행동(Acts)" 🤝 너는 어떤 사랑 언어야?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'how-friends-see-me-test'],
      },
      {
        key: 'gifts',
        title: '선물로 사랑받는 선물형',
        summary: '"생각났어"라는 말과 함께 건네는 선물에 녹아버리는 타입!',
        description: '당신의 사랑 언어는 "선물 받기(Receiving Gifts)"입니다. 선물의 가격보다 그 안에 담긴 마음과 정성을 느끼는 사람입니다. "이걸 보고 네 생각이 났어"라는 말 한마디와 함께 건네는 작은 선물이 세상에서 가장 큰 사랑의 증거입니다. 기념일뿐만 아니라 평범한 날에 받는 깜짝 선물에 가장 설레고 행복합니다.',
        strengths: ['상대의 취향과 필요를 기억해 선물 잘 고름', '선물 속에 담긴 마음과 정성을 깊이 느낌', '사랑을 물질이 아닌 관심과 기억으로 이해함'],
        caution: ['선물보다 마음이 중요하다는 것을 파트너에게 알려주세요', '선물이 없을 때 사랑이 없다고 오해하지 않도록 해요'],
        shareText: '나의 사랑 언어는 "선물(Gifts)" 🎁 너는 어떤 사랑 언어야?',
        recommendedTests: ['love-style-test', 'love-villain-test', 'attachment-style-test'],
      },
      {
        key: 'quality-time',
        title: '함께 있는 시간이 사랑인 시간형',
        summary: '폰 내려놓고 나만 바라봐줄 때 세상을 다 가진 기분!',
        description: '당신의 사랑 언어는 "함께하는 시간(Quality Time)"입니다. 연인과 온전히 집중해 함께하는 시간에서 사랑을 가장 깊이 느낍니다. 비싼 선물보다 아무것도 안 하고 그냥 옆에 있어주는 것, 휴대폰 없이 눈을 마주치며 대화하는 것이 최고의 사랑 표현입니다. 상대가 자리를 비우거나 주의를 분산시킬 때 외로움을 더 크게 느낍니다.',
        strengths: ['함께하는 시간의 질을 높이기 위해 노력함', '현재에 충실한 사랑을 나눌 줄 앎', '연인과 깊은 감정적 교류를 원하고 잘함'],
        caution: ['혼자만의 시간도 건강한 관계에 필요해요', '상대가 바쁠 때 방치됐다고 느끼지 않도록 해요'],
        shareText: '나의 사랑 언어는 "시간(Quality Time)" ⏱️ 너는 어떤 사랑 언어야?',
        recommendedTests: ['attachment-style-test', 'love-style-test', 'hidden-personality-test'],
      },
      {
        key: 'touch',
        title: '스킨십으로 사랑받는 접촉형',
        summary: '손 한번 잡아줬을 뿐인데 하루가 다 행복해지는 타입!',
        description: '당신의 사랑 언어는 "신체 접촉(Physical Touch)"입니다. 포옹, 손잡기, 어깨에 기대기 등 가벼운 스킨십에서도 사랑을 강하게 느낍니다. 말이나 선물보다 몸으로 전달되는 따뜻함이 당신의 마음을 가장 빠르게 채웁니다. 힘들 때 안아주는 것 하나로 모든 게 해결되는 사람이에요.',
        strengths: ['스킨십을 통해 감정을 자연스럽게 표현', '신체 접촉으로 안정감과 연결감을 나눌 수 있음', '파트너의 작은 스킨십에 큰 위안을 받음'],
        caution: ['스킨십을 불편해하는 상대에게는 속도를 맞춰주세요', '스킨십 이외의 사랑 언어도 함께 배워봐요'],
        shareText: '나의 사랑 언어는 "스킨십(Touch)" 🤗 너는 어떤 사랑 언어야?',
        recommendedTests: ['love-style-test', 'attachment-style-test', 'love-villain-test'],
      },
    ],
    calculateResult: (scores) => {
      const langs = ['words', 'acts', 'gifts', 'quality-time', 'touch'] as const;
      return langs.reduce<string>((best, k) => ((scores[k] ?? 0) > (scores[best] ?? 0) ? k : best), 'words');
    },
  },

  /* ═══════════════════════════════════════════════════
     NARCISSIST TEST
  ═══════════════════════════════════════════════════ */
  {
    slug: 'narcissist-test',
    title: '나는 나르시시스트일까?',
    description: '나르시시즘 지수를 측정해 나의 자기중심성을 솔직하게 알아봐요. 점수가 높을수록 주의!',
    category: '성격 테스트',
    estimatedTime: '3분',
    emoji: '🪞',
    questions: [
      {
        id: 1,
        text: '그룹 사진을 찍을 때 나는?',
        options: [
          { label: '내가 제일 잘 나왔는지 제일 먼저 확인한다', scores: { narc: 3 } },
          { label: '다들 잘 나왔는지 먼저 본다', scores: { narc: 1 } },
          { label: '거의 신경 안 쓴다 — 추억이 중요하지', scores: { narc: 0 } },
          { label: '내 것은 보정 앱 돌리고 공유한다', scores: { narc: 2 } },
        ],
      },
      {
        id: 2,
        text: '팀 프로젝트가 성공했을 때 나는?',
        options: [
          { label: '속으로 "내 덕분이지"라고 생각한다', scores: { narc: 3 } },
          { label: '팀원들과 함께 기뻐하고 공을 나눈다', scores: { narc: 0 } },
          { label: '결과를 내 포트폴리오에 바로 추가한다', scores: { narc: 2 } },
          { label: '다음엔 내 역할을 더 크게 하고 싶다고 생각한다', scores: { narc: 1 } },
        ],
      },
      {
        id: 3,
        text: '친구가 나보다 먼저 좋은 일이 생겼을 때 나는?',
        options: [
          { label: '진심으로 축하하고 함께 기뻐한다', scores: { narc: 0 } },
          { label: '"나도 곧 될 텐데"라는 생각이 든다', scores: { narc: 1 } },
          { label: '왠지 모르게 기분이 안 좋다', scores: { narc: 2 } },
          { label: '내 성과도 같이 언급하고 싶어진다', scores: { narc: 3 } },
        ],
      },
      {
        id: 4,
        text: '소셜 미디어에서 내 게시물에 "좋아요"가 적을 때?',
        options: [
          { label: '신경 별로 안 씀 — 내가 좋으면 됐지', scores: { narc: 0 } },
          { label: '조금 아쉽지만 금방 잊는다', scores: { narc: 1 } },
          { label: '사진이나 글이 별로였나 분석해 본다', scores: { narc: 2 } },
          { label: '삭제하거나 더 좋은 걸로 다시 올린다', scores: { narc: 3 } },
        ],
      },
      {
        id: 5,
        text: '누군가 내 의견에 공개적으로 반박할 때 나는?',
        options: [
          { label: '틀렸다고 생각하지만 그럴 수도 있다고 인정한다', scores: { narc: 0 } },
          { label: '더 논리적으로 내 주장을 펼친다', scores: { narc: 1 } },
          { label: '화가 나고 그 사람이 밉다', scores: { narc: 2 } },
          { label: '그 사람의 신뢰도를 깎으려 한다', scores: { narc: 3 } },
        ],
      },
      {
        id: 6,
        text: '내 외모나 능력에 대한 솔직한 생각은?',
        options: [
          { label: '평균 정도는 된다고 생각한다', scores: { narc: 0 } },
          { label: '일부 분야에선 꽤 잘한다고 생각한다', scores: { narc: 1 } },
          { label: '대부분의 사람보다 낫다고 생각한다', scores: { narc: 2 } },
          { label: '내 주변엔 나만큼 한 사람이 없다', scores: { narc: 3 } },
        ],
      },
      {
        id: 7,
        text: '친구가 자신의 고민을 털어놓을 때 나는?',
        options: [
          { label: '끝까지 경청하고 공감해준다', scores: { narc: 0 } },
          { label: '듣다가 비슷한 내 경험을 꺼낸다', scores: { narc: 1 } },
          { label: '빨리 해결책을 주고 대화를 정리한다', scores: { narc: 2 } },
          { label: '내 이야기로 대화를 자연스럽게 넘긴다', scores: { narc: 3 } },
        ],
      },
      {
        id: 8,
        text: '내가 규칙을 지키지 않아도 될 것 같을 때?',
        options: [
          { label: '규칙은 모두를 위한 것이라 지킨다', scores: { narc: 0 } },
          { label: '상황이 정말 어쩔 수 없을 때만 어긴다', scores: { narc: 1 } },
          { label: '내가 이 정도면 예외가 될 수 있다고 생각한다', scores: { narc: 2 } },
          { label: '규칙이 나한테까지 적용된다고 생각 안 한다', scores: { narc: 3 } },
        ],
      },
      {
        id: 9,
        text: '대화에서 가장 좋아하는 주제는?',
        options: [
          { label: '상대방의 관심사나 일상 이야기', scores: { narc: 0 } },
          { label: '서로 공통된 관심사나 사회 이슈', scores: { narc: 1 } },
          { label: '내가 잘 아는 분야 — 가르쳐주는 게 좋음', scores: { narc: 2 } },
          { label: '내 성과, 경험, 계획에 대한 이야기', scores: { narc: 3 } },
        ],
      },
      {
        id: 10,
        text: '나를 오해하거나 과소평가하는 사람을 만나면?',
        options: [
          { label: '그럴 수 있다고 이해하고 넘긴다', scores: { narc: 0 } },
          { label: '기회가 되면 내 진짜 모습을 보여준다', scores: { narc: 1 } },
          { label: '속으로 무시하고 상대의 수준을 낮게 본다', scores: { narc: 2 } },
          { label: '그 사람에게 잘못됐음을 직접 알린다', scores: { narc: 3 } },
        ],
      },
    ],
    results: [
      {
        key: 'narc-empath',
        title: '공감의 달인',
        summary: '자기중심성 최저! 당신은 남을 먼저 생각하는 사람이에요',
        description: '나르시시즘 점수가 매우 낮습니다. 당신은 타인의 감정에 민감하고, 공감 능력이 뛰어나며, 관계에서 자신보다 상대방을 먼저 생각하는 경향이 있습니다. 자기 자신을 과도하게 낮추거나 지나치게 양보하는 것은 오히려 관계에서 건강하지 않을 수 있으니, 적절한 자기 주장도 필요합니다. 당신은 주변 사람들에게 정서적으로 안정감을 주는 존재예요.',
        strengths: ['높은 공감 능력과 타인 배려', '관계에서 상대방을 존중하는 태도', '팀워크와 협업에서 빛나는 사람'],
        caution: ['자신의 필요와 경계도 지켜야 해요', '지나친 자기희생은 번아웃의 원인이 돼요'],
        shareText: '내 나르시시즘 지수는 "공감의 달인" 🌿 너는 어때?',
        recommendedTests: ['hidden-personality-test', 'attachment-style-test', 'mbti-test'],
      },
      {
        key: 'narc-healthy',
        title: '건강한 자기애',
        summary: '적절한 자존감! 나를 사랑하면서 남도 배려하는 균형잡힌 타입',
        description: '나르시시즘 점수가 보통 수준입니다. 당신은 자신을 가치 있게 여기면서도 타인을 배려하는 건강한 자기애를 가지고 있어요. 때로는 자신의 성취를 드러내고 싶거나 인정받고 싶은 욕구가 있지만, 그것이 관계를 해치지는 않습니다. 자신감과 공감의 균형을 잘 잡고 있는 건강한 유형입니다.',
        strengths: ['적절한 자신감과 자존감 유지', '자신의 성취를 인식하면서도 타인을 존중', '관계에서 주도권을 적절히 발휘'],
        caution: ['가끔 자기중심적으로 보일 수 있으니 타인 배려를 의식하세요', '경쟁심이 과해지지 않도록 주의하세요'],
        shareText: '내 나르시시즘 지수는 "건강한 자기애" ✨ 너는 어때?',
        recommendedTests: ['mbti-test', 'hidden-personality-test', 'how-friends-see-me-test'],
      },
      {
        key: 'narc-covert',
        title: '은밀한 나르시시스트',
        summary: '겉으론 평범해 보이지만... 속에선 "나는 특별해" 생각 중?',
        description: '나르시시즘 점수가 다소 높습니다. 당신은 눈에 띄게 과시하지 않지만, 내심 자신이 특별하다는 생각을 자주 합니다. 타인의 성공에 묘한 불쾌감을 느끼거나, 내 이야기로 대화를 이끌고 싶은 욕구가 있을 수 있습니다. 이른바 "은밀한 나르시시스트"의 특성이 보입니다. 이를 인식하고 타인의 관점을 더 적극적으로 이해하려는 노력이 도움이 됩니다.',
        strengths: ['높은 자기 기준과 동기 부여', '성취욕이 강하고 목표 지향적', '자신의 이미지 관리에 신경 씀'],
        caution: ['타인의 성공을 진심으로 축하하는 연습이 필요해요', '대화에서 상대방의 이야기에 더 집중해 보세요'],
        shareText: '내 나르시시즘 지수는 "은밀한 나르시시스트" 🪞 너는 어때?',
        recommendedTests: ['villain-type-test', 'hidden-personality-test', 'mbti-test'],
      },
      {
        key: 'narc-core',
        title: '나르시시스트 유형',
        summary: '자기중심성 MAX! 세상의 중심은 나라고 생각하는 타입',
        description: '나르시시즘 점수가 매우 높습니다. 당신은 자신을 다른 사람보다 특별하거나 우월하게 생각하는 경향이 강합니다. 타인의 감정보다 자신의 필요를 우선하거나, 비판에 민감하게 반응하고 상대를 비난하는 패턴이 있을 수 있습니다. 이러한 특성은 장기적인 관계에서 어려움을 만들 수 있어요. 타인의 관점을 이해하려는 의식적인 노력이 필요합니다. 이 결과는 재미 목적이며, 임상 진단이 아닙니다.',
        strengths: ['강한 자신감과 리더십 에너지', '목표를 향한 강한 추진력', '자신의 능력을 높게 평가하는 자존감'],
        caution: ['타인의 감정과 필요를 적극적으로 고려해 보세요', '비판을 공격으로 받아들이지 않는 연습이 중요해요'],
        shareText: '내 나르시시즘 지수는 "나르시시스트 유형" 👑 너는 어때?',
        recommendedTests: ['villain-type-test', 'attachment-style-test', 'extreme-tf-test'],
      },
    ],
    calculateResult: (scores) => {
      const s = scores['narc'] ?? 0;
      if (s >= 23) return 'narc-core';
      if (s >= 16) return 'narc-covert';
      if (s >= 8)  return 'narc-healthy';
      return 'narc-empath';
    },
  },

  /* ═══════════════════════════════════════════════════
     PSYCHOPATH TEST
  ═══════════════════════════════════════════════════ */
  {
    slug: 'psychopath-test',
    title: '나의 사이코패스 지수는?',
    description: '공감력 vs 냉정함. 내 안의 다크한 면을 솔직하게 측정해봐요. (재미 목적)',
    category: '성격 테스트',
    estimatedTime: '3분',
    emoji: '🎭',
    questions: [
      {
        id: 1,
        text: '길을 걷다 강아지가 다쳐서 울부짖는 걸 목격했다. 나는?',
        options: [
          { label: '즉시 달려가 도움을 주거나 도움을 요청한다', scores: { psych: 0 } },
          { label: '마음이 아프지만 어떻게 해야 할지 몰라 멈춘다', scores: { psych: 1 } },
          { label: '안타깝긴 한데 내 일이 있어서 그냥 지나친다', scores: { psych: 2 } },
          { label: '별감흥이 없다 — 그냥 지나친다', scores: { psych: 3 } },
        ],
      },
      {
        id: 2,
        text: '친한 친구가 나 때문에 많이 상처받았다. 나는?',
        options: [
          { label: '정말 미안하고 어떻게 위로할까 진지하게 고민한다', scores: { psych: 0 } },
          { label: '미안하다고 사과하고 수습한다', scores: { psych: 1 } },
          { label: '내가 그렇게 의도하진 않았으니까 별로 죄책감 없다', scores: { psych: 2 } },
          { label: '왜 그렇게 상처받는지 이해가 안 된다', scores: { psych: 3 } },
        ],
      },
      {
        id: 3,
        text: '규칙을 어기면 이득을 볼 수 있는 상황이라면?',
        options: [
          { label: '이득이 있어도 규칙은 지킨다', scores: { psych: 0 } },
          { label: '들키지 않을 것 같아도 웬만하면 안 한다', scores: { psych: 1 } },
          { label: '안 들킬 것 같으면 어길 수도 있다', scores: { psych: 2 } },
          { label: '이득이 된다면 당연히 한다 — 걸리면 그때 생각', scores: { psych: 3 } },
        ],
      },
      {
        id: 4,
        text: '협상이나 협업에서 나의 전략은?',
        options: [
          { label: '서로 이득이 되는 방향을 찾는다', scores: { psych: 0 } },
          { label: '내 이익을 지키면서도 상대를 배려한다', scores: { psych: 1 } },
          { label: '내 이익이 최우선 — 상대는 알아서 챙기면 된다', scores: { psych: 2 } },
          { label: '상대의 약점을 파악하고 활용한다', scores: { psych: 3 } },
        ],
      },
      {
        id: 5,
        text: '처음 만난 사람과의 첫인상 관리에 대해 나는?',
        options: [
          { label: '자연스럽게 나를 드러내는 편이다', scores: { psych: 0 } },
          { label: '좋은 모습을 보이려고 의식적으로 노력한다', scores: { psych: 1 } },
          { label: '원하는 인상을 의도적으로 설계한다', scores: { psych: 2 } },
          { label: '상황에 따라 완전히 다른 페르소나를 사용한다', scores: { psych: 3 } },
        ],
      },
      {
        id: 6,
        text: '슬픈 영화나 드라마를 볼 때 나는?',
        options: [
          { label: '자연스럽게 눈물이 난다', scores: { psych: 0 } },
          { label: '감동적이라고 느끼지만 눈물은 안 나온다', scores: { psych: 1 } },
          { label: '이야기는 재미있지만 감정이입은 잘 안 된다', scores: { psych: 2 } },
          { label: '왜 우는지 이해가 안 된다', scores: { psych: 3 } },
        ],
      },
      {
        id: 7,
        text: '내가 누군가에게 거짓말을 해야 한다면?',
        options: [
          { label: '거짓말이 정말 불편하고 최대한 피한다', scores: { psych: 0 } },
          { label: '어쩔 수 없을 때만 하고 죄책감을 느낀다', scores: { psych: 1 } },
          { label: '필요하면 할 수 있고 죄책감은 별로 없다', scores: { psych: 2 } },
          { label: '자연스럽게 잘 한다 — 들키지 않으면 문제없다', scores: { psych: 3 } },
        ],
      },
      {
        id: 8,
        text: '위험하거나 자극적인 상황에 대한 나의 태도는?',
        options: [
          { label: '안전을 최우선으로 한다 — 위험은 피하는 게 최선', scores: { psych: 0 } },
          { label: '약간의 스릴은 좋지만 크게 무리하지 않는다', scores: { psych: 1 } },
          { label: '위험도 재미의 일부다 — 충동적으로 뛰어드는 편', scores: { psych: 2 } },
          { label: '강한 자극이 없으면 지루하다', scores: { psych: 3 } },
        ],
      },
      {
        id: 9,
        text: '나에게 잘못을 한 사람에 대해 나는?',
        options: [
          { label: '화가 나지만 이해하려 하고 용서한다', scores: { psych: 0 } },
          { label: '시간이 지나면 자연스럽게 잊는다', scores: { psych: 1 } },
          { label: '기억해두고 언젠가 갚는다', scores: { psych: 2 } },
          { label: '즉각적으로 응징하거나 냉정하게 제거한다', scores: { psych: 3 } },
        ],
      },
      {
        id: 10,
        text: '다른 사람의 실패나 불행을 목격했을 때 나의 첫 반응은?',
        options: [
          { label: '안타깝고 도와주고 싶다', scores: { psych: 0 } },
          { label: '공감은 되지만 내 일이 아니면 크게 신경 안 쓴다', scores: { psych: 1 } },
          { label: '왜 그런 결과가 나왔는지 분석한다', scores: { psych: 2 } },
          { label: '그 사람의 약점이 드러난 것 정도로 받아들인다', scores: { psych: 3 } },
        ],
      },
    ],
    results: [
      {
        key: 'psych-empath',
        title: '공감 초과형',
        summary: '사이코패스 지수 최저! 당신은 타인의 감정에 누구보다 민감해요',
        description: '사이코패스 지수가 매우 낮습니다. 당신은 강한 공감 능력을 가지고 있으며, 타인의 감정과 고통을 자신의 것처럼 느끼는 경향이 있습니다. 규칙을 지키고 도덕적 기준이 높으며, 거짓말이나 조작을 매우 불편하게 느낍니다. 때로는 타인의 감정을 지나치게 흡수해 정서적으로 소진될 수 있으니, 자신의 경계를 지키는 것도 중요합니다.',
        strengths: ['강한 공감력과 높은 감수성', '진실하고 도덕적인 가치관', '깊은 인간관계를 형성하는 능력'],
        caution: ['감정 과몰입으로 지칠 수 있어요', '자신의 감정 경계도 지키는 연습이 필요해요'],
        shareText: '나의 사이코패스 지수는 "공감 초과형" 🌟 너는 몇 점이야?',
        recommendedTests: ['hidden-personality-test', 'attachment-style-test', 'mbti-test'],
      },
      {
        key: 'psych-rational',
        title: '감정 합리형',
        summary: '감정도 있고 이성도 있는 딱 평균! 실용적인 공감러',
        description: '사이코패스 지수가 평균 수준입니다. 당신은 감정과 이성 사이에서 균형을 잡는 실용적인 사람입니다. 공감 능력이 있지만 지나치게 감정에 휩쓸리지는 않으며, 필요할 때는 냉정하게 판단할 수 있습니다. 규칙을 준수하면서도 상황에 따른 유연성을 발휘하는 현실적인 인물입니다.',
        strengths: ['감정과 이성의 균형 잡힌 판단', '실용적이고 현실적인 사고방식', '스트레스 상황에서 침착하게 대처'],
        caution: ['감정이 필요한 순간에 너무 논리적으로 대응하지 않도록 해요', '타인의 감정적 필요에 조금 더 귀 기울여 보세요'],
        shareText: '나의 사이코패스 지수는 "감정 합리형" ⚖️ 너는 몇 점이야?',
        recommendedTests: ['extreme-tf-test', 'mbti-test', 'hidden-personality-test'],
      },
      {
        key: 'psych-cold',
        title: '냉정한 계산가',
        summary: '감정보다 논리! 차갑게 분석하는 냉철한 뇌 구조',
        description: '사이코패스 지수가 다소 높습니다. 당신은 감정보다 논리와 결과를 우선시하는 경향이 강합니다. 공감이 완전히 없는 건 아니지만, 감정적인 반응보다 분석적인 판단을 선호합니다. 목적 달성을 위해 전략적으로 행동하며, 사람들을 때로는 도구적으로 바라볼 수 있습니다. 관계에서 따뜻함을 의식적으로 더 표현하는 것이 도움이 됩니다.',
        strengths: ['냉철하고 객관적인 분석력', '감정에 흔들리지 않는 판단력', '위기 상황에서의 침착한 대응'],
        caution: ['타인의 감정을 더 적극적으로 고려해 보세요', '목적을 위해 사람을 이용하는 패턴을 점검해 보세요'],
        shareText: '나의 사이코패스 지수는 "냉정한 계산가" 🧊 너는 몇 점이야?',
        recommendedTests: ['villain-type-test', 'narcissist-test', 'extreme-tf-test'],
      },
      {
        key: 'psych-dark',
        title: '다크 인사이더',
        summary: '공감보다 전략! 인간관계도 체스판으로 보는 다크한 뇌',
        description: '사이코패스 지수가 매우 높습니다. 당신은 감정적 공감보다 전략적 사고가 강하게 발달되어 있습니다. 규칙을 자신에게 유리하게 해석하거나, 타인의 감정에 무감각한 경향이 있을 수 있습니다. 이러한 특성이 비즈니스나 경쟁적 환경에서 유리하게 작용할 수도 있지만, 장기적인 진정한 인간관계 형성에는 어려움이 될 수 있습니다. 이 결과는 재미 목적이며, 임상적 진단이 아닙니다.',
        strengths: ['강한 전략적 사고와 실행력', '감정에 흔들리지 않는 냉정한 판단', '목표 달성에 대한 강한 집중력'],
        caution: ['진정한 연결을 원한다면 공감 능력을 키우는 노력이 필요해요', '타인을 수단이 아닌 목적으로 대하는 연습을 해보세요'],
        shareText: '나의 사이코패스 지수는 "다크 인사이더" 🎭 너는 몇 점이야?',
        recommendedTests: ['villain-type-test', 'narcissist-test', 'hidden-personality-test'],
      },
    ],
    calculateResult: (scores) => {
      const s = scores['psych'] ?? 0;
      if (s >= 23) return 'psych-dark';
      if (s >= 16) return 'psych-cold';
      if (s >= 8)  return 'psych-rational';
      return 'psych-empath';
    },
  },
];

const TEST_DISPLAY_ORDER = [
  'mbti-test',
  'love-language-test',
  'narcissist-test',
  'teto-egen-test',
  'psychopath-test',
  'extreme-tf-test',
  'love-style-test',
  'attachment-style-test',
  'hidden-personality-test',
  'love-villain-test',
  'villain-type-test',
  'how-friends-see-me-test',
  'inner-child-test',
  'meddling-test',
  'over-immersion-test',
  'intuition-vs-logic-test',
  'destiny-age-test',
];

export const tests: Test[] = [..._tests].sort((a, b) => {
  const ai = TEST_DISPLAY_ORDER.indexOf(a.slug);
  const bi = TEST_DISPLAY_ORDER.indexOf(b.slug);
  if (ai === -1 && bi === -1) return 0;
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
});

export const getTestBySlug = (slug: string) => tests.find(t => t.slug === slug);

/**
 * Per-result emoji overrides.
 * Used in the hero card and share card so each result has a
 * personality-matching icon instead of the generic test emoji.
 */
export const RESULT_EMOJIS: Record<string, string> = {
  // ── 연애 성향 테스트 ──
  'direct-romantic':  '🔥',
  'direct-realist':   '💼',
  'passive-romantic': '💭',
  'passive-realist':  '🤝',

  // ── 애착 유형 테스트 ──
  'secure':    '🌿',
  'anxious':   '🌀',
  'avoidant':  '🧊',
  'mixed':     '🎭',

  // ── 숨겨진 성격 테스트 ──
  'extrovert':  '🦋',
  'introvert':  '🏠',
  'chameleon':  '🦎',
  'balanced':   '🌗',

  // ── 과몰입 테스트 ──
  'extreme':  '🔥',
  'high':     '💫',
  'medium':   '🌤️',
  'realist':  '🧭',

  // ── 친구들에게 보이는 나 ──
  'mood-maker':      '🎊',
  'parent':          '🧸',
  'hidden-comedian': '😂',
  'observer':        '👁️',

  // ── 직관 vs 논리 ──
  'extreme-intuition': '🌊',
  'extreme-logic':     '🧩',
  'emotional-logic':   '🌺',
  'balanced-thinker':  '⚖️',

  // ── MBTI 16 유형 ──
  'ENTJ': '👑',
  'ENTP': '💡',
  'ENFJ': '🌟',
  'ENFP': '🌈',
  'ESTJ': '🫡',
  'ESFJ': '🥳',
  'ESTP': '⚡',
  'ESFP': '🎤',
  'INTJ': '🎯',
  'INTP': '🔭',
  'INFJ': '🔮',
  'INFP': '🌙',
  'ISTJ': '🏛️',
  'ISFJ': '💝',
  'ISTP': '🔧',
  'ISFP': '🎨',
  'age-20s': '✨',
  'age-30s': '🌱',
  'age-40s': '🌿',
  'age-50s': '🌾',
  'pure-teto': '🔥',
  'teto-lean': '⚡',
  'eigen-lean': '🧊',
  'pure-eigen': '🔭',
  'balanced-te': '⚖️',

  // ── 빌런 유형 테스트 ──
  'narcissist': '👑',
  'obsessive':  '🔍',
  'cold':       '🧊',
  'timid':      '🫠',

  // ── 극T 극F 테스트 ──
  'extreme-T': '🧠',
  'T-lean':    '📊',
  'F-lean':    '💛',
  'extreme-F': '🥹',

  // ── 오지랖 지수 테스트 ──
  'meddling-4': '📣',
  'meddling-3': '👀',
  'meddling-2': '😌',
  'meddling-1': '🎧',

  // ── 내면 아이 테스트 ──
  'inner-free':  '🎠',
  'rebel': '🔥',
  'teen':  '🌙',
  'adult': '🌱',

  // ── 연애 빌런 유형 테스트 ──
  'clingy':    '💕',
  'jealous':   '😤',
  'love-free': '🦋',

  // ── 사랑 언어 테스트 ──
  'words':        '💬',
  'acts':         '🤝',
  'gifts':        '🎁',
  'quality-time': '⏱️',
  'touch':        '🤗',

  // ── 나르시시스트 테스트 ──
  'narc-empath':  '🌿',
  'narc-healthy': '✨',
  'narc-covert':  '🪞',
  'narc-core':    '👑',

  // ── 사이코패스 테스트 ──
  'psych-empath':    '🌟',
  'psych-rational':  '⚖️',
  'psych-cold':      '🧊',
  'psych-dark':      '🎭',
};
