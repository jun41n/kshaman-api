import { useState, useRef, useEffect } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { ChatBubble } from "../components/ChatBubble";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import type { ChatMessage } from "../types";

interface Props {
  onBack: () => void;
  onReset: () => void;
}

function generateId() {
  return Math.random().toString(36).slice(2);
}

const SHAMAN_RESPONSES_KO = [
  "흠... 기운을 느껴보니, 그 일은 생각보다 빨리 해결될 것입니다. 하지만 먼저 당신 스스로 마음의 준비가 필요해요.",
  "그 사람과의 인연은 아직 끊어지지 않았습니다. 다만 때를 기다려야 해요. 성급하게 움직이면 오히려 멀어질 수 있어요.",
  "재물운이 가까이에 있어요. 주변에서 작은 기회를 놓치지 마세요. 큰 것을 바라다 작은 복을 놓치는 경우가 많답니다.",
  "당신의 선택은 틀리지 않았습니다. 다만 결과가 드러나는 데 시간이 걸릴 뿐이에요. 믿음을 가지세요.",
  "지금 당신 주변의 기운이 많이 흔들려 있어요. 혼자 결정하지 말고, 신뢰할 수 있는 사람의 조언을 들어보세요.",
];

const SHAMAN_RESPONSES_EN = [
  "Hmm... feeling the energy, that matter will resolve sooner than you think. But first, you need to prepare your heart.",
  "The connection with that person is not yet severed. But you must wait for the right moment. Moving too hastily could push them further away.",
  "Fortune is nearby. Don't miss the small opportunities around you. Many miss small blessings while reaching for the grand.",
  "Your choice was not wrong. It simply takes time for the results to reveal themselves. Have faith.",
  "The energy around you is quite turbulent right now. Don't decide alone — seek guidance from someone you trust.",
];

export function AskAnythingChatPage({ onBack, onReset }: Props) {
  const { state, selectedPersona } = useApp();
  const t = T[state.currentLang];
  const lang = state.currentLang;
  const isKo = lang === "ko";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "shaman",
      content: isKo
        ? `안녕하세요. 저는 ${selectedPersona?.display_name_ko}입니다. 무엇이든 편하게 물어보세요.`
        : `Hello. I am ${selectedPersona?.display_name_en}. Feel free to ask me anything.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 1200 + Math.random() * 1000;
    setTimeout(() => {
      const responses = isKo ? SHAMAN_RESPONSES_KO : SHAMAN_RESPONSES_EN;
      const reply = responses[responseIndex.current % responses.length];
      responseIndex.current += 1;

      const shamanMsg: ChatMessage = {
        id: generateId(),
        role: "shaman",
        content: reply,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, shamanMsg]);
      setTyping(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/95 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1">
          ← {t.back}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedPersona?.emoji}</span>
          <span className="text-sm font-semibold text-white/70">
            {selectedPersona?.display_name_ko}
          </span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
        <LanguageSwitcher />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28 max-w-md mx-auto w-full">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {typing && (
          <div className="flex justify-start mb-4">
            <div className="mr-2">
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-lg shadow`}
              >
                {selectedPersona?.emoji}
              </div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-md border-t border-white/5 px-4 py-3">
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder={t.askPlaceholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || typing}
            className={`px-4 py-3 rounded-xl font-semibold text-white text-sm transition-all ${
              !input.trim() || typing
                ? "bg-white/10 opacity-50 cursor-not-allowed"
                : `bg-gradient-to-r ${fromColor} ${toColor} active:scale-95`
            }`}
          >
            {t.sendMessage}
          </button>
        </div>
      </div>
    </div>
  );
}
