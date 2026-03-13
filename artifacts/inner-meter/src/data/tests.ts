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
  relationshipStyle?: string;
  compatibleVibe?: string;
}

export interface Test {
  slug: string;
  title: string;
  description: string;
  category: '성격 테스트' | '연애 테스트' | '재미 테스트' | 'MBTI';
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
        relationshipStyle: '연애도 목표를 정하고 전략적으로 접근합니다. 표현은 직접적이지만 책임감 하나만큼은 완벽하고, 상대방이 인정해줄 때 더 깊이 헌신해요.',
        compatibleVibe: 'INFP, INTP — 나의 강한 방향성을 부드럽게 채워줄 유형과 잘 맞아요'
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
        relationshipStyle: '지적 대화와 논쟁을 즐기는 연애 스타일. 다양한 이야기를 나눌 수 있는 관계에서 가장 빛납니다.',
        compatibleVibe: 'INFJ, INTJ — 나의 발산적 에너지를 수렴해줄 깊이 있는 유형과 잘 어울려요'
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
        relationshipStyle: '깊고 의미 있는 연애를 추구합니다. 상대방의 성장을 진심으로 응원하며 함께 더 나은 사람이 되고 싶어하는 헌신적인 연인이에요.',
        compatibleVibe: 'INFP, ISFP — 나의 따뜻함을 온전히 받아들이고 순수하게 감동받는 유형과 맞아요'
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
        relationshipStyle: '처음 감정이 폭발하는 썸 단계를 가장 설레게 즐깁니다. 관계가 깊어질수록 자유와 진심 사이에서 균형을 잡으려 노력해요.',
        compatibleVibe: 'INTJ, INFJ — 나의 에너지를 묵묵히 받아주고 방향을 잡아줄 유형과 잘 맞아요'
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
        relationshipStyle: '안정적이고 신뢰할 수 있는 파트너. 감정 표현은 서툴 수 있지만 행동으로 진심을 보여주는 든든한 연인이에요.',
        compatibleVibe: 'ISFP, ISTP — 나의 강한 계획성 옆에서 여유로운 균형을 맞춰줄 유형과 잘 어울려요'
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
        relationshipStyle: '헌신적이고 따뜻한 연인. 기념일을 절대 잊지 않으며 상대방이 편안하게 느낄 수 있도록 늘 세심하게 노력합니다.',
        compatibleVibe: 'ISFP, INFP — 나의 헌신에 감동받고 진심으로 화답하는 감성형과 잘 맞아요'
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
        relationshipStyle: '연애도 즉흥적이고 활기차게. 함께 새로운 경험을 즐기는 것을 중요하게 생각하며 자유롭고 재미있는 관계를 선호해요.',
        compatibleVibe: 'ISFJ, ISTJ — 나의 즉흥적인 에너지를 안전하게 잡아줄 안정적인 유형과 잘 맞아요'
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
        relationshipStyle: '사랑받고 또 사랑해주는 것을 적극적으로 즐기는 스타일. 함께하는 순간 하나하나를 특별하게 만들어줍니다.',
        compatibleVibe: 'ISFJ, ISTJ — 나의 화려함 뒤에서 든든하게 지원해줄 유형과 잘 어울려요'
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
        relationshipStyle: '관계에 신중하게 접근하지만 한번 마음을 열면 깊고 진지한 연인이 됩니다. 말보다 행동으로 사랑을 표현하는 타입이에요.',
        compatibleVibe: 'ENFP, ENTP — 나의 닫힌 세계를 밝고 창의적으로 열어줄 유형과 잘 맞아요'
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
        relationshipStyle: '관계에서 깊은 지적 교감을 가장 중요하게 여깁니다. 말 대신 관심 어린 분석과 배려로 사랑을 표현하는 독특한 스타일이에요.',
        compatibleVibe: 'ENTJ, ENFJ — 나의 흩어진 에너지를 방향 잡아줄 리더십 있는 유형과 잘 어울려요'
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
        relationshipStyle: '깊고 의미 있는 연결을 원하며 표면적인 관계는 금방 지루해집니다. 진심이 통하는 사람을 만나면 온 마음을 다해 헌신해요.',
        compatibleVibe: 'ENFP, ENTP — 나의 진지함을 가볍고 따뜻하게 받아줄 유형과 잘 맞아요'
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
        relationshipStyle: '사랑하면 온 마음을 주는 유형. 진심과 감정을 중시하고 관계에서 깊은 유대와 이해를 원합니다.',
        compatibleVibe: 'ENFJ, ENTJ — 나를 이해하고 세상을 헤쳐나가도록 이끌어줄 리더형과 잘 맞아요'
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
        relationshipStyle: '천천히 마음을 열지만, 한번 열면 평생 든든한 파트너가 됩니다. 행동으로 사랑을 보여주는 묵직한 스타일이에요.',
        compatibleVibe: 'ESFP, ESTP — 나의 진중함을 재미있게 흔들어줄 활동적인 유형과 잘 어울려요'
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
        relationshipStyle: '깊은 헌신과 세심함으로 상대방을 감동시키는 연인. 소소한 기념일도 기억하고 진심으로 챙깁니다.',
        compatibleVibe: 'ESTP, ESFP — 나의 조용함을 밝고 활기차게 채워줄 유형과 잘 어울려요'
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
        relationshipStyle: '자유를 중시하는 연애 스타일. 말보다 행동으로 챙기며 상대방의 독립성도 존중하는 여유로운 파트너예요.',
        compatibleVibe: 'ESFJ, ESTJ — 나의 방향성 없는 일상을 따뜻하게 정리해줄 계획형과 잘 어울려요'
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
        relationshipStyle: '표현은 적지만 작은 행동 하나하나에 사랑을 담는 타입. 상대방의 취향을 세심하게 기억하고 배려합니다.',
        compatibleVibe: 'ENTJ, ESFJ — 나의 부드러운 감성을 리드해줄 결단력 있는 유형과 잘 맞아요'
      }
    ]
  }
];

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
};
