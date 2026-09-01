import { NextRequest, NextResponse } from "next/server";
import { chatSystemPrompt } from "@/lib/chatContext";

export const runtime = "nodejs";

// Free-tier OpenRouter models occasionally get rate-limited upstream, so we
// give OpenRouter a short fallback list and let it try each in order.
const MODELS = [
  "minimax/minimax-m2.7:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-26b-a4b-it:free",
];
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 2000;

type IncomingMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured on the server." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const trimmed: IncomingMessage[] = messages
    .filter(
      (m): m is IncomingMessage =>
        m &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        (m.role === "user" || m.role === "assistant")
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (trimmed.length === 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? request.nextUrl.origin;

  let upstream: Response;
  try {
    upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": origin,
        "X-Title": "Salman Rishad Portfolio Chat",
      },
      body: JSON.stringify({
        models: MODELS,
        messages: [{ role: "system", content: chatSystemPrompt }, ...trimmed],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });
  } catch (err) {
    console.error("OpenRouter request failed", err);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again shortly." },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, errText);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again shortly." },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => null);
  const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ reply });
}
