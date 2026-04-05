import { PERSONAS } from "../config/personas";
import type { Persona } from "../config/personas";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { CharacterCard } from "../components/CharacterCard";
import { SiteNav } from "../components/SiteNav";
interface Props {
  onNext: () => void;
}

export function CharacterSelectPage({ onNext }: Props) {
  const { state, setPersonaId } = useApp();
  const t = T[state.currentLang];

  const handleSelect = (persona: Persona) => {
    setPersonaId(persona.id);
    onNext();
  };

  return (
    <div className="relative text-white">
      <SiteNav />

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
        {PERSONAS.map((persona) => (
          <CharacterCard
            key={persona.id}
            persona={persona}
            onSelect={() => handleSelect(persona)}
          />
        ))}
      </div>
    </div>
  );
}
