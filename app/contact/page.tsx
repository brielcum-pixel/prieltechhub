import { baseMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { GlowBackground, Reveal } from "@/components/motion";

export const metadata = baseMetadata({
  title: "Contact",
  description:
    "Let's build something useful. Contact prieltechhub about websites, automation, or workflow systems — replies within 1–2 business days.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section aria-label="Contact" className="relative overflow-hidden pt-32 md:pt-40">
      <GlowBackground />
      <div className="relative mx-auto max-w-shell px-5 pb-24 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-mega text-accent2">Contact</p>
          <h1 className="text-balance mt-4 max-w-2xl font-display text-5xl font-bold tracking-tighter md:text-7xl">
            Let&apos;s build something useful.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            Tell me what you&apos;re trying to build or fix. I reply personally within 1–2 business days — no bots,
            no funnels.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 p-6">
                <h2 className="text-xs uppercase tracking-mega text-muted">Direct</h2>
                <a href={`mailto:${site.email}`} className="u-link mt-3 inline-block font-display text-xl font-medium">
                  {site.email}
                </a>
                <p className="mt-2 text-sm text-muted">{site.location}</p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6">
                <h2 className="text-xs uppercase tracking-mega text-muted">Elsewhere</h2>
                <ul className="mt-3 space-y-2.5 text-[15px]">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between">
                        <span>{s.label} <span className="text-muted">{s.handle}</span></span>
                        <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-1">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-dashed border-white/20 p-6">
                <h2 className="text-xs uppercase tracking-mega text-muted">What happens next</h2>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-body">
                  <li><strong className="text-white">1.</strong> You send context — goals, timeline, budget range.</li>
                  <li><strong className="text-white">2.</strong> I reply with honest scope and options.</li>
                  <li><strong className="text-white">3.</strong> We start small, ship, then expand what works.</li>
                </ol>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
