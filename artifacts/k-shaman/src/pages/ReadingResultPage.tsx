import { useEffect, useState } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

interface Props {
  onAskAnything: () => void;
  onReset: () => void;
}

const READING_SECTIONS = [
  {
    icon: "🌙",
    titleKo: "현재 에너지",
    title: "Current Energy",
    content: [
      "지금 당신의 기운은 변화의 경계에 서 있습니다. 오랫동안 억눌렸던 내면의 힘이 서서히 깨어나려 하고 있어요.",
      "Your current energy stands at the threshold of change. The inner power long suppressed is slowly awakening.",
    ],
  },
  {
    icon: "💫",
    titleKo: "사랑과 인연",
    title: "Love & Connection",
    content: [
      "인연의 실이 가까이에 있습니다. 너무 서두르지 마세요. 진짜 인연은 당신이 스스로를 온전히 받아들일 때 찾아옵니다.",
      "The thread of destiny is nearby. Do not rush. The true connection arrives when you fully accept yourself.",
    ],
  },
  {
    icon: "💼",
    titleKo: "직업과 재물",
    title: "Career & Wealth",
    content: [
      "재물운이 3개월 안에 움직입니다. 지금 준비하는 것들이 씨앗이 됩니다. 작은 결정들을 소홀히 하지 마세요.",
      "Fortune moves within 3 months. What you prepare now becomes the seed. Do not neglect small decisions.",
    ],
  },
  {
    icon: "⚡",
    titleKo: "주의해야 할 것",
    title: "Caution",
    content: [
      "남의 말에 너무 흔들리지 마세요. 주변의 소음 속에서 당신 자신의 목소리를 잃지 않는 것이 중요합니다.",
      "Do not be swayed by others' words. It is important not to lose your own voice amid surrounding noise.",
    ],
  },
  {
    icon: "✨",
    titleKo: "신령의 한마디",
    title: "Spirit's Message",
    content: [
      "당신은 생각보다 훨씬 강한 사람입니다. 그것을 믿으세요.",
      "You are much stronger than you think. Believe it.",
    ],
  },
];

export function ReadingResultPage({ onAskAnything, onReset }: Props) {
  const { state, selectedPersona } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const user = state.userInfo;
  const [revealed, setRevealed] = useState(0);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";
  const accentColor = selectedPersona?.accentColor ?? "text-violet-300";
  const isKo = lang === "ko";

  const fullName = isKo
    ? `${user?.lastName ?? ""}${user?.firstName ?? ""}`
    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  useEffect(() => {
    if (revealed < READING_SECTIONS.length) {
      const timer = setTimeout(() => setRevealed((r) => r + 1), 700);
      return () => clearTimeout(timer);
    }
  }, [revealed]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onReset} className="text-white/60 hover:text-white transition-colors text-sm">
          ← {t.newReading}
        </button>
        <span className="text-sm font-semibold text-white/70">{t.yourReading}</span>
        <LanguageSwitcher />
      </div>

      <div className="px-4 pt-8 pb-6 text-center">
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-4xl mx-auto mb-4 shadow-2xl shadow-violet-500/40`}
        >
          {selectedPersona?.emoji ?? "🔮"}
        </div>
        <p className={`text-xs font-medium mb-1 ${accentColor}`}>
          {selectedPersona?.display_name_ko} · {selectedPersona?.display_name_en}
        </p>
        <h1 className="text-2xl font-extrabold">
          {isKo ? `${fullName}님의 점사` : `${fullName}'s Reading`}
        </h1>
        <p className="text-sm text-white/40 mt-1">
          {user?.birthYear}.{user?.birthMonth}.{user?.birthDay}
        </p>
      </div>

      <div className="px-4 max-w-md mx-auto space-y-4">
        {READING_SECTIONS.map((section, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              i < revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{section.icon}</span>
                <h3 className="font-bold text-white">
                  {isKo ? section.titleKo : section.title}
                </h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {isKo ? section.content[0] : section.content[1]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {revealed >= READING_SECTIONS.length && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
          <div className="max-w-md mx-auto space-y-3">
            <button
              onClick={onAskAnything}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r ${fromColor} ${toColor} shadow-xl active:scale-95 transition-transform`}
            >
              💬 {t.askAnything}
            </button>
            <button
              onClick={onReset}
              className="w-full py-3 rounded-2xl font-medium text-white/60 bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
            >
              {t.newReading}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
