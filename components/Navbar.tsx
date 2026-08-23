"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#expertise", label: "Expertise" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-base/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface font-[family-name:var(--font-display)] text-sm font-semibold text-accent transition-colors group-hover:border-accent/60">
            SR
          </span>
          <span className="font-mono-label hidden text-xs uppercase text-ink-dim sm:inline">
            Salman Rishad
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-label text-xs uppercase text-ink-dim transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono-label text-xs uppercase text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-base px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono-label text-sm uppercase text-ink-dim hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono-label text-xs uppercase text-ink hover:border-accent/60 hover:text-accent"
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
