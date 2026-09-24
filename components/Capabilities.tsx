"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capabilities } from "@/lib/content";
import { SectionHeading } from "./chrome";
import { Reveal } from "./motion";
import { cn } from "@/lib/utils";

type Tab = "web" | "automation";

export function Capabilities() {
  const [tab, setTab] = useState<Tab>("web");
  const active = capabilities[tab];

  return (
    <section aria-label="Capabilities" className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="02"
        eyebrow="What I do"
        title="Two disciplines, one goal: less friction."
        lede="Web development gives people something clear to use. Automation removes what they should never have had to do. I do both."
      />

      <Reveal className="mt-10">
        <div role="tablist" aria-label="Capabilities" className="flex gap-2">
          {(["web", "automation"] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full border px-6 py-3 font-display text-sm font-medium transition-all",
                tab === t
                  ? "border-accent bg-accent/15 text-white shadow-[0_0_24px_rgba(157,20,255,0.25)]"
                  : "border-white/12 text-body hover:border-white/30 hover:text-white"
              )}
            >
              {t === "web" ? "Web Development" : "Automation"}
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-white/10 bg-[#0d0714] p-7 md:p-9">
              <p className="font-mono text-xs text-accent2">{active.tag}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">{active.title}</h3>
              <p className="mt-3 leading-relaxed text-body">{active.intro}</p>
              <p className="mt-6 border-t hairline pt-5 text-sm text-muted">
                {tab === "web"
                  ? "Best for: landing pages, booking flows, portfolios, docs sites, small products."
                  : "Best for: follow-ups, data entry, notifications, reporting, tool glue."}
              </p>
            </div>
            <ul className="divide-y divide-white/10 border-y hairline">
              {active.items.map((item, i) => (
                <li key={item.name} className="group flex gap-5 py-5">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <div>
                    <h4 className="font-display text-lg font-medium transition-colors group-hover:text-accent2">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-body">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
