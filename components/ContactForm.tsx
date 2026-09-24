"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const types = ["Website", "Automation", "Website + Automation", "Something else"];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [type, setType] = useState(types[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (name.length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (message.length < 10) next.message = "Tell me a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setState("sending");
    // Simulated submission — wire to Formspree / Resend / API route later.
    setTimeout(() => setState("sent"), 900);
  };

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-8"
      >
        <p className="font-display text-2xl font-semibold">Message received.</p>
        <p className="mt-2 leading-relaxed text-body">
          Thanks for reaching out — I reply within 1–2 business days. If it&apos;s urgent, email me directly at{" "}
          <a className="u-link text-white" href="mailto:hello@prieltechhub.dev">hello@prieltechhub.dev</a>.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 rounded-full border border-white/20 px-5 py-2.5 text-sm hover:border-white/50"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  const input =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
          <input id="name" name="name" autoComplete="name" placeholder="Ada Lovelace" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          {errors.name && <p id="err-name" role="alert" className="mt-1.5 text-sm text-rose-300">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
          {errors.email && <p id="err-email" role="alert" className="mt-1.5 text-sm text-rose-300">{errors.email}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Project type</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-all ${type === t ? "border-accent bg-accent/15 text-white" : "border-white/12 text-body hover:border-white/30"}`}
            >
              <input
                type="radio"
                name="projectType"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you trying to build or fix? Timeline, budget range, and links help."
          className={`${input} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && <p id="err-message" role="alert" className="mt-1.5 text-sm text-rose-300">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_36px_rgba(157,20,255,0.5)] disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : "Send message →"}
      </button>
      <p className="text-xs text-muted">No spam, no newsletter trap. Your details stay between us.</p>
    </form>
  );
}
