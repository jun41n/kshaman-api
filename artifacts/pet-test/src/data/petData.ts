export type PetType = 'dog' | 'cat';

export interface PetOption {
  label: string;
  scores: Record<string, number>;
}

export interface PetQuestion {
  id: number;
  text: string;
  options: PetOption[];
}

export interface PetResult {
  key: string;
  emoji: string;
  image?: string;
  title: string;
  summary: string;
  description: string;
  traits: string[];
  compatibleOwner?: string;
  ownerTip?: string;
  gradient: string;
  cardBg: string;
}

export interface PetTest {
  type: PetType;
  emoji: string;
  label: string;
  description: string;
  questions: PetQuestion[];
  results: PetResult[];
  calculateResult: (scores: Record<string, number>) => string;
}

export const DOG_TEST: PetTest = {
  type: 'dog',
  emoji: '🐕',
  label: '강아지',
  description: '우리 아이의 숨겨진 강아지 성향을 분석해 드려요!',
  questions: [
    {
      id: 1,
      text: '공원에서 다른 강아지를 만나면?',
      options: [
        { label: '먼저 달려가서 인사한다', scores: { E: 2 } },
        { label: '보호자 옆에서 조심스럽게 살펴본다', scores: { I: 2 } },
      ],
    },
    {
      id: 2,
      text: '낯선 사람이 집에 방문하면?',
      options: [
        { label: '꼬리 치며 먼저 달려간다', scores: { E: 2 } },
        { label: '구석에 숨어서 지켜본다', scores: { I: 2 } },
      ],
    },
    {
      id: 3,
      text: '보호자가 퇴근하면?',
      options: [
        { label: '온몸으로 흥분해서 반긴다', scores: { E: 2 } },
        { label: '반갑지만 조용히 꼬리만 흔든다', scores: { I: 2 } },
      ],
    },
    {
      id: 4,
      text: '산책할 때 나는?',
      options: [
        { label: '매일 가는 익숙한 길이 좋다', scores: { S: 2 } },
        { label: '오늘은 새로운 길을 가고 싶다', scores: { N: 2 } },
      ],
    },
    {
      id: 5,
      text: '새 장난감이 생기면?',
      options: [
        { label: '하던 방식대로 잘 논다', scores: { S: 2 } },
        { label: '이리저리 새로운 방법을 시도한다', scores: { N: 2 } },
      ],
    },
    {
      id: 6,
      text: '밥 먹을 때 나는?',
      options: [
        { label: '맛보다 양이 중요하다, 빨리 먹는다', scores: { S: 2 } },
        { label: '냄새 맡고 천천히, 먹는 것 자체를 즐긴다', scores: { N: 2 } },
      ],
    },
    {
      id: 7,
      text: '보호자가 힘들어 보이면?',
      options: [
        { label: '장난감 물고 와서 기분 전환시킨다', scores: { T: 2 } },
        { label: '다가가서 핥고 붙어서 위로한다', scores: { F: 2 } },
      ],
    },
    {
      id: 8,
      text: '다른 강아지가 내 자리를 차지하면?',
      options: [
        { label: '바로 가서 내 자리를 돌려받는다', scores: { T: 2 } },
        { label: '속상하지만 다른 자리를 찾는다', scores: { F: 2 } },
      ],
    },
    {
      id: 9,
      text: '훈련할 때 나는?',
      options: [
        { label: '빠릿빠릿, 효율적으로 배운다', scores: { T: 2 } },
        { label: '보호자 칭찬이 있어야 열심히 한다', scores: { F: 2 } },
      ],
    },
    {
      id: 10,
      text: '산책, 밥, 수면 시간이?',
      options: [
        { label: '매일 정해진 시간에 하는 게 좋다', scores: { J: 2 } },
        { label: '그날그날 분위기에 따라 달라도 괜찮다', scores: { P: 2 } },
      ],
    },
    {
      id: 11,
      text: '보호자가 갑자기 계획을 바꾸면?',
      options: [
        { label: '당황스럽다, 루틴이 깨지면 불안하다', scores: { J: 2 } },
        { label: '오히려 신난다, 뭔가 새로운 거 생기나?', scores: { P: 2 } },
      ],
    },
    {
      id: 12,
      text: '자기 전 나는?',
      options: [
        { label: '매일 같은 자리, 같은 자세로 잔다', scores: { J: 2 } },
        { label: '그날 기분에 따라 여기저기 자리 바꾼다', scores: { P: 2 } },
      ],
    },
  ],
  calculateResult: (scores) => {
    const EI = (scores['E'] || 0) >= (scores['I'] || 0) ? 'e' : 'i';
    const SN = (scores['S'] || 0) >= (scores['N'] || 0) ? 's' : 'n';
    const TF = (scores['T'] || 0) >= (scores['F'] || 0) ? 't' : 'f';
    const JP = (scores['J'] || 0) >= (scores['P'] || 0) ? 'j' : 'p';
    return `${EI}${SN}${TF}${JP}`;
  },
  results: [
    {
      key: 'istj',
      emoji: '🐕',
      image: '/images/istj.webp',
      title: '청렴결백한 원칙주의자',
      summary: '규칙적인 생활과 신뢰의 아이콘',
      description: '약속된 산책 시간을 정확히 기억하며, 정해진 규칙을 지킬 때 가장 편안함을 느끼는 모범생 타입입니다. 낯선 변화보다는 익숙한 루틴을 선호합니다.',
      traits: ['정확한 루틴 선호', '차분하고 신중함', '강한 책임감'],
      gradient: 'linear-gradient(150deg, #4b5563 0%, #6b7280 100%)',
      cardBg: '#4b5563'
    },
    {
      key: 'isfj',
      emoji: '🐕',
      image: '/images/isfj.webp',
      title: '용감한 수호자',
      summary: '보호자 곁을 지키는 든든한 보디가드',
      description: '조용히 다가와 머리를 기대는 등 세심하게 보호자의 기분을 살핍니다. 헌신적이며 가족을 보호하려는 본능이 매우 강한 따뜻한 수호천사입니다.',
      traits: ['섬세한 공감능력', '기억력이 좋음', '매우 헌신적임'],
      gradient: 'linear-gradient(150deg, #10b981 0%, #34d399 100%)',
      cardBg: '#10b981'
    },
    {
      key: 'infj',
      emoji: '🐕',
      image: '/images/infj.webp',
      title: '선의의 옹호자',
      summary: '말하지 않아도 마음을 읽는 통찰가',
      description: '가끔은 혼자만의 사색을 즐기는 듯 신비로운 분위기를 풍깁니다. 보호자의 감정 변화에 매우 민감하게 반응하며 깊은 정서적 유대감을 중요시합니다.',
      traits: ['깊은 유대감 중시', '조용하고 사색적', '예민한 감수성'],
      gradient: 'linear-gradient(150deg, #8b5cf6 0%, #a78bfa 100%)',
      cardBg: '#8b5cf6'
    },
    {
      key: 'intj',
      emoji: '🐕',
      image: '/images/intj.webp',
      title: '용의주도한 전략가',
      summary: '똑똑하고 독립적인 지능형 캐릭터',
      description: '단순한 반복보다는 머리를 쓰는 노즈워크나 퍼즐 장난감을 즐깁니다. 혼자 있는 시간도 잘 견디며, 상황 판단이 매우 빠른 똑똑한 파트너입니다.',
      traits: ['높은 지능과 분석력', '독립적인 성향', '전략적인 학습력'],
      gradient: 'linear-gradient(150deg, #6366f1 0%, #818cf8 100%)',
      cardBg: '#6366f1'
    },
    {
      key: 'istp',
      emoji: '🐕',
      image: '/images/istp.webp',
      title: '만능 재주꾼',
      summary: '적응력 끝판왕, 쿨한 모험가',
      description: '새로운 물건을 탐구하거나 장애물을 뛰어넘는 것에 두려움이 없습니다. 과한 애정 표현보다는 묵묵히 곁을 지키는 쿨한 매력을 가진 타입입니다.',
      traits: ['뛰어난 상황 적응력', '도구 활용 능력', '대담하고 침착함'],
      gradient: 'linear-gradient(150deg, #0d9488 0%, #14b8a6 100%)',
      cardBg: '#0d9488'
    },
    {
      key: 'isfp',
      emoji: '🐕',
      image: '/images/isfp.webp',
      title: '호기심 많은 예술가',
      summary: '세상의 모든 냄새가 궁금한 평화주의자',
      description: '자유로운 영혼으로, 산책 시 여기저기 냄새를 맡으며 세상을 탐색하는 것을 즐깁니다. 갈등을 싫어하고 모든 사람과 원만하게 지내는 성격입니다.',
      traits: ['풍부한 감성', '온순하고 친절함', '현재를 즐기는 타입'],
      gradient: 'linear-gradient(150deg, #fbbf24 0%, #fcd34d 100%)',
      cardBg: '#fbbf24'
    },
    {
      key: 'infp',
      emoji: '🐕',
      image: '/images/infp.webp',
      title: '열정적인 중재자',
      summary: '꿈꾸는 댕댕이, 낭만적인 파트너',
      description: '마음이 매우 여리고 착해서 보호자의 목소리 톤 하나에도 크게 반응합니다. 상상력이 풍부하며 자신만의 세계가 뚜렷한 내향형 사랑둥이입니다.',
      traits: ['이상주의적 성향', '매우 부드러움', '깊은 내적 애정'],
      gradient: 'linear-gradient(150deg, #34d399 0%, #6ee7b7 100%)',
      cardBg: '#34d399'
    },
    {
      key: 'intp',
      emoji: '🐕',
      image: '/images/intp.webp',
      title: '논리적인 사색가',
      summary: '엉뚱한 매력의 조용한 천재',
      description: '가끔은 왜 저러나 싶을 정도로 독특한 행동을 하지만, 사실은 주변 환경을 끊임없이 관찰하고 분석하는 중입니다. 조용하지만 호기심이 많습니다.',
      traits: ['창의적인 사고', '객관적인 관찰자', '자유로운 영혼'],
      gradient: 'linear-gradient(150deg, #0ea5e9 0%, #38bdf8 100%)',
      cardBg: '#0ea5e9'
    },
    {
      key: 'estp',
      emoji: '🐕',
      image: '/images/estp.webp',
      title: '모험을 즐기는 사업가',
      summary: '직진 본능! 에너자이저 활동가',
      description: '망설임 없이 행동으로 옮기는 타입입니다. 낯선 강아지나 사람에게도 먼저 다가가 인사하는 핵인싸이며, 거친 놀이도 마다하지 않는 용감한 성격입니다.',
      traits: ['강한 활동력', '자신감 넘침', '즉흥적이고 사교적'],
      gradient: 'linear-gradient(150deg, #f59e0b 0%, #fbbf24 100%)',
      cardBg: '#f59e0b'
    },
    {
      key: 'esfp',
      emoji: '🐕',
      image: '/images/esfp.webp',
      title: '자유로운 영혼의 연예인',
      summary: '어디서나 주인공! 분위기 메이커',
      description: '사람들의 관심을 받는 것을 무엇보다 즐깁니다. 애교가 넘치고 매 순간 즐거움을 찾으려 노력하며, 보호자를 웃게 만드는 천부적인 재능이 있습니다.',
      traits: ['천성적인 낙천가', '주의 집중 즐김', '에너지가 매우 밝음'],
      gradient: 'linear-gradient(150deg, #ec4899 0%, #f472b6 100%)',
      cardBg: '#ec4899'
    },
    {
      key: 'enfp',
      emoji: '🐕',
      image: '/images/enfp.webp',
      title: '재기발랄한 활동가',
      summary: '사랑과 열정의 꼬리치기 마스터',
      description: '모든 것이 새롭고 즐거운 긍정 왕입니다. 창의적인 방법으로 보호자에게 놀이를 제안하며, 풍부한 표정 변화로 자신의 감정을 확실하게 표현합니다.',
      traits: ['무한한 긍정 에너지', '사교성 최고', '풍부한 감정표현'],
      gradient: 'linear-gradient(150deg, #f97316 0%, #fb923c 100%)',
      cardBg: '#f97316'
    },
    {
      key: 'entp',
      emoji: '🐕',
      image: '/images/entp.webp',
      title: '뜨거운 논쟁을 즐기는 변론가',
      summary: '영리하고 장난기 가득한 지략가',
      description: '지루한 것을 참지 못하며 끊임없이 새로운 장난을 생각합니다. 보호자와의 밀당을 즐기기도 하며, 어려운 훈련도 게임처럼 재미있게 습득합니다.',
      traits: ['도전적인 성향', '빠른 상황 대처', '영리한 장난꾸러기'],
      gradient: 'linear-gradient(150deg, #f43f5e 0%, #fb7185 100%)',
      cardBg: '#f43f5e'
    },
    {
      key: 'estj',
      emoji: '🐕',
      image: '/images/estj.webp',
      title: '엄격한 관리자',
      summary: '우리 집의 기강을 잡는 질서 반장',
      description: '집안의 규칙을 명확히 이해하고 따릅니다. 산책 시에도 앞장서서 길을 안내하려 하며, 리더십이 강하고 예측 가능한 상황을 선호하는 듬직한 타입입니다.',
      traits: ['리더십과 질서', '명확한 의사 표현', '단호하고 정직함'],
      gradient: 'linear-gradient(150deg, #1d4ed8 0%, #3b82f6 100%)',
      cardBg: '#1d4ed8'
    },
    {
      key: 'esfj',
      emoji: '🐕',
      image: '/images/esfj.webp',
      title: '사교적인 외교관',
      summary: '모두를 챙기는 따뜻한 배려 대장',
      description: '가족 구성원 모두를 살뜰히 챙기며 화목한 분위기를 좋아합니다. 칭찬받는 것을 매우 좋아하며, 보호자의 기대에 부응하려고 노력하는 다정다감한 성격입니다.',
      traits: ['협조적이고 친절함', '사회적 적응력', '세심한 배려심'],
      gradient: 'linear-gradient(150deg, #06b6d4 0%, #22d3ee 100%)',
      cardBg: '#06b6d4'
    },
    {
      key: 'enfj',
      emoji: '🐕',
      image: '/images/enfj.webp',
      title: '정의로운 사회운동가',
      summary: '마음을 움직이는 따뜻한 리더',
      description: '사람뿐만 아니라 다른 강아지 친구들과도 깊은 우정을 쌓습니다. 카리스마 넘치면서도 다정한 성품을 지녔으며, 주변을 항상 밝게 만드는 매력이 있습니다.',
      traits: ['타인에게 영향력', '이타적인 태도', '사교적 리더십'],
      gradient: 'linear-gradient(150deg, #facc15 0%, #fbbf24 100%)',
      cardBg: '#facc15'
    },
    {
      key: 'entj',
      emoji: '🐕',
      image: '/images/entj.webp',
      title: '대담한 통솔자',
      summary: '자신감 넘치는 당당한 카리스마',
      description: '목표 지향적인 성격으로 어려운 과제도 끝까지 해냅니다. 당당한 걸음걸이와 자신감 있는 태도가 특징이며, 확실한 리더십을 가진 든든한 동반자입니다.',
      traits: ['결단력과 추진력', '자신감 있는 태도', '명확한 목표 의식'],
      gradient: 'linear-gradient(150deg, #7e22ce 0%, #a855f7 100%)',
      cardBg: '#7e22ce'
    }
  ]

};

