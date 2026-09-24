export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  role: string;
  stack: string[];
  year: string;
  summary: string;
  objective: string;
  problem: string;
  process: string[];
  solution: string;
  result: string[];
  reflection: string;
  linkLabel: string;
  linkHref: string;
  palette: { from: string; to: string; glow: string };
  layout: "featured" | "offset" | "wide";
};

export const projects: Project[] = [
  {
    slug: "northwind-bookings",
    index: "01",
    title: "Northwind Studio — Booking site that sells while you sleep",
    category: "Web Development · Booking Experience",
    role: "Design + Build",
    stack: ["Next.js", "TypeScript", "Tailwind", "Resend", "Vercel"],
    year: "2025",
    summary:
      "A fast, calm booking website for a small services studio. Clients can read, choose, and book in under two minutes — no phone tag, no lost DMs.",
    objective:
      "Replace a patchwork of Instagram DMs and spreadsheets with one clear booking flow that builds trust and captures enquiries day and night.",
    problem:
      "The studio was losing enquiries. Prices lived in screenshots, availability lived in someone's head, and every booking took five or more messages back and forth. Mobile visitors bounced because the old page was slow and hard to read.",
    process: [
      "Mapped the real booking journey from first visit to confirmed appointment, and cut everything that was not decision, date, or deposit.",
      "Designed mobile-first: one idea per screen, large type, sticky booking action, and honest pricing up front.",
      "Built a lightweight stack with server-side validation, spam protection, and instant email confirmations — no heavy CMS to maintain.",
    ],
    solution:
      "A three-screen booking experience: services with clear outcomes, a focused booking form with smart defaults, and a confirmation state that sets expectations. The owner manages availability from a single inbox instead of three apps.",
    result: [
      "Booking enquiries arrive complete — service, date range, and context included",
      "Noticeably fewer back-and-forth messages before confirmation",
      "Sub-second page loads on mobile and a flow the owner can explain in one sentence",
    ],
    reflection:
      "Constraint was the feature. Removing options increased completions. If I rebuilt it, I would add a simple availability calendar next — the current email-confirm step is honest, but a live slot picker is the obvious v2.",
    linkLabel: "Read case study",
    linkHref: "/work/northwind-bookings",
    palette: { from: "#1b0b2e", to: "#0a0a0a", glow: "rgba(157,20,255,0.35)" },
    layout: "featured",
  },
  {
    slug: "invoice-autopilot",
    index: "02",
    title: "Invoice Autopilot — From inbox chaos to paid on time",
    category: "Automation · Workflow System",
    role: "Automation Architect",
    stack: ["Make", "Airtable", "Stripe", "Gmail API", "Webhooks"],
    year: "2025",
    summary:
      "An automation that watches a freelancer's inbox and tools, drafts invoices, chases late payments politely, and logs everything in one dashboard.",
    objective:
      "Remove the weekly admin scramble: forgotten invoices, awkward follow-ups, and revenue scattered across tools.",
    problem:
      "Invoicing happened when there was time — which meant late. Payment status lived across email, Stripe, and memory. Follow-ups felt personal and were avoided, so cash flow suffered quietly.",
    process: [
      "Audited two weeks of real invoices and follow-ups to find the repeatable 80% worth automating.",
      "Designed a human-in-the-loop flow: automation drafts and reminds, the human approves and sends anything sensitive.",
      "Added guardrails — idempotency keys, duplicate checks, and a single Airtable source of truth — so the system fails safe, not loud.",
    ],
    solution:
      "When a project is marked done, a draft invoice is created, a polite sequence of reminders is scheduled, and payments reconcile automatically. The owner sees one board: to draft, awaiting payment, and paid.",
    result: [
      "Weekly admin time reduced to a short review instead of an afternoon of chasing",
      "Every invoice followed up consistently and politely — nothing slips",
      "One dashboard answers 'who owes what' without opening four apps",
    ],
    reflection:
      "Automation earns trust by being boring and predictable. The approval step looked like friction on paper but is exactly why the owner trusts it with client-facing messages.",
    linkLabel: "Read case study",
    linkHref: "/work/invoice-autopilot",
    palette: { from: "#120917", to: "#0a0a0a", glow: "rgba(200,88,198,0.28)" },
    layout: "offset",
  },
  {
    slug: "harbor-docs",
    index: "03",
    title: "Harbor Docs — A knowledge base the team actually uses",
    category: "Web Development · Automation-Assisted Content",
    role: "Design + Build + Automate",
    stack: ["Next.js", "MDX", "Tailwind", "Notion API", "Vercel"],
    year: "2024",
    summary:
      "A fast documentation site for a small team where writing happens in Notion and publishing happens automatically — no deploy rituals, no stale pages.",
    objective:
      "Make internal knowledge searchable, current, and painless to maintain for a non-technical team.",
    problem:
      "Guides lived in chat threads and outdated PDFs. Nobody trusted the docs, so everyone asked the same questions. The previous wiki was slow and editing felt like filing paperwork.",
    process: [
      "Kept authoring where the team already writes (Notion) and made the website a read-optimized mirror, not another editor to learn.",
      "Built a sync pipeline with content validation — broken links and missing titles are flagged before publish, not after.",
      "Designed for scanning: strong headings, jump links, and search that tolerates typos and jargon.",
    ],
    solution:
      "Editors write in Notion; a scheduled sync validates and publishes to a fast static site. Search, version history, and ownership labels make each page feel maintained rather than abandoned.",
    result: [
      "Repeated questions dropped because answers are findable in seconds",
      "Publishing friction near zero — writing is the deploy step",
      "Pages carry owners and freshness dates, so trust is visible",
    ],
    reflection:
      "This is where web dev and automation meet best: the site is only half the product, the pipeline is the other half. Next iteration would add analytics on failed searches to guide what to write next.",
    linkLabel: "Read case study",
    linkHref: "/work/harbor-docs",
    palette: { from: "#170b26", to: "#080808", glow: "rgba(157,20,255,0.3)" },
    layout: "wide",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
