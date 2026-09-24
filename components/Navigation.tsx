"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled ? "border-white/10 bg-[#080808]/85 backdrop-blur-md" : "border-transparent bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 md:px-8">
          <Link href="/" className="font-display text-[15px] font-semibold tracking-tight" aria-label="prieltechhub home">
            prieltechhub<span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0]);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                    className="u-link text-[13px] tracking-wide text-body transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium transition-all hover:border-accent hover:shadow-[0_0_24px_rgba(157,20,255,0.35)]"
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-white"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl md:hidden"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]" style={{ background: "rgba(157,20,255,0.18)" }} />
            <nav aria-label="Mobile" className="flex h-full flex-col justify-center px-8 pt-16">
              <ul className="space-y-2">
                {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
                  <motion.li
                    key={item.label + item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-4 border-b hairline py-4"
                    >
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      <span className="font-display text-4xl font-medium tracking-tight transition-colors group-hover:text-accent">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-semibold"
                >
                  Start a conversation →
                </Link>
                <p className="mt-5 text-sm text-muted">{site.email}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
