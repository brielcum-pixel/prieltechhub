"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowBackground({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "default" | "strong" | "faint";
}) {
  const opacity =
    intensity === "strong" ? "opacity-100" : intensity === "faint" ? "opacity-60" : "opacity-80";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute left-1/2 top-[-20%] h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]",
          opacity
        )}
        style={{ background: "radial-gradient(closest-side, rgba(157,20,255,0.22), transparent)" }}
      />
      <div
        className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(200,88,198,0.12), transparent)" }}
      />
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * HydrationGuard cancels the no-JS fallback timer (see layout) as soon as
 * React mounts. If the bundle never runs, the timer fires and forces
 * motion-hidden content visible via CSS — the page stays readable.
 */
export function HydrationGuard() {
  useEffect(() => {
    (window as unknown as { __cancelMotionFallback?: () => void }).__cancelMotionFallback?.();
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}
