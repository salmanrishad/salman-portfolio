"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { profile } from "@/lib/data";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content: `Hi! I'm ${profile.name.split(" ")[0]}'s portfolio assistant. Ask me about his experience, skills, or background.`,
};

const MAX_INPUT_LENGTH = 500;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.reply) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="flex h-[520px] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
            <div>
              <div className="font-mono-label text-[11px] uppercase text-accent">
                Career Assistant
              </div>
              <div className="text-sm text-ink-dim">Ask about {profile.name}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-ink-dim transition-colors hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent text-base"
                      : "border border-border bg-surface-2 text-ink"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-ink-dim">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking…
                </div>
              </div>
            ) : null}
            {error ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-md border border-accent-2/40 bg-accent-2/10 px-3 py-2 text-sm text-accent-2">
                  {error}
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border bg-surface-2 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about his experience…"
                className="max-h-24 flex-1 resize-none rounded-md border border-border bg-base px-3 py-2 text-sm text-ink placeholder:text-ink-dim focus:border-accent/60 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-base transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-base shadow-lg transition-transform hover:-translate-y-0.5"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
