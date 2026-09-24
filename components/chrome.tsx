import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "./motion";

export function Footer() {
  return (
    <footer className="border-t hairline" aria-label="Footer">
      <div className="mx-auto max-w-shell px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              prieltechhub<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-body">
              Web Developer + Automationist. I build modern websites and workflow systems for people who want to
              work smarter.
            </p>
            <a href={`mailto:${site.email}`} className="u-link mt-4 inline-block text-sm text-white">
              {site.email}
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs uppercase tracking-mega text-muted">Sitemap</p>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li><Link className="hover:text-white" href="/">Home</Link></li>
              <li><Link className="hover:text-white" href="/work">Work</Link></li>
              <li><Link className="hover:text-white" href="/about">About</Link></li>
              <li><Link className="hover:text-white" href="/writing">Writing</Link></li>
              <li><Link className="hover:text-white" href="/experiments">Lab</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div>
            <p className="text-xs uppercase tracking-mega text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                    {s.label} <span className="text-muted">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t hairline pt-6 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} prieltechhub. All rights reserved.</span>
          <span>Built with Next.js · Designed with intent</span>
        </div>
      </div>
      <Reveal className="overflow-hidden" y={10}>
        <p aria-hidden="true" className="select-none text-center font-display text-[16vw] font-bold leading-[0.85] tracking-tighter text-white/[0.04] md:text-[11rem]">
          prieltechhub
        </p>
      </Reveal>
    </footer>
  );
}

export function CTA({
  title = "Have an idea worth building?",
  sub = "Let's turn it into something useful.",
  cta = "Start a conversation",
}: {
  title?: string;
  sub?: string;
  cta?: string;
}) {
  return (
    <section aria-label="Call to action" className="relative overflow-hidden border-t hairline">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" style={{ background: "radial-gradient(closest-side, rgba(157,20,255,0.20), transparent)" }} />
      <div className="relative mx-auto max-w-shell px-5 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-mega text-accent2">Next step</p>
          <h2 className="text-balance mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-body">{sub}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_40px_rgba(157,20,255,0.5)]"
          >
            {cta} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-accent2">{index}</span>
        <p className="text-xs uppercase tracking-mega text-muted">{eyebrow}</p>
      </div>
      <h2 className="text-balance mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-xl leading-relaxed text-body">{lede}</p>}
    </Reveal>
  );
}
