import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile } from "@/lib/data";

const pillars = [
  {
    title: "Process maturity",
    body: "Led CMMI Level 5 and ISO 9001 implementations, embedding standards into how teams actually work.",
  },
  {
    title: "Full-spectrum testing",
    body: "From manual exploratory testing to automated frameworks in Cypress, Playwright, and Selenium.",
  },
  {
    title: "People, not just process",
    body: "Trained and mentored engineers so quality practices outlast any single project or release.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          label="About"
          title="Quality is the product, not a checkpoint before it."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr]">
          <Reveal delay={0.1} className="space-y-6">
            {profile.summary.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-dim">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card-glass rounded-2xl p-6 sm:p-8">
              <div className="font-mono-label text-xs uppercase text-accent">
                Why teams bring me in
              </div>
              <ul className="mt-6 space-y-5">
                {pillars.map((pillar) => (
                  <li key={pillar.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} />
                    <div>
                      <div className="font-medium text-ink">{pillar.title}</div>
                      <div className="mt-1 text-sm leading-relaxed text-ink-dim">
                        {pillar.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
