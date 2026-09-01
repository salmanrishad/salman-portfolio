# Building an AI Career Chat Assistant — A Beginner's Tutorial

This tutorial walks through a feature that was just added to this portfolio
site: a floating chat widget that lets visitors ask questions about your
career, powered by a free AI model through a service called OpenRouter.

It's written for someone who is new to frontend development. If you already
know React, feel free to skim the "Technology Summary" and jump to the
"Detailed Code Walkthrough."

---

## 1. What We Built

A chat bubble appears in the bottom-right corner of every page. Click it, and
a small chat panel opens where a visitor can type questions like *"How many
years of experience does he have?"* or *"What testing tools does he use?"*.
The assistant answers using only the facts already in your portfolio data —
and politely declines anything unrelated (like "what's the capital of
France?").

Three new files make this work, plus one small edit to an existing file:

| File | Purpose |
|---|---|
| [`lib/chatContext.ts`](lib/chatContext.ts) | Turns your résumé data into instructions (a "system prompt") for the AI |
| [`app/api/chat/route.ts`](app/api/chat/route.ts) | A server-side endpoint that talks to the AI provider on the browser's behalf |
| [`components/ChatWidget.tsx`](components/ChatWidget.tsx) | The chat bubble UI the visitor actually sees and clicks |
| [`app/page.tsx`](app/page.tsx) | Edited to drop the chat widget onto the homepage |

---

## 2. Technology Summary

### Next.js (App Router)
Next.js is a framework built on top of React. It gives you two things this
project relies on:

- **File-based routing** — a file at `app/page.tsx` automatically becomes
  your homepage; a file at `app/api/chat/route.ts` automatically becomes an
  API endpoint at the URL `/api/chat`. You never manually wire up a router.
- **Server and client code in one project** — some code runs on your web
  server (safe, hidden from visitors), and some runs in the visitor's
  browser (interactive, but visible). Next.js lets both live side by side.

### React
React is the library Next.js is built on. It lets you build a UI out of
reusable **components** — small functions that return HTML-like markup
(called JSX). `ChatWidget.tsx` is a React component: a JavaScript function
that returns the chat bubble's markup.

React components come in two flavors here:

- **Server Components** (the default) — render once on the server, sent to
  the browser as plain HTML. They can't use things like `useState` or
  `onClick`, because there's no interactivity on the server.
- **Client Components** — marked with a `"use client"` line at the top of
  the file. These run in the browser and *can* respond to clicks, hold
  state, and re-render live. `ChatWidget.tsx` is a Client Component, because
  it needs to react to typing and clicking.

### TypeScript
TypeScript is JavaScript with optional type annotations, e.g.
`content: string` tells the compiler (and your editor) that `content` must
always be text. It catches a category of bugs — passing the wrong shape of
data — before you ever run the code.

### Tailwind CSS
Instead of writing separate `.css` files, Tailwind lets you style elements
directly with utility class names, e.g. `className="rounded-md bg-accent"`
means "rounded corners, background color = my accent color." This project
already used Tailwind throughout, so the new chat widget follows the same
pattern (dark background, teal accent, monospace labels) to look native to
the site.

### OpenRouter
[OpenRouter](https://openrouter.ai) is a gateway that sits in front of many
different AI models (from Google, Meta, MiniMax, and others) behind one
single API. Instead of signing up separately with every AI company, you get
one API key and can call any model they support — including several
**free** ones, which is what this feature uses. You send it a list of chat
messages; it sends back the AI's reply.

### `lucide-react`
A small library of ready-made icon components (`<MessageCircle />`,
`<Send />`, etc.), already a dependency in this project.

---

## 3. High-Level Walkthrough

Here's what happens, step by step, when a visitor asks a question:

```
 Visitor's Browser                    Your Server                 OpenRouter
┌───────────────────┐            ┌─────────────────────┐        ┌───────────┐
│                    │  1. type   │                      │        │           │
│   ChatWidget.tsx   │  message   │                      │        │           │
│   (Client          │──────────▶│                      │        │           │
│    Component)      │  2. POST   │  app/api/chat/       │  3.    │  Free AI  │
│                    │  /api/chat │  route.ts            │──────▶ │  Model    │
│                    │            │  (Route Handler)     │  POST  │           │
│                    │  5. shows  │                      │  4.    │           │
│                    │◀─────────  │                      │◀────── │           │
│                    │  reply     │                      │  reply │           │
└───────────────────┘            └─────────────────────┘        └───────────┘
```

1. **The visitor types a question** into the input box inside
   `ChatWidget.tsx` and hits Enter (or clicks Send).
2. **The browser sends a `POST` request** to `/api/chat`, with the full
   conversation so far as JSON — `fetch("/api/chat", { method: "POST", ... })`.
3. **Next.js routes that request** to `app/api/chat/route.ts`, which runs
   *only on your server, never in the browser*. This is important: it's the
   one place your secret `OPENROUTER_API_KEY` is allowed to exist, because
   server code is never sent to visitors.
4. **The route handler builds a system prompt** (instructions + your résumé
   facts, from `chatContext.ts`), attaches it to the conversation, and
   forwards everything to OpenRouter's API.
5. **OpenRouter returns the AI's reply**, the route handler extracts just
   the text and sends it back to the browser as `{ reply: "..." }`.
6. **`ChatWidget.tsx` adds that reply** to the message list, and React
   re-renders the chat panel to show it.

The key architectural idea: **the browser never talks to OpenRouter
directly**. It only ever talks to your own server, which then talks to
OpenRouter using a secret key that stays hidden. This is a common and
important pattern any time a frontend needs to use a paid or key-protected
API.

---

## 4. Detailed Code Walkthrough

### 4.1 `lib/chatContext.ts` — turning data into instructions

The site already had a file, `lib/data.ts`, containing structured facts
about your career (`profile`, `experience`, `skillCategories`, `tools`,
etc.) that the rest of the site's components (`About.tsx`, `Journey.tsx`...)
render on the page. `chatContext.ts` reuses that *same* data, but instead of
turning it into HTML, it turns it into a big block of plain text called a
**system prompt** — the instructions an AI model reads before it reads
anything the user typed.

```ts
function formatExperience() {
  return experience
    .map((e) => {
      const highlights = e.highlights.map((h) => `  - ${h}`).join("\n");
      const note = e.note ? `\n  Note: ${e.note}` : "";
      return `${e.period} — ${e.role} at ${e.company} (${e.location})${note}\n${highlights}`;
    })
    .join("\n\n");
}
```

This function loops over your `experience` array (an array of objects) and
uses [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
to turn each job entry into a readable paragraph, then
[`.join("\n\n")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
glues them together with blank lines in between. There's a matching
`formatSkills()` and `formatEducation()` doing the same for other sections.

Everything is then assembled into one exported constant:

```ts
export const chatSystemPrompt = `You are the AI assistant embedded on ${profile.name}'s personal portfolio website. ...

PROFILE
Name: ${profile.name}
Current role: ${profile.role}
...

INSTRUCTIONS
- Only answer questions about ${profile.name}'s career, experience, skills, education, and professional background, using the information above.
- If asked something unrelated ..., politely decline and steer the conversation back to what you can help with.
- Be concise, friendly, and professional. Reply in plain text only — no markdown (no **bold**, no headers, no bullet lists).
- If asked for a detail not covered above, say you don't have that specific information and suggest reaching out directly via email (${profile.email}) or LinkedIn.
- Never invent facts that aren't present in the information above.
- Refer to ${profile.name} in the third person — you are their portfolio assistant, not ${profile.name} themself.`;
```

This uses a **template literal** (the backtick-quoted string), which lets
you drop live values into text with `${...}`. Because it pulls straight
from `lib/data.ts`, if you ever update your job history there, the chat
assistant's knowledge updates automatically — no need to touch this file.

The explicit "never invent facts" and "only answer questions about career"
rules are what's called **grounding** — they keep the AI from hallucinating
details you never gave it, and from wandering into being a general-purpose
chatbot.

### 4.2 `app/api/chat/route.ts` — the server-side endpoint

This file is a Next.js **Route Handler**. Any file named `route.ts` inside
`app/` automatically becomes a live API endpoint at the matching URL — this
one lives at `app/api/chat/route.ts`, so it's reachable at `/api/chat`.

```ts
import { NextRequest, NextResponse } from "next/server";
import { chatSystemPrompt } from "@/lib/chatContext";

export const runtime = "nodejs";

const MODELS = [
  "minimax/minimax-m2.7:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-26b-a4b-it:free",
];
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(request: NextRequest) {
  ...
}
```

A few beginner-relevant things worth calling out:

- **`export async function POST(...)`** — Next.js looks for a function
  named after an HTTP verb (`GET`, `POST`, `PUT`, ...). Because chat needs
  to send data (the conversation), we use `POST`.
- **`async` / `await`** — network calls (like asking OpenRouter for a
  reply) take time. `async function` lets the code pause at each `await`
  until a promise resolves, without blocking the whole server.
- **`MODELS` is an array, not a single string.** OpenRouter's free models
  occasionally get temporarily rate-limited by high demand. Sending a short
  list lets OpenRouter itself retry the next model in line if the first one
  is unavailable, instead of the whole request failing.

**Step 1 — check the secret key exists:**

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: "Chat is not configured on the server." },
    { status: 500 }
  );
}
```

`process.env.OPENROUTER_API_KEY` reads the value from your `.env` file.
Environment variables like this are how secrets (API keys, passwords) are
kept out of your source code — `.env` is listed in `.gitignore`, so it's
never committed to git or shipped to the browser.

**Step 2 — validate and trim the incoming conversation:**

```ts
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
```

Never trust data that arrives from a browser — anyone can send a request to
`/api/chat` directly (not just through the chat widget), so this code:

- Rejects the request outright if `messages` isn't a proper array.
- **Filters** out anything malformed (missing `content`, wrong `role`, etc.)
  using `.filter()` with a type guard (`m is IncomingMessage` tells
  TypeScript "trust me, after this check, `m` really is this shape").
- **Slices** to the last 12 messages (`MAX_HISTORY`) so a very long
  conversation doesn't balloon the request forever.
- **Truncates** each message to 2000 characters so nobody can send a
  novel-length prompt.

**Step 3 — call OpenRouter:**

```ts
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
```

This is a plain `fetch()` call — the same function you'd use in any
JavaScript, browser or server. A few details:

- `Authorization: Bearer ${apiKey}` is the standard way APIs check "who is
  calling me, and are they allowed to?"
- The conversation sent to OpenRouter is
  `[system prompt, ...visitor's messages]` — the system prompt always goes
  first so the model reads its instructions before anything else.
- `temperature: 0.4` controls randomness. `0` is very deterministic/
  repetitive; `1`+ is more creative/unpredictable. `0.4` is a reasonable
  middle ground for a factual Q&A assistant.
- `max_tokens: 500` caps how long a single reply can be (roughly 350–400
  words), which keeps replies readable and controls cost/latency.

**Step 4 — handle failure and success:**

```ts
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
```

Networked code fails in ways local code doesn't — the AI provider might be
down, rate-limited, or return something unexpected. Every step here is
wrapped so a failure produces a clean, friendly JSON error instead of
crashing the whole server. `?.` (optional chaining) is used throughout so
that if any piece of the response is missing (`data`, `choices`, `message`),
the code returns `undefined` instead of throwing an exception.

### 4.3 `components/ChatWidget.tsx` — the visitor-facing UI

This is a **Client Component** (note the `"use client"` line at the very
top — that's what makes hooks like `useState` and event handlers like
`onClick` legal here).

**Holding state:**

```tsx
const [open, setOpen] = useState(false);
const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

`useState` is React's way of giving a component memory that persists
between renders and triggers a re-render when it changes. Here:

- `open` — is the chat panel currently expanded?
- `messages` — the full conversation so far, starting with a canned
  greeting message.
- `input` — whatever's currently typed in the text box.
- `loading` — is a request to `/api/chat` currently in flight? (used to
  show a "Thinking…" indicator and disable the send button)
- `error` — the last error message, if any.

**Sending a message:**

```tsx
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
```

Walking through it:

1. Bail out early if the input is empty or a request is already running
   (`if (!text || loading) return;`) — this stops double-submits.
2. Build a new message object for what the visitor just typed, and append
   it to a *new* array (`[...messages, userMessage]`). React state should
   never be mutated directly — you always create a new array/object and
   hand it to the setter, which is why `[...messages, userMessage]` (the
   `...` "spread" copies the old array) is used instead of
   `messages.push(...)`.
3. Immediately update the UI optimistically: show the visitor's own
   message, clear the input box, clear old errors, and flip on the loading
   spinner — all before the network response comes back.
4. `fetch("/api/chat", ...)` — this is the browser calling *your own
   server*, not OpenRouter directly (see the architecture diagram above).
5. If the response isn't OK, or there's no `reply` in the body, throw an
   error so the `catch` block below can display it.
6. On success, append the assistant's reply to `messages` using the
   *function form* of the state setter (`setMessages((prev) => [...prev, newOne])`).
   This form is safer than `setMessages([...messages, newOne])` here because
   it always builds on the freshest state, rather than a possibly-stale
   `messages` variable captured when the function started.
7. `finally { setLoading(false); }` runs whether the call succeeded or
   failed, so the spinner always goes away.

**Auto-scrolling to the newest message:**

```tsx
const scrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
}, [messages, loading, open]);
```

- `useRef` gives you a direct handle to a real DOM element (here, the
  scrollable messages `<div>`), without triggering re-renders when it
  changes.
- `useEffect` runs side effects — code that reaches outside of React's
  normal render flow — after each render. The array at the end,
  `[messages, loading, open]`, is the **dependency list**: this effect
  re-runs only when one of those three values changes, e.g. whenever a new
  message arrives, it scrolls to the bottom.

**Rendering the messages:**

```tsx
{messages.map((m) => (
  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
    <div className={`max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm leading-relaxed ${
      m.role === "user" ? "bg-accent text-base" : "border border-border bg-surface-2 text-ink"
    }`}>
      {m.content}
    </div>
  </div>
))}
```

Every list rendered with `.map()` in React needs a unique `key` prop (here,
`m.id`, generated with `crypto.randomUUID()` when the message was created)
so React can efficiently track which items changed between renders. User
messages are right-aligned with the site's teal accent background; assistant
messages are left-aligned with a neutral surface background — a
conventional chat-bubble layout.

Note that `{m.content}` is rendered as plain React text, *not* injected as
raw HTML (there's no `dangerouslySetInnerHTML` anywhere in this file).
React automatically escapes text content, so even if a visitor — or the AI —
typed something like `<script>...</script>`, it would show up as literal
text on screen rather than executing. This is an important default safety
property of React worth understanding even though this project doesn't
override it.

**Submitting on Enter:**

```tsx
function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}
```

Pressing Enter alone sends the message; Shift+Enter inserts a newline
instead (standard chat-app behavior). `e.preventDefault()` stops the
textarea from inserting its own newline character before `sendMessage()`
runs.

### 4.4 Wiring it into the page

Finally, [`app/page.tsx`](app/page.tsx) got two small additions:

```tsx
import { ChatWidget } from "@/components/ChatWidget";
```

```tsx
<Footer />
<ChatWidget />
```

Because `ChatWidget` is placed after `<Footer />` but is styled with
`fixed bottom-5 right-5` (in its own file), it floats above the page content
in the corner regardless of where it sits in the component tree — this is a
common pattern for things like chat widgets, toasts, and modals.

---

## 5. Trying It Yourself

1. Make sure `.env` has a valid `OPENROUTER_API_KEY` (already set up).
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) and click the round
   chat bubble in the bottom-right corner.
4. Ask it something like *"What certifications does he have?"* and watch
   the network tab in your browser's dev tools — you'll see a `POST` to
   `/api/chat` fire, and the reply come back as JSON.

---

## 6. Five Ways This Code Could Be Improved

A self-review of what's here today, roughly in priority order:

1. **No streaming responses.** Right now the visitor sees nothing until the
   *entire* reply is ready (`await upstream.json()` waits for the whole
   response). Most modern AI chat UIs stream text token-by-token as it's
   generated, which feels much more responsive. This would mean switching
   the route handler to forward a `ReadableStream` from OpenRouter instead
   of buffering the full JSON response, and updating `ChatWidget.tsx` to
   append partial text as it arrives.

2. **No rate limiting on `/api/chat` itself.** The route trims message
   *length*, but nothing stops one visitor (or a bot) from calling it
   hundreds of times a minute. That's low-risk while every model is free,
   but if a paid model is ever added to the fallback list, this becomes a
   real cost exposure. A simple per-IP limiter (e.g. via middleware or a
   small in-memory/Upstash-backed counter) would close that gap.

3. **Conversation history isn't persisted.** `messages` lives only in
   React state, so refreshing the page or navigating away resets the
   conversation to the greeting. Storing it in `sessionStorage` (survives
   refresh, clears on tab close) would be a low-effort improvement; a
   database-backed history would be needed for anything more durable.

4. **No automated tests.** There's nothing today that verifies, say, that
   the route handler correctly rejects malformed input, correctly trims
   history past 12 messages, or that `chatSystemPrompt` actually contains
   the data from `lib/data.ts`. A handful of unit tests around the pure
   logic in `route.ts` (extracted into small testable functions) and
   `chatContext.ts` would catch regressions early.

5. **Limited accessibility support.** The chat panel has no `aria-live`
   region announcing new assistant messages to screen readers, and there's
   no keyboard shortcut (like `Escape`) to close the panel once open. Both
   are small additions that would make the widget usable for visitors
   relying on assistive technology.
