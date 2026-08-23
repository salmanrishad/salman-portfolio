import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono-label text-[11px] uppercase text-ink-dim sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js · {profile.location}</span>
      </div>
    </footer>
  );
}
