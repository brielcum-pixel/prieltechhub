import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import { formatDate, posts } from "@/lib/writing";
import { CTA, SectionHeading } from "@/components/chrome";
import { GlowBackground, Reveal } from "@/components/motion";

export const metadata = baseMetadata({
  title: "Writing",
  description:
    "Notes by prieltechhub on web development and automation — forms that convert, workflows people trust, performance budgets.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <>
      <section aria-label="Writing introduction" className="relative overflow-hidden pt-32 md:pt-40">
        <GlowBackground intensity="faint" />
        <div className="relative mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-mega text-accent2">Writing — notes &amp; thinking</p>
            <h1 className="text-balance mt-4 max-w-3xl font-display text-5xl font-bold tracking-tighter md:text-7xl">
              Notes, not content.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Short, practical posts on building websites and automations. New entries are added as data in{" "}
              <code className="text-white/80">lib/writing.ts</code> — no restructuring needed.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="All articles" className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24">
        <SectionHeading index="01" eyebrow="Index" title="Start with any of these." />
        <ol className="mt-10">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <li className="border-t hairline py-8 last:border-b">
                <Link href={`/writing/${p.slug}`} className="group grid gap-3 md:grid-cols-[90px_1fr_auto] md:items-baseline">
                  <span className="font-mono text-sm text-accent2">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent2 md:text-3xl">
                      {p.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-[15px] leading-relaxed text-body">{p.excerpt}</span>
                    <span className="mt-3 block text-xs uppercase tracking-mega text-muted">
                      {p.tag} · {formatDate(p.date)} · {p.readingTime}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1.5">→</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <CTA title="Want the longer version?" sub="These notes come from real builds. Let's talk about yours." />
    </>
  );
}
