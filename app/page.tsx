import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/writing";
import { experiments } from "@/lib/experiments";
import { Hero } from "@/components/Hero";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Capabilities } from "@/components/Capabilities";
import { Experience, Testimonials } from "@/components/sections";
import { CTA, SectionHeading } from "@/components/chrome";
import { Reveal } from "@/components/motion";

export const metadata = baseMetadata({
  title: "prieltechhub — Web Developer + Automationist",
  description:
    "Web dev by day, workflow wizard by night. Modern websites and workflow automation for people who want to work smarter.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 01 — Introduction */}
      <section aria-label="About preview" className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="01"
          eyebrow="Introduction"
          title="Websites people enjoy. Workflows teams feel."
          lede="I'm prieltechhub — I build modern websites and connect the tools behind them. The site is what visitors see; the automation is what owners feel every week: fewer repetitive tasks, faster follow-ups, calmer operations."
        />
        <Reveal className="mt-8 flex flex-wrap gap-3">
          <Link href="/about" className="rounded-full border border-white/15 px-6 py-3 text-sm hover:border-accent">
            The person behind the work →
          </Link>
          <Link href="/work" className="rounded-full border border-white/15 px-6 py-3 text-sm hover:border-accent">
            Selected work
          </Link>
        </Reveal>
      </section>

      {/* Selected work — editorial, varied */}
      <section aria-label="Selected work" className="border-t hairline">
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
          <SectionHeading
            index="02"
            eyebrow="Selected work"
            title="Work that tells a story, not just screenshots."
            lede="Each project follows Problem → Process → Solution → Result. Hover any row for a live case preview."
          />
          <div className="mt-6">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <ProjectPreview project={p} flip={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
          <div className="border-b hairline" aria-hidden="true" />
          <Reveal className="mt-8">
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black">
              All case studies <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Capabilities />
      <div className="border-t hairline">
        <Experience compact />
      </div>
      <Testimonials />

      {/* Writing + Lab teaser */}
      <section aria-label="Writing and experiments" className="border-t hairline">
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
          <SectionHeading
            index="05"
            eyebrow="Writing / Lab"
            title="Thinking, in public."
            lede="Short notes on the craft — and interactive toys built from the same ideas."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <Link href="/writing" className="group block h-full rounded-2xl border border-white/10 p-7 transition-colors hover:border-accent md:p-8">
                <p className="text-xs uppercase tracking-mega text-accent2">Writing — {posts.length} notes</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight group-hover:text-accent2">
                  {posts[0].title} →
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">{posts[0].excerpt}</p>
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <Link href="/experiments" className="group block h-full rounded-2xl border border-white/10 p-7 transition-colors hover:border-accent md:p-8">
                <p className="text-xs uppercase tracking-mega text-accent2">Lab — {experiments.length} experiments</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight group-hover:text-accent2">
                  {experiments[0].title} →
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">{experiments[0].description}</p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
