import { useState, useRef, useEffect } from "react";
import { T } from "../config/i18n";
import { useApp } from "../store/appStore";
import { ChatBubble } from "../components/ChatBubble";
import { sendMessage, LimitReachedError } from "../lib/apiClient";
import { SiteNav } from "../components/SiteNav";
import type { ChatMessage } from "../types";

interface Props {
  onBack: () => void;
  onReset: () => void;
}

const MAX_QUESTIONS = 15;

function generateId() {
  return Math.random().toString(36).slice(2);
}

// Counter color based on remaining questions
function getCounterColor(remaining: number): string {
  if (remaining <= 0) return "text-red-400";
  if (remaining <= 3) return "text-orange-400";
  if (remaining <= 7) return "text-yellow-400";
  return "text-white/40";
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
      content: t.chatWelcome,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [remainingQuestions, setRemainingQuestions] = useState<number>(MAX_QUESTIONS);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fromColor = selectedPersona?.colorFrom ?? "from-violet-600";
  const toColor = selectedPersona?.colorTo ?? "to-indigo-500";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Sync limitReached with remainingQuestions
  useEffect(() => {
    if (remainingQuestions <= 0) {
      setLimitReached(true);
    }
  }, [remainingQuestions]);

  const isInputDisabled = typing || limitReached || remainingQuestions <= 0;

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isInputDisabled) return;
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

      const newRemaining = result.remainingQuestions;
      setRemainingQuestions(newRemaining);

      const shamanMsg: ChatMessage = {
        id: generateId(),
        role: "shaman",
        content: result.reply,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, shamanMsg]);

      // If server says 0 remaining, trigger limit UI
      if (newRemaining <= 0) {
        setLimitReached(true);
      }
    } catch (err: unknown) {
      if (err instanceof LimitReachedError) {
        // Server-side enforcement — block all further input immediately
        setRemainingQuestions(0);
        setLimitReached(true);
        return;
      }

      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);

      const errMsg: ChatMessage = {
        id: generateId(),
        role: "shaman",
        content: isKo
          ? "죄송합니다. 연결에 문제가 생겼어요. 다시 시도해주세요."
          : "I apologize — there was a connection issue. Please try again.",
        timestamp: new Date(),
      };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="text-white flex flex-col" style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* Header */}
      <SiteNav
        onBack={onBack}
        backLabel={t.back}
        centre={
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span>{selectedPersona?.emoji}</span>
              <span className="text-sm font-semibold text-white/70">
                {isKo ? selectedPersona?.display_name_ko : selectedPersona?.display_name_en}
              </span>
              <span className={`w-2 h-2 rounded-full ${limitReached ? "bg-red-500" : "bg-green-400 animate-pulse"}`} />
            </div>
            <span className={`text-[11px] font-medium ${getCounterColor(remainingQuestions)}`}>
              {isKo
                ? `남은 질문 ${Math.max(0, remainingQuestions)}개`
                : `${Math.max(0, remainingQuestions)} questions left`}
            </span>
          </div>
        }
      />

      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-400/20 text-red-300 text-xs">
          {isKo ? "연결 오류: " : "Error: "}{error}
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-44 max-w-md mx-auto w-full">
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

      {/* ───── LIMIT REACHED OVERLAY ───── */}
      {limitReached ? (
        <div className="fixed bottom-[60px] left-0 right-0 z-40 bg-gray-950/98 backdrop-blur-lg border-t border-white/10 px-4 py-6">
          <div className="max-w-md mx-auto flex flex-col items-center text-center gap-4">
            {/* Icon */}
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center text-2xl shadow-lg`}>
              {selectedPersona?.emoji}
            </div>

            {/* Message */}
            <div>
              <p className="text-white font-semibold text-base mb-1">
                {isKo ? "질문 횟수를 모두 사용했어요" : "You've used all your questions"}
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                {isKo
                  ? "더 보시려면 다시 결제해 주세요."
                  : "Purchase again to continue the session."}
              </p>
            </div>

            {/* CTA — repurchase */}
            <button
              onClick={onReset}
              className={`w-full py-3.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r ${fromColor} ${toColor} active:scale-95 transition-transform shadow-lg`}
            >
              {isKo ? "다시 결제하기" : "Purchase Again"}
            </button>

            {/* Secondary — go back */}
            <button
              onClick={onBack}
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              {isKo ? "다른 점사 보기" : "Try another reading"}
            </button>
          </div>
        </div>
      ) : (
        /* ───── NORMAL INPUT BAR ───── */
        <div className="fixed bottom-[60px] left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-md border-t border-white/5 px-4 py-3">
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
              disabled={isInputDisabled}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isInputDisabled}
              className={`px-4 py-3 rounded-xl font-semibold text-white text-sm transition-all ${
                !input.trim() || isInputDisabled
                  ? "bg-white/10 opacity-50 cursor-not-allowed"
                  : `bg-gradient-to-r ${fromColor} ${toColor} active:scale-95`
              }`}
            >
              {t.sendMessage}
            </button>
          </div>

          {/* Low question warning */}
          {remainingQuestions <= 3 && remainingQuestions > 0 && (
            <p className="max-w-md mx-auto mt-1.5 text-center text-orange-400/80 text-[11px]">
              {isKo
                ? `질문 ${remainingQuestions}개 남았어요`
                : `${remainingQuestions} question${remainingQuestions === 1 ? "" : "s"} remaining`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