export const CAT_TEST: PetTest = {
  type: 'cat',
  emoji: '🐈',
  label: '고양이',
  description: '우리 냥이의 숨겨진 고양이 성향을 분석해 드려요!',
  questions: [
    {
      id: 1,
      text: '아침에 보호자가 일어나면?',
      options: [
        { label: '유유히 걸어와서 주변을 한 바퀴 돈다', scores: { noble: 3 } },
        { label: '창문으로 달려가 밖을 본다', scores: { free: 3 } },
        { label: '밥 달라고 얼굴을 밟거나 크게 운다', scores: { boss: 3 } },
        { label: '구석에서 조용히 보다가 사라진다', scores: { observer: 3 } },
      ],
    },
    {
      id: 2,
      text: '간식 시간!',
      options: [
        { label: '우아하게 다가와서 한두 번 먹고 간다', scores: { noble: 3 } },
        { label: '발로 그릇 잡아당겨 자기 쪽으로 끌어온다', scores: { boss: 3 } },
        { label: '관심이 없을 때도 있다', scores: { free: 3 } },
        { label: '살금살금 오다가 먹이를 빠르게 낚아챈다', scores: { hunter: 3 } },
      ],
    },
    {
      id: 3,
      text: '집 안에 새로운 물체가 생기면?',
      options: [
        { label: '바로 다가가서 냄새 맡고 확인한다', scores: { hunter: 3 } },
        { label: '멀리서 지켜보다가 천천히 다가간다', scores: { observer: 3 } },
        { label: '관심 없는 척하다가 아무도 없을 때 확인한다', scores: { noble: 2, observer: 1 } },
        { label: '밀어서 바닥에 떨어뜨려본다', scores: { boss: 3 } },
      ],
    },
    {
      id: 4,
      text: '보호자가 TV를 보고 있으면?',
      options: [
        { label: 'TV 앞에 앉아서 화면을 가린다', scores: { boss: 3 } },
        { label: '구석에서 조용히 보호자를 관찰한다', scores: { observer: 3 } },
        { label: '무릎에 올라가서 자리 차지한다', scores: { noble: 3 } },
        { label: '밖에서 뭔가 움직이는 게 더 재밌다', scores: { hunter: 2, free: 1 } },
      ],
    },
    {
      id: 5,
      text: '보호자가 키보드로 일하고 있다면?',
      options: [
        { label: '키보드 위에 올라간다', scores: { boss: 3 } },
        { label: '혼자 논다, 신경 쓰지 않는다', scores: { free: 3 } },
        { label: '화면에서 움직이는 커서를 앞발로 친다', scores: { hunter: 3 } },
        { label: '멀리서 지켜본다', scores: { observer: 3 } },
      ],
    },
    {
      id: 6,
      text: '처음 보는 사람이 만지려 할 때?',
      options: [
        { label: '슬쩍 피하며 우아하게 자리를 옮긴다', scores: { noble: 3 } },
        { label: '도망가서 숨는다', scores: { free: 2, observer: 1 } },
        { label: '가만히 있다가 허락 없이 만지면 손을 친다', scores: { boss: 3 } },
        { label: '조용히 뒤에서 관찰만 한다', scores: { observer: 3 } },
      ],
    },
    {
      id: 7,
      text: '장난감(낚시봉, 공)을 흔들어주면?',
      options: [
        { label: '신중하게 기회를 노리다 와일드하게 공격한다', scores: { hunter: 3 } },
        { label: '잠깐 신나게 놀다 관심을 잃는다', scores: { noble: 2 } },
        { label: '뚫어지게 쳐다보다 조용히 사라진다', scores: { observer: 2, free: 1 } },
        { label: '내가 재미없으면 안 논다', scores: { free: 3 } },
      ],
    },
    {
      id: 8,
      text: '비가 오는 날 집 안 분위기는?',
      options: [
        { label: '창가에 앉아서 빗소리를 듣는다', scores: { observer: 3 } },
        { label: '소파에서 우아하게 낮잠을 잔다', scores: { noble: 3 } },
        { label: '갑자기 집 안에서 운동회를 시작한다', scores: { hunter: 2, boss: 1 } },
        { label: '평소처럼, 특별히 신경 안 쓴다', scores: { free: 3 } },
      ],
    },
    {
      id: 9,
      text: '보호자가 힘들어 보이면?',
      options: [
        { label: '와서 옆에 조용히 앉아있는다', scores: { observer: 2, noble: 1 } },
        { label: '무릎 위에 올라와 그루밍 시작한다', scores: { boss: 2, noble: 1 } },
        { label: '큰소리 나니까 방에서 나온다', scores: { free: 2 } },
        { label: '특별히 반응하지 않는다', scores: { free: 3 } },
      ],
    },
    {
      id: 10,
      text: '밤늦게 가장 활발해진다. 주로 하는 것은?',
      options: [
        { label: '집 안 모든 물건을 바닥에 떨어뜨린다', scores: { boss: 3 } },
        { label: '어둠 속에서 이리저리 뛰어다닌다', scores: { hunter: 3 } },
        { label: '쿨하게 자기 자리에서 잔다', scores: { noble: 2 } },
        { label: '창문으로 밖의 야생동물을 감시한다', scores: { observer: 2, hunter: 1 } },
      ],
    },
    {
      id: 11,
      text: '집에 혼자 남게 되면?',
      options: [
        { label: '완전한 자유를 만끽한다', scores: { free: 3 } },
        { label: '집 안 구석구석을 탐험한다', scores: { hunter: 3 } },
        { label: '높은 곳에 올라가 모든 것을 관찰한다', scores: { observer: 3 } },
        { label: '평소처럼 낮잠 후 그루밍', scores: { noble: 3 } },
      ],
    },
    {
      id: 12,
      text: '나만의 공간(은신처)은?',
      options: [
        { label: '창틀이나 높은 선반 위', scores: { observer: 2, noble: 1 } },
        { label: '어두운 박스나 서랍 안', scores: { hunter: 2, free: 1 } },
        { label: '보호자의 침대 한복판', scores: { boss: 3 } },
        { label: '집 어디든, 자유롭게 다님', scores: { free: 3 } },
      ],
    },
    {
      id: 13,
      text: '그루밍(자기 몸 핥기)은?',
      options: [
        { label: '틈날 때마다, 완벽한 외모가 중요하다', scores: { noble: 3 } },
        { label: '보다가 갑자기 시작하고 갑자기 멈춘다', scores: { free: 2 } },
        { label: '보호자 손을 핥다가 자기 손을 핥는다', scores: { boss: 2 } },
        { label: '체계적으로, 머리부터 발끝까지 꼼꼼히', scores: { observer: 2, noble: 1 } },
      ],
    },
    {
      id: 14,
      text: '보호자가 쓰는 물건을 발견했을 때?',
      options: [
        { label: '냄새 맡고 내 구역 선언(얼굴 비빔)', scores: { boss: 3 } },
        { label: '발로 톡톡 쳐보다 밀어버린다', scores: { hunter: 2, boss: 1 } },
        { label: '안으로 들어가거나 위에 앉는다', scores: { free: 2, noble: 1 } },
        { label: '멀리서 조용히 관찰한다', scores: { observer: 3 } },
      ],
    },
    {
      id: 15,
      text: '지금 이 순간 가장 행복할 때는?',
      options: [
        { label: '높은 곳에서 온 집 안을 내려다볼 때', scores: { observer: 2, noble: 1 } },
        { label: '사냥 모드 발동! 움직이는 것을 잡을 때', scores: { hunter: 3 } },
        { label: '보호자가 내가 원할 때만 애교를 받을 때', scores: { boss: 3 } },
        { label: '아무 방해 없이 조용히 내 시간을 보낼 때', scores: { free: 3, noble: 1 } },
      ],
    },
  ],
  calculateResult: (scores) => {
    const dims = ['noble', 'free', 'boss', 'hunter', 'observer'] as const;
    let best: (typeof dims)[number] = dims[0];
    for (const d of dims) {
      if ((scores[d] || 0) > (scores[best] || 0)) best = d;
    }
    return best;
  },
  results: [
    {
      key: 'noble',
      emoji: '👑',
      title: '우아한 귀족형',
      summary: '이 집의 주인은 나야, 품위는 잃지 않는다',
      description:
        '자신만의 품위와 기준을 갖고 있는 고급 취향의 고양이에요. 아무에게나 애교를 부리지 않지만, 인정한 사람에게는 특별한 신뢰를 보여줍니다. 모든 행동이 우아함 그 자체이며, 절대 자신의 품위를 손상시키지 않는 타입이에요.',
      traits: [
        '외모 관리에 매우 신경 써요',
        '선택받은 사람에게만 애교를 부려요',
        '자신만의 루틴과 기준이 확고해요',
      ],
      compatibleOwner: '고양이의 독립성을 이해하고 조용한 환경을 제공하는 보호자',
      ownerTip: '무리하게 안으려 하지 마세요. 고양이가 먼저 다가올 때 기다려주세요!',
      gradient: 'linear-gradient(150deg, #b45309 0%, #d97706 50%, #fbbf24 100%)',
      cardBg: '#d97706',
    },
    {
      key: 'free',
      emoji: '🌿',
      title: '자유를 사랑하는 자유인',
      summary: '내 삶은 내가 결정해, 간섭하지 마세요',
      description:
        '규칙과 틀에 얽매이지 않는 자유로운 영혼이에요. 혼자 있는 시간을 편안하게 즐기며, 강요받는 것을 싫어합니다. 하지만 본인이 원할 때는 따뜻하게 다가오는 예측 불가능한 매력이 있어요.',
      traits: [
        '혼자만의 시간을 소중히 여겨요',
        '관심을 강요받으면 거부해요',
        '자유로운 공간이 확보되면 행복해요',
      ],
      compatibleOwner: '바쁜 일상을 가졌지만 고양이를 믿고 존중하는 보호자',
      ownerTip: '숨을 수 있는 공간과 높은 공간(캣타워)을 마련해 주세요!',
      gradient: 'linear-gradient(150deg, #065f46 0%, #059669 50%, #34d399 100%)',
      cardBg: '#059669',
    },
    {
      key: 'boss',
      emoji: '😈',
      title: '집사를 부리는 보스',
      summary: '이 집의 모든 것은 내 것, 집사님 열심히 해줘',
      description:
        '자신이 원하는 것을 확실히 알고 보호자를 자기 스케줄대로 움직이는 능력자 타입이에요. 애교도 필요할 때만, 그러나 확실하게! 집에서 가장 영향력 있는 존재임을 잘 알고 있어요.',
      traits: [
        '원하는 것을 확실히 표현해요',
        '집 안에서 자신이 가장 중요하다고 생각해요',
        '필요할 때 애교를 적절히 사용해요',
      ],
      compatibleOwner: '고양이의 주도권을 인정하고 유머 감각 있는 보호자',
      ownerTip: '경계를 분명히 가르쳐주세요. 하지만 너무 엄하면 역효과예요!',
      gradient: 'linear-gradient(150deg, #7c3aed 0%, #9333ea 50%, #c084fc 100%)',
      cardBg: '#9333ea',
    },
    {
      key: 'hunter',
      emoji: '🎯',
      title: '본능을 잃지 않은 사냥꾼',
      summary: '움직이는 것은 다 내 사냥감, 본능대로 살아요',
      description:
        '야생의 본능이 살아있는 활발한 타입이에요. 움직이는 것이라면 무엇이든 쫓아가고, 숨어서 기다리다 사냥하는 것을 즐깁니다. 놀이 시간이 충분해야 스트레스 없이 행복해요.',
      traits: [
        '장난감으로 노는 것을 매우 좋아해요',
        '이른 새벽/늦은 밤에 갑자기 활동적이 돼요',
        '모든 것을 탐험하고 확인해야 해요',
      ],
      compatibleOwner: '함께 놀아주는 시간이 충분하고 장난감 관리를 잘 하는 보호자',
      ownerTip: '충분한 사냥 놀이 시간을 줘야 해요. 낚시봉 장난감이 필수예요!',
      gradient: 'linear-gradient(150deg, #b91c1c 0%, #ef4444 50%, #f87171 100%)',
      cardBg: '#ef4444',
    },
    {
      key: 'observer',
      emoji: '🔍',
      title: '모든 것을 꿰뚫는 관찰자',
      summary: '나는 보고 있어, 모든 것을 알고 있어',
      description:
        '조용하지만 예리한 관찰력을 가진 지혜로운 타입이에요. 높은 곳에 앉아 모든 것을 내려다보며 자신만의 방식으로 세상을 이해합니다. 겉으로는 무심해 보이지만 주변 변화를 누구보다 빠르게 알아채요.',
      traits: [
        '변화에 매우 예민하게 반응해요',
        '높은 곳과 관찰 포인트를 좋아해요',
        '천천히 신뢰를 쌓는 스타일이에요',
      ],
      compatibleOwner: '고양이의 내면을 이해하고 강요하지 않는 차분한 보호자',
      ownerTip: '높은 공간(캣타워)을 꼭 제공해 주세요. 관찰을 즐기는 아이예요!',
      gradient: 'linear-gradient(150deg, #1e40af 0%, #3b82f6 50%, #93c5fd 100%)',
      cardBg: '#3b82f6',
    },
  ],
};

export function getPetTest(type: PetType): PetTest {
  return type === 'dog' ? DOG_TEST : CAT_TEST;
}
