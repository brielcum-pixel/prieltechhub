import Link from "next/link";
import { baseMetadata } from "@/lib/seo";
import { experience } from "@/lib/content";
import { CTA, SectionHeading } from "@/components/chrome";
import { GlowBackground, Reveal } from "@/components/motion";
import { ProfilePlaceholder } from "@/components/sections";

export const metadata = baseMetadata({
  title: "About",
  description:
    "The person behind prieltechhub — a Web Developer + Automationist who builds modern websites and workflow systems. Story, approach, tools, and journey.",
  path: "/about",
});

const principles = [
  { title: "Clarity over cleverness", detail: "If a visitor can't explain the page in one sentence, the design failed. I cut until the message survives." },
  { title: "Automate the boring, keep the human", detail: "Systems draft, remind, and reconcile. People approve, decide, and relate. That boundary is deliberate." },
  { title: "Performance is respect", detail: "Fast pages respect visitors' time and data. Lean builds, optimized media, measured results." },
  { title: "Maintainable beats impressive", detail: "You should be able to extend the work without calling me at midnight. Clean structure, documented flows." },
];

const stack = ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "PostgreSQL", "Resend", "Vercel", "Make", "Airtable", "Stripe", "Notion API", "Webhooks", "Git"];

export default function AboutPage() {
  return (
    <>
      {/* 1. Intro / identity */}
      <section aria-label="About introduction" className="relative overflow-hidden pt-32 md:pt-40">
        <GlowBackground intensity="faint" />
        <div className="relative mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-mega text-accent2">About — the person behind the work</p>
            <h1 className="text-balance mt-4 max-w-3xl font-display text-5xl font-bold tracking-tighter md:text-7xl">
              Hi, I&apos;m the builder behind <span className="text-accent2">prieltechhub</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Web Developer + Automationist. I design and build digital experiences — and the quiet systems behind
              them that save hours every week.
            </p>
          </Reveal>

          {/* 2. Profile image area */}
          <div className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <Reveal>
              <ProfilePlaceholder size="lg" />
            </Reveal>
            <div className="space-y-6">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight">Personal story [placeholder — make it yours]</h2>
                <p className="mt-3 leading-relaxed text-body">
                  I started by building small websites for people around me — and kept noticing the same thing: the
                  website was only half the problem. Behind every slow site was a slower process: DMs instead of
                  bookings, spreadsheets instead of systems, memory instead of follow-up.
                </p>
              </Reveal>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight">How I started</h2>
                <p className="mt-3 leading-relaxed text-body">
                  With curiosity and client-style practice projects: responsive layouts, forms that actually send,
                  and small scripts that connected one tool to another. Each project taught me to ask a better
                  question — not “what should it look like?” but “what should it remove from your week?”
                </p>
              </Reveal>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight">What I learned</h2>
                <p className="mt-3 leading-relaxed text-body">
                  Design earns attention; systems earn trust. A beautiful page that loads slowly still loses. An
                  automation nobody understands still gets switched off. So I document, measure, and keep a human
                  in the loop wherever it matters.
                </p>
              </Reveal>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight">What I work on now</h2>
                <p className="mt-3 leading-relaxed text-body">
                  Modern marketing and booking websites, plus workflow automation: lead capture → follow-up,
                  invoicing → reminders, writing → publishing. If it&apos;s repetitive, I want to make it disappear.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Approach */}
      <section aria-label="Approach" className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="01"
          eyebrow="Approach"
          title="How I build: small, clear, and honest."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border hairline bg-white/10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="bg-[#0A0A0A] p-7">
              <p className="font-mono text-xs text-accent2">0{i + 1}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{p.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 8. Journey — scroll reveals */}
      <section aria-label="Journey" className="border-t hairline">
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
          <SectionHeading index="02" eyebrow="Journey" title="Experience, honestly labeled." lede="Replace these placeholders with your real roles when ready — the structure stays." />
          <ol className="mt-10">
            {experience.map((e, i) => (
              <Reveal key={e.period} delay={i * 0.05}>
                <li className="grid gap-2 border-t hairline py-8 md:grid-cols-[180px_1fr_1.2fr]">
                  <p className="font-mono text-sm text-accent2">{e.period}</p>
                  <h3 className="font-display text-xl font-semibold">{e.role}</h3>
                  <p className="max-w-lg text-[15px] leading-relaxed text-body">{e.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Tools */}
      <section aria-label="Tools" className="border-t hairline">
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-24">
          <SectionHeading index="03" eyebrow="Toolbox" title="Tools I reach for." />
          <Reveal className="mt-8 flex flex-wrap gap-2.5">
            {stack.map((t) => (
              <span key={t} className="rounded-full border border-white/12 px-4 py-2 text-sm text-body transition-colors hover:border-accent hover:text-white">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 10. Personality */}
      <section aria-label="Beyond work" className="border-t hairline">
        <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-24">
          <SectionHeading index="04" eyebrow="Beyond work" title="A few human details." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Night-shift tinkerer", "Best ideas arrive after hours — automating something small just to see if it can run itself."],
              ["Clarity nerd", "Strong opinions about readable pricing, honest timelines, and buttons that say what they do."],
              ["Forever student", "Currently exploring: better forms, calmer dashboards, and automations people actually trust."],
            ].map(([t, d]) => (
              <Reveal key={t as string}>
                <div className="h-full rounded-2xl border border-white/10 p-6">
                  <h3 className="font-display text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/contact" className="inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black">
              Work with me →
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA title="Like how I think?" sub="Let's turn it into something useful." />
    </>
  );
}
