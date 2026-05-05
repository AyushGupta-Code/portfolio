"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Column, Row, Heading, Text } from "@once-ui-system/core";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "Tell me about the MusicGen Audiobook Engine",
  "What is the RAG platform you built?",
  "Tell me about CREME",
];

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!response.ok || !response.body) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content },
        ]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${msg}` },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <Column fillWidth gap="l" paddingY="xl" className="chat-section">
      {/* Header */}
      <Column gap="8">
        <Heading as="h2" variant="display-strong-xs">
          Ask about my work
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-m">
          Powered by Llama 3.3 — ask about my projects, experience, or how I can help.
        </Text>
      </Column>

      {/* Conversation thread */}
      {messages.length > 0 && (
        <div className="chat-messages">
          <Column gap="12">
            {messages.map((msg, i) => (
              <Row
                key={i}
                fillWidth
                horizontal={msg.role === "user" ? "end" : "start"}
              >
                <div
                  className={`chat-bubble ${
                    msg.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-assistant"
                  }`}
                >
                  {msg.content || (
                    <span style={{ opacity: 0.5, fontStyle: "italic" }}>
                      Thinking…
                    </span>
                  )}
                </div>
              </Row>
            ))}
            <div ref={endRef} />
          </Column>
        </div>
      )}

      {/* Conversation starters (shown only before first message) */}
      {messages.length === 0 && (
        <Row gap="8" wrap>
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              style={{
                background: "var(--neutral-background-weak)",
                border: "1px solid var(--neutral-border-medium)",
                borderRadius: "2rem",
                padding: "0.4rem 0.875rem",
                fontFamily: "var(--font-label)",
                fontSize: "0.8125rem",
                color: "var(--neutral-on-background-medium)",
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.borderColor =
                  "var(--scheme-brand-600)";
                (e.target as HTMLButtonElement).style.color =
                  "var(--scheme-brand-600)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.borderColor =
                  "var(--neutral-border-medium)";
                (e.target as HTMLButtonElement).style.color =
                  "var(--neutral-on-background-medium)";
              }}
            >
              {s}
            </button>
          ))}
        </Row>
      )}

      {/* Input row */}
      <div className="chat-input-row">
        <Row gap="12" vertical="end">
          <textarea
            ref={inputRef}
            className="chat-input"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything about Ayush's projects…"
            disabled={isLoading}
          />
          <button
            onClick={() => send(input)}
            disabled={isLoading || !input.trim()}
            style={{
              background:
                isLoading || !input.trim()
                  ? "var(--neutral-background-strong)"
                  : "var(--scheme-brand-600)",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.625rem 1.25rem",
              fontFamily: "var(--font-label)",
              fontSize: "0.875rem",
              letterSpacing: "0.06em",
              cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
              height: "3rem",
            }}
          >
            {isLoading ? "…" : "Send"}
          </button>
        </Row>
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          marginTop="8"
        >
          Press Enter to send · Shift+Enter for new line
        </Text>
      </div>
    </Column>
  );
}
