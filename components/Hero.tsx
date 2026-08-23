"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { profile, stats } from "@/lib/data";

function useTypedRoles(roles: string[]) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    const speed = deleting ? 35 : 65;
    const pause = 1600;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex, roles]);

  return text;
}

export function Hero() {
  const typed = useTypedRoles(profile.roles);

  return (
    <section
      id="top"
      className="bg-grid bg-noise relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(34,230,196,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono-label text-[11px] uppercase text-ink-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_theme(colors.accent)]" />
            Available for QA leadership &amp; consulting
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Salman Rishad
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 flex h-8 items-center font-mono-label text-lg text-accent sm:text-xl"
          >
            <span className="text-glow">{typed}</span>
            <span className="ml-1 h-6 w-[2px] animate-blink bg-accent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-dim"
          >
            {profile.tagline}. I turn ambiguous requirements into airtight,
            traceable quality — leading teams, standards, and automation for
            software that ships without surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono-label text-xs uppercase text-base transition-transform hover:-translate-y-0.5"
            >
              View my journey
              <ArrowDown size={14} />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 font-mono-label text-xs uppercase text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Download size={14} />
              Download CV
            </a>
            <span className="inline-flex items-center gap-1.5 font-mono-label text-xs uppercase text-ink-dim">
              <MapPin size={14} />
              {profile.location}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono-label text-[11px] uppercase text-ink-dim">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-3xl bg-[conic-gradient(from_180deg,rgba(34,230,196,0.35),transparent_35%,transparent_65%,rgba(255,176,32,0.25))] opacity-70 blur-2xl" />
          <div className="card-glass relative overflow-hidden rounded-3xl p-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border">
              <Image
                src={profile.photo}
                alt="Portrait of Salman Rishad"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 380px"
                className="object-cover grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 font-mono-label text-[10px] uppercase text-ink/90">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Status: Shipping quality
                </span>
                <span>DHK / BD</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
