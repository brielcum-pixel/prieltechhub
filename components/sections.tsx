import { experience, testimonials } from "@/lib/content";
import { SectionHeading } from "./chrome";
import { Reveal } from "./motion";

export function Experience({ compact = false }: { compact?: boolean }) {
  return (
    <section id="experience" aria-label="Experience" className="mx-auto max-w-shell scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="03"
        eyebrow="Experience / Journey"
        title="Learning in public, shipping along the way."
        lede="A compact timeline you can update with real roles. Each entry is structured so swapping placeholder copy for real history takes minutes."
      />
      <ol className="mt-12 space-y-0">
        {experience.map((item, i) => (
          <Reveal key={item.period} delay={i * 0.06}>
            <li className="grid gap-2 border-t hairline py-8 md:grid-cols-[180px_1fr_1.2fr] md:gap-8">
              <p className="font-mono text-sm text-accent2">{item.period}</p>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{item.role}</h3>
                <p className="mt-1 text-xs uppercase tracking-mega text-muted">{item.focus}</p>
              </div>
              <p className="max-w-lg text-[15px] leading-relaxed text-body">{item.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      {!compact && (
        <p className="mt-6 text-sm text-muted">
          Full story on the <a href="/about" className="u-link text-white">About page</a> — how I started, what I
          learned, and what I work on now.
        </p>
      )}
    </section>
  );
}

export function Testimonials() {
  return (
    <section aria-label="Testimonials" className="border-t hairline">
      <div className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="04"
          eyebrow="Social proof"
          title="Kind words, clearly labeled."
          lede="Real testimonials will live here. Until then, these marked placeholders show exactly where they go — no fake names, no invented companies."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <figure className="h-full rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-7">
                <p className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-mega text-muted">
                  Placeholder — replace me
                </p>
                <blockquote className="mt-4 font-display text-xl leading-snug text-white/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  {t.name} · {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProfilePlaceholder({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <div
      role="img"
      aria-label="Profile photo placeholder — replace with your real photo at public/profile.jpg"
      className={
        size === "lg"
          ? "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0714]"
          : "relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0714]"
      }
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full blur-[90px]"
        style={{ background: "rgba(157,20,255,0.25)" }}
      />
      <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
        <div aria-hidden="true" className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 font-display text-2xl font-bold text-accent2">
          P
        </div>
        <p className="mt-5 font-display text-lg font-medium">Your photo here</p>
        <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-muted">
          Drop <code className="text-white/80">profile.jpg</code> into <code className="text-white/80">/public</code> —
          layout stays identical.
        </p>
        <p className="mt-4 rounded-full border border-dashed border-white/25 px-3 py-1 font-mono text-[11px] text-muted">
          public/profile.jpg · 800×1000
        </p>
      </div>
    </div>
  );
}
