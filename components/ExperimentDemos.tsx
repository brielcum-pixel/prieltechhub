"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { experiments } from "@/lib/experiments";
import { Reveal } from "./motion";
import { cn } from "@/lib/utils";

/* ---------- E1: follow-up flow simulator ---------- */
const STEPS = [
  { id: "draft", label: "Auto-draft invoice", saves: 25, note: "Created when project is marked done." },
  { id: "remind", label: "Polite reminders", saves: 45, note: "Day 3, 7, 14 — stops on payment." },
  { id: "reconcile", label: "Auto-reconcile", saves: 30, note: "Stripe → dashboard, no sheet hunting." },
] as const;

function FollowupSim() {
  const [on, setOn] = useState<Record<string, boolean>>({ draft: true, remind: true, reconcile: false });
  const active = STEPS.filter((s) => on[s.id]);
  const saved = active.reduce((a, s) => a + s.saves, 0);
  const total = 140; // fictional-but-labeled weekly admin minutes baseline for the model
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Toggle automation steps">
        {STEPS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={!!on[s.id]}
            onClick={() => setOn((v) => ({ ...v, [s.id]: !v[s.id] }))}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all",
              on[s.id] ? "border-accent bg-accent/15 text-white" : "border-white/12 text-body hover:border-white/30"
            )}
          >
            {on[s.id] ? "● " : "○ "}{s.label}
          </button>
        ))}
      </div>
      <div className="mt-6" aria-live="polite">
        <div className="flex justify-between text-xs uppercase tracking-mega text-muted">
          <span>Weekly admin</span>
          <span>{total - saved} min left of {total} min</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
            animate={{ width: `${Math.round(((total - saved) / total) * 100)}%` }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </div>
        <ul className="mt-4 space-y-1.5 text-sm text-body">
          {active.length === 0 && <li className="text-muted">All manual — every minute is yours to lose.</li>}
          {active.map((s) => (
            <li key={s.id}><span className="text-emerald-400">−{s.saves} min</span> · {s.note}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">Illustrative model, not a measured claim.</p>
      </div>
    </div>
  );
}

/* ---------- E2: type scale playground ---------- */
function TypeScale() {
  const [size, setSize] = useState(72);
  return (
    <div>
      <p aria-live="polite" className="overflow-hidden font-display font-bold tracking-tighter" style={{ fontSize: `clamp(24px, ${size / 12}vw, ${size * 2}px)` }}>
        Workflow wizard
      </p>
      <label className="mt-5 block text-xs uppercase tracking-mega text-muted" htmlFor="type-size">
        Scale — {size}
      </label>
      <input
        id="type-size"
        type="range"
        min={32}
        max={120}
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        className="mt-2 w-full accent-[#9D14FF]"
      />
    </div>
  );
}

/* ---------- E3: motion timing study ---------- */
type Timing = { label: string; ms: number };
const TIMINGS: Timing[] = [
  { label: "Snappy · 350ms", ms: 350 },
  { label: "Editorial · 800ms", ms: 800 },
  { label: "Cinematic · 1400ms", ms: 1400 },
];

function MotionStudy() {
  const [key, setKey] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return (
    <div>
      <div className="grid gap-4">
        {TIMINGS.map((t) => (
          <div key={t.label} className="flex items-center gap-4">
            <span className="w-36 shrink-0 text-xs uppercase tracking-mega text-muted">{t.label}</span>
            <div className="h-10 flex-1 overflow-hidden rounded-lg border border-white/10 bg-black/50">
              <motion.div
                key={`${t.ms}-${key}`}
                className="h-full w-1/2 rounded-lg bg-gradient-to-r from-accent to-accent2"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={reduced ? { duration: 0 } : { duration: t.ms / 1000, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="mt-5 rounded-full border border-white/20 px-5 py-2.5 text-sm hover:border-accent"
      >
        Replay ↻
      </button>
      {reduced && <p className="mt-3 text-xs text-muted">Reduced motion detected — showing the instant fallback.</p>}
    </div>
  );
}

function Demo({ slug }: { slug: string }) {
  if (slug === "followup-simulator") return <FollowupSim />;
  if (slug === "type-scale") return <TypeScale />;
  return <MotionStudy />;
}

export function ExperimentDemos() {
  return (
    <div className="mt-12 space-y-6">
      {experiments.map((e, i) => (
        <Reveal key={e.slug} delay={i * 0.04}>
          <section aria-label={e.title} className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 md:p-9">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-xs text-accent2">{e.index}</span>
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{e.title}</h2>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-mega text-muted">
                {e.tag}
              </span>
            </div>
            <p className="mt-3 max-w-2xl leading-relaxed text-body">{e.description}</p>
            <p className="mt-1 text-sm text-accent2">↳ {e.tryThis}</p>
            <div className="mt-7 border-t hairline pt-7">
              <Demo slug={e.slug} />
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
