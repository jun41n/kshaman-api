type FaceReadingCopy = {
  home: {
    faceEyebrow: string;
    pastEyebrow: string;
    faceTitleFirst: string;
    faceTitleAccent: string;
      pastTitleFirst: string;
      pastTitleAccent: string;
    faceDescription: string;
    pastDescription: string;
    faceCta: string;
    pastCta: string;
    photoNote: string;
    chartCaption: string;
    chartFooter: string;
    features: Array<{ title: string; description: string }>;
  };
  upload: {
    faceHeading: string;
    pastHeading: string;
    faceSubheading: string;
    pastSubheading: string;
    dropzone: string;
    gallery: string;
    camera: string;
    change: string;
    faceStart: string;
    pastStart: string;
    chooseFirst: string;
    tips: string[];
    privacy: string;
    imageOnly: string;
    maxSize: string;
    analysisError: string;
    loadingTitle: string;
    steps: string[];
  };
};

const COPY: Record<string, FaceReadingCopy> = {
  ko: {
    home: {
      faceEyebrow: "AI FACE READING · 관상첩", pastEyebrow: "AI 전생 캐릭터 테스트",
      faceTitleFirst: "내가 왕이 될", faceTitleAccent: "상인가~", pastTitleFirst: "난 왕이었을까,", pastTitleAccent: "무사였을까?",
      faceDescription: "사진 한 장으로 내 얼굴에서 느껴지는 분위기를 가볍게 알아봐요.",
      pastDescription: "관상으로 알아보는 나의 전생은?", faceCta: "관상첩 펼쳐보기", pastCta: "내 전생 확인하기",
      photoNote: "사진은 분석 요청에 사용됩니다\n오락·문화 참고용", chartCaption: "얼굴의 인상을 살피는 시간", chartFooter: "전통 기록 × AI 해석",
      features: [{ title: "인상 유형", description: "얼굴에서 느껴지는 첫 분위기" }, { title: "관계의 느낌", description: "사람 사이에서 보이는 매력" }, { title: "옛 기록", description: "전통 관상 언어를 쉽게 풀어보기" }, { title: "표정의 흐름", description: "사진 속 표정과 시선의 인상" }],
    },
    upload: {
      faceHeading: "사진 업로드", pastHeading: "전생 캐릭터 사진", faceSubheading: "얼굴이 잘 보이는 정면 사진을 올려주세요", pastSubheading: "전생 캐릭터를 찾을 얼굴 정면 사진을 올려주세요",
      dropzone: "사진을 드래그하거나 탭하세요", gallery: "갤러리에서 선택", camera: "사진 촬영", change: "다시 선택", faceStart: "AI 관상 분석 시작", pastStart: "내 전생 직업 확인하기", chooseFirst: "사진을 먼저 선택해주세요",
      tips: ["정면을 바라보는 사진", "밝은 조명 아래 찍은 사진", "선글라스·마스크 없는 사진"],
      privacy: "사진은 요청한 AI 분석 처리에만 사용됩니다. 결과는 전통문화 기반의 오락·참고용이며 실제 성격·건강·재산·운명 또는 유전 정보를 판정하지 않습니다.",
      imageOnly: "이미지 파일만 업로드할 수 있습니다.", maxSize: "파일 크기는 10MB 이하여야 합니다.", analysisError: "분석 중 오류가 발생했습니다.", loadingTitle: "AI 인상 해설 생성 중",
      steps: ["AI 관상 알고리즘 초기화 중", "얼굴 구조를 살펴보는 중", "생활 분위기 키워드를 정리하는 중", "관계 인상 키워드를 찾는 중", "옛 기록과 비교하는 중", "성향을 정리하는 중", "미래 이미지 방향을 살펴보는 중", "이미지 콘셉트를 준비하는 중", "오락용 해설을 마무리하는 중"],
    },
  },
  en: {
    home: {
      faceEyebrow: "AI FACE READING", pastEyebrow: "AI PAST-LIFE CHARACTER TEST", faceTitleFirst: "What kind of vibe", faceTitleAccent: "does my face have?", pastTitleFirst: "Was I a king,", pastTitleAccent: "or a warrior?", faceDescription: "Discover the feeling your face gives in one photo.", pastDescription: "Who might I have been in a past life?", faceCta: "Open face reading", pastCta: "See my past life", photoNote: "Your photo is used for this analysis\nFor cultural entertainment", chartCaption: "A moment to explore facial impressions", chartFooter: "Traditional notes × AI interpretation", features: [{ title: "First impression", description: "The feeling your face gives" }, { title: "Connection", description: "Your social impression" }, { title: "Traditional notes", description: "Old ideas in simple words" }, { title: "Expression", description: "The mood in your photo" }],
    },
    upload: {
      faceHeading: "Upload a photo", pastHeading: "Past-life character photo", faceSubheading: "Choose a clear front-facing face photo", pastSubheading: "Choose a clear front-facing face photo for your character", dropzone: "Drag a photo here or tap", gallery: "Choose from gallery", camera: "Take a photo", change: "Choose again", faceStart: "Start face reading", pastStart: "See my past-life role", chooseFirst: "Choose a photo first", tips: ["A front-facing photo", "Taken in bright light", "Without sunglasses or a mask"], privacy: "Your photo may be sent to an AI provider only to process this request. Results are cultural entertainment, not determinations about personality, health, wealth, fate, or genetics.", imageOnly: "Please upload an image file.", maxSize: "The file must be 10 MB or smaller.", analysisError: "Something went wrong during analysis.", loadingTitle: "Creating your face-reading notes", steps: ["Starting the face-reading guide", "Reviewing facial structure", "Organizing visible mood cues", "Finding connection keywords", "Comparing traditional references", "Summarizing tendencies", "Exploring future-image direction", "Preparing an image concept", "Finishing the entertainment reading"],
    },
  },
  ja: {
    home: {
      faceEyebrow: "AI 顔印象リーディング", pastEyebrow: "AI 前世キャラクターテスト", faceTitleFirst: "私の顔は", faceTitleAccent: "どんな印象かな？", pastTitleFirst: "王だった？", pastTitleAccent: "それとも武士？", faceDescription: "一枚の写真から、顔が与える雰囲気を気軽に見てみましょう。", pastDescription: "観相で見る、私の前世は？", faceCta: "顔印象を見てみる", pastCta: "前世を確認する", photoNote: "写真は分析リクエストに使用されます\n文化・娯楽の参考用", chartCaption: "顔の印象を見つめる時間", chartFooter: "伝統記録 × AI解釈", features: [{ title: "第一印象", description: "顔から感じる雰囲気" }, { title: "人間関係", description: "人との間で見える魅力" }, { title: "伝統の記録", description: "古い考えをわかりやすく" }, { title: "表情の流れ", description: "写真の表情と視線" }],
    },
    upload: {
      faceHeading: "写真をアップロード", pastHeading: "前世キャラクター写真", faceSubheading: "顔がよく見える正面写真を選んでください", pastSubheading: "前世キャラクター用の正面写真を選んでください", dropzone: "写真をドラッグするかタップしてください", gallery: "ギャラリーから選ぶ", camera: "写真を撮る", change: "選び直す", faceStart: "顔印象を分析する", pastStart: "前世の役割を見る", chooseFirst: "先に写真を選んでください", tips: ["正面を向いた写真", "明るい場所で撮った写真", "サングラス・マスクなしの写真"], privacy: "写真はこの分析リクエストのためだけにAI提供者へ送信されることがあります。結果は文化・娯楽の参考であり、性格、健康、財産、運命、遺伝を断定するものではありません。", imageOnly: "画像ファイルを選んでください。", maxSize: "ファイルは10MB以下にしてください。", analysisError: "分析中にエラーが発生しました。", loadingTitle: "顔印象の解説を作成中", steps: ["顔印象ガイドを始めています", "顔の構造を見ています", "見える雰囲気を整理しています", "関係性のキーワードを探しています", "伝統的な記録と比べています", "傾向をまとめています", "未来イメージの方向を見ています", "画像コンセプトを準備しています", "娯楽用の解説を仕上げています"],
    },
  },
  es: {
    home: { faceEyebrow: "LECTURA FACIAL CON IA", pastEyebrow: "TEST DE PERSONAJE DE VIDA PASADA", faceTitleFirst: "¿Qué vibra", faceTitleAccent: "transmite mi rostro?", pastTitleFirst: "¿Fui rey", pastTitleAccent: "o guerrero?", faceDescription: "Descubre la impresión que transmite tu rostro con una foto.", pastDescription: "¿Quién pude haber sido en una vida pasada?", faceCta: "Ver mi lectura facial", pastCta: "Ver mi vida pasada", photoNote: "Tu foto se usa para este análisis\nEntretenimiento cultural", chartCaption: "Un momento para explorar impresiones", chartFooter: "Registro tradicional × interpretación IA", features: [{ title: "Primera impresión", description: "La vibra que transmite tu rostro" }, { title: "Conexión", description: "Tu impresión social" }, { title: "Notas tradicionales", description: "Ideas antiguas en palabras simples" }, { title: "Expresión", description: "El ambiente de tu foto" }] },
    upload: { faceHeading: "Subir una foto", pastHeading: "Foto para personaje de vida pasada", faceSubheading: "Elige una foto frontal clara de tu rostro", pastSubheading: "Elige una foto frontal clara para tu personaje", dropzone: "Arrastra una foto aquí o toca", gallery: "Elegir de la galería", camera: "Tomar una foto", change: "Elegir otra", faceStart: "Iniciar lectura facial", pastStart: "Ver mi rol de vida pasada", chooseFirst: "Elige primero una foto", tips: ["Una foto de frente", "Tomada con buena luz", "Sin gafas de sol ni mascarilla"], privacy: "Tu foto puede enviarse a un proveedor de IA solo para procesar esta solicitud. Los resultados son entretenimiento cultural, no determinaciones sobre personalidad, salud, riqueza, destino o genética.", imageOnly: "Sube un archivo de imagen.", maxSize: "El archivo debe pesar 10 MB o menos.", analysisError: "Ocurrió un error durante el análisis.", loadingTitle: "Creando tus notas de lectura facial", steps: ["Iniciando la guía facial", "Revisando la estructura facial", "Organizando señales de ambiente", "Buscando palabras sobre conexión", "Comparando referencias tradicionales", "Resumiendo tendencias", "Explorando una dirección futura", "Preparando un concepto de imagen", "Terminando la lectura de entretenimiento"] },
  },
  "pt-BR": {
    home: { faceEyebrow: "LEITURA FACIAL COM IA", pastEyebrow: "TESTE DE PERSONAGEM DE VIDA PASSADA", faceTitleFirst: "Que vibe", faceTitleAccent: "meu rosto transmite?", pastTitleFirst: "Eu fui rei", pastTitleAccent: "ou guerreiro?", faceDescription: "Descubra a impressão que seu rosto transmite com uma foto.", pastDescription: "Quem eu poderia ter sido em uma vida passada?", faceCta: "Ver leitura facial", pastCta: "Ver minha vida passada", photoNote: "Sua foto é usada nesta análise\nEntretenimento cultural", chartCaption: "Um momento para explorar impressões", chartFooter: "Registro tradicional × interpretação por IA", features: [{ title: "Primeira impressão", description: "A vibe do seu rosto" }, { title: "Conexão", description: "Sua impressão social" }, { title: "Notas tradicionais", description: "Ideias antigas em palavras simples" }, { title: "Expressão", description: "O clima da sua foto" }] },
    upload: { faceHeading: "Enviar uma foto", pastHeading: "Foto para personagem de vida passada", faceSubheading: "Escolha uma foto frontal nítida do rosto", pastSubheading: "Escolha uma foto frontal nítida para seu personagem", dropzone: "Arraste uma foto ou toque aqui", gallery: "Escolher da galeria", camera: "Tirar uma foto", change: "Escolher outra", faceStart: "Iniciar leitura facial", pastStart: "Ver meu papel na vida passada", chooseFirst: "Escolha uma foto primeiro", tips: ["Uma foto de frente", "Tirada com boa luz", "Sem óculos escuros ou máscara"], privacy: "Sua foto pode ser enviada a um provedor de IA somente para processar este pedido. Os resultados são entretenimento cultural, não determinações sobre personalidade, saúde, riqueza, destino ou genética.", imageOnly: "Envie um arquivo de imagem.", maxSize: "O arquivo deve ter até 10 MB.", analysisError: "Ocorreu um erro durante a análise.", loadingTitle: "Criando suas notas de leitura facial", steps: ["Iniciando o guia facial", "Analisando a estrutura facial", "Organizando pistas de ambiente", "Buscando palavras de conexão", "Comparando referências tradicionais", "Resumindo tendências", "Explorando uma direção futura", "Preparando um conceito de imagem", "Finalizando a leitura de entretenimento"] },
  },
  fr: {
    home: { faceEyebrow: "LECTURE DU VISAGE PAR IA", pastEyebrow: "TEST DE PERSONNAGE D'UNE VIE ANTÉRIEURE", faceTitleFirst: "Quelle impression", faceTitleAccent: "donne mon visage ?", pastTitleFirst: "Étais-je roi", pastTitleAccent: "ou guerrier ?", faceDescription: "Découvrez l'impression que dégage votre visage avec une photo.", pastDescription: "Qui ai-je pu être dans une vie antérieure ?", faceCta: "Voir ma lecture du visage", pastCta: "Voir ma vie antérieure", photoNote: "Votre photo est utilisée pour cette analyse\nDivertissement culturel", chartCaption: "Un moment pour explorer les impressions", chartFooter: "Archive traditionnelle × interprétation IA", features: [{ title: "Première impression", description: "L'ambiance de votre visage" }, { title: "Lien", description: "Votre impression sociale" }, { title: "Notes traditionnelles", description: "Des idées anciennes en mots simples" }, { title: "Expression", description: "L'ambiance de votre photo" }] },
    upload: { faceHeading: "Importer une photo", pastHeading: "Photo du personnage de vie antérieure", faceSubheading: "Choisissez une photo nette de votre visage de face", pastSubheading: "Choisissez une photo nette de face pour votre personnage", dropzone: "Glissez une photo ici ou touchez", gallery: "Choisir dans la galerie", camera: "Prendre une photo", change: "Choisir à nouveau", faceStart: "Commencer la lecture du visage", pastStart: "Voir mon rôle de vie antérieure", chooseFirst: "Choisissez d'abord une photo", tips: ["Une photo de face", "Prise dans une lumière vive", "Sans lunettes de soleil ni masque"], privacy: "Votre photo peut être envoyée à un fournisseur d'IA uniquement pour traiter cette demande. Les résultats sont un divertissement culturel et ne déterminent pas la personnalité, la santé, la richesse, le destin ou la génétique.", imageOnly: "Veuillez importer une image.", maxSize: "Le fichier doit faire 10 Mo ou moins.", analysisError: "Une erreur est survenue pendant l'analyse.", loadingTitle: "Création de vos notes de lecture du visage", steps: ["Démarrage du guide facial", "Observation de la structure du visage", "Organisation des indices d'ambiance", "Recherche de mots de connexion", "Comparaison avec des références traditionnelles", "Résumé des tendances", "Exploration d'une direction future", "Préparation d'un concept d'image", "Finalisation de la lecture de divertissement"] },
  },
};

export function getFaceReadingCopy(language: string): FaceReadingCopy {
  return COPY[language] ?? COPY[language.split("-")[0]] ?? COPY.en;
}
