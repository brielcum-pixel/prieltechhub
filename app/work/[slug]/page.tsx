import Link from "next/link";
import { notFound } from "next/navigation";
import { baseMetadata } from "@/lib/seo";
import { getProject, projects } from "@/lib/projects";
import { CTA } from "@/components/chrome";
import { Reveal } from "@/components/motion";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return baseMetadata({
    title: p.title,
    description: p.summary,
    path: `/work/${p.slug}`,
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const sections = [
    { n: "01", title: "Project overview", body: p.objective },
    { n: "02", title: "Problem", body: p.problem },
    { n: "03", title: "Solution", body: p.solution },
    { n: "04", title: "Reflection", body: p.reflection },
  ];

  return (
    <>
      <article className="pt-32 md:pt-40">
        <div className="mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <Link href="/work" className="text-sm text-muted hover:text-white">← All work</Link>
            <p className="mt-6 font-mono text-xs text-accent2">{p.index} — {p.category} · {p.year}</p>
            <h1 className="text-balance mt-4 max-w-3xl font-display text-4xl font-bold tracking-tighter md:text-6xl">
              {p.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{p.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-white/5 sm:grid-cols-4">
              {[
                ["Role", p.role],
                ["Year", p.year],
                ["Category", p.category.split("·")[0].trim()],
                ["Stack", p.stack.slice(0, 2).join(" + ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#0A0A0A] px-5 py-4">
                  <dt className="text-xs uppercase tracking-mega text-muted">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Visual narrative banner */}
          <Reveal className="mt-12">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12"
              style={{ background: `linear-gradient(135deg, ${p.palette.from}, #0A0A0A 75%)` }}
            >
              <div aria-hidden="true" className="absolute right-[-5%] top-[-30%] h-72 w-72 rounded-full blur-[90px]" style={{ background: p.palette.glow }} />
              <p className="relative font-display text-2xl font-medium leading-snug md:text-3xl">
                “{p.solution.split(".")[0]}.”
              </p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Case body — not cards */}
          <div className="mt-16 grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
            <aside className="md:sticky md:top-24 md:self-start">
              <p className="text-xs uppercase tracking-mega text-muted">On this page</p>
              <ol className="mt-4 space-y-2.5 text-sm text-body">
                {sections.map((s) => (
                  <li key={s.n}><a className="hover:text-white" href={`#s-${s.n}`}>{s.n} — {s.title}</a></li>
                ))}
                <li><a className="hover:text-white" href="#s-process">P — Process</a></li>
                <li><a className="hover:text-white" href="#s-result">R — Result</a></li>
              </ol>
            </aside>
            <div>
              {sections.slice(0, 2).map((s) => (
                <Reveal key={s.n}>
                  <section id={`s-${s.n}`} aria-label={s.title} className="scroll-mt-28 border-t hairline py-10">
                    <p className="font-mono text-xs text-accent2">{s.n}</p>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{s.title}</h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-body">{s.body}</p>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section id="s-process" aria-label="Process" className="scroll-mt-28 border-t hairline py-10">
                  <p className="font-mono text-xs text-accent2">P</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Process</h2>
                  <ol className="mt-6 space-y-5">
                    {p.process.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 font-mono text-xs text-accent2">
                          {i + 1}
                        </span>
                        <p className="max-w-2xl leading-relaxed text-body">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>

              {sections.slice(2).map((s) => (
                <Reveal key={s.n}>
                  <section id={`s-${s.n}`} aria-label={s.title} className="scroll-mt-28 border-t hairline py-10">
                    <p className="font-mono text-xs text-accent2">{s.n}</p>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{s.title}</h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-body">{s.body}</p>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section id="s-result" aria-label="Result" className="scroll-mt-28 border-b border-t hairline py-10">
                  <p className="font-mono text-xs text-accent2">R</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Result</h2>
                  <ul className="mt-6 space-y-3">
                    {p.result.map((r) => (
                      <li key={r} className="flex gap-3">
                        <span aria-hidden="true" className="mt-1 text-emerald-400">✓</span>
                        <p className="max-w-2xl leading-relaxed text-body">{r}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
                    Note: outcomes are described qualitatively. No invented metrics, awards, or client logos.
                  </p>
                </section>
              </Reveal>
            </div>
          </div>

          {/* Next project */}
          <nav aria-label="Next project" className="py-16">
            <Reveal>
              <Link
                href={next.linkHref}
                className="group block rounded-2xl border border-white/10 p-8 transition-colors hover:border-accent md:p-10"
              >
                <p className="text-xs uppercase tracking-mega text-muted">Next case study</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight group-hover:text-accent2 md:text-4xl">
                  {next.title} →
                </p>
              </Link>
            </Reveal>
          </nav>
        </div>
      </article>
      <CTA />
    </>
  );
}
