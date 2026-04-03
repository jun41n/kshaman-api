import type { ChatMessage } from "../types";
import { useApp } from "../store/appStore";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const { state } = useApp();
  const char = state.selectedCharacter;
  const isShaman = message.role === "shaman";
  const fromColor = char?.colorFrom ?? "from-violet-600";
  const toColor = char?.colorTo ?? "to-indigo-500";

  return (
    <div className={`flex ${isShaman ? "justify-start" : "justify-end"} mb-4`}>
      {isShaman && (
        <div className="mr-2 flex-shrink-0">
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-lg shadow`}
          >
            {char?.emoji ?? "🔮"}
          </div>
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isShaman
            ? "bg-white/10 text-white/90 rounded-tl-none border border-white/10"
            : `bg-gradient-to-br ${fromColor} ${toColor} text-white rounded-tr-none`
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
