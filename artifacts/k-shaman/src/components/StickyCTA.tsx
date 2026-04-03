import type { ReactNode } from "react";
import { useApp } from "../store/appStore";

interface StickyCTAProps {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

export function StickyCTA({ label, onClick, icon, disabled }: StickyCTAProps) {
  const { selectedPersona } = useApp();
  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-200 ${
          disabled
            ? "bg-gray-700 cursor-not-allowed opacity-50"
            : `bg-gradient-to-r ${fromColor} ${toColor} active:scale-95 hover:shadow-violet-500/40 hover:shadow-xl`
        }`}
      >
        {icon && <span>{icon}</span>}
        {label}
      </button>
    </div>
  );
}
