"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Signature interaction: editorial project rows.
 * Hovering (desktop) reveals a floating preview card that follows the
 * cursor with spring physics; on touch, the inline visual is shown instead.
 * Scroll reveals + metadata complete the case-study preview.
 */
export function ProjectPreview({ project, flip = false }: { project: Project; flip?: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });

  const onMove = (e: MouseEvent) => {
    const r = rowRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <div
      ref={rowRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={cn("group relative border-t hairline py-10 md:py-14", flip && "md:[direction:rtl]")}
    >
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12 md:[direction:ltr]">
        {/* Visual — CSS-composed editorial preview (no stock, no heavy assets) */}
        <Link
          href={project.linkHref}
          aria-label={`${project.title} — ${project.linkLabel}`}
          className="relative block overflow-hidden rounded-2xl border border-white/10"
          style={{ background: `linear-gradient(135deg, ${project.palette.from}, ${project.palette.to})` }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(60% 60% at 50% 60%, ${project.palette.glow}, transparent)` }}
          />
          <div className="relative aspect-[16/10] p-6 md:p-8">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-mega text-white/60">
              <span>{project.index} — {project.year}</span>
              <span>{project.category.split("·")[0]}</span>
            </div>
            <div className="mt-6 rounded-xl border border-white/15 bg-black/40 p-5 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 md:mt-8 md:p-6">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>
              <p className="mt-4 font-display text-xl font-semibold leading-snug md:text-2xl">
                {project.title.split("—")[0]}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/70">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-accent2 transition-all duration-700 group-hover:w-full" />
              </div>
            </div>
          </div>
        </Link>

        {/* Copy */}
        <div>
          <p className="font-mono text-xs text-accent2">{project.index} / {project.category}</p>
          <h3 className="text-balance mt-3 font-display text-2xl font-semibold tracking-tight md:text-4xl">
            <Link href={project.linkHref} className="transition-colors group-hover:text-accent2">
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-lg leading-relaxed text-body">{project.summary}</p>
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-muted">
            <div><dt className="inline uppercase tracking-widest">Role — </dt><dd className="inline text-body">{project.role}</dd></div>
            <div><dt className="inline uppercase tracking-widest">Stack — </dt><dd className="inline text-body">{project.stack.join(" · ")}</dd></div>
          </dl>
          <Link
            href={project.linkHref}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            <span className="u-link">{project.linkLabel}</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Floating cursor-following preview (desktop only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-10 hidden w-64 rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur-md lg:block"
        style={{ x: sx, y: sy }}
        initial={false}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.92 }}
        transition={{ duration: 0.25 }}
      >
        <p className="text-[11px] uppercase tracking-mega text-accent2">Case preview</p>
        <p className="mt-2 text-sm leading-snug text-white/85"><strong>Problem:</strong> {project.problem.slice(0, 90)}…</p>
        <p className="mt-2 text-sm leading-snug text-white/85"><strong>Result:</strong> {project.result[0]}</p>
      </motion.div>
    </div>
  );
}
