import { baseMetadata } from "@/lib/seo";
import { CTA, SectionHeading } from "@/components/chrome";
import { GlowBackground, Reveal } from "@/components/motion";
import { ExperimentDemos } from "@/components/ExperimentDemos";

export const metadata = baseMetadata({
  title: "Lab",
  description:
    "Interactive experiments by prieltechhub — automation logic, typography, and motion studies. Play with the ideas behind the work.",
  path: "/experiments",
});

export default function ExperimentsPage() {
  return (
    <>
      <section aria-label="Experiments introduction" className="relative overflow-hidden pt-32 md:pt-40">
        <GlowBackground intensity="faint" />
        <div className="relative mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-mega text-accent2">Lab — experiments</p>
            <h1 className="text-balance mt-4 max-w-3xl font-display text-5xl font-bold tracking-tighter md:text-7xl">
              Small toys, serious ideas.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Interactive sketches of the thinking behind client work. Everything runs locally in your browser —
              new experiments are one object in <code className="text-white/80">lib/experiments.ts</code> plus a demo
              block.
            </p>
          </Reveal>
          <SectionHeading
            index="01"
            eyebrow="Try them"
            title="Three experiments, zero setup."
          />
          <ExperimentDemos />
          <div className="h-20" aria-hidden="true" />
        </div>
      </section>

      <CTA title="Like how these think?" sub="Imagine this rigor applied to your project." />
    </>
  );
}
