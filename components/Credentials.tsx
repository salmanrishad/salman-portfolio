import { Award, GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { certifications, education } from "@/lib/data";

export function Credentials() {
  return (
    <section className="relative border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          label="Credentials"
          title="Education & certifications."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-2 font-mono-label text-xs uppercase text-ink-dim">
              <GraduationCap size={16} className="text-accent" />
              Education
            </div>
            <ul className="mt-6 space-y-6">
              {education.map((item) => (
                <li key={item.degree} className="border-l-2 border-border pl-5">
                  <div className="font-medium text-ink">{item.degree}</div>
                  <div className="mt-1 text-sm text-ink-dim">{item.institute}</div>
                  <div className="mt-1 font-mono-label text-[11px] uppercase text-accent">
                    {item.year}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 font-mono-label text-xs uppercase text-ink-dim">
              <Award size={16} className="text-accent" />
              Certifications &amp; training
            </div>
            <ul className="mt-6 space-y-4">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="card-glass rounded-xl px-5 py-4 text-sm text-ink-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
