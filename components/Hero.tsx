"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { AnimatedLines, GlowBackground } from "./motion";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden pt-32 md:pt-40">
      <GlowBackground />
      <div className="relative mx-auto max-w-shell px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-mega text-muted"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Available for new projects
          </span>
          <span className="hidden sm:inline">{site.role}</span>
        </motion.div>

        <h1 className="mt-8 font-display font-bold tracking-tighter">
          <AnimatedLines
            className="block text-[13vw] leading-[0.95] sm:text-7xl md:text-8xl"
            lines={["Web dev by day,"]}
          />
          <span className="block overflow-hidden">
            <motion.span
              className="block bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-[13vw] leading-[0.95] text-transparent sm:text-7xl md:text-8xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.39, ease: [0.2, 0.8, 0.2, 1] }}
            >
              workflow wizard
            </motion.span>
          </span>
          <AnimatedLines className="block text-[13vw] leading-[0.95] sm:text-7xl md:text-8xl" lines={["by night."]} />
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="max-w-xl text-lg leading-relaxed text-body"
          >
            {site.description} I care about design, usability, performance — and work that actually pays off.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/work"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              View my work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-white"
            >
              Let&apos;s talk →
            </Link>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-white/5 sm:grid-cols-4"
        >
          {[
            ["Websites", "Modern, responsive"],
            ["Experiences", "Clear + usable"],
            ["Automations", "APIs + workflows"],
            ["Focus", "Results, not noise"],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#0A0A0A] px-5 py-4">
              <dt className="text-xs uppercase tracking-mega text-muted">{k}</dt>
              <dd className="mt-1 text-sm text-white">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
