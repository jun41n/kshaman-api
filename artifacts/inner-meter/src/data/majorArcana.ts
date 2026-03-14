export type Locale = 'ko' | 'en' | 'ja' | 'es';

export interface CardInterpretations {
  present: string;
  advice: string;
  future: string;
}

export interface CardLocale {
  name: string;
  keywords: string[];
  baseMeaning: string;
  caution: string;
  interpretations: CardInterpretations;
}

export interface MajorArcanaCard {
  id: string;
  number: number;
  imagePrompt: string;
  localized: Record<Locale, CardLocale>;
}

export const MAJOR_ARCANA: MajorArcanaCard[] = [
  {
    id: 'fool',
    number: 0,
    imagePrompt: 'A figure at a cliff edge, colorful patchwork coat, small white dog, bright sky, wildflowers at feet, symbolic of new beginnings',
    localized: {
      ko: {
        name: '바보',
        keywords: ['시작', '도약', '즉흥성'],
        baseMeaning: '익숙한 것에서 벗어나 새로운 국면으로 들어서는 시기입니다. 가능성은 열려 있지만 방향은 아직 잡히지 않은 상태입니다.',
        caution: '기대감이 앞서면 현실 점검이 부족해질 수 있습니다.',
        interpretations: {
          present: '지금은 아직 지도가 없는 지형에 발을 들이는 단계입니다. 열린 가능성이 있지만, 방향이 잡히지 않은 상태이기도 합니다. 설렘과 불확실함이 공존하는 지금, 어느 쪽에 더 무게를 두고 있는지 살펴보세요.',
          advice: '출발하기 전에 자신이 실제로 무엇을 가지고 있는지 한 번 확인해 보세요. 설렘 자체는 좋지만, 준비 없는 도약은 방향을 잃기 쉽습니다. 시작보다 준비 상태를 먼저 점검하는 것이 이 흐름에서는 더 중요합니다.',
          future: '새로운 챕터가 열릴 가능성이 있습니다. 그것이 어떤 형태가 될지는 지금의 의도를 얼마나 명확히 하느냐에 달려 있습니다. 충동을 지탱하는 구조가 있다면 그 가능성은 더 단단해집니다.',
        },
      },
      en: {
        name: 'The Fool',
        keywords: ['Beginning', 'Leap', 'Spontaneity'],
        baseMeaning: 'You are at the threshold of something new, with both the freedom and the risk that come with unexplored ground. Possibility is open, but direction is not yet set.',
        caution: 'Enthusiasm alone does not prepare the road ahead.',
        interpretations: {
          present: 'You may be entering a phase you have not mapped out yet. The energy is open and unstructured, which can feel exhilarating or unsettling. Notice which feeling is stronger — that usually points to what needs attention.',
          advice: 'Before you move forward, take stock of what you actually have versus what you assume you have. Openness to the unknown is genuinely valuable here, but impulse without direction tends to exhaust itself quickly.',
          future: 'A new chapter is forming. How it unfolds depends largely on whether your enthusiasm is grounded in enough intention to carry it forward. The potential is real — the question is what you build around it.',
        },
      },
      ja: {
        name: '愚者',
        keywords: ['始まり', '跳躍', '自発性'],
        baseMeaning: 'なじみのある流れを離れ、新しい局面へと向かう時期です。可能性は開いていますが、方向性はまだ定まっていません。',
        caution: '期待が先走ると、現実の確認が疎かになりがちです。',
        interpretations: {
          present: '今は、まだ地図のない場所へ足を踏み入れている段階です。開かれた可能性がある一方で、方向が定まっていない状態でもあります。どちらの感覚が強いかを確認してみてください。',
          advice: '進む前に、自分が実際に何を持っているかを確認しましょう。勢いだけで進む前に、準備の状態を先に点検することが、この流れでは大切です。',
          future: '新しい章が開く可能性があります。それがどんな形になるかは、今の意図をどれだけ明確にするかにかかっています。衝動を支える構造があれば、その可能性はより確かなものになります。',
        },
      },
      es: {
        name: 'El Loco',
        keywords: ['Inicio', 'Salto', 'Espontaneidad'],
        baseMeaning: 'Estás en el umbral de algo nuevo, con la libertad y el riesgo que conlleva lo inexplorado. La posibilidad está abierta, pero la dirección aún no está definida.',
        caution: 'El entusiasmo solo no prepara el camino.',
        interpretations: {
          present: 'Es posible que estés entrando en una etapa que aún no has trazado. La energía es abierta y sin estructura, lo que puede sentirse emocionante o incierto. Observa cuál de las dos sensaciones es más fuerte — eso suele señalar lo que necesita atención.',
          advice: 'Antes de avanzar, revisa con honestidad qué tienes realmente disponible. La apertura a lo desconocido es valiosa, pero el impulso sin dirección tiende a agotarse rápido.',
          future: 'Se está formando un nuevo capítulo. Cómo se desarrolla depende en gran medida de si tu entusiasmo tiene suficiente intención para sostenerlo. El potencial es real — la pregunta es qué construyes alrededor de él.',
        },
      },
    },
  },
  {
    id: 'magician',
    number: 1,
    imagePrompt: 'A figure at a table with wand raised, four elemental symbols around, lemniscate above head, garden setting, symbolic of skill and manifestation',
    localized: {
      ko: {
        name: '마법사',
        keywords: ['능력', '집중', '주도권'],
        baseMeaning: '필요한 자원은 이미 손안에 있습니다. 문제는 그것을 얼마나 의식적으로 활용하고 있느냐입니다.',
        caution: '여러 방향으로 에너지를 분산시키면 어떤 결과도 완성되기 어렵습니다.',
        interpretations: {
          present: '지금 당신이 가진 능력은 충분합니다. 남은 과제는 그것을 하나의 목표에 집중시키는 것입니다. 아직 실행으로 옮기지 않은 채 잠재력만 쌓아두고 있는 상태일 수 있습니다.',
          advice: '지금 당장 행동할 수 있는 한 가지를 정하세요. 완벽한 준비를 기다리기보다 작고 구체적인 실행이 흐름을 만듭니다. 능숙함은 집중에서 오지, 동시에 모든 것을 다루는 데서 오지 않습니다.',
          future: '의도를 가지고 능력을 활용한다면 가까운 시일 안에 구체적인 결과가 나타날 가능성이 높습니다. 목표를 모호하게 유지하면 에너지가 흩어질 수 있습니다.',
        },
      },
      en: {
        name: 'The Magician',
        keywords: ['Skill', 'Focus', 'Agency'],
        baseMeaning: 'The resources you need are available to you — the question is whether you are using them deliberately.',
        caution: 'Scattered effort dissipates even the best tools.',
        interpretations: {
          present: 'You are in a position where your capability is real. The challenge is channeling it toward something specific rather than staying in potential. You may be sitting on skills that are not yet being applied.',
          advice: 'Identify the one thing you can act on right now. Mastery comes from focus, not from handling everything at once. A small, deliberate move carries more weight than perfect preparation.',
          future: 'If you apply your skills with intention, the near term offers concrete results. Staying vague about goals will scatter the outcome — the tools are there, but they need to be pointed at something specific.',
        },
      },
      ja: {
        name: '魔術師',
        keywords: ['能力', '集中', '主体性'],
        baseMeaning: '必要なリソースはすでに手の中にあります。問題は、それをどれだけ意識的に使っているかです。',
        caution: 'エネルギーを複数の方向に分散させると、どんな優れたツールも成果につながりにくくなります。',
        interpretations: {
          present: '今、あなたの能力は十分あります。残った課題は、それを一つの目標に集中させることです。まだ実行に移さずに可能性を積み上げている状態かもしれません。',
          advice: '今すぐ動ける一つのことを決めてください。完璧な準備を待つより、小さく具体的な行動が流れを作ります。熟達は集中から生まれます。',
          future: '意図を持って能力を使えば、近いうちに具体的な結果が現れる可能性が高いです。目標を曖昧にしておくと、エネルギーが散らばるかもしれません。',
        },
      },
      es: {
        name: 'El Mago',
        keywords: ['Habilidad', 'Enfoque', 'Iniciativa'],
        baseMeaning: 'Los recursos que necesitas están disponibles — la pregunta es si los estás usando de manera deliberada.',
        caution: 'El esfuerzo disperso disipa incluso las mejores herramientas.',
        interpretations: {
          present: 'Estás en una posición donde tu capacidad es real. El reto es canalizarla hacia algo específico en vez de quedarte en el potencial. Puede que tengas habilidades que aún no estás aplicando.',
          advice: 'Identifica una sola cosa en la que puedas actuar ahora mismo. El dominio viene del enfoque, no de manejar todo a la vez. Un movimiento pequeño y deliberado tiene más peso que una preparación perfecta.',
          future: 'Si aplicas tus habilidades con intención, el corto plazo ofrece resultados concretos. Mantener objetivos vagos dispersará el resultado — las herramientas están ahí, pero necesitan apuntar a algo específico.',
        },
      },
    },
  },
  {
    id: 'high-priestess',
    number: 2,
    imagePrompt: 'A figure seated between two tall pillars, crescent moon at feet, scroll in hand, sheer veil behind, serene and knowing expression',
    localized: {
      ko: {
        name: '여사제',
        keywords: ['직관', '기다림', '내면의 지혜'],
        baseMeaning: '아직 드러나지 않은 것이 있습니다. 서두르면 오히려 흐름을 놓칩니다. 표면 너머에 더 중요한 것이 존재합니다.',
        caution: '원하는 것을 직관이라고 착각하지 않도록 주의가 필요합니다.',
        interpretations: {
          present: '상황의 전체 그림이 아직 보이지 않는 시기입니다. 표면적으로 보이는 것 너머에 더 중요한 흐름이 존재할 수 있습니다. 지금은 판단을 서두르기보다 감지하고 관찰하는 것이 더 정확합니다.',
          advice: '조용히 기다리며 정보를 모으세요. 지금은 결론을 내리는 것보다 관찰하는 것이 더 정확한 태도입니다. 직관은 억지로 끌어낼 때보다 자연스럽게 표면에 올라올 때 신뢰할 수 있습니다.',
          future: '명확함은 찾아올 것입니다. 그 시기는 강요할 수 없지만, 기다리는 동안 보이는 것들이 방향을 알려줄 것입니다. 급하게 결정한 것보다 천천히 기다린 것이 더 많은 것을 보여주게 됩니다.',
        },
      },
      en: {
        name: 'The High Priestess',
        keywords: ['Intuition', 'Patience', 'Hidden knowledge'],
        baseMeaning: 'Something has not surfaced yet — and pushing prematurely may close the door on understanding. The surface is not the whole picture.',
        caution: 'Confusing wishful thinking with intuition will lead you in the wrong direction.',
        interpretations: {
          present: 'The full picture is not visible yet. What you sense beneath the surface may be more accurate than what the situation shows at face value. This is not a time for quick reads — it is a time for careful observation.',
          advice: 'Hold still. Gather information quietly rather than acting. Your intuition is functioning correctly — trust it without forcing it into conclusions. The answer you are looking for is forming, but not on demand.',
          future: 'Clarity will come, but not on schedule. The patient approach will reveal what the urgent approach would have missed. What surfaces in its own time tends to be more reliable than what is forced into view.',
        },
      },
      ja: {
        name: '女教皇',
        keywords: ['直感', '忍耐', '内なる知恵'],
        baseMeaning: 'まだ表面に出ていないものがあります。急ぐと、かえって流れを見失うことがあります。表面の奥に、より重要なものが存在しています。',
        caution: '望むものを直感と混同しないよう注意が必要です。',
        interpretations: {
          present: '状況の全体像がまだ見えない時期です。表面的に見えるものの奥に、より重要な流れが存在するかもしれません。今は判断を急ぐより、感知し観察することが正確です。',
          advice: '静かに待ちながら情報を集めましょう。今は結論を出すよりも観察することが正確な姿勢です。直感は無理に引き出すよりも、自然に浮かび上がるときに信頼できます。',
          future: '明確さはやってきます。そのタイミングは強制できませんが、待つ間に見えてくるものが方向を示してくれます。焦って決めたことより、ゆっくり待ったことの方が、より多くを見せてくれます。',
        },
      },
      es: {
        name: 'La Sacerdotisa',
        keywords: ['Intuición', 'Paciencia', 'Sabiduría interior'],
        baseMeaning: 'Algo aún no ha salido a la superficie — y empujar prematuramente puede cerrar la puerta a la comprensión. Lo visible no es el cuadro completo.',
        caution: 'Confundir el deseo con la intuición te llevará en la dirección equivocada.',
        interpretations: {
          present: 'El panorama completo aún no es visible. Lo que percibes bajo la superficie puede ser más preciso que lo que la situación muestra a primera vista. No es momento de lecturas rápidas — es momento de observación cuidadosa.',
          advice: 'Mantente quieto. Reúne información en silencio en lugar de actuar. Tu intuición está funcionando correctamente — confía en ella sin forzarla hacia conclusiones.',
          future: 'La claridad llegará, pero no según un horario. El enfoque paciente revelará lo que el enfoque urgente habría perdido. Lo que emerge en su propio tiempo tiende a ser más confiable que lo que se fuerza.',
        },
      },
    },
  },
  {
    id: 'empress',
    number: 3,
    imagePrompt: 'A figure on a throne in a lush garden, crown of twelve stars, wheat at feet, flowing robes, Venus symbol, serene and abundant setting',
    localized: {
      ko: {
        name: '여황제',
        keywords: ['풍요', '성장', '돌봄'],
        baseMeaning: '지금은 생산적인 시기입니다. 무엇을 돌보느냐에 따라 결과가 달라집니다. 쏟는 에너지가 자라는 시간입니다.',
        caution: '안락함 속에서 정말 필요한 변화를 미루고 있을 수도 있습니다.',
        interpretations: {
          present: '자연스러운 성장이 가능한 시기입니다. 관계, 창의적 작업, 개인적인 프로젝트 중 지금 에너지를 투자하면 발전하는 영역이 있습니다. 풍요로움은 주어지는 것이 아니라 가꾸는 것에서 옵니다.',
          advice: '실질적인 돌봄이 필요한 곳에 에너지를 집중하세요. 풍요로운 시기는 뭔가를 쉽게 얻는 때가 아니라, 노력이 결실을 맺는 때입니다. 무엇이 실제로 성장할 준비가 되어 있는지 살펴보세요.',
          future: '꾸준히 투자해온 부분에서 가시적인 결과가 나타날 가능성이 있습니다. 지속적인 관심과 돌봄이 흐름을 만들어 갑니다. 서두르지 않고 지속한 것이 나타나는 시기입니다.',
        },
      },
      en: {
        name: 'The Empress',
        keywords: ['Abundance', 'Growth', 'Nurturing'],
        baseMeaning: 'Conditions are productive right now — but what you tend to grows, and what you neglect will fade. This is a time of active cultivation.',
        caution: 'Comfort can make it easy to avoid a difficult step that is actually necessary.',
        interpretations: {
          present: 'You are in a period of natural growth. Relationships, creative work, or personal projects are fertile — what you invest in now will develop. Abundance here is not passive — it responds to attention.',
          advice: 'Invest your energy where something actually needs care. Abundance does not mean ease — it means the ground is ready for what you plant. Look at what genuinely needs your presence right now.',
          future: 'If you have been nurturing the right things, expect to see them take shape. Sustained attention produces visible results. What you have been tending quietly is likely closer to fruition than it seems.',
        },
      },
      ja: {
        name: '女帝',
        keywords: ['豊かさ', '成長', '育み'],
        baseMeaning: '今は生産的な時期です。何を育てるかによって結果が変わります。注ぐエネルギーが育つ時間です。',
        caution: '安楽さの中で、本当に必要な変化を先延ばしにしているかもしれません。',
        interpretations: {
          present: '自然な成長が可能な時期です。人間関係、創造的な作業、個人的なプロジェクトなど、今エネルギーを投資すれば発展する領域があります。豊かさは与えられるものではなく、育てるものから来ます。',
          advice: '実質的な世話が必要な場所にエネルギーを集中させましょう。豊かな時期とは楽に何かを得る時ではなく、努力が実を結ぶ時です。何が実際に成長する準備ができているか見てみましょう。',
          future: '継続的に投資してきた部分で目に見える結果が現れる可能性があります。継続した関心と育みが流れを作っていきます。急がずに続けてきたことが現れる時期です。',
        },
      },
      es: {
        name: 'La Emperatriz',
        keywords: ['Abundancia', 'Crecimiento', 'Cuidado'],
        baseMeaning: 'Las condiciones son productivas ahora — pero lo que cultivas crece, y lo que descuidas se marchita. Este es un tiempo de cultivo activo.',
        caution: 'La comodidad puede hacer fácil evitar un paso difícil que en realidad es necesario.',
        interpretations: {
          present: 'Estás en un período de crecimiento natural. Las relaciones, el trabajo creativo o los proyectos personales son fértiles — lo que inviertes ahora se desarrollará. La abundancia aquí no es pasiva — responde a la atención.',
          advice: 'Invierte tu energía donde algo realmente necesita cuidado. La abundancia no significa facilidad — significa que el terreno está listo para lo que siembres.',
          future: 'Si has estado cultivando las cosas correctas, espera verlas tomar forma. La atención sostenida produce resultados visibles. Lo que has estado cuidando en silencio probablemente esté más cerca de florecer de lo que parece.',
        },
      },
    },
  },
  {
    id: 'emperor',
    number: 4,
    imagePrompt: 'A figure on a stone throne with a scepter, mountain background, armor under royal robes, ram symbols on throne, authoritative and stable',
    localized: {
      ko: {
        name: '황제',
        keywords: ['구조', '책임', '안정'],
        baseMeaning: '지금 이 순간은 유연함보다 명확한 틀과 결단이 필요합니다. 방향을 잡는 사람이 있어야 할 때입니다.',
        caution: '지나친 통제는 상황 변화에 대응하지 못하게 할 수 있습니다.',
        interpretations: {
          present: '책임지고 방향을 잡아야 할 때입니다. 명확한 구조와 신뢰할 수 있는 태도가 상황을 안정시킵니다. 리더십이 요구되는 자리에서 주저하는 것은 오히려 혼란을 만들 수 있습니다.',
          advice: '담당할 영역을 명확히 하세요. 자신의 역할과 경계를 분명히 하지 않으면 혼선이 생깁니다. 결정을 미루지 말고, 현재 상황이 필요로 하는 것에 직접 대응하세요.',
          future: '지금 구축하는 기반은 이후의 변화를 버텨낼 닻이 됩니다. 지름길로 기초를 생략하면 나중에 그 비용을 치르게 됩니다. 안정적인 구조는 서두르지 않는 데서 만들어집니다.',
        },
      },
      en: {
        name: 'The Emperor',
        keywords: ['Structure', 'Authority', 'Stability'],
        baseMeaning: 'Order and clear decisions are what this moment calls for — not flexibility, but a defined framework. Someone needs to take the lead.',
        caution: 'Rigid control can prevent adaptation when circumstances require it.',
        interpretations: {
          present: 'The situation needs someone to take responsibility and set a clear direction. The energy here rewards decisiveness and reliable structure. Hesitating in a position that calls for leadership tends to increase disorder.',
          advice: 'Define your terms. Establish what you are responsible for and hold that boundary. Ambiguity in your own position will cost you. Act on what the current situation needs — do not defer.',
          future: 'A stable framework you build now will anchor you through coming changes. Shortcuts in foundation will be felt later. Solid structure comes from not rushing the essentials.',
        },
      },
      ja: {
        name: '皇帝',
        keywords: ['構造', '責任', '安定'],
        baseMeaning: '今この瞬間は、柔軟さより明確な枠組みと決断が必要です。方向を定める人が必要な時です。',
        caution: '過度な管理は、状況の変化に対応できなくなる可能性があります。',
        interpretations: {
          present: '責任を持って方向を定めるべき時です。明確な構造と信頼できる姿勢が状況を安定させます。リーダーシップが求められる場で躊躇することは、むしろ混乱を生む可能性があります。',
          advice: '担当する領域を明確にしてください。自分の役割と境界をはっきりさせないと混乱が生じます。決定を先延ばしにせず、現在の状況が必要としていることに直接対応しましょう。',
          future: '今構築する基盤は、その後の変化に耐える錨となります。近道で基礎を省略すると、後でその代償を払うことになります。安定した構造は急がないことから生まれます。',
        },
      },
      es: {
        name: 'El Emperador',
        keywords: ['Estructura', 'Autoridad', 'Estabilidad'],
        baseMeaning: 'El orden y las decisiones claras son lo que este momento requiere — no flexibilidad, sino un marco definido. Alguien necesita tomar el liderazgo.',
        caution: 'El control rígido puede impedir la adaptación cuando las circunstancias lo requieren.',
        interpretations: {
          present: 'La situación necesita que alguien asuma la responsabilidad y establezca una dirección clara. La energía aquí recompensa la decisión y la estructura confiable. Dudar en una posición que llama al liderazgo tiende a aumentar el desorden.',
          advice: 'Define tus términos. Establece de qué eres responsable y mantén ese límite. La ambigüedad en tu propia posición te costará. Actúa según lo que la situación actual necesita.',
          future: 'Un marco estable que construyas ahora te anclará en los cambios venideros. Los atajos en la base se sentirán más tarde. La estructura sólida viene de no apresurarse en los esenciales.',
        },
      },
    },
  },
  {
    id: 'hierophant',
    number: 5,
    imagePrompt: 'A robed figure on a throne between two pillars, two crossed keys below, ceremonial arch, two kneeling figures, symbolic of tradition and guidance',
    localized: {
      ko: {
        name: '교황',
        keywords: ['관습', '조언', '제도적 맥락'],
        baseMeaning: '기존의 규범이나 체계 안에서 움직이는 것이 지금은 더 효과적일 수 있습니다. 경험 있는 사람의 길이 의미를 가집니다.',
        caution: '생각 없이 관습을 따르면 더 나은 방향을 놓칠 수 있습니다.',
        interpretations: {
          present: '제도적 기대나 사회적 맥락이 현재 상황에 영향을 주고 있습니다. 이 공간의 규칙을 파악하는 것이 중요하며, 그것과의 관계를 어떻게 맺느냐가 흐름을 결정합니다.',
          advice: '이 분야에서 경험 있는 사람에게 조언을 구해보세요. 확립된 방식을 이해하면 다음 단계가 더 명확하게 보입니다. 외부 도움을 받는 것이 약점이 아니라 전략입니다.',
          future: '검증된 방식을 따르는 것이 이 맥락에서는 실질적인 의미가 있습니다. 계속 기존 방식에 저항하고 있다면, 그 저항이 실제로 도움이 되는지 점검해볼 필요가 있습니다.',
        },
      },
      en: {
        name: 'The Hierophant',
        keywords: ['Convention', 'Guidance', 'Institutional context'],
        baseMeaning: 'You are in a context shaped by established rules, traditions, or authority — working with that structure rather than against it may be more effective right now.',
        caution: 'Following convention without thinking can mean missing a better path that does not fit the standard mold.',
        interpretations: {
          present: 'The current situation involves institutional expectations, social norms, or a formal environment. Understanding the rules of this space matters. How you position yourself within or against that structure will shape the outcome.',
          advice: 'Seek guidance from someone experienced in this domain. Understanding the established framework clarifies the next step more than trying to figure it out alone. Asking for help here is strategic, not a weakness.',
          future: 'Following the conventional path forward has real merit in this context. If you have been resisting an established process, consider whether that resistance is actually serving your goals or just making things harder.',
        },
      },
      ja: {
        name: '教皇',
        keywords: ['慣習', '助言', '制度的文脈'],
        baseMeaning: '今は、既存の規範や体系の中で動くことが、より効果的かもしれません。経験ある人の道が意味を持ちます。',
        caution: '考えなしに慣習に従うと、より良い方向を見逃す可能性があります。',
        interpretations: {
          present: '制度的な期待や社会的な文脈が現在の状況に影響を与えています。この空間のルールを把握することが重要であり、それとどのように関わるかが流れを決めます。',
          advice: 'この分野で経験のある人にアドバイスを求めてみましょう。確立された方法を理解すると、次のステップがより明確に見えます。外部の助けを借りることは弱さではなく、戦略です。',
          future: '実証済みの方法に従うことは、この文脈では実際的な意味があります。既存の方法に抵抗し続けているなら、その抵抗が実際に目標に役立っているかどうかを検討する必要があります。',
        },
      },
      es: {
        name: 'El Hierofante',
        keywords: ['Convención', 'Orientación', 'Contexto institucional'],
        baseMeaning: 'Estás en un contexto moldeado por reglas establecidas, tradiciones o autoridad — trabajar con esa estructura en lugar de contra ella puede ser más efectivo ahora.',
        caution: 'Seguir la convención sin pensar puede significar perderse un camino mejor que no encaja en el molde estándar.',
        interpretations: {
          present: 'La situación actual involucra expectativas institucionales, normas sociales o un entorno formal. Entender las reglas de este espacio importa. Cómo te posicionas dentro o contra esa estructura dará forma al resultado.',
          advice: 'Busca orientación de alguien con experiencia en este dominio. Comprender el marco establecido clarifica el siguiente paso más que intentar resolverlo solo.',
          future: 'Seguir el camino convencional tiene mérito real en este contexto. Si has estado resistiendo un proceso establecido, considera si esa resistencia realmente sirve a tus objetivos.',
        },
      },
    },
  },
  {
    id: 'lovers',
    number: 6,
    imagePrompt: 'Two figures beneath an angel with outstretched wings, sun above, mountain and tree in background, symbolic of choice and deep connection',
    localized: {
      ko: {
        name: '연인',
        keywords: ['선택', '연결', '가치 정렬'],
        baseMeaning: '의미 있는 결정이 앞에 있습니다. 그것은 취향의 문제이기 이전에 당신이 무엇을 중요하게 여기는지의 문제입니다.',
        caution: '지금 기분에 끌리는 선택이 장기적으로 원하는 것과 반드시 일치하지는 않습니다.',
        interpretations: {
          present: '선택의 기로에 서 있습니다. 두 방향 사이에서 무엇을 선택하느냐는 외부 상황보다 당신의 내면 가치에 달려 있습니다. 지금 느끼는 끌림이 정말 원하는 것인지, 아니면 편안한 것인지 구분해볼 필요가 있습니다.',
          advice: '두 선택지가 모두 안전하다고 느껴질 때 어느 쪽을 고르겠느냐고 자신에게 물어보세요. 그 답이 진짜 우선순위를 보여줍니다. 결정을 회피하는 것 자체가 하나의 선택임을 기억하세요.',
          future: '지금의 선택은 외부 요인보다 더 강하게 가까운 흐름을 형성할 것입니다. 진지하게 고민한 결정은 그렇지 않은 것보다 훨씬 더 오래갑니다.',
        },
      },
      en: {
        name: 'The Lovers',
        keywords: ['Choice', 'Connection', 'Alignment'],
        baseMeaning: 'A meaningful decision is in play — and it may reveal something important about your values, not just your preferences.',
        caution: 'Choosing what feels good in the moment is not always the same as choosing what aligns with what you actually want long-term.',
        interpretations: {
          present: 'You are at a fork — between paths, people, or aspects of yourself. The external choice reflects a deeper question about what matters to you. Distinguishing between what attracts you and what you genuinely want is the real work here.',
          advice: 'Ask yourself what you would choose if both options felt equally safe. The answer usually clarifies the real priority. Remember that avoiding the decision is itself a choice with consequences.',
          future: 'The decision you make here will shape the near-term flow more than external factors will. A decision made with genuine reflection holds more than one made by default or avoidance.',
        },
      },
      ja: {
        name: '恋人',
        keywords: ['選択', 'つながり', '価値の整合'],
        baseMeaning: '意味のある決断が目の前にあります。それは好みの問題である前に、何を大切にするかの問題です。',
        caution: '今の気分に引かれる選択が、長期的に望むものと必ずしも一致するわけではありません。',
        interpretations: {
          present: '選択の岐路に立っています。二つの方向の間で何を選ぶかは、外部の状況より内なる価値に依存します。今感じる引力が本当に望むものか、それとも安心できるものかを区別する必要があります。',
          advice: '両方の選択肢が安全だと感じるとき、どちらを選ぶかを自分に問いかけてください。その答えが本当の優先事項を示します。決断を避けること自体が一つの選択であることを忘れないでください。',
          future: '今の選択は、外部要因よりも強く近い流れを形作るでしょう。真剣に考えた決断は、そうでないものよりずっと長持ちします。',
        },
      },
      es: {
        name: 'Los Enamorados',
        keywords: ['Elección', 'Conexión', 'Alineación'],
        baseMeaning: 'Hay una decisión significativa en juego — y puede revelar algo importante sobre tus valores, no solo tus preferencias.',
        caution: 'Elegir lo que se siente bien en el momento no siempre es lo mismo que elegir lo que se alinea con lo que realmente quieres a largo plazo.',
        interpretations: {
          present: 'Estás en una encrucijada — entre caminos, personas o aspectos de ti mismo. La elección externa refleja una pregunta más profunda sobre lo que te importa. Distinguir entre lo que te atrae y lo que genuinamente quieres es el trabajo real aquí.',
          advice: 'Pregúntate qué elegirías si ambas opciones se sintieran igualmente seguras. La respuesta generalmente aclara la prioridad real. Recuerda que evitar la decisión también es una elección con consecuencias.',
          future: 'La decisión que tomes aquí dará forma al flujo cercano más que los factores externos. Una decisión tomada con reflexión genuina dura más que una tomada por defecto o evasión.',
        },
      },
    },
  },
  {
    id: 'chariot',
    number: 7,
    imagePrompt: 'A figure in armor on a canopied chariot, two sphinxes (one dark one light) pulling in opposite directions, star-filled canopy, symbolic of willpower and control',
    localized: {
      ko: {
        name: '전차',
        keywords: ['추진력', '통제', '방향성'],
        baseMeaning: '전진은 가능합니다. 그러나 반대 방향으로 당기는 힘을 억누르는 것이 아니라, 그 둘을 함께 잡아야 나아갈 수 있습니다.',
        caution: '의지력만으로는 불명확한 전략을 대신할 수 없습니다.',
        interpretations: {
          present: '지금 추진력은 있습니다. 관건은 그 힘이 제대로 방향을 잡고 있는가 하는 점입니다. 빠르게 움직이고 있지만 실제로 의도한 곳으로 가고 있는지 확인이 필요합니다.',
          advice: '내부적으로나 외부적으로 다른 방향을 당기는 힘이 있다면 그것을 직접 마주하세요. 빠른 속도와 분명한 방향이 함께여야 앞으로 나아갑니다. 속도를 줄이는 것이 더 효율적인 순간입니다.',
          future: '집중력을 유지하고 경쟁하는 압력을 관리할 수 있다면 전진은 유력한 결과입니다. 중간에 방향을 잃으면 지금 속도를 줄이는 것보다 더 많은 시간이 소요됩니다.',
        },
      },
      en: {
        name: 'The Chariot',
        keywords: ['Momentum', 'Control', 'Drive'],
        baseMeaning: 'Progress is possible — but it requires holding opposing forces in direction together, not suppressing them.',
        caution: 'Willpower alone will not compensate for a strategy that is unclear.',
        interpretations: {
          present: 'There is real drive available to you now. The question is whether you are directing it or just moving fast. Check whether the speed you are feeling is aligned with where you actually intend to go.',
          advice: 'Identify what is pulling in different directions — inside or outside — and address that directly. Speed and direction together are what carry you through. There are moments when slowing down is more efficient.',
          future: 'If you can maintain focus and manage the competing pressures, forward movement is the likely result. Losing grip of the direction mid-course will cost more time than reducing speed now would.',
        },
      },
      ja: {
        name: '戦車',
        keywords: ['推進力', 'コントロール', '方向性'],
        baseMeaning: '前進は可能です。しかし、反対方向に引く力を抑えるのではなく、その両方を共に掴む必要があります。',
        caution: '意志力だけでは、不明確な戦略を補うことはできません。',
        interpretations: {
          present: '今は本物の推進力があります。問題はその力が正しい方向を向いているかどうかです。速く動いていますが、実際に意図した場所に向かっているか確認が必要です。',
          advice: '内部的にも外部的にも、異なる方向に引く力があるなら、それに直接向き合ってください。速さと明確な方向が共にあってこそ前進できます。',
          future: '集中力を維持し、競合する圧力を管理できるなら、前進は有力な結果です。途中で方向を失うと、今速度を落とすよりも多くの時間がかかります。',
        },
      },
      es: {
        name: 'El Carro',
        keywords: ['Impulso', 'Control', 'Dirección'],
        baseMeaning: 'El progreso es posible — pero requiere mantener juntas las fuerzas opuestas en dirección, no suprimirlas.',
        caution: 'La fuerza de voluntad sola no compensará una estrategia que no está clara.',
        interpretations: {
          present: 'Hay un impulso real disponible para ti ahora. La pregunta es si lo estás dirigiendo o simplemente moviéndote rápido. Verifica si la velocidad que sientes está alineada con a dónde realmente pretendes ir.',
          advice: 'Identifica qué está tirando en diferentes direcciones — dentro o fuera — y aborda eso directamente. Velocidad y dirección juntas son lo que te lleva adelante.',
          future: 'Si puedes mantener el enfoque y gestionar las presiones en competencia, el avance es el resultado probable. Perder el control de la dirección a mitad de camino costará más tiempo que reducir la velocidad ahora.',
        },
      },
    },
  },
  {
    id: 'strength',
    number: 8,
    imagePrompt: 'A figure gently closing the jaws of a lion, lemniscate above head, white robe, garland of flowers, peaceful meadow, symbolic of inner authority',
    localized: {
      ko: {
        name: '힘',
        keywords: ['인내', '침착함', '내면의 권위'],
        baseMeaning: '압박 속에서도 흔들리지 않고 반응보다 대응을 선택하는 것이 지금의 힘입니다. 부드러운 통제가 강한 주장보다 더 많은 것을 얻어냅니다.',
        caution: '어려움을 억누르는 것은 다루는 것과 다릅니다.',
        interpretations: {
          present: '속도나 강도가 아니라 침착함이 필요한 상황입니다. 지금 어떻게 반응하느냐가 결과를 좌우합니다. 감정이 올라오더라도 그것을 조용히 다루는 능력이 지금 요구됩니다.',
          advice: '조용히 해결될 수 있는 것을 확대하지 마세요. 차분한 대응은 강한 주장보다 더 많은 것을 얻어냅니다. 자신의 내면 상태를 인식하는 것이 가장 중요한 작업입니다.',
          future: '꾸준하고 인내심 있는 접근이 결국 결과를 만들어냅니다. 덜 극적인 방식이 오히려 문제를 더 완전하게 해결하는 경우가 많습니다.',
        },
      },
      en: {
        name: 'Strength',
        keywords: ['Endurance', 'Composure', 'Inner authority'],
        baseMeaning: 'The ability to stay composed under pressure — to respond rather than react — is what defines strength here.',
        caution: 'Suppressing difficulty is not the same as managing it.',
        interpretations: {
          present: 'You are navigating something that requires patience and steadiness, not force. The quality of your response matters more than speed. The capacity to handle what arises quietly is what this moment calls for.',
          advice: 'Do not escalate what can be handled quietly. Your calm in this situation carries more weight than assertion would. Knowing your own internal state right now is the most important work.',
          future: 'Sustained, patient handling of the current difficulty will yield results. The approach that feels less dramatic often resolves things more completely than the forceful one.',
        },
      },
      ja: {
        name: '力',
        keywords: ['忍耐', '冷静さ', '内なる権威'],
        baseMeaning: 'プレッシャーの下でも揺るがず、反応ではなく対応を選ぶことが今の力です。柔らかいコントロールが強い主張より多くを得ます。',
        caution: '困難を抑圧することは、対処することとは異なります。',
        interpretations: {
          present: 'スピードや強度ではなく、冷静さが必要な状況です。今どのように反応するかが結果を左右します。感情が湧き上がっても、それを静かに扱う能力が今求められています。',
          advice: '静かに解決できることを拡大しないでください。落ち着いた対応は、強い主張よりも多くを得ます。自分の内的状態を認識することが最も重要な作業です。',
          future: '着実で忍耐強いアプローチが最終的に結果を生み出します。あまり劇的でない方法の方が、問題をより完全に解決することが多いです。',
        },
      },
      es: {
        name: 'La Fuerza',
        keywords: ['Resistencia', 'Compostura', 'Autoridad interior'],
        baseMeaning: 'La capacidad de mantenerse sereno bajo presión — de responder en lugar de reaccionar — es lo que define la fuerza aquí.',
        caution: 'Suprimir la dificultad no es lo mismo que manejarla.',
        interpretations: {
          present: 'Estás navegando algo que requiere paciencia y firmeza, no fuerza. La calidad de tu respuesta importa más que la velocidad. La capacidad de manejar lo que surge tranquilamente es lo que este momento pide.',
          advice: 'No escales lo que puede manejarse tranquilamente. Tu calma en esta situación tiene más peso que la asertividad. Conocer tu propio estado interno ahora mismo es el trabajo más importante.',
          future: 'El manejo paciente y sostenido de la dificultad actual producirá resultados. El enfoque que se siente menos dramático a menudo resuelve las cosas más completamente.',
        },
      },
    },
  },
  {
    id: 'hermit',
    number: 9,
    imagePrompt: 'A cloaked figure on a mountaintop holding a glowing lantern, staff in other hand, dark night sky, alone and contemplative, symbolic of inner guidance',
    localized: {
      ko: {
        name: '은둔자',
        keywords: ['고독', '성찰', '내면 탐색'],
        baseMeaning: '지금은 외부에서 답이 오지 않습니다. 의도적으로 물러나는 시간이 더 많은 것을 보여줄 것입니다.',
        caution: '고독이 목적이 아닌 회피의 수단이 될 때는 명확함 대신 방어가 생깁니다.',
        interpretations: {
          present: '덜 관여하고 더 성찰하는 방향이 지금은 맞을 수 있습니다. 이미 필요한 정보는 충분히 있을 수 있고, 이제 그것을 정직하게 처리하는 단계입니다. 활동보다 고요가 더 생산적인 시기입니다.',
          advice: '상황에서 거리를 두세요. 도망치기 위해서가 아니라 명확하게 보기 위해서입니다. 행동보다 고요 속에서 통찰이 먼저 옵니다. 혼자만의 시간을 의도적으로 확보하세요.',
          future: '내면 작업의 시간은 느리게 느껴지지만, 이후의 방향을 더 정확하게 잡아줍니다. 이 단계를 건너뛰면 나중에 다시 돌아오게 됩니다.',
        },
      },
      en: {
        name: 'The Hermit',
        keywords: ['Solitude', 'Reflection', 'Inner search'],
        baseMeaning: 'Answers will not come from the outside right now — a period of deliberate stepping back will serve you better than staying visible.',
        caution: 'Isolation for its own sake can become avoidance rather than clarity.',
        interpretations: {
          present: 'The situation may be calling for less engagement and more reflection. You may have all the information you need — the step is processing it honestly. Quiet is more productive than activity right now.',
          advice: 'Create some distance from the situation. Not to escape, but to see it clearly. Insight is more likely to surface in stillness than in action. Protect some intentional time alone.',
          future: 'A period of internal work, though it may feel slow, tends to position you more accurately for what comes next. Skipping this step often means revisiting it later under less comfortable circumstances.',
        },
      },
      ja: {
        name: '隠者',
        keywords: ['孤独', '内省', '内なる探求'],
        baseMeaning: '今は外からは答えが来ません。意図的に引く時間の方が、表に出続けるよりも多くを見せてくれます。',
        caution: '孤独が目的ではなく回避の手段になるとき、明確さの代わりに防衛が生まれます。',
        interpretations: {
          present: '関与を減らし、内省を深める方向が今は合っているかもしれません。すでに必要な情報は十分にあるかもしれません。活動より静けさが生産的な時期です。',
          advice: '状況から距離を置いてください。逃げるためではなく、はっきり見るためです。行動より静けさの中で洞察が先に来ます。意図的に一人の時間を確保してください。',
          future: '内的な作業の時間は遅く感じられますが、その後の方向をより正確に定めます。このステップを飛ばすと、後でより不快な状況で戻ってくることになります。',
        },
      },
      es: {
        name: 'El Ermitaño',
        keywords: ['Soledad', 'Reflexión', 'Búsqueda interior'],
        baseMeaning: 'Las respuestas no vendrán del exterior ahora — un período de retiro deliberado te servirá mejor que permanecer visible.',
        caution: 'El aislamiento por sí mismo puede convertirse en evasión en lugar de claridad.',
        interpretations: {
          present: 'La situación puede estar llamando a menos participación y más reflexión. Puede que ya tengas toda la información que necesitas — el paso es procesarla honestamente. La quietud es más productiva que la actividad ahora.',
          advice: 'Crea algo de distancia de la situación. No para escapar, sino para verla claramente. El discernimiento es más probable que surja en la quietud que en la acción.',
          future: 'Un período de trabajo interno, aunque puede sentirse lento, tiende a posicionarte con más precisión para lo que viene. Saltar este paso a menudo significa revisarlo más tarde en circunstancias menos cómodas.',
        },
      },
    },
  },
  {
    id: 'wheel',
    number: 10,
    imagePrompt: 'A large spinning wheel in the clouds with Hebrew letters and alchemical symbols, sphinx on top, snake and jackal figures, clouds and sky background',
    localized: {
      ko: {
        name: '운명의 수레바퀴',
        keywords: ['전환점', '변화', '순환'],
        baseMeaning: '중요한 변화가 진행 중입니다. 그 변화에 어떤 자세로 임하느냐가 변화 자체만큼 중요합니다.',
        caution: '준비 없이 흐름이 바뀌기를 기다리는 것은 막상 그 순간이 왔을 때 대처하지 못하게 할 수 있습니다.',
        interpretations: {
          present: '상황이 움직이고 있습니다. 고정되었던 것들이 변하고 있고, 당신이 시작하지 않은 것들도 이미 변화의 영향 아래 있습니다. 이것은 나쁜 일이 아니라 순환의 자연스러운 흐름입니다.',
          advice: '이 변화에서 실제로 영향을 줄 수 있는 부분에 에너지를 집중하세요. 모든 변화에 개입할 필요는 없습니다. 통제할 수 없는 것과 영향을 줄 수 있는 것을 구분하는 것이 지금의 과제입니다.',
          future: '이 국면은 계속되지 않습니다. 현재 시기를 어떻게 활용하느냐가 다음 전환이 어디서 착지하느냐를 결정합니다. 변화의 방향을 파악하면 다음이 보입니다.',
        },
      },
      en: {
        name: 'Wheel of Fortune',
        keywords: ['Turning point', 'Change', 'Cycles'],
        baseMeaning: 'A significant shift is underway — and your orientation toward that change matters as much as the change itself.',
        caution: 'Waiting for the wheel to turn in your favor without any preparation means you might not be ready when it does.',
        interpretations: {
          present: 'Things are in motion — circumstances that felt fixed are shifting. You may not have initiated this, but your response shapes what it becomes. This is the natural flow of cycles, not necessarily misfortune.',
          advice: 'Identify what within this shift you can actually influence, and focus your energy there. Not everything that is changing requires your intervention. Distinguishing what you can affect from what you cannot is the key work now.',
          future: 'This cycle will not stay in its current phase. How you have used the current period will affect where the next turn lands. Understanding the direction of change helps you see what comes after.',
        },
      },
      ja: {
        name: '運命の輪',
        keywords: ['転換点', '変化', '循環'],
        baseMeaning: '重要な変化が進行中です。その変化にどんな姿勢で臨むかが、変化自体と同じくらい重要です。',
        caution: '準備なく流れが変わることを待つことは、いざその瞬間が来たとき対処できなくなる可能性があります。',
        interpretations: {
          present: '状況が動いています。固定されていたものが変わっており、あなたが始めていないものもすでに変化の影響下にあります。これは悪いことではなく、循環の自然な流れです。',
          advice: 'この変化の中で実際に影響を与えられる部分にエネルギーを集中させてください。すべての変化に介入する必要はありません。コントロールできないものと影響を与えられるものを区別することが今の課題です。',
          future: 'この局面は続きません。現在の時期をどのように活用するかが、次の転換がどこに着地するかを決めます。変化の方向を把握すれば次が見えます。',
        },
      },
      es: {
        name: 'La Rueda de la Fortuna',
        keywords: ['Punto de inflexión', 'Cambio', 'Ciclos'],
        baseMeaning: 'Un cambio significativo está en marcha — y tu orientación hacia ese cambio importa tanto como el cambio mismo.',
        caution: 'Esperar que la rueda gire a tu favor sin ninguna preparación significa que podrías no estar listo cuando suceda.',
        interpretations: {
          present: 'Las cosas están en movimiento — las circunstancias que se sentían fijas están cambiando. Puede que no hayas iniciado esto, pero tu respuesta da forma a lo que se convierte. Este es el flujo natural de los ciclos.',
          advice: 'Identifica qué dentro de este cambio puedes influir realmente, y enfoca tu energía allí. No todo lo que está cambiando requiere tu intervención.',
          future: 'Este ciclo no se quedará en su fase actual. Cómo has usado el período actual afectará dónde aterrizará el próximo giro. Entender la dirección del cambio te ayuda a ver lo que viene después.',
        },
      },
    },
  },
  {
    id: 'justice',
    number: 11,
    imagePrompt: 'A figure seated on a throne holding balanced scales in one hand and an upright sword in the other, pillars on each side, symbolic of truth and consequence',
    localized: {
      ko: {
        name: '정의',
        keywords: ['책임', '균형', '결과'],
        baseMeaning: '행동에는 결과가 따릅니다. 지금의 상황은 이미 움직이기 시작한 어떤 흐름을 반영합니다.',
        caution: '자신의 역할을 외면하면 원하는 해결에 더 오래 걸립니다.',
        interpretations: {
          present: '사실을 부드럽게 포장하지 않고 직시하는 것이 지금은 가장 유용합니다. 당신의 선택과 그 결과를 정직하게 마주하는 것이 필요합니다. 지금 일어나고 있는 일에서 당신이 기여한 부분을 인식하는 것이 중요합니다.',
          advice: '무슨 일이 실제로 일어나고 있는지 솔직하게 살펴보세요. 자신의 기여를 포함해서 상황을 정확하게 파악하는 것이 가장 강력한 도구입니다. 불편하더라도 사실을 직시하는 것이 해결의 시작입니다.',
          future: '현재 상황을 공정하고 명확하게 다루는 방식이 이후의 흐름을 결정합니다. 해소되지 않은 불균형은 결국 주목을 요구하게 됩니다. 지금의 정직함이 이후의 흐름을 훨씬 수월하게 만듭니다.',
        },
      },
      en: {
        name: 'Justice',
        keywords: ['Accountability', 'Balance', 'Consequence'],
        baseMeaning: 'Actions have outcomes, and the current situation reflects something that has been set in motion — for better or worse.',
        caution: 'Avoiding examination of your own role in the situation will delay a resolution you actually want.',
        interpretations: {
          present: 'You are in a moment where honesty about the facts — including your own actions — is more useful than narrative or deflection. Recognizing your contribution to what is happening is the essential first step.',
          advice: 'Look at what is actually happening without softening it. An honest assessment of where you stand and what caused this is the most useful tool available. Discomfort with the truth does not make it less true.',
          future: 'Clarity and fairness in how you handle the current situation will determine what comes next. Unresolved imbalances tend to require attention eventually — addressing them now is considerably less costly.',
        },
      },
      ja: {
        name: '正義',
        keywords: ['責任', 'バランス', '結果'],
        baseMeaning: '行動には結果が伴います。今の状況は、すでに動き始めた何らかの流れを反映しています。',
        caution: '自分の役割を見過ごすと、望む解決に時間がかかります。',
        interpretations: {
          present: '事実を柔らかく包まずに直視することが今は最も有用です。自分の選択とその結果に正直に向き合うことが必要です。今起きていることへの自分の貢献を認識することが重要です。',
          advice: '実際に何が起きているかを率直に見てください。自分の貢献を含めて状況を正確に把握することが最も強力なツールです。不快でも事実を直視することが解決の始まりです。',
          future: '現在の状況を公平かつ明確に扱う方法が、その後の流れを決めます。解消されない不均衡は最終的に注目を要求します。今の正直さが後の流れをずっと楽にします。',
        },
      },
      es: {
        name: 'La Justicia',
        keywords: ['Responsabilidad', 'Equilibrio', 'Consecuencia'],
        baseMeaning: 'Las acciones tienen consecuencias, y la situación actual refleja algo que se ha puesto en marcha — para bien o para mal.',
        caution: 'Evitar examinar tu propio papel en la situación retrasará una resolución que en realidad quieres.',
        interpretations: {
          present: 'Estás en un momento donde la honestidad sobre los hechos — incluidas tus propias acciones — es más útil que la narrativa o la evasión. Reconocer tu contribución a lo que está sucediendo es el primer paso esencial.',
          advice: 'Mira lo que realmente está sucediendo sin suavizarlo. Una evaluación honesta de dónde estás y qué causó esto es la herramienta más útil disponible.',
          future: 'La claridad y la equidad en cómo manejas la situación actual determinarán lo que viene después. Los desequilibrios sin resolver tienden a requerir atención eventualmente.',
        },
      },
    },
  },
  {
    id: 'hanged-man',
    number: 12,
    imagePrompt: 'A figure hanging by one foot from a wooden T-frame, calm and serene expression, halo around head, hands behind back, symbolic of voluntary suspension and new perspective',
    localized: {
      ko: {
        name: '매달린 사람',
        keywords: ['정지', '관점 전환', '자발적 유예'],
        baseMeaning: '지금은 추진력이 없습니다. 그리고 그것은 고쳐야 할 문제가 아니라, 함께 일해야 할 신호일 수 있습니다.',
        caution: '상황이 멈춤을 요청하는데 계속 밀어붙이면 문제가 해결되기보다 복잡해집니다.',
        interpretations: {
          present: '막혀 있거나 아무것도 움직이지 않는 것처럼 느껴질 수 있습니다. 저항하기 전에, 이 멈춤이 아직 보지 못한 무언가를 품고 있는지 살펴보세요. 다른 각도에서 보면 새로운 것이 보일 수 있습니다.',
          advice: '지금까지 시도해온 방식으로 해결하려 하지 마세요. 자발적으로 한 발 물러나는 것이 노력 이상의 재정렬을 줄 수 있습니다. 익숙한 방식을 내려놓는 용기가 이 시기에는 필요합니다.',
          future: '유예의 시간은 지나갈 것입니다. 그 시간 동안 알아채는 것이 중요합니다. 앞의 방향이 멈추기 전과 다르게 보일 수 있고, 그것이 더 정확한 방향일 가능성이 높습니다.',
        },
      },
      en: {
        name: 'The Hanged Man',
        keywords: ['Suspension', 'Reframing', 'Voluntary pause'],
        baseMeaning: 'Momentum is not available right now — and that is not a problem to fix, but possibly a signal to work with.',
        caution: 'Forcing movement when the situation is calling for pause tends to create complications rather than progress.',
        interpretations: {
          present: 'You may feel stuck or like nothing is moving. Before resisting that, consider whether this pause contains something useful — a different angle or a piece of information you have not yet seen.',
          advice: 'Stop trying to resolve this the same way you have been trying. A voluntary step back — even briefly — can reorient you in a way that effort alone cannot. The courage to set down the familiar approach is what this period needs.',
          future: 'The period of suspension will pass, but what you notice during it matters. The direction forward may look different from this vantage point than it did before the pause — and that different view may be the more accurate one.',
        },
      },
      ja: {
        name: '吊るされた男',
        keywords: ['停止', '視点の転換', '自発的な猶予'],
        baseMeaning: '今は推進力がありません。そしてそれは修正すべき問題ではなく、共に取り組むべきシグナルかもしれません。',
        caution: '状況が停止を求めているのに押し続けると、問題が解決されるのではなく複雑になります。',
        interpretations: {
          present: '詰まっているか、何も動いていないように感じるかもしれません。抵抗する前に、この停止がまだ見ていない何かを含んでいるかどうかを見てみましょう。別の角度から見ると新しいものが見えるかもしれません。',
          advice: 'これまで試してきた方法で解決しようとするのをやめてください。自発的に一歩引くことが、努力以上の再調整をもたらすことがあります。',
          future: '猶予の時間は過ぎていきます。その間に気づくことが重要です。前の方向が停止前とは違って見えるかもしれません。そしてその違う見方の方がより正確な可能性が高いです。',
        },
      },
      es: {
        name: 'El Colgado',
        keywords: ['Suspensión', 'Reencuadre', 'Pausa voluntaria'],
        baseMeaning: 'El impulso no está disponible ahora — y eso no es un problema a solucionar, sino posiblemente una señal con la que trabajar.',
        caution: 'Forzar el movimiento cuando la situación está llamando a la pausa tiende a crear complicaciones en lugar de progreso.',
        interpretations: {
          present: 'Puede que te sientas atascado o como si nada se moviera. Antes de resistir eso, considera si esta pausa contiene algo útil — un ángulo diferente o una pieza de información que aún no has visto.',
          advice: 'Deja de intentar resolver esto de la misma manera que lo has estado intentando. Un paso atrás voluntario — aunque sea breve — puede reorientarte de una manera que el esfuerzo solo no puede.',
          future: 'El período de suspensión pasará, pero lo que notes durante él importa. La dirección hacia adelante puede verse diferente desde este punto de vista de lo que se veía antes de la pausa.',
        },
      },
    },
  },
  {
    id: 'death',
    number: 13,
    imagePrompt: 'A skeletal figure in black armor on a white horse, white rose in hand, rising sun on horizon, fallen figures, black flag with white flower, symbolic of transformation',
    localized: {
      ko: {
        name: '죽음',
        keywords: ['종결', '전환', '놓아주기'],
        baseMeaning: '무언가가 완결되고 있습니다. 챕터, 관계의 방식, 또는 자신의 어떤 모습이 마무리되는 시기입니다. 이미 지나간 것을 붙들면 전환 자체보다 더 많은 에너지가 소모됩니다.',
        caution: '진짜로 끝난 것을 인정하지 않으면 이미 시작된 과정이 지연될 수 있습니다.',
        interpretations: {
          present: '실제 변화의 경계에 서 있습니다. 드라마틱하지 않더라도 실질적인 무언가가 변하거나 닫히고 있습니다. 이것을 재앙으로 볼 것인지, 전환의 과정으로 볼 것인지는 관점의 차이입니다.',
          advice: '무엇이 끝나고 있는지 명확하게 인정하세요. 진짜로 상실한 것에 슬퍼하는 것은 적절합니다. 그 슬픔을 이용해 다음을 피하는 것은 다른 문제입니다. 끝은 언제나 새로운 시작 전의 공간입니다.',
          future: '지금 놓아주는 것이 기존 구조가 있는 동안에는 존재할 수 없었던 무언가를 위한 자리를 만들 것입니다. 전환 자체가 과정이며, 종결은 부재가 아니라 변형입니다.',
        },
      },
      en: {
        name: 'Death',
        keywords: ['Ending', 'Transition', 'Release'],
        baseMeaning: 'Something is completing — a chapter, a dynamic, a version of yourself — and holding onto what is already gone takes more energy than the transition itself.',
        caution: 'Refusing to acknowledge what has genuinely ended can delay a process that has already started.',
        interpretations: {
          present: 'You are at the edge of a real change. Not necessarily dramatic, but substantive — something that was part of your life structure is shifting or closing. Whether you see this as loss or transformation depends on the frame you bring.',
          advice: 'Acknowledge what is ending clearly. Grieving something real is appropriate; using that to avoid what comes next is not. An ending always creates the space that something new requires.',
          future: 'What releases now will make room for something that could not exist while the old structure was in place. The transition is the process — ending does not mean absence, it means transformation.',
        },
      },
      ja: {
        name: '死神',
        keywords: ['終わり', '転換', '手放し'],
        baseMeaning: '何かが完結しています。章、関係の在り方、または自分のある側面が締めくくられる時期です。すでに過ぎたものを握り締めると、転換自体より多くのエネルギーが消費されます。',
        caution: '本当に終わったことを認めないと、すでに始まっているプロセスが遅れる可能性があります。',
        interpretations: {
          present: '本物の変化の境界に立っています。劇的でなくても、実質的な何かが変わったり閉じたりしています。これを悲劇として見るか、転換の過程として見るかは視点の違いです。',
          advice: '何が終わっているかを明確に認めてください。本当に失ったものを悼むことは適切です。その悲しみを使って次を避けることは別の問題です。終わりはいつも新しい始まりの前の空間です。',
          future: '今手放すものが、既存の構造がある間には存在できなかった何かのための場所を作るでしょう。転換自体がプロセスであり、終わりは不在ではなく変容です。',
        },
      },
      es: {
        name: 'La Muerte',
        keywords: ['Final', 'Transición', 'Soltar'],
        baseMeaning: 'Algo se está completando — un capítulo, una dinámica, una versión de ti mismo — y aferrarse a lo que ya se fue consume más energía que la transición misma.',
        caution: 'Negarse a reconocer lo que genuinamente ha terminado puede retrasar un proceso que ya ha comenzado.',
        interpretations: {
          present: 'Estás al borde de un cambio real. No necesariamente dramático, pero sustancial — algo que era parte de la estructura de tu vida está cambiando o cerrándose.',
          advice: 'Reconoce claramente lo que está terminando. Llorar algo real es apropiado; usar eso para evitar lo que viene después no lo es. Un final siempre crea el espacio que algo nuevo requiere.',
          future: 'Lo que se libera ahora hará espacio para algo que no podía existir mientras la estructura antigua estaba en su lugar. La transición es el proceso — el final no significa ausencia, significa transformación.',
        },
      },
    },
  },
  {
    id: 'temperance',
    number: 14,
    imagePrompt: 'An angelic figure standing with one foot in water and one on land, pouring liquid between two golden cups, sun rising above mountains, symbolic of balance and flow',
    localized: {
      ko: {
        name: '절제',
        keywords: ['통합', '균형', '신중한 접근'],
        baseMeaning: '다르게 작동하는 것들을 하나로 통합하는 것이 필요합니다. 한 방향을 강요하는 것이 아니라 기능하는 중간을 찾는 것입니다.',
        caution: '실제 문제를 피하는 타협은 균형처럼 보여도 오래 유지되지 않습니다.',
        interpretations: {
          present: '한쪽을 선택하는 것보다 인내, 신중한 행동, 다양한 입력을 통합하는 것이 보상받는 시기입니다. 서두르지 않고 다른 요소들을 조율하는 과정 자체가 지금의 과제입니다.',
          advice: '결과를 서두르지 마세요. 긴장을 없애려 하지 말고 그것과 함께 움직이세요. 찾고 있는 균형은 존재하지만 섬세한 조정이 필요합니다. 양쪽을 동시에 존중하는 태도가 해법입니다.',
          future: '점진적이고 꾸준한 접근이 빠른 해결보다 더 지속 가능한 결과를 낼 가능성이 높습니다. 조율하던 조각들이 맞춰지는 과정에 있습니다.',
        },
      },
      en: {
        name: 'Temperance',
        keywords: ['Integration', 'Balance', 'Measured approach'],
        baseMeaning: 'The situation requires combining things that seem to work differently — not forcing a single direction, but finding a functional middle.',
        caution: 'Compromise that avoids the real issue does not hold, even when it looks like balance.',
        interpretations: {
          present: 'You are in a period that rewards patience, measured action, and integrating different inputs rather than choosing sides. The process of balancing different elements without rushing is itself the current work.',
          advice: 'Do not rush the outcome. Work with the tension rather than trying to eliminate it. The balance you are looking for exists but takes careful adjustment to find. Respecting both sides simultaneously is the solution.',
          future: 'A gradual and steady approach is more likely to produce a durable result than a quick resolution. The pieces you have been working with are closer to fitting together than it may seem right now.',
        },
      },
      ja: {
        name: '節制',
        keywords: ['統合', 'バランス', '慎重なアプローチ'],
        baseMeaning: '異なる動き方をするものを一つに統合することが必要です。一方向を強要するのではなく、機能する中間を見つけることです。',
        caution: '実際の問題を避けた妥協は、バランスのように見えても長続きしません。',
        interpretations: {
          present: '一方を選ぶより、忍耐、慎重な行動、様々な入力を統合することが報われる時期です。急がずに異なる要素を調整するプロセス自体が今の課題です。',
          advice: '結果を急がないでください。緊張をなくそうとせず、それと共に動いてください。探しているバランスは存在しますが、繊細な調整が必要です。',
          future: '漸進的で着実なアプローチが、素早い解決より持続可能な結果をもたらす可能性が高いです。調整していたピースが合わさる過程にあります。',
        },
      },
      es: {
        name: 'La Templanza',
        keywords: ['Integración', 'Equilibrio', 'Enfoque medido'],
        baseMeaning: 'La situación requiere combinar cosas que parecen funcionar de manera diferente — no forzar una sola dirección, sino encontrar un punto medio funcional.',
        caution: 'El compromiso que evita el problema real no se sostiene, aunque parezca equilibrio.',
        interpretations: {
          present: 'Estás en un período que recompensa la paciencia, la acción medida y la integración de diferentes aportes en lugar de elegir bandos. El proceso de equilibrar diferentes elementos sin prisa es en sí mismo el trabajo actual.',
          advice: 'No apresures el resultado. Trabaja con la tensión en lugar de intentar eliminarla. El equilibrio que buscas existe pero requiere un ajuste cuidadoso para encontrarlo.',
          future: 'Un enfoque gradual y constante es más probable que produzca un resultado duradero que una resolución rápida. Las piezas con las que has estado trabajando están más cerca de encajar de lo que puede parecer.',
        },
      },
    },
  },
  {
    id: 'devil',
    number: 15,
    imagePrompt: 'A horned figure on a pedestal with two chained figures below, inverted pentagram, bat wings, torch, dark background, symbolic of entanglement and unconscious patterns',
    localized: {
      ko: {
        name: '악마',
        keywords: ['얽매임', '패턴', '집착'],
        baseMeaning: '인정하는 것보다 더 강한 무언가에 잡혀 있습니다. 선택처럼 보이지만 사실 함정에 가까운 습관이나 역학, 믿음입니다.',
        caution: '언제든 떠날 수 있다고 스스로 설득하는 것은 실제로 그럴 수 있다는 것과 다릅니다.',
        interpretations: {
          present: '현재 상황에서 인식은 하지만 충분히 다루지 않은 반복적인 패턴이 있습니다. 그것이 가진 힘은 얼마나 가까이 들여다보느냐에 달려 있습니다. 불편한 진실이지만 마주할 때 힘이 약해집니다.',
          advice: '당신을 계속 끌어당기는 것을 명확히 이름 붙이세요. 실제로 무엇에 집착하고 있는지, 그리고 그 이유를 명확하게 파악하는 것만이 진짜 선택지를 만듭니다. 이름 붙이는 것이 첫 번째 자유입니다.',
          future: '패턴이 검토되지 않으면 다시 나타납니다. 솔직하게 다룬다면 가까운 미래가 상당히 열립니다. 인식과 선택 사이의 거리를 줄이는 것이 이 시기의 핵심입니다.',
        },
      },
      en: {
        name: 'The Devil',
        keywords: ['Entanglement', 'Pattern', 'Attachment'],
        baseMeaning: 'Something has more hold over you than you have acknowledged — a habit, dynamic, or belief that looks like a choice but functions more like a trap.',
        caution: 'Convincing yourself you could leave at any time is not the same as actually having the ability to leave.',
        interpretations: {
          present: 'There is a pattern in your current situation that repeats in ways you recognize but have not fully addressed. The grip it has depends on how closely you examine it. Uncomfortable as it is, looking directly at it reduces its power.',
          advice: 'Name the thing that keeps pulling you back. Clarity about what you are actually attached to — and why — is the only thing that creates real options. Naming it is the first form of freedom.',
          future: 'If the pattern is not examined, it will resurface. If it is addressed honestly, the near future opens up considerably. Closing the distance between awareness and choice is the essential work of this period.',
        },
      },
      ja: {
        name: '悪魔',
        keywords: ['縛り', 'パターン', '執着'],
        baseMeaning: '認めているより強い何かに捕われています。選択のように見えますが、実際は罠に近い習慣や力学、信念です。',
        caution: 'いつでも離れられると自分を説得することは、実際にそうできることとは異なります。',
        interpretations: {
          present: '現在の状況で認識はしているが十分に対処していない繰り返しのパターンがあります。それが持つ力は、どれだけ近くで見るかにかかっています。不快な真実ですが、向き合うと力が弱まります。',
          advice: 'あなたを引き続けるものをはっきり名付けてください。実際に何に執着しているか、そしてその理由を明確に把握することだけが本物の選択肢を作ります。名付けることが最初の自由です。',
          future: 'パターンが検討されないと、また現れます。率直に対処すれば、近い未来がかなり開きます。認識と選択の間の距離を縮めることがこの時期の核心です。',
        },
      },
      es: {
        name: 'El Diablo',
        keywords: ['Enredo', 'Patrón', 'Apego'],
        baseMeaning: 'Algo tiene más control sobre ti del que has reconocido — un hábito, dinámica o creencia que parece una elección pero funciona más como una trampa.',
        caution: 'Convencerte de que podrías irte en cualquier momento no es lo mismo que tener la capacidad real de hacerlo.',
        interpretations: {
          present: 'Hay un patrón en tu situación actual que se repite de maneras que reconoces pero no has abordado completamente. El poder que tiene depende de cuán de cerca lo examines.',
          advice: 'Nombra la cosa que sigue atrayéndote. La claridad sobre a qué estás realmente apegado — y por qué — es lo único que crea opciones reales. Nombrarlo es la primera forma de libertad.',
          future: 'Si el patrón no se examina, volverá a aparecer. Si se aborda honestamente, el futuro cercano se abre considerablemente.',
        },
      },
    },
  },
  {
    id: 'tower',
    number: 16,
    imagePrompt: 'A tall stone tower struck by lightning, crown blown off the top, two figures falling from the tower, storm clouds, symbolic of sudden disruption and revelation',
    localized: {
      ko: {
        name: '탑',
        keywords: ['붕괴', '격변', '드러남'],
        baseMeaning: '불안정한 기반 위에 세워진 것이 무너지고 있습니다. 어렵지만, 이 과정이 더 실제적인 무언가를 위한 길을 열 수 있습니다.',
        caution: '외부 원인만을 탓하면 자신의 행동이 이 구조에 어떻게 기여했는지를 검토하는 것을 피하게 됩니다.',
        interpretations: {
          present: '혼란 속에 있을 수 있습니다. 안정적으로 느껴지던 무언가가 갈라지고 있습니다. 막으려는 본능이 있겠지만, 상황이 요구하는 것이 그것인지 확인이 필요합니다. 모든 붕괴가 막아야 할 재앙은 아닙니다.',
          advice: '가장 중요한 것에 집중하고 지킬 수 없는 것은 내려놓으세요. 무너지는 모든 것을 다시 세워야 하는 건 아닙니다. 어떤 것은 내려간 채로 두는 것이 더 나은 기반을 위한 선택입니다.',
          future: '혼란이 가라앉으면 이전보다 더 명확하게 보일 것입니다. 무너진 구조에 가려져 있던 것이 드러날 것입니다. 강제된 단순화는 종종 숨겨진 진실을 보여줍니다.',
        },
      },
      en: {
        name: 'The Tower',
        keywords: ['Disruption', 'Collapse', 'Revelation'],
        baseMeaning: 'Something built on an unstable foundation is coming apart — and that process, though difficult, may clear the way for something more real.',
        caution: 'Blaming external forces entirely avoids examining what your own actions contributed to the structure that is breaking.',
        interpretations: {
          present: 'You may be in the middle of a disruption — something that felt stable is fracturing. The instinct is to stop it, but consider whether that is actually what the situation requires. Not every collapse is a disaster that must be prevented.',
          advice: 'Focus on what matters most and let go of what you cannot protect. Not everything that collapses needs to be rebuilt. Some of it is better left down — that space is what better ground requires.',
          future: 'Once the immediate disruption settles, the situation will be clearer than before. What was obscured by the structure that collapsed will become visible. Forced simplification often reveals what was hidden.',
        },
      },
      ja: {
        name: '塔',
        keywords: ['崩壊', '激変', '露わになること'],
        baseMeaning: '不安定な基盤の上に建てられたものが崩れています。困難ですが、このプロセスがより真実のある何かへの道を開く可能性があります。',
        caution: '外部の原因だけを責めると、自分の行動がこの構造にどう貢献したかを検討することを避けてしまいます。',
        interpretations: {
          present: '混乱の中にいるかもしれません。安定していると感じていた何かが崩れています。止めようとする本能がありますが、状況が要求するものがそれかどうかを確認する必要があります。',
          advice: '最も重要なことに集中し、守れないものは手放してください。崩れるすべてのものを再建する必要はありません。一部は崩れたままにしておく方が、より良い基盤のための選択です。',
          future: '混乱が収まると、以前より明確に見えるようになります。崩れた構造に隠れていたものが現れます。強制された単純化はしばしば隠された真実を見せます。',
        },
      },
      es: {
        name: 'La Torre',
        keywords: ['Disrupción', 'Derrumbe', 'Revelación'],
        baseMeaning: 'Algo construido sobre una base inestable se está desmoronando — y ese proceso, aunque difícil, puede despejar el camino para algo más real.',
        caution: 'Culpar completamente a las fuerzas externas evita examinar lo que tus propias acciones contribuyeron a la estructura que se está rompiendo.',
        interpretations: {
          present: 'Puede que estés en medio de una disrupción — algo que se sentía estable se está fracturando. El instinto es detenerlo, pero considera si eso es realmente lo que la situación requiere.',
          advice: 'Concéntrate en lo que más importa y suelta lo que no puedes proteger. No todo lo que colapsa necesita ser reconstruido. Algo se deja mejor abajo — ese espacio es lo que requiere un terreno mejor.',
          future: 'Una vez que la disrupción inmediata se asiente, la situación será más clara que antes. Lo que estaba oscurecido por la estructura que colapsó se volverá visible.',
        },
      },
    },
  },
  {
    id: 'star',
    number: 17,
    imagePrompt: 'A figure kneeling by a pool of water under a starry sky, pouring water from two urns, large central star and smaller stars, symbolic of hope and gentle restoration',
    localized: {
      ko: {
        name: '별',
        keywords: ['회복', '희망', '방향성'],
        baseMeaning: '어려움 이후, 자신이 정말 원하는 것과 조용히 다시 연결되는 새로운 방향 감각이 생겨나고 있습니다.',
        caution: '노력 없이 수동적으로 희망을 품는 것만으로는 도착하기 어렵습니다.',
        interpretations: {
          present: '회복의 시기가 지금 가능합니다. 앞으로의 방향에 대한 조용한 감각이 돌아오는 것을 느낄 수 있습니다. 더 가벼운 시각이 가능한 시기입니다. 이것을 낙관주의가 아닌 재정향이라고 보세요.',
          advice: '찾아오는 명확함을 받아들이세요. 서둘러 행동으로 돌아가지 말되, 희망이 완전히 수동적으로 남지 않도록 하세요. 그것과 일치하는 작은 다음 단계를 찾는 것이 지금의 과제입니다.',
          future: '겪어온 어려운 시간이 더 진실된 무언가를 위한 공간을 만들었습니다. 중요한 것을 향해 방향을 유지한다면, 가까운 미래가 그것을 반영할 것입니다. 빛은 이미 돌아오고 있습니다.',
        },
      },
      en: {
        name: 'The Star',
        keywords: ['Recovery', 'Hope', 'Direction'],
        baseMeaning: 'After difficulty, there is a renewed sense of orientation — a quiet reconnection with what you actually care about.',
        caution: 'Passive hope without any movement tends to drift rather than arrive.',
        interpretations: {
          present: 'A period of restoration is available now. You may feel a quiet sense of direction returning — a lighter way of looking at what is ahead. Think of this not as optimism, but as reorientation.',
          advice: 'Let yourself receive the clarity that is coming. Do not rush back into action, but do not let hope remain entirely passive. Finding the small next step that aligns with it is the current task.',
          future: 'The difficult period you have been through has created space for something more genuine. If you stay oriented toward what matters to you, the near future will reflect that. The light is already returning.',
        },
      },
      ja: {
        name: '星',
        keywords: ['回復', '希望', '方向性'],
        baseMeaning: '困難の後、自分が本当に望むものと静かに再びつながる新たな方向感覚が生まれています。',
        caution: '努力なく受動的に希望を持つだけでは、到達するのは難しいです。',
        interpretations: {
          present: '回復の時期が今可能です。前への静かな方向感覚が戻ってくるのを感じることができます。これを楽観主義ではなく再定向として見てください。',
          advice: 'やってくる明確さを受け入れましょう。急いで行動に戻らないでください。しかし希望が完全に受動的のままにならないようにしてください。それと一致する小さな次のステップを見つけることが今の課題です。',
          future: '経験してきた困難な時間が、より真実のある何かのための空間を作りました。大切なことに向かって方向を維持すれば、近い未来がそれを反映するでしょう。',
        },
      },
      es: {
        name: 'La Estrella',
        keywords: ['Recuperación', 'Esperanza', 'Dirección'],
        baseMeaning: 'Después de la dificultad, hay una renovada sensación de orientación — una reconexión tranquila con lo que realmente te importa.',
        caution: 'La esperanza pasiva sin ningún movimiento tiende a derivar en lugar de llegar.',
        interpretations: {
          present: 'Un período de restauración está disponible ahora. Puede que sientas un sentido tranquilo de dirección que regresa. Piensa en esto no como optimismo, sino como reorientación.',
          advice: 'Déjate recibir la claridad que está llegando. No te apresures a volver a la acción, pero no dejes que la esperanza permanezca completamente pasiva. Encontrar el pequeño próximo paso que se alinea con ella es la tarea actual.',
          future: 'El período difícil que has atravesado ha creado espacio para algo más genuino. Si te mantienes orientado hacia lo que te importa, el futuro cercano lo reflejará.',
        },
      },
    },
  },
  {
    id: 'moon',
    number: 18,
    imagePrompt: 'A large moon with a face in a night sky, two towers in the distance, a dog and wolf howling, a crayfish emerging from a pool, a path leading into the distance',
    localized: {
      ko: {
        name: '달',
        keywords: ['불확실성', '착각', '무의식'],
        baseMeaning: '상황이 완전히 드러나지 않았습니다. 상황 자체 때문에도, 당신이 그것을 인식하는 방식 때문에도 전체 그림이 아직 없습니다.',
        caution: '혼란스러운 상태에서 확고한 결정을 내리면 아직 전체 그림이 없는 상태에서 결정하는 것이 됩니다.',
        interpretations: {
          present: '현재 환경이 불명확하거나 신뢰하기 어렵습니다. 혼재된 신호를 받고 있거나 자신의 변화하는 인식과 씨름하고 있을 수 있습니다. 지금 보이는 것이 전부가 아닐 수 있습니다.',
          advice: '아직 결론을 확정하지 마세요. 직관이 무언가를 감지하고 있지만, 아직 완전히 형성되지 않았을 수 있습니다. 실제로 무엇이 있는지 볼 수 있을 만큼 불확실성과 함께 머무르세요.',
          future: '안개는 그 자체의 시간에 걷힐 것입니다. 혼란스러운 시기를 어떻게 버티느냐, 반응적이지 않게 안정되게 있느냐가 그것에서 어떻게 나오느냐를 결정합니다. 조급함은 오히려 안개를 짙게 합니다.',
        },
      },
      en: {
        name: 'The Moon',
        keywords: ['Uncertainty', 'Illusion', 'The unconscious'],
        baseMeaning: 'Things are not fully what they appear — either in the situation itself, or in how you are perceiving it.',
        caution: 'Making firm decisions in a state of confusion often means deciding before you have the real picture.',
        interpretations: {
          present: 'The current environment feels unclear or unreliable. You may be receiving mixed signals or dealing with your own shifting perceptions of what is happening. What is visible right now may not be the whole story.',
          advice: 'Do not commit to conclusions yet. Your gut is registering something, but it may not be fully formed. Stay with the uncertainty long enough to see what is actually there. Patience is the most useful tool here.',
          future: 'The fog will clear in its own time. How you hold yourself during the confusing stretch — steady rather than reactive — will determine how you emerge from it. Urgency thickens the fog.',
        },
      },
      ja: {
        name: '月',
        keywords: ['不確実性', '幻想', '無意識'],
        baseMeaning: '状況は完全には現れていません。状況自体のためにも、あなたがそれを認識する方法のためにも、全体像はまだありません。',
        caution: '混乱した状態で確固とした決断を下すと、まだ全体像がない状態で決定することになります。',
        interpretations: {
          present: '現在の環境が不明確か、信頼しにくいです。混在したシグナルを受けているか、自分の変化する認識と格闘しているかもしれません。今見えているものがすべてではないかもしれません。',
          advice: 'まだ結論を確定しないでください。直感が何かを感知していますが、まだ完全には形成されていないかもしれません。実際に何があるかを見られるくらい不確実性と共にいてください。',
          future: '霧はそれ自体の時間に晴れるでしょう。混乱した時期をどう耐えるか、反応的でなく安定していられるかが、そこからどう出るかを決めます。',
        },
      },
      es: {
        name: 'La Luna',
        keywords: ['Incertidumbre', 'Ilusión', 'El inconsciente'],
        baseMeaning: 'Las cosas no son completamente lo que parecen — ya sea en la situación misma, o en cómo la estás percibiendo.',
        caution: 'Tomar decisiones firmes en un estado de confusión a menudo significa decidir antes de tener el panorama real.',
        interpretations: {
          present: 'El entorno actual se siente poco claro o poco confiable. Puede que estés recibiendo señales mixtas o lidiando con tus propias percepciones cambiantes de lo que está sucediendo.',
          advice: 'No te comprometas con conclusiones todavía. Tu instinto está registrando algo, pero puede que no esté completamente formado. Permanece con la incertidumbre el tiempo suficiente para ver lo que realmente hay.',
          future: 'La niebla se despejará a su propio tiempo. Cómo te mantienes durante el tramo confuso — estable en lugar de reactivo — determinará cómo saldrás de él.',
        },
      },
    },
  },
  {
    id: 'sun',
    number: 19,
    imagePrompt: 'A bright sun with a face in a clear sky, a child on a white horse in front of a garden wall with sunflowers, symbolic of vitality and joyful clarity',
    localized: {
      ko: {
        name: '태양',
        keywords: ['활력', '명확함', '자신감'],
        baseMeaning: '진짜 에너지와 명확함이 지금 가능합니다. 정면에 있는 것과 직접 맞닿으면 상황이 상대적으로 수월하게 움직이는 시기입니다.',
        caution: '밝은 순간의 과신은 여전히 주의가 필요한 것들을 건너뛰게 할 수 있습니다.',
        interpretations: {
          present: '최근보다 더 많은 것이 가능합니다. 명확함, 에너지, 추진력. 참여하면 결과가 나오는 시기입니다. 이 에너지를 과소평가하지 말되, 방향 없이 낭비하지도 마세요.',
          advice: '이 에너지를 의도적으로 사용하세요. 수동적으로 있거나 주의를 너무 많은 것에 분산시켜서 긍정적인 국면을 낭비하지 마세요. 지금이 움직일 때입니다.',
          future: '전진에 유리한 조건입니다. 지금 시작하거나 계속하는 것은 더 발전할 실제 잠재력이 있습니다. 타이밍에 대해 너무 많이 고민하지 마세요. 조건이 이미 갖춰져 있습니다.',
        },
      },
      en: {
        name: 'The Sun',
        keywords: ['Vitality', 'Clarity', 'Confidence'],
        baseMeaning: 'There is genuine energy and clarity available now — a period where things can move with relative ease if you engage directly with what is in front of you.',
        caution: 'Overconfidence in a bright moment can mean skipping over things that still require care.',
        interpretations: {
          present: 'More is available to you than has been recently — clarity, energy, and momentum. Engagement produces results right now. Do not underestimate this energy, but do not scatter it without direction either.',
          advice: 'Use this energy deliberately. Do not let a positive phase go to waste by staying passive or by spreading your attention across too many things at once. This is the time to move.',
          future: 'The conditions are favorable for progress. What you start or continue now has real potential to develop further. Do not overthink the timing — the conditions are already in place.',
        },
      },
      ja: {
        name: '太陽',
        keywords: ['活力', '明確さ', '自信'],
        baseMeaning: '本物のエネルギーと明確さが今利用可能です。正面にあるものと直接向き合えば、状況が比較的スムーズに動く時期です。',
        caution: '明るい瞬間の過信は、まだ注意が必要なものを飛ばしてしまうことがあります。',
        interpretations: {
          present: '最近より多くのことが可能です。明確さ、エネルギー、推進力。関与すれば結果が出る時期です。このエネルギーを過小評価しないでください。',
          advice: 'このエネルギーを意図的に使ってください。受動的でいたり、注意を多くのことに分散させたりして、ポジティブな局面を無駄にしないでください。今が動く時です。',
          future: '前進に有利な条件です。今始めたり続けたりすることは、さらに発展する実際の可能性があります。タイミングについて考えすぎないでください。条件はすでに整っています。',
        },
      },
      es: {
        name: 'El Sol',
        keywords: ['Vitalidad', 'Claridad', 'Confianza'],
        baseMeaning: 'Hay energía genuina y claridad disponible ahora — un período donde las cosas pueden moverse con relativa facilidad si te involucras directamente con lo que tienes enfrente.',
        caution: 'La excesiva confianza en un momento brillante puede significar saltarse cosas que aún requieren cuidado.',
        interpretations: {
          present: 'Hay más disponible para ti de lo que ha habido recientemente — claridad, energía e impulso. La participación produce resultados ahora mismo.',
          advice: 'Usa esta energía de manera deliberada. No dejes que una fase positiva se desperdicie quedándote pasivo o esparciendo tu atención en demasiadas cosas a la vez. Este es el momento de moverse.',
          future: 'Las condiciones son favorables para el progreso. Lo que empieces o continúes ahora tiene potencial real para desarrollarse más. No pienses demasiado en el momento — las condiciones ya están en su lugar.',
        },
      },
    },
  },
  {
    id: 'judgement',
    number: 20,
    imagePrompt: 'An angel blowing a trumpet from the clouds, figures rising from open coffins below, symbolic of reckoning, evaluation, and being called to a higher purpose',
    localized: {
      ko: {
        name: '심판',
        keywords: ['총결산', '평가', '소명'],
        baseMeaning: '중요한 평가의 순간이 다가왔습니다. 무언가가 결론에 이르고 있고, 그것에 대한 평가가 다음 방향을 형성할 것입니다.',
        caution: '상황이 정당화하는 것보다 더 가혹하게 자신이나 타인을 판단하는 것은 솔직함과 다릅니다.',
        interpretations: {
          present: '중요한 검토 중에 있을 수 있습니다. 결정, 관계, 삶의 한 시기에 대한 평가. 핵심은 그것을 명확하게 보고 반응하는 것이지 회피하는 것이 아닙니다. 이 시기가 무엇을 요청하는지 귀 기울여 보세요.',
          advice: '정직하게 점검해 보세요. 이 시기가 결국 어떤 의미였나요? 앞으로 나아가기 전에 아직 다뤄야 할 것은 무엇인가요? 그 답이 불편해도 그것이 가장 유용한 정보입니다.',
          future: '지금 책임지는 것이 다음 단계로 무엇을 가져가느냐를 결정합니다. 정직하게 평가하려는 의지가 이 평가의 시간을 진정한 전진으로 바꿉니다.',
        },
      },
      en: {
        name: 'Judgement',
        keywords: ['Reckoning', 'Evaluation', 'Calling'],
        baseMeaning: 'A significant moment of assessment is at hand — something is coming to a conclusion, and the evaluation of it will shape the next direction.',
        caution: 'Judging yourself or others more harshly than the situation warrants is not the same as being honest.',
        interpretations: {
          present: 'You may be in the middle of an important review — of a decision, a relationship, a phase of your life. The call is to see it clearly and respond, not to avoid it. Pay attention to what this period is asking of you.',
          advice: 'Take stock honestly. What has this period added up to? What still needs to be addressed before you can move forward? The answers may be uncomfortable, but they are the most useful information available.',
          future: 'What you account for now determines what you carry into the next phase. The willingness to evaluate honestly is what transforms this period of assessment into genuine forward movement.',
        },
      },
      ja: {
        name: '審判',
        keywords: ['総決算', '評価', '召命'],
        baseMeaning: '重要な評価の瞬間が来ました。何かが結論に達しており、それに対する評価が次の方向を形作るでしょう。',
        caution: '状況が正当化する以上に自分や他者を厳しく判断することは、正直さとは異なります。',
        interpretations: {
          present: '重要な検討の中にいるかもしれません。決断、関係、人生の一時期についての評価。核心は、それを明確に見て反応することであり、回避することではありません。',
          advice: '正直に点検してみましょう。この時期は結局どんな意味がありましたか？前に進む前に、まだ対処すべきことは何ですか？その答えが不快でも、それが最も有用な情報です。',
          future: '今責任を取ることが、次のステップに何を持ち込むかを決めます。正直に評価しようとする意志が、この評価の時間を真の前進に変えます。',
        },
      },
      es: {
        name: 'El Juicio',
        keywords: ['Ajuste de cuentas', 'Evaluación', 'Llamado'],
        baseMeaning: 'Un momento significativo de evaluación está a mano — algo está llegando a una conclusión, y la evaluación de ello dará forma a la próxima dirección.',
        caution: 'Juzgarte a ti mismo o a otros más duramente de lo que la situación justifica no es lo mismo que ser honesto.',
        interpretations: {
          present: 'Puede que estés en medio de una revisión importante — de una decisión, una relación, una fase de tu vida. El llamado es verlo claramente y responder, no evitarlo.',
          advice: 'Haz un balance honesto. ¿A qué ha sumado este período? ¿Qué aún necesita abordarse antes de que puedas avanzar? Las respuestas pueden ser incómodas, pero son la información más útil disponible.',
          future: 'Lo que rindas cuentas ahora determina lo que llevas a la siguiente fase. La voluntad de evaluar honestamente es lo que transforma este período de evaluación en un avance genuino.',
        },
      },
    },
  },
  {
    id: 'world',
    number: 21,
    imagePrompt: 'A dancing figure within a laurel wreath, four corner symbols (lion, bull, eagle, angel), symbolic of completion, wholeness, and the end of a great cycle',
    localized: {
      ko: {
        name: '세계',
        keywords: ['완성', '온전함', '성취'],
        baseMeaning: '의미 있는 순환이 완결되고 있습니다. 단순한 종착점이 아니라 실제 문턱에 도달한 것입니다. 이것은 작지 않은 일입니다.',
        caution: '아직 끝나지 않은 것을 다 됐다고 선언하면 이미 쌓아온 것을 무너뜨릴 수 있습니다.',
        interpretations: {
          present: '의미 있는 무언가가 완성되고 있거나 거의 완성됩니다. 여기서의 에너지는 진짜 도달의 것입니다. 완벽함이 아니라 성취감. 이것을 인정하는 것이 다음을 위한 출발점입니다.',
          advice: '이뤄낸 것을 인정하세요. 현재 것이 마무리되기 전에 다음으로 바로 달려가는 것은 중요한 단계를 놓치는 것입니다. 지금 이 순간에 온전히 머무르는 것이 다음 챕터를 준비하는 방법입니다.',
          future: '새로운 순환이 시작되고 있습니다. 완성한 것이 그것을 실질적으로 준비시켜 주었습니다. 기반이 단단합니다. 이제 다음 챕터가 그 위에 세워질 수 있습니다.',
        },
      },
      en: {
        name: 'The World',
        keywords: ['Completion', 'Wholeness', 'Achievement'],
        baseMeaning: 'A significant cycle is completing — you have reached an actual threshold, not just an endpoint. This is not a small thing.',
        caution: 'Declaring something finished before the work is actually done will undermine what you have built.',
        interpretations: {
          present: 'You are at or near the completion of something meaningful. The energy here is one of genuine arrival — not perfection, but accomplishment. Recognizing this is the starting point for what comes next.',
          advice: 'Let yourself recognize what has been achieved. Rushing immediately into the next thing before honoring the current one misses an important step. Remaining fully present in this moment is itself how you prepare for the next chapter.',
          future: 'A new cycle is beginning. What you have completed has genuinely prepared you for it. The foundation is solid — now the next chapter can build on it.',
        },
      },
      ja: {
        name: '世界',
        keywords: ['完成', '全体性', '達成'],
        baseMeaning: '意味のある循環が完結しています。単なる終着点ではなく、実際の閾値に到達しました。これは小さなことではありません。',
        caution: 'まだ終わっていないことを完了と宣言すると、すでに積み上げてきたものを崩すことになりかねません。',
        interpretations: {
          present: '意味のある何かが完成しているか、ほぼ完成しています。ここでのエネルギーは本物の到達のものです。完璧さではなく達成感。これを認めることが次への出発点です。',
          advice: '成し遂げたことを認めてください。現在のことが終わる前に次へと急いでしまうことは、重要なステップを見逃すことです。今この瞬間に完全にいることが、次の章を準備する方法です。',
          future: '新しい循環が始まっています。完成したことがそれを実質的に準備してくれました。基盤は固いです。これで次の章がその上に築かれることができます。',
        },
      },
      es: {
        name: 'El Mundo',
        keywords: ['Completud', 'Plenitud', 'Logro'],
        baseMeaning: 'Un ciclo significativo se está completando — has llegado a un umbral real, no solo a un punto final. Esto no es poca cosa.',
        caution: 'Declarar algo terminado antes de que el trabajo esté realmente hecho socavará lo que has construido.',
        interpretations: {
          present: 'Estás en o cerca de la finalización de algo significativo. La energía aquí es de llegada genuina — no perfección, sino logro. Reconocer esto es el punto de partida para lo que viene.',
          advice: 'Déjate reconocer lo que se ha logrado. Precipitarse inmediatamente a lo siguiente antes de honrar lo actual omite un paso importante.',
          future: 'Un nuevo ciclo está comenzando. Lo que has completado te ha preparado genuinamente para él. La base es sólida — ahora el siguiente capítulo puede construirse sobre ella.',
        },
      },
    },
  },
];
