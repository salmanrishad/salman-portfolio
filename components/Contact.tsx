import { Download, Mail } from "lucide-react";
import { Reveal } from "./Reveal";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="bg-grid relative border-t border-border py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(34,230,196,0.12),transparent_65%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <div className="font-mono-label text-xs uppercase text-accent">06 — Contact</div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Let&apos;s talk quality.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">
            Open to QA leadership roles, process consulting, and automation
            strategy conversations. Reach out — I read every message.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono-label text-xs uppercase text-base transition-transform hover:-translate-y-0.5"
            >
              <Mail size={14} />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 font-mono-label text-xs uppercase text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 font-mono-label text-xs uppercase text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
