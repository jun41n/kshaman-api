import type { AskAnythingSession } from "./types.js";

// In-memory session store.
// TODO (production): Replace with Redis or database-backed sessions for persistence and scalability.
const sessions = new Map<string, AskAnythingSession>();

const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour
const MAX_QUESTIONS = 15;

function generateSessionId(): string {
  return `ks_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createSession(
  params: Omit<AskAnythingSession, "sessionId" | "maxQuestions" | "remainingQuestions" | "conversationSummary" | "messages" | "createdAt" | "lastActiveAt">
): AskAnythingSession {
  const sessionId = generateSessionId();
  const now = Date.now();
  const session: AskAnythingSession = {
    ...params,
    sessionId,
    maxQuestions: MAX_QUESTIONS,
    remainingQuestions: MAX_QUESTIONS,
    conversationSummary: "",
    messages: [],
    createdAt: now,
    lastActiveAt: now,
  };
  sessions.set(sessionId, session);
  return session;
}

export function getSession(sessionId: string): AskAnythingSession | null {
  const session = sessions.get(sessionId);
  if (!session) return null;

  // Auto-expire stale sessions
  if (Date.now() - session.lastActiveAt > SESSION_TTL_MS) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

export function updateSession(
  sessionId: string,
  updates: Partial<AskAnythingSession>
): AskAnythingSession | null {
  const session = sessions.get(sessionId);
  if (!session) return null;

  const updated: AskAnythingSession = {
    ...session,
    ...updates,
    sessionId, // sessionId is immutable
    lastActiveAt: Date.now(),
  };
  sessions.set(sessionId, updated);
  return updated;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

// Cleanup routine — removes expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.lastActiveAt > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
}, 10 * 60 * 1000); // Clean up every 10 minutes
