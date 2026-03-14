export interface Tarot3Reading {
  present: { ko: string; en: string; ja: string; es: string };
  advice:  { ko: string; en: string; ja: string; es: string };
  future:  { ko: string; en: string; ja: string; es: string };
}

export interface Tarot3Card {
  id: string;
  roman: string;
  name:     { ko: string; en: string; ja: string; es: string };
  keywords: { ko: string[]; en: string[]; ja: string[]; es: string[] };
  daily:    { ko: string; en: string; ja: string; es: string };
  reading:  Tarot3Reading;
}

export const TAROT3_CARDS: Tarot3Card[] = [
  {
    id: 'fool', roman: '0',
    name:     { ko: '바보',     en: 'The Fool',         ja: '愚者',   es: 'El Loco' },
    keywords: { ko: ['시작','가능성','충동'], en: ['beginnings','potential','impulse'], ja: ['始まり','可能性','衝動'], es: ['inicio','potencial','impulso'] },
    daily:    { ko: '새로운 시작의 기운이 있습니다. 다만 기대만으로 움직이기보다 현실적인 준비가 필요합니다.', en: 'A new beginning energy surrounds you. Enthusiasm is helpful, but grounding your decisions in reality will be important.', ja: '新しい流れが始まりそうです。ただし勢いだけでなく、現実的な準備も必要です。', es: 'Una nueva etapa puede comenzar. El entusiasmo es positivo, pero conviene actuar con cierta prudencia.' },
    reading: {
      present: { ko: '새로운 가능성이 열리는 시기입니다.', en: 'A new path may be opening.', ja: '新しい可能性が開かれています。', es: 'Se abre un nuevo camino.' },
      advice:  { ko: '충동보다 준비를 우선하세요.', en: 'Prepare before acting.', ja: '衝動より準備を。', es: 'Prepárate antes de actuar.' },
      future:  { ko: '새로운 기회가 나타날 가능성이 높습니다.', en: 'A new opportunity may appear.', ja: '新しいチャンスが近づいています。', es: 'Una nueva oportunidad puede aparecer.' },
    },
  },
  {
    id: 'magician', roman: 'I',
    name:     { ko: '마법사', en: 'The Magician', ja: '魔術師', es: 'El Mago' },
    keywords: { ko: ['의지','행동','능력'], en: ['action','will','skill'], ja: ['意志','行動','能力'], es: ['acción','voluntad','habilidad'] },
    daily:    { ko: '오늘은 행동력이 중요한 날입니다. 생각만 하지 말고 실행으로 옮겨보세요.', en: 'Today favors action. Your ability to turn ideas into reality is strong.', ja: '今日は行動力が鍵になります。考えるだけでなく実行してみましょう。', es: 'Hoy favorece la acción. Tus ideas pueden convertirse en realidad.' },
    reading: {
      present: { ko: '능력과 기회가 동시에 존재합니다.', en: 'You have both ability and opportunity.', ja: '能力と機会があります。', es: 'Tienes habilidad y oportunidad.' },
      advice:  { ko: '주도적으로 움직이세요.', en: 'Take initiative.', ja: '主導権を握ってください。', es: 'Toma la iniciativa.' },
      future:  { ko: '행동하면 결과가 따라옵니다.', en: 'Action will lead to results.', ja: '行動が結果を生みます。', es: 'La acción traerá resultados.' },
    },
  },
  {
    id: 'high_priestess', roman: 'II',
    name:     { ko: '여사제', en: 'The High Priestess', ja: '女教皇', es: 'La Sacerdotisa' },
    keywords: { ko: ['직관','비밀','내면'], en: ['intuition','mystery','inner wisdom'], ja: ['直感','秘密','内面'], es: ['intuición','misterio','sabiduría'] },
    daily:    { ko: '오늘은 직관을 믿는 것이 중요합니다.', en: 'Trust your intuition today.', ja: '今日は直感を信じてください。', es: 'Confía en tu intuición hoy.' },
    reading: {
      present: { ko: '숨겨진 정보가 있습니다.', en: 'Something hidden influences the situation.', ja: '隠された要素があります。', es: 'Hay información oculta.' },
      advice:  { ko: '조금 더 관찰하세요.', en: 'Observe before acting.', ja: 'もう少し観察しましょう。', es: 'Observa antes de actuar.' },
      future:  { ko: '진실이 서서히 드러납니다.', en: 'The truth will gradually reveal itself.', ja: '真実が見えてきます。', es: 'La verdad saldrá a la luz.' },
    },
  },
  {
    id: 'empress', roman: 'III',
    name:     { ko: '여황제', en: 'The Empress', ja: '女帝', es: 'La Emperatriz' },
    keywords: { ko: ['풍요','성장','돌봄'], en: ['abundance','growth','nurture'], ja: ['豊かさ','成長','育成'], es: ['abundancia','crecimiento','cuidado'] },
    daily:    { ko: '오늘은 성장과 풍요의 기운이 있습니다.', en: 'Today carries energy of growth and abundance.', ja: '今日は豊かさと成長のエネルギーがあります。', es: 'Hoy trae energía de crecimiento y abundancia.' },
    reading: {
      present: { ko: '안정적인 기반이 형성되고 있습니다.', en: 'A stable foundation is forming.', ja: '安定した基盤が作られています。', es: 'Se está formando una base estable.' },
      advice:  { ko: '천천히 키워가세요.', en: 'Nurture the situation patiently.', ja: 'ゆっくり育ててください。', es: 'Cultiva la situación con paciencia.' },
      future:  { ko: '긍정적인 결과로 이어질 수 있습니다.', en: 'Positive results may grow.', ja: '良い結果につながります。', es: 'Puede traer buenos resultados.' },
    },
  },
  {
    id: 'emperor', roman: 'IV',
    name:     { ko: '황제', en: 'The Emperor', ja: '皇帝', es: 'El Emperador' },
    keywords: { ko: ['권위','질서','책임'], en: ['authority','structure','control'], ja: ['権威','秩序','責任'], es: ['autoridad','estructura','control'] },
    daily:    { ko: '오늘은 질서와 책임이 중요합니다.', en: 'Structure and discipline matter today.', ja: '今日は秩序と責任が重要です。', es: 'La disciplina será clave hoy.' },
    reading: {
      present: { ko: '통제가 필요한 상황입니다.', en: 'This situation needs structure.', ja: '統制が必要です。', es: 'Se necesita estructura.' },
      advice:  { ko: '명확한 기준을 세우세요.', en: 'Set clear boundaries.', ja: '明確な基準を持ちましょう。', es: 'Establece límites claros.' },
      future:  { ko: '안정적인 결과로 이어질 수 있습니다.', en: 'Stability may follow.', ja: '安定につながります。', es: 'Puede traer estabilidad.' },
    },
  },
  {
    id: 'hierophant', roman: 'V',
    name:     { ko: '교황', en: 'The Hierophant', ja: '法王', es: 'El Hierofante' },
    keywords: { ko: ['전통','가르침','신뢰'], en: ['tradition','teaching','faith'], ja: ['伝統','教え','信頼'], es: ['tradición','enseñanza','fe'] },
    daily:    { ko: '오늘은 기존의 방식이나 조언을 따르는 것이 좋습니다.', en: 'Following established wisdom may serve you well today.', ja: '今日は伝統的な方法や助言に従うのが良いでしょう。', es: 'Hoy conviene seguir la sabiduría establecida.' },
    reading: {
      present: { ko: '안정된 믿음이나 체계가 지지해주고 있습니다.', en: 'A stable belief or system is supporting you.', ja: '安定した信念や体制が支えています。', es: 'Una creencia o sistema estable te apoya.' },
      advice:  { ko: '검증된 방법을 따르세요.', en: 'Follow a proven path.', ja: '実証された方法に従ってください。', es: 'Sigue un camino probado.' },
      future:  { ko: '지속적인 지원이나 인정을 받을 수 있습니다.', en: 'Recognition or support may come.', ja: '継続的な支援や認識が得られます。', es: 'Puede llegar reconocimiento o apoyo.' },
    },
  },
  {
    id: 'lovers', roman: 'VI',
    name:     { ko: '연인', en: 'The Lovers', ja: '恋人', es: 'Los Enamorados' },
    keywords: { ko: ['선택','관계','조화'], en: ['choice','relationship','harmony'], ja: ['選択','関係','調和'], es: ['elección','relación','armonía'] },
    daily:    { ko: '오늘은 중요한 선택이나 관계에 집중하는 날입니다.', en: 'Today focuses on important choices or relationships.', ja: '今日は大切な選択や関係に集中しましょう。', es: 'Hoy centra tu atención en elecciones o relaciones importantes.' },
    reading: {
      present: { ko: '중요한 결정이 앞에 있습니다.', en: 'An important decision lies ahead.', ja: '重要な決断が目の前にあります。', es: 'Una decisión importante está cerca.' },
      advice:  { ko: '가치관에 맞는 선택을 하세요.', en: 'Choose according to your values.', ja: '価値観に合った選択をしましょう。', es: 'Elige de acuerdo con tus valores.' },
      future:  { ko: '선택에 따른 결과가 따라옵니다.', en: 'Results will reflect your choice.', ja: '選択の結果が訪れます。', es: 'Los resultados reflejarán tu elección.' },
    },
  },
  {
    id: 'chariot', roman: 'VII',
    name:     { ko: '전차', en: 'The Chariot', ja: '戦車', es: 'El Carro' },
    keywords: { ko: ['추진력','극복','승리'], en: ['drive','willpower','victory'], ja: ['推進力','克服','勝利'], es: ['determinación','superación','victoria'] },
    daily:    { ko: '오늘은 강한 의지로 나아가면 좋은 결과를 얻을 수 있습니다.', en: 'Strong willpower will help you move forward today.', ja: '今日は強い意志で進むと良い結果が得られます。', es: 'Una voluntad firme te ayudará a avanzar hoy.' },
    reading: {
      present: { ko: '강한 추진력이 있는 시기입니다.', en: 'Strong momentum is present.', ja: '強い推進力がある時期です。', es: 'Hay un fuerte impulso ahora.' },
      advice:  { ko: '집중력을 잃지 마세요.', en: 'Stay focused.', ja: '集中力を維持してください。', es: 'No pierdas el enfoque.' },
      future:  { ko: '목표에 가까워질 수 있습니다.', en: 'You may get closer to your goal.', ja: '目標に近づきます。', es: 'Puedes acercarte a tu objetivo.' },
    },
  },
  {
    id: 'strength', roman: 'VIII',
    name:     { ko: '힘', en: 'Strength', ja: '力', es: 'La Fuerza' },
    keywords: { ko: ['용기','인내','내적힘'], en: ['courage','patience','inner strength'], ja: ['勇気','忍耐','内なる力'], es: ['coraje','paciencia','fuerza interior'] },
    daily:    { ko: '오늘은 내면의 힘과 인내가 중요한 날입니다.', en: 'Inner strength and patience are key today.', ja: '今日は内なる強さと忍耐が重要です。', es: 'La fuerza interior y la paciencia son clave hoy.' },
    reading: {
      present: { ko: '부드러운 방식으로 상황을 이끌 수 있습니다.', en: 'You can guide the situation with gentleness.', ja: '柔らかな方法で状況を導けます。', es: 'Puedes guiar la situación con suavidad.' },
      advice:  { ko: '강압보다 인내를 선택하세요.', en: 'Choose patience over force.', ja: '強制より忍耐を選びましょう。', es: 'Elige la paciencia sobre la fuerza.' },
      future:  { ko: '점진적인 성과가 나타납니다.', en: 'Gradual progress will show.', ja: '少しずつ成果が現れます。', es: 'El progreso gradual se hará visible.' },
    },
  },
  {
    id: 'hermit', roman: 'IX',
    name:     { ko: '은둔자', en: 'The Hermit', ja: '隠者', es: 'El Ermitaño' },
    keywords: { ko: ['성찰','고독','지혜'], en: ['reflection','solitude','wisdom'], ja: ['内省','孤独','知恵'], es: ['reflexión','soledad','sabiduría'] },
    daily:    { ko: '오늘은 조용히 자신을 돌아보는 시간이 필요합니다.', en: 'Take quiet time for self-reflection today.', ja: '今日は静かに自分を振り返る時間が必要です。', es: 'Tómate un tiempo tranquilo para la reflexión hoy.' },
    reading: {
      present: { ko: '내면으로 눈을 돌릴 때입니다.', en: 'It is time to look inward.', ja: '内面に目を向ける時です。', es: 'Es momento de mirar hacia adentro.' },
      advice:  { ko: '혼자만의 시간을 가지세요.', en: 'Spend time alone to reflect.', ja: '一人の時間を大切にしてください。', es: 'Dedica tiempo a la soledad reflexiva.' },
      future:  { ko: '성찰 후 명확한 방향이 잡힙니다.', en: 'Clarity will follow reflection.', ja: '内省の後に明確な方向が見えます。', es: 'La claridad llegará tras la reflexión.' },
    },
  },
  {
    id: 'wheel', roman: 'X',
    name:     { ko: '운명의 수레바퀴', en: 'Wheel of Fortune', ja: '運命の輪', es: 'La Rueda de la Fortuna' },
    keywords: { ko: ['변화','순환','운명'], en: ['change','cycles','fate'], ja: ['変化','循環','運命'], es: ['cambio','ciclos','destino'] },
    daily:    { ko: '오늘은 예상치 못한 변화나 행운이 찾아올 수 있습니다.', en: 'Unexpected change or luck may arrive today.', ja: '今日は予期しない変化や幸運が訪れるかもしれません。', es: 'Hoy puede llegar un cambio inesperado o buena suerte.' },
    reading: {
      present: { ko: '상황이 변화하는 전환점에 있습니다.', en: 'You are at a turning point.', ja: '転換点にいます。', es: 'Estás en un punto de inflexión.' },
      advice:  { ko: '흐름에 유연하게 대응하세요.', en: 'Adapt flexibly to the flow.', ja: '流れに柔軟に対応してください。', es: 'Adáptate con flexibilidad al flujo.' },
      future:  { ko: '새로운 국면이 열릴 수 있습니다.', en: 'A new phase may open.', ja: '新しい局面が開きます。', es: 'Puede abrirse una nueva fase.' },
    },
  },
  {
    id: 'justice', roman: 'XI',
    name:     { ko: '정의', en: 'Justice', ja: '正義', es: 'La Justicia' },
    keywords: { ko: ['균형','책임','판단'], en: ['balance','truth','accountability'], ja: ['均衡','真実','責任'], es: ['equilibrio','verdad','responsabilidad'] },
    daily:    { ko: '오늘은 공정한 판단이 중요합니다.', en: 'Fair judgment is important today.', ja: '今日は公平な判断が必要です。', es: 'Hoy es importante actuar con justicia.' },
    reading: {
      present: { ko: '사실을 직면해야 합니다.', en: 'Facts must be faced honestly.', ja: '事実を受け入れる必要があります。', es: 'Debes enfrentar la verdad.' },
      advice:  { ko: '균형 잡힌 시각을 유지하세요.', en: 'Maintain balance.', ja: 'バランスを保ってください。', es: 'Mantén el equilibrio.' },
      future:  { ko: '공정한 결과가 나올 수 있습니다.', en: 'A fair outcome is likely.', ja: '公平な結果が出るでしょう。', es: 'Un resultado justo puede llegar.' },
    },
  },
  {
    id: 'hanged_man', roman: 'XII',
    name:     { ko: '매달린 사람', en: 'The Hanged Man', ja: '吊るされた男', es: 'El Colgado' },
    keywords: { ko: ['기다림','관점전환','희생'], en: ['pause','perspective','surrender'], ja: ['待ち','視点転換','犠牲'], es: ['pausa','perspectiva','sacrificio'] },
    daily:    { ko: '오늘은 서두르기보다 멈추고 새로운 시각으로 바라보는 것이 필요합니다.', en: 'Pause and look at things from a new perspective today.', ja: '今日は急がずに立ち止まり、新しい視点で見てみましょう。', es: 'Detente y mira las cosas desde una perspectiva nueva hoy.' },
    reading: {
      present: { ko: '기다림이 필요한 시기입니다.', en: 'A period of waiting is needed.', ja: '待つことが必要な時期です。', es: 'Se necesita un período de espera.' },
      advice:  { ko: '억지로 해결하려 하지 마세요.', en: 'Do not force a resolution.', ja: '無理に解決しようとしないでください。', es: 'No fuerces una resolución.' },
      future:  { ko: '새로운 관점에서 답이 보입니다.', en: 'A new perspective will bring answers.', ja: '新しい視点から答えが見えます。', es: 'Una nueva perspectiva traerá respuestas.' },
    },
  },
  {
    id: 'death', roman: 'XIII',
    name:     { ko: '죽음', en: 'Death', ja: '死神', es: 'La Muerte' },
    keywords: { ko: ['변환','끝과시작','해방'], en: ['transformation','endings','release'], ja: ['変容','終わりと始まり','解放'], es: ['transformación','finales','liberación'] },
    daily:    { ko: '오늘은 낡은 것을 내려놓고 새로운 변화를 받아들이는 날입니다.', en: 'Let go of the old and embrace change today.', ja: '今日は古いものを手放し、新しい変化を受け入れましょう。', es: 'Hoy suelta lo viejo y abraza el cambio.' },
    reading: {
      present: { ko: '한 단계가 끝나고 있습니다.', en: 'One phase is coming to an end.', ja: '一つの段階が終わりつつあります。', es: 'Una etapa está llegando a su fin.' },
      advice:  { ko: '끝을 두려워하지 마세요.', en: 'Do not fear endings.', ja: '終わりを恐れないでください。', es: 'No temas los finales.' },
      future:  { ko: '새로운 시작이 가까워지고 있습니다.', en: 'A new beginning is approaching.', ja: '新しい始まりが近づいています。', es: 'Un nuevo comienzo se acerca.' },
    },
  },
  {
    id: 'temperance', roman: 'XIV',
    name:     { ko: '절제', en: 'Temperance', ja: '節制', es: 'La Templanza' },
    keywords: { ko: ['균형','조화','인내'], en: ['balance','moderation','patience'], ja: ['均衡','節度','忍耐'], es: ['equilibrio','moderación','paciencia'] },
    daily:    { ko: '오늘은 극단을 피하고 균형을 찾는 것이 중요합니다.', en: 'Avoid extremes and seek balance today.', ja: '今日は極端を避けてバランスを取ることが大切です。', es: 'Evita los extremos y busca el equilibrio hoy.' },
    reading: {
      present: { ko: '균형이 회복되는 과정에 있습니다.', en: 'Balance is being restored.', ja: 'バランスが回復されています。', es: 'El equilibrio se está restaurando.' },
      advice:  { ko: '서두르지 말고 조화를 찾으세요.', en: 'Take your time and find harmony.', ja: '焦らずに調和を見つけましょう。', es: 'Tómate tu tiempo y encuentra la armonía.' },
      future:  { ko: '안정적인 흐름이 자리잡습니다.', en: 'A stable flow will settle in.', ja: '安定した流れが定まります。', es: 'Un flujo estable se establecerá.' },
    },
  },
  {
    id: 'devil', roman: 'XV',
    name:     { ko: '악마', en: 'The Devil', ja: '悪魔', es: 'El Diablo' },
    keywords: { ko: ['집착','속박','그림자'], en: ['attachment','bondage','shadow'], ja: ['執着','束縛','影'], es: ['apego','atadura','sombra'] },
    daily:    { ko: '오늘은 과도한 집착이나 두려움에 주의하세요.', en: 'Watch out for excessive attachment or fear today.', ja: '今日は過度な執着や恐れに注意しましょう。', es: 'Hoy cuidado con el apego excesivo o el miedo.' },
    reading: {
      present: { ko: '무언가에 얽매여 있을 수 있습니다.', en: 'Something may be holding you back.', ja: '何かに縛られているかもしれません。', es: 'Algo puede estar limitándote.' },
      advice:  { ko: '그 패턴을 인식하고 직면하세요.', en: 'Recognize and face the pattern.', ja: 'そのパターンを認識して向き合いましょう。', es: 'Reconoce y enfrenta el patrón.' },
      future:  { ko: '인식하면 해방이 가능합니다.', en: 'Awareness can bring release.', ja: '気づけば解放できます。', es: 'La conciencia puede traer liberación.' },
    },
  },
  {
    id: 'tower', roman: 'XVI',
    name:     { ko: '탑', en: 'The Tower', ja: '塔', es: 'La Torre' },
    keywords: { ko: ['충격','붕괴','변화'], en: ['shock','collapse','sudden change'], ja: ['衝撃','崩壊','変化'], es: ['impacto','cambio','colapso'] },
    daily:    { ko: '예상치 못한 변화가 있을 수 있습니다.', en: 'Unexpected change may occur.', ja: '予想外の変化が起こるかもしれません。', es: 'Puede surgir un cambio inesperado.' },
    reading: {
      present: { ko: '기존 구조가 흔들리고 있습니다.', en: 'Old structures are shaking.', ja: '古い構造が揺らいでいます。', es: 'Las estructuras viejas se tambalean.' },
      advice:  { ko: '변화를 피하려 하지 마세요.', en: 'Do not resist change.', ja: '変化を恐れないでください。', es: 'No resistas el cambio.' },
      future:  { ko: '새로운 시작의 기회가 될 수 있습니다.', en: 'A new start may follow.', ja: '新しい始まりにつながります。', es: 'Puede abrir una nueva etapa.' },
    },
  },
  {
    id: 'star', roman: 'XVII',
    name:     { ko: '별', en: 'The Star', ja: '星', es: 'La Estrella' },
    keywords: { ko: ['희망','치유','영감'], en: ['hope','healing','inspiration'], ja: ['希望','癒し','インスピレーション'], es: ['esperanza','sanación','inspiración'] },
    daily:    { ko: '오늘은 희망적인 기운이 있습니다. 자신을 믿고 앞으로 나아가세요.', en: 'Hopeful energy is present today. Trust yourself and move forward.', ja: '今日は希望に満ちたエネルギーがあります。自分を信じて進みましょう。', es: 'Hay energía esperanzadora hoy. Confía en ti y avanza.' },
    reading: {
      present: { ko: '치유와 회복의 에너지가 흐릅니다.', en: 'Healing and renewal energy flows.', ja: '癒しと回復のエネルギーが流れています。', es: 'Fluye energía de sanación y renovación.' },
      advice:  { ko: '희망을 놓지 마세요.', en: 'Hold onto hope.', ja: '希望を手放さないでください。', es: 'No pierdas la esperanza.' },
      future:  { ko: '긍정적인 변화가 서서히 다가옵니다.', en: 'Positive change is slowly approaching.', ja: 'ポジティブな変化がゆっくり訪れます。', es: 'Un cambio positivo se acerca gradualmente.' },
    },
  },
  {
    id: 'moon', roman: 'XVIII',
    name:     { ko: '달', en: 'The Moon', ja: '月', es: 'La Luna' },
    keywords: { ko: ['불안','착각','직관'], en: ['illusion','anxiety','intuition'], ja: ['不安','幻想','直感'], es: ['ilusión','ansiedad','intuición'] },
    daily:    { ko: '오늘은 겉으로 보이는 것을 그대로 믿지 않는 것이 좋습니다.', en: 'Do not take things at face value today.', ja: '今日は見た目だけで判断しないようにしましょう。', es: 'Hoy no te fíes de las apariencias.' },
    reading: {
      present: { ko: '불확실한 상황이 지속되고 있습니다.', en: 'Uncertainty is lingering.', ja: '不確かな状況が続いています。', es: 'La incertidumbre persiste.' },
      advice:  { ko: '두려움보다 직관을 따르세요.', en: 'Follow intuition over fear.', ja: '恐れより直感に従ってください。', es: 'Sigue tu intuición en lugar del miedo.' },
      future:  { ko: '혼란이 지나면 상황이 명확해집니다.', en: 'Clarity will come after confusion.', ja: '混乱が過ぎれば状況が明確になります。', es: 'Tras la confusión llegará la claridad.' },
    },
  },
  {
    id: 'sun', roman: 'XIX',
    name:     { ko: '태양', en: 'The Sun', ja: '太陽', es: 'El Sol' },
    keywords: { ko: ['성공','명확성','행복'], en: ['success','clarity','joy'], ja: ['成功','明確','幸福'], es: ['éxito','claridad','alegría'] },
    daily:    { ko: '밝고 긍정적인 에너지가 있습니다.', en: 'Positive and joyful energy surrounds you today.', ja: '明るく前向きなエネルギーがあります。', es: 'Una energía positiva te rodea hoy.' },
    reading: {
      present: { ko: '상황이 점점 명확해지고 있습니다.', en: 'Things are becoming clearer.', ja: '状況が明確になっています。', es: 'Las cosas se vuelven más claras.' },
      advice:  { ko: '자신감을 가지세요.', en: 'Move forward with confidence.', ja: '自信を持ってください。', es: 'Avanza con confianza.' },
      future:  { ko: '좋은 결과로 이어질 가능성이 높습니다.', en: 'Success is very possible.', ja: '良い結果につながるでしょう。', es: 'El éxito es probable.' },
    },
  },
  {
    id: 'judgment', roman: 'XX',
    name:     { ko: '심판', en: 'Judgement', ja: '審判', es: 'El Juicio' },
    keywords: { ko: ['각성','부활','소환'], en: ['awakening','renewal','reckoning'], ja: ['目覚め','復活','召喚'], es: ['despertar','renovación','ajuste'] },
    daily:    { ko: '오늘은 오래된 것을 정리하고 새롭게 출발할 기회가 있습니다.', en: 'Today offers a chance to let go of the past and start fresh.', ja: '今日は古いものを整理して、新しく出発するチャンスがあります。', es: 'Hoy hay oportunidad de soltar el pasado y comenzar de nuevo.' },
    reading: {
      present: { ko: '새로운 인식이 일어나고 있습니다.', en: 'A new awareness is emerging.', ja: '新しい気づきが生まれています。', es: 'Una nueva conciencia está surgiendo.' },
      advice:  { ko: '과거를 되돌아보고 다음 단계로 나아가세요.', en: 'Review the past and step forward.', ja: '過去を振り返り、次のステップへ。', es: 'Revisa el pasado y da el siguiente paso.' },
      future:  { ko: '중요한 전환이 찾아옵니다.', en: 'An important turning point is coming.', ja: '大切な転換点が訪れます。', es: 'Un punto de inflexión importante llega.' },
    },
  },
  {
    id: 'world', roman: 'XXI',
    name:     { ko: '세계', en: 'The World', ja: '世界', es: 'El Mundo' },
    keywords: { ko: ['완성','통합','성취'], en: ['completion','integration','fulfillment'], ja: ['完成','統合','達成'], es: ['completitud','integración','logro'] },
    daily:    { ko: '오늘은 노력의 결실을 맺는 날이 될 수 있습니다.', en: 'Today may bring the fruits of your efforts.', ja: '今日は努力の結果が実る日になるかもしれません。', es: 'Hoy pueden llegar los frutos de tu esfuerzo.' },
    reading: {
      present: { ko: '한 단계가 완성되어 가고 있습니다.', en: 'A cycle is completing.', ja: '一つの段階が完成に近づいています。', es: 'Un ciclo está completándose.' },
      advice:  { ko: '성취를 인정하고 다음을 준비하세요.', en: 'Acknowledge what you have achieved.', ja: '達成を認め、次の準備をしましょう。', es: 'Reconoce tus logros y prepárate para lo siguiente.' },
      future:  { ko: '새로운 차원의 시작이 기다리고 있습니다.', en: 'A new level of experience awaits.', ja: '新たな次元の始まりが待っています。', es: 'Un nuevo nivel de experiencia te espera.' },
    },
  },
];
