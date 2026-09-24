import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-shell px-5 pb-24 pt-40 text-center md:px-8" aria-label="Page not found">
      <p className="font-mono text-sm text-accent2">404</p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tighter md:text-7xl">Lost in the workflow.</h1>
      <p className="mx-auto mt-5 max-w-md text-body">
        This page doesn&apos;t exist — but your idea still could. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black">Home</Link>
        <Link href="/contact" className="rounded-full border border-white/20 px-7 py-3.5 text-sm">Contact →</Link>
      </div>
    </section>
  );
}
