import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { portfolioPlaceholders } from "@/lib/data";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative border-t border-border bg-surface/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          label="Portfolio"
          title="Case studies, in progress."
          description="This section is reserved for detailed write-ups and project links. Check back soon."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {portfolioPlaceholders.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="card-glass group relative h-full overflow-hidden rounded-2xl p-6">
                <div className="absolute right-5 top-5 text-ink-dim/40 transition-colors group-hover:text-accent">
                  <ArrowUpRight size={18} />
                </div>
                <h3 className="pr-6 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                  {item.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1 font-mono-label text-[10px] uppercase text-ink-dim">
                  <Clock size={12} />
                  Coming soon
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
