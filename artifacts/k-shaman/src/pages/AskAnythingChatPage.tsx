import { useState, useRef, useEffect } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { ChatBubble } from "../components/ChatBubble";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { sendMessage } from "../lib/apiClient";
import type { ChatMessage } from "../types";

interface Props {
  onBack: () => void;
  onReset: () => void;
}

function generateId() {
  return Math.random().toString(36).slice(2);
}

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
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [remainingQuestions, setRemainingQuestions] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || typing) return;
    if (!state.userInfo || !state.selectedPersonaId || !state.selectedProductId) return;

    setError(null);

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const result = await sendMessage(
        text,
        state.userInfo,
        lang,
        state.selectedPersonaId,
        state.selectedProductId,
        sessionId
      );

      if (!sessionId) {
        setSessionId(result.sessionId);
      }
      setRemainingQuestions(result.remainingQuestions);

      const shamanMsg: ChatMessage = {
        id: generateId(),
        role: "shaman",
        content: result.reply,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, shamanMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);

      // Show error as a system message in the chat
      const errMsg: ChatMessage = {
        id: generateId(),
        role: "shaman",
        content: isKo
          ? `죄송합니다. 연결에 문제가 생겼어요. 다시 시도해주세요.`
          : `I apologize — there was a connection issue. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-gray-950/95 backdrop-blur-md border-b border-white/5">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          ← {t.back}
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedPersona?.emoji}</span>
            <span className="text-sm font-semibold text-white/70">
              {selectedPersona?.display_name_ko}
            </span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <span className="text-[10px] text-white/30 mt-0.5">
            {isKo
              ? `남은 질문 ${remainingQuestions}개`
              : `${remainingQuestions} questions left`}
          </span>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-400/20 text-red-300 text-xs">
          {isKo ? "연결 오류: " : "Error: "}{error}
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28 max-w-md mx-auto w-full">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
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

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-md border-t border-white/5 px-4 py-3">
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.askPlaceholder}
            disabled={remainingQuestions <= 0}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm disabled:opacity-40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || typing || remainingQuestions <= 0}
            className={`px-4 py-3 rounded-xl font-semibold text-white text-sm transition-all ${
              !input.trim() || typing || remainingQuestions <= 0
                ? "bg-white/10 opacity-50 cursor-not-allowed"
                : `bg-gradient-to-r ${fromColor} ${toColor} active:scale-95`
            }`}
          >
            {t.sendMessage}
          </button>
        </div>

        {remainingQuestions <= 0 && (
          <div className="max-w-md mx-auto mt-2 text-center">
            <button
              onClick={onReset}
              className={`text-sm font-medium bg-gradient-to-r ${fromColor} ${toColor} bg-clip-text text-transparent`}
            >
              {isKo ? "새 점사 시작하기 →" : "Start a new reading →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
