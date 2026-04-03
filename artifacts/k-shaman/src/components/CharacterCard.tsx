import type { Character } from "../types";
import { useApp } from "../store/appStore";
import { T } from "../config/i18n";

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const { state } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;

  return (
    <div
      className={`relative rounded-2xl border ${character.borderColor} bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer group hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:${character.glowColor} hover:shadow-xl`}
      onClick={onSelect}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${character.colorFrom} ${character.colorTo} opacity-10 group-hover:opacity-20 transition-opacity`} />

      <div className="relative p-5">
        <div className="text-4xl mb-3 text-center">{character.emoji}</div>

        <div className="text-center mb-3">
          <h3 className="text-xl font-bold text-white">{character.koreanName}</h3>
          <p className={`text-sm font-medium ${character.accentColor} mt-0.5`}>
            {character.englishName}
          </p>
          <p className="text-xs text-white/50 mt-1">{character.subtitles[lang]}</p>
        </div>

        <div className="border-t border-white/10 pt-3 mt-3">
          <p className="text-xs text-white/60 leading-relaxed text-center">
            {character.descriptions[lang]}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className={`text-xs ${character.accentColor} font-medium`}>
            ✦ {t.speciality}:
          </span>
          <span className="text-xs text-white/70">{character.specialities[lang]}</span>
        </div>

        <button
          className={`w-full mt-4 py-2 rounded-xl bg-gradient-to-r ${character.colorFrom} ${character.colorTo} text-white text-sm font-semibold shadow-md group-hover:shadow-lg transition-shadow`}
        >
          {t.chooseGuide}
        </button>
      </div>
    </div>
  );
}
