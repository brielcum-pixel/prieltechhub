import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { CTA, SectionHeading } from "@/components/chrome";
import { GlowBackground, Reveal } from "@/components/motion";

export const metadata = baseMetadata({
  title: "Work",
  description:
    "Selected case studies by prieltechhub — websites and automation systems with Problem, Process, Solution, and Result breakdowns.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section aria-label="Work introduction" className="relative overflow-hidden pt-32 md:pt-40">
        <GlowBackground intensity="faint" />
        <div className="relative mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-mega text-accent2">Work — case studies</p>
            <h1 className="text-balance mt-4 max-w-3xl font-display text-5xl font-bold tracking-tighter md:text-7xl">
              Selected work.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Realistic project stories across web development and automation. Each one shows the problem, the
              process, the solution — and what changed.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="All projects" className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24">
        <SectionHeading index="01" eyebrow="Index" title="Three stories, two disciplines." />
        <ol className="mt-10">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <li className="group border-t hairline py-8 last:border-b">
                <Link href={p.linkHref} className="grid gap-4 md:grid-cols-[80px_1fr_auto] md:items-baseline">
                  <span className="font-mono text-sm text-accent2">{p.index}</span>
                  <span>
                    <span className="block font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent2 md:text-3xl">
                      {p.title}
                    </span>
                    <span className="mt-2 block text-sm text-muted">{p.category} · {p.year} · {p.stack.join(" · ")}</span>
                  </span>
                  <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1.5">→</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-14 space-y-14">
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <article
                aria-label={p.title}
                className="overflow-hidden rounded-2xl border border-white/10"
                style={{ background: `linear-gradient(150deg, ${p.palette.from}, #0A0A0A 70%)` }}
              >
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="p-7 md:p-10">
                    <p className="font-mono text-xs text-accent2">{p.index} — {p.category}</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h2>
                    <p className="mt-4 leading-relaxed text-body">{p.summary}</p>
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-mega text-muted">Result</p>
                      <p className="mt-2 text-[15px] text-white/90">{p.result[0]}</p>
                    </div>
                    <Link
                      href={p.linkHref}
                      className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                    >
                      {p.linkLabel} →
                    </Link>
                  </div>
                  <div className="border-t hairline p-7 md:border-l md:border-t-0 md:p-10">
                    <p className="text-xs uppercase tracking-mega text-muted">Objective</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{p.objective}</p>
                    <p className="mt-6 text-xs uppercase tracking-mega text-muted">Stack</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
