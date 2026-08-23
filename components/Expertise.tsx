import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skillCategories, tools } from "@/lib/data";

export function Expertise() {
  return (
    <section id="expertise" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          label="Expertise"
          title="A quality toolkit that spans process, people, and pipelines."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.08}>
              <div className="card-glass group h-full rounded-2xl p-6 transition-colors hover:border-accent/40">
                <div className="font-mono-label text-[11px] uppercase text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-ink-dim">{category.description}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-sm text-ink-dim">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16">
          <div className="font-mono-label text-xs uppercase text-ink-dim">
            Tools &amp; platforms
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink-dim transition-colors hover:border-accent/50 hover:text-ink"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
