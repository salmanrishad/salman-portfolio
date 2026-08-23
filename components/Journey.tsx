import { Briefcase } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { experience } from "@/lib/data";

export function Journey() {
  return (
    <section id="journey" className="relative border-t border-border bg-surface/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          label="Career Journey"
          title="Seventeen years, one thread: raise the bar on quality."
          description="From hands-on testing to leading a 17-person QA function — a track record across finance, tourism, resource exploration, and enterprise software."
        />

        <div className="mt-16">
          {experience.map((entry, i) => (
            <div key={entry.company + entry.period} className="flex gap-5 sm:gap-8">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent">
                  <Briefcase size={15} />
                </span>
                {i < experience.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-gradient-to-b from-border to-transparent" />
                ) : null}
              </div>

              <Reveal delay={i * 0.05} className="flex-1 pb-16 last:pb-0">
                <div className="font-mono-label text-xs uppercase text-accent">
                  {entry.period}
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-ink sm:text-2xl">
                  {entry.role}
                </h3>
                <div className="mt-1 text-sm text-ink-dim">
                  {entry.company} · {entry.location}
                </div>
                {entry.note ? (
                  <p className="mt-3 text-sm italic text-ink-dim/80">{entry.note}</p>
                ) : null}
                <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-dim"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
