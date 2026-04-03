import { CHARACTERS } from "../config/characters";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { CharacterCard } from "../components/CharacterCard";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

interface Props {
  onNext: () => void;
}

export function CharacterSelectPage({ onNext }: Props) {
  const { state, setCharacter } = useApp();
  const t = T[state.currentLang];

  const handleSelect = (char: (typeof CHARACTERS)[0]) => {
    setCharacter(char);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔮</span>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            K-Shaman
          </span>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-900/40 border border-violet-500/30 text-violet-300 text-xs font-medium mb-4">
          ✦ 신령 채널링 ✦
        </div>
        <h1 className="text-2xl font-extrabold leading-tight mb-2">
          {t.selectGuide}
        </h1>
        <p className="text-sm text-white/50">{t.selectGuideSubtitle}</p>
      </div>

      <div className="px-4 pb-20 grid grid-cols-1 gap-4 max-w-md mx-auto">
        {CHARACTERS.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onSelect={() => handleSelect(char)}
          />
        ))}
      </div>
    </div>
  );
}
