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
  title: string;
  summary: string;
  description: string;
  traits: string[];
  compatibleOwner: string;
  ownerTip: string;
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
      text: '보호자가 외출 준비를 하면 나는?',
      options: [
        { label: '같이 나가려고 현관에서 흥분하며 뛴다', scores: { active: 3 } },
        { label: '꼬리 치고 배 보여주며 칭찬 달라고 한다', scores: { social: 3 } },
        { label: '간식이 생기나? 냄새 맡으며 따라다닌다', scores: { foodie: 3 } },
        { label: '가도 돼, 나 혼자 잘 있을게', scores: { calm: 3 } },
      ],
    },
    {
      id: 2,
      text: '산책 중 다른 강아지를 만나면?',
      options: [
        { label: '먼저 달려가서 냄새 맡고 같이 놀자고 한다', scores: { active: 2, social: 1 } },
        { label: '꼬리 흔들며 바로 친구가 된다', scores: { social: 3 } },
        { label: '별 관심 없고 땅에 떨어진 것만 찾는다', scores: { foodie: 3 } },
        { label: '뒤로 숨거나 보호자 다리 사이로 들어간다', scores: { anxious: 3 } },
      ],
    },
    {
      id: 3,
      text: '새로운 장난감이 생겼다!',
      options: [
        { label: '물어서 흔들고 바닥에 던지며 난리 친다', scores: { active: 3 } },
        { label: '보호자한테 가져와 같이 놀자고 한다', scores: { social: 3 } },
        { label: '냄새 맡고 먹을 건지 확인한다', scores: { foodie: 3 } },
        { label: '냄새 한 번 맡고 바로 관심을 끈다', scores: { calm: 3 } },
      ],
    },
    {
      id: 4,
      text: '밥 먹을 시간!',
      options: [
        { label: '기다리다 못해 그릇 앞에서 원을 그린다', scores: { active: 2, foodie: 1 } },
        { label: '밥보다 보호자랑 눈 맞추는 게 더 좋다', scores: { social: 3 } },
        { label: '다 먹고도 더 달라고 그릇을 핥는다', scores: { foodie: 3 } },
        { label: '주면 먹고 안 주면 말고, 그냥 기다린다', scores: { calm: 3 } },
      ],
    },
    {
      id: 5,
      text: '보호자가 소파에 앉으면?',
      options: [
        { label: '옆에 바짝 붙어 같이 앉는다', scores: { social: 3 } },
        { label: '그 틈을 노려 뛰어올라 자리를 차지한다', scores: { active: 3 } },
        { label: '간식 들고 오길 기다린다', scores: { foodie: 3 } },
        { label: '자기 방석에서 각자 쉰다', scores: { calm: 3 } },
      ],
    },
    {
      id: 6,
      text: '낯선 사람이 집에 방문하면?',
      options: [
        { label: '짖으면서 달려가 냄새 맡고 탐험한다', scores: { active: 2, social: 1 } },
        { label: '꼬리 치며 바로 배를 보여준다', scores: { social: 3 } },
        { label: '뒤에 숨어서 짖기만 한다', scores: { anxious: 3 } },
        { label: '관심 없고 자던 중이라 계속 잔다', scores: { calm: 3 } },
      ],
    },
    {
      id: 7,
      text: '보호자가 힘들어 보이면?',
      options: [
        { label: '다가가서 핥고 붙어있는다', scores: { social: 3 } },
        { label: '장난감 물고 와서 기분 풀어주려 한다', scores: { active: 2, social: 1 } },
        { label: '옆에 조용히 앉아있는다', scores: { calm: 3 } },
        { label: '뭔가 잘못됐나? 얼어서 바라본다', scores: { anxious: 3 } },
      ],
    },
    {
      id: 8,
      text: '목욕하는 날...',
      options: [
        { label: '도망 다니다가 잡히면 포기한다', scores: { active: 3 } },
        { label: '어쩔 수 없으니 그냥 서있는다', scores: { calm: 3 } },
        { label: '떠는 동안 간식만 보고 있다', scores: { foodie: 2, anxious: 1 } },
        { label: '욕조 근처도 안 간다', scores: { anxious: 3 } },
      ],
    },
    {
      id: 9,
      text: '실수로 집 안에서 배변 사고가 났을 때?',
      options: [
        { label: '보호자 표정이 변하는 걸 보고 꼬리를 내린다', scores: { anxious: 3 } },
        { label: '잘못인지도 모르고 뛰어논다', scores: { active: 3 } },
        { label: '눈치가 없어서 보호자를 핥는다', scores: { social: 2 } },
        { label: '보호자가 치울 때까지 멀리서 본다', scores: { calm: 3 } },
      ],
    },
    {
      id: 10,
      text: '오랜 시간 혼자 있다가 보호자가 돌아왔을 때?',
      options: [
        { label: '뛰면서 짖고 온몸으로 반긴다', scores: { active: 2, social: 1 } },
        { label: '폭발적인 애교 공세를 퍼붓는다', scores: { social: 3 } },
        { label: '간식 냄새 맡으며 가방을 뒤진다', scores: { foodie: 3 } },
        { label: '반갑지만 꼬리만 살짝 흔든다', scores: { calm: 3 } },
      ],
    },
    {
      id: 11,
      text: '공원에서 뛰어다닐 수 있는 자유 시간!',
      options: [
        { label: '전력질주, 사방을 탐험하고 다닌다', scores: { active: 3 } },
        { label: '사람들한테 계속 달려가 인사한다', scores: { social: 3 } },
        { label: '떨어진 뭔가를 찾아서 먹으려 한다', scores: { foodie: 3 } },
        { label: '보호자 옆에서 조금 걷다가 쉰다', scores: { calm: 3 } },
      ],
    },
    {
      id: 12,
      text: '집에 혼자 있으면?',
      options: [
        { label: '집 안 탐험하다 장난감 가지고 논다', scores: { active: 3 } },
        { label: '보호자 냄새 맡으러 옷이나 가방 근처에 있는다', scores: { social: 2, anxious: 1 } },
        { label: '밥그릇 주변을 맴돈다', scores: { foodie: 3 } },
        { label: '특별히 할 것 없어서 잔다', scores: { calm: 3 } },
      ],
    },
    {
      id: 13,
      text: '훈련(앉아, 기다려 등)을 할 때?',
      options: [
        { label: '빠릿빠릿, 반응 빠르고 신난다', scores: { active: 2 } },
        { label: '보호자 칭찬에 반응해서 열심히 한다', scores: { social: 3 } },
        { label: '간식 없으면 안 한다', scores: { foodie: 3 } },
        { label: '처음엔 안 들은 척하다가 결국 한다', scores: { calm: 2 } },
      ],
    },
    {
      id: 14,
      text: '산책 중 낯선 소리가 나면?',
      options: [
        { label: '소리 향해 호기롭게 달려간다', scores: { active: 3 } },
        { label: '보호자 뒤에 바짝 숨는다', scores: { anxious: 3 } },
        { label: '잠깐 멈추고 확인 후 다시 걷는다', scores: { calm: 3 } },
        { label: '관심 없고 냄새 맡던 거 계속한다', scores: { foodie: 2 } },
      ],
    },
    {
      id: 15,
      text: '지금 이 순간 나의 행복은?',
      options: [
        { label: '보호자와 함께 달리거나 뛰노는 것', scores: { active: 3 } },
        { label: '온 가족이 모여 안겨서 쉬는 것', scores: { social: 3 } },
        { label: '맛있는 간식을 받는 것', scores: { foodie: 3 } },
        { label: '내 자리에서 조용히 자는 것', scores: { calm: 3 } },
      ],
    },
  ],
  calculateResult: (scores) => {
    const dims = ['active', 'social', 'foodie', 'calm', 'anxious'] as const;
    let best: (typeof dims)[number] = dims[0];
    for (const d of dims) {
      if ((scores[d] || 0) > (scores[best] || 0)) best = d;
    }
    return best;
  },
  results: [
    {
      key: 'active',
      emoji: '🏃',
      title: '씩씩한 활동왕',
      summary: '뛰고, 탐험하고, 모험이 있어야 행복한 에너지 덩어리!',
      description:
        '에너지가 넘치는 모험가 타입이에요. 하루 종일 뛰어다니고 탐험하며 새로운 자극을 찾아다니는 것을 가장 좋아합니다. 산책 시간이 길수록, 놀이 시간이 많을수록 더 행복해지는 타입이에요. 지루할 때는 물건을 씹거나 장난을 치기도 하니 충분한 운동이 필수예요!',
      traits: [
        '활발한 야외 생활을 사랑해요',
        '새로운 장소와 냄새 탐험이 최고예요',
        '빠른 놀이와 달리기를 즐겨요',
      ],
      compatibleOwner: '활발하고 야외 활동을 즐기는 보호자',
      ownerTip: '매일 충분한 운동이 필요해요. 산책, 달리기, 프리스비가 딱이에요!',
      gradient: 'linear-gradient(150deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
      cardBg: '#f97316',
    },
    {
      key: 'social',
      emoji: '🥰',
      title: '사랑이 넘치는 애교쟁이',
      summary: '보호자가 세상의 전부! 같이 있을 때가 가장 행복해',
      description:
        '사람을 너무나 좋아하는 사교적인 타입이에요. 보호자의 관심과 사랑이 에너지의 원천이고, 혼자 있는 것을 힘들어할 수 있어요. 처음 만난 사람과도 금방 친구가 되는 매력적인 성격으로, 온 세상 모든 사람을 내 편으로 만드는 능력을 갖고 있어요!',
      traits: [
        '보호자와의 스킨십을 특히 좋아해요',
        '처음 만난 사람과도 금방 친해져요',
        '분리 불안이 있을 수 있어요',
      ],
      compatibleOwner: '집에 있는 시간이 많고 애정 표현을 잘 하는 보호자',
      ownerTip: '혼자 있는 훈련이 필요할 수 있어요. 충분한 관심과 사랑을 주세요!',
      gradient: 'linear-gradient(150deg, #ec4899 0%, #f472b6 50%, #fb7185 100%)',
      cardBg: '#ec4899',
    },
    {
      key: 'foodie',
      emoji: '🍖',
      title: '세상에서 밥이 최고! 먹보',
      summary: '밥 앞에서는 참을 수 없어, 간식만 있으면 세상 최고야',
      description:
        '음식 앞에서는 그 어떤 것도 이겨낼 수 없는 음식 동기 유발 타입이에요. 훈련도 간식만 있으면 금방 배우는 실속파! 냄새에 매우 민감하고 음식 관련 상황에서 가장 활기차게 반응합니다. 먹을 것을 위해서라면 어떤 재주도 부릴 준비가 돼있어요.',
      traits: [
        '간식이 최고의 동기 부여예요',
        '냄새로 먹을 것을 귀신같이 찾아요',
        '간식이 있으면 순식간에 천재견이 돼요',
      ],
      compatibleOwner: '규칙적인 식사 관리를 잘 하고 간식 트릭 훈련을 즐기는 보호자',
      ownerTip: '과식을 조심하세요! 체중 관리가 건강의 핵심이에요.',
      gradient: 'linear-gradient(150deg, #a16207 0%, #ca8a04 50%, #eab308 100%)',
      cardBg: '#ca8a04',
    },
    {
      key: 'calm',
      emoji: '😴',
      title: '느긋한 독립파',
      summary: '혼자도 잘 있어, 내 페이스가 중요해',
      description:
        '독립적이고 느긋한 성격으로, 혼자 있는 것을 크게 불편해하지 않아요. 자기 페이스를 중요하게 생각하며, 강요받는 것을 싫어하는 개성 강한 타입이에요. 차분하고 안정적인 성격 덕분에 함께 지내기 편안한 최고의 룸메이트예요!',
      traits: [
        '혼자 있는 시간을 편안하게 보내요',
        '자기만의 루틴과 자리를 소중히 여겨요',
        '차분하고 스트레스를 잘 받지 않아요',
      ],
      compatibleOwner: '강아지의 자율성을 존중하며 바쁜 일상을 가진 보호자',
      ownerTip: '억지로 놀이를 강요하지 마세요. 아이의 페이스를 존중해 주세요!',
      gradient: 'linear-gradient(150deg, #0369a1 0%, #0284c7 50%, #38bdf8 100%)',
      cardBg: '#0284c7',
    },
    {
      key: 'anxious',
      emoji: '🐾',
      title: '마음이 여린 겁쟁이',
      summary: '낯선 건 다 무서워... 보호자만 믿어요',
      description:
        '새로운 것에 쉽게 놀라고 불안해하는 예민한 타입이에요. 낯선 사람, 소리, 환경에 적응하는 데 시간이 필요합니다. 하지만 마음을 연 보호자에게는 누구보다 충성스럽고 깊은 유대감을 형성하는 순수한 아이예요.',
      traits: [
        '낯선 환경에서 불안감을 느껴요',
        '보호자에게 큰 의지를 해요',
        '천천히 사회화 과정이 필요해요',
      ],
      compatibleOwner: '인내심 있고 차분하며 감수성을 이해하는 보호자',
      ownerTip: '천천히 새로운 것에 노출시키고, 긍정 강화로 자신감을 키워주세요!',
      gradient: 'linear-gradient(150deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)',
      cardBg: '#7c3aed',
    },
  ],
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
