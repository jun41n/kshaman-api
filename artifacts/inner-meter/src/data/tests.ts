export interface TestOption {
  label: string;
  scores: Record<string, number>;
}

export interface TestQuestion {
  id: number;
  text: string;
  options: TestOption[];
}

export interface TestResult {
  key: string;
  title: string;
  summary: string;
  description: string;
  strengths: string[];
  caution: string[];
  shareText: string;
  recommendedTests: string[];
}

export interface Test {
  slug: string;
  title: string;
  description: string;
  category: '성격 테스트' | '연애 테스트' | '재미 테스트';
  estimatedTime: string;
  emoji: string;
  questions: TestQuestion[];
  results: TestResult[];
  calculateResult: (scores: Record<string, number>) => string;
}

export const tests: Test[] = [
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
  }
];

export const getTestBySlug = (slug: string) => tests.find(t => t.slug === slug);
