import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <div className="flex items-center gap-3 font-mono-label text-xs text-accent uppercase">
        <span className="h-px w-8 bg-accent/60" />
        {index} — {label}
      </div>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-ink-dim leading-relaxed">{description}</p>
      ) : null}
    </Reveal>
  );
}
