export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  loveMessage: string;
  workMessage: string;
  energyMessage: string;
  emoji: string;
  color: string;
}

export const tarotCards: TarotCard[] = [
  {
    id: 1,
    name: "태양 (The Sun)",
    meaning: "긍정적인 에너지, 성공, 기쁨이 가득한 하루입니다.",
    loveMessage: "당신의 매력이 가장 밝게 빛나는 시기예요. 솔직한 표현이 상대의 마음을 움직입니다.",
    workMessage: "하고 있는 일에서 분명한 성과가 나타날 것입니다. 자신감을 가지고 추진하세요.",
    energyMessage: "에너지가 100% 충전되었습니다. 주저하던 일을 시작하기에 최고의 타이밍입니다.",
    emoji: "☀️",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    name: "달 (The Moon)",
    meaning: "무의식, 숨겨진 감정, 직관이 깊어지는 시간입니다.",
    loveMessage: "상대의 속마음이 헷갈릴 수 있습니다. 지금은 성급한 결정보다는 상황을 지켜보세요.",
    workMessage: "불확실성 속에 불안감이 생길 수 있지만, 당신의 직관이 올바른 방향을 알려줄 것입니다.",
    energyMessage: "내면의 목소리에 귀 기울이세요. 명상이나 혼자만의 휴식이 필요한 타이밍입니다.",
    emoji: "🌙",
    color: "from-slate-800 to-indigo-900"
  },
  {
    id: 3,
    name: "별 (The Star)",
    meaning: "희망, 영감, 치유. 어둠 속에서 길을 찾는 기운입니다.",
    loveMessage: "순수하고 아름다운 만남의 기운이 있습니다. 이상형과 가까운 사람과 연결될 수 있어요.",
    workMessage: "반짝이는 아이디어가 당신을 돋보이게 합니다. 창의적인 일에 특히 좋은 결과가 예상됩니다.",
    energyMessage: "상처받은 마음이 치유되고, 새로운 희망의 빛이 스며드는 따뜻한 하루입니다.",
    emoji: "⭐",
    color: "from-cyan-400 to-blue-600"
  },
  {
    id: 4,
    name: "연인 (The Lovers)",
    meaning: "조화, 깊은 연결, 중요한 선택의 순간입니다.",
    loveMessage: "사랑의 기운이 최고조에 달합니다. 썸이 연애로 발전하거나, 관계가 한층 더 깊어집니다.",
    workMessage: "훌륭한 파트너나 동료를 만나 시너지를 냅니다. 계약이나 협상에도 아주 긍정적입니다.",
    energyMessage: "나 자신을 있는 그대로 사랑하고 수용할 때, 가장 아름다운 에너지가 뿜어져 나옵니다.",
    emoji: "💞",
    color: "from-pink-400 to-rose-600"
  },
  {
    id: 5,
    name: "힘 (Strength)",
    meaning: "부드러운 카리스마, 인내, 내면의 용기가 빛납니다.",
    loveMessage: "조급함을 버리고 부드럽게 감싸주세요. 당신의 포용력이 상대의 마음을 녹입니다.",
    workMessage: "어려운 문제나 까다로운 사람도 당신의 지혜롭고 부드러운 통제력으로 해결될 것입니다.",
    energyMessage: "겉으로 보이는 힘보다, 버텨내는 내면의 단단함이 당신을 진정 강하게 만듭니다.",
    emoji: "🦁",
    color: "from-red-400 to-orange-600"
  },
  {
    id: 6,
    name: "운명의 수레바퀴 (Wheel of Fortune)",
    meaning: "전환점, 뜻밖의 행운, 거스를 수 없는 흐름입니다.",
    loveMessage: "운명적인 만남이나 관계의 큰 전환점이 다가옵니다. 흐름에 자연스럽게 몸을 맡기세요.",
    workMessage: "예상치 못한 기회가 찾아오거나 상황이 반전됩니다. 변화를 긍정적으로 받아들이세요.",
    energyMessage: "우주의 리듬이 당신을 돕고 있습니다. 오늘 일어나는 우연은 결코 우연이 아닙니다.",
    emoji: "🎡",
    color: "from-violet-500 to-purple-700"
  },
  {
    id: 7,
    name: "마법사 (The Magician)",
    meaning: "무한한 가능성, 재능, 새로운 시작의 기운입니다.",
    loveMessage: "당신의 매력으로 상대를 끌어당길 수 있습니다. 적극적이고 센스 있는 소통이 키포인트입니다.",
    workMessage: "당신이 가진 기술과 재능을 100% 발휘할 때입니다. 준비는 끝났습니다. 실력을 보여주세요.",
    energyMessage: "원하는 것을 만들어낼 수 있는 강력한 창조의 에너지가 당신 손끝에 있습니다.",
    emoji: "🪄",
    color: "from-emerald-400 to-teal-600"
  },
  {
    id: 8,
    name: "황제 (The Emperor)",
    meaning: "안정, 리더십, 목표 달성을 위한 강력한 통제력입니다.",
    loveMessage: "관계에서 당신이 리드해야 할 때입니다. 책임감 있고 든든한 모습이 상대를 안심시킵니다.",
    workMessage: "계획대로 일이 착착 진행되며, 조직에서 당신의 권위와 능력이 인정받게 됩니다.",
    energyMessage: "삶의 질서를 잡고 흔들림 없는 단단한 기둥처럼 서 있을 수 있는 에너지가 충만합니다.",
    emoji: "👑",
    color: "from-rose-600 to-red-800"
  },
  {
    id: 9,
    name: "세계 (The World)",
    meaning: "완성, 성취, 새로운 차원으로의 도약입니다.",
    loveMessage: "오랜 관계가 결실을 맺거나, 완벽하게 조화로운 상태에 이릅니다. 사랑의 완성형!",
    workMessage: "진행하던 프로젝트가 성공적으로 마무리되며 큰 성취감을 느낄 수 있습니다.",
    energyMessage: "하나의 챕터가 완벽하게 끝났습니다. 축하합니다! 이제 더 큰 무대로 나아갈 준비를 하세요.",
    emoji: "🌍",
    color: "from-blue-500 to-indigo-700"
  },
  {
    id: 10,
    name: "바보 (The Fool)",
    meaning: "자유, 새로운 모험, 계산 없는 순수함입니다.",
    loveMessage: "조건 따지지 않는 순수한 사랑이 시작됩니다. 마음이 이끄는 대로 발걸음을 옮겨보세요.",
    workMessage: "틀에 박힌 방식을 버리고 엉뚱하고 새로운 시도를 해볼 때입니다. 리스크를 두려워하지 마세요.",
    energyMessage: "등짐을 가볍게 하고, 오늘 하루는 계획 없이 발길 닿는 대로 모험을 즐겨보세요.",
    emoji: "🃏",
    color: "from-sky-300 to-blue-400"
  }
];
