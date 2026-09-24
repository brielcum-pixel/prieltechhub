export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readingTime: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "forms-that-get-replies",
    title: "Forms that get replies: what I cut from every contact flow",
    excerpt:
      "Most contact forms ask too much, validate too late, and confirm too vaguely. Here's the short checklist I apply to every form I build.",
    tag: "Web Development",
    date: "2026-03-14",
    readingTime: "5 min",
    body: [
      {
        type: "p",
        text: "A contact form is a negotiation. The visitor offers attention and personal details; you offer a fast, useful reply. Every extra field raises the price. Most forms I inherit are overpriced — [replace with your own observations as you publish real posts].",
      },
      { type: "h2", text: "1. Ask for the minimum that lets you reply well" },
      {
        type: "p",
        text: "Name, email, and one open question beat eight precise fields. Project type as a single-select helps you triage without interrogating. Budget and timeline can be optional — interested people will volunteer them.",
      },
      {
        type: "list",
        items: [
          "Required: name, email, message (with a real minimum length)",
          "Single-select: project type, so replies can be specific",
          "Optional: budget range, timeline, links",
          "Never required on first contact: phone number, company size, 'how did you hear about us'",
        ],
      },
      { type: "h2", text: "2. Validate inline, confirm explicitly" },
      {
        type: "p",
        text: "Errors should appear next to the field, on submit, written like a person: 'Enter a valid email address' beats 'Invalid input'. And the success state must answer three questions: did it send, what happens next, and when.",
      },
      {
        type: "quote",
        text: "A form's success state is a promise. 'Message received — I reply within 1–2 business days' is a promise. 'Thank you for your submission' is a shrug.",
      },
      { type: "h2", text: "3. The contact form on this site" },
      {
        type: "p",
        text: "This site's own form follows the checklist: labeled fields, inline errors, a project-type selector, and a confirmation that sets expectations. The submission is currently simulated — the validation and states are real, the backend hookup is one function in ContactForm.tsx.",
      },
    ],
  },
  {
    slug: "automation-people-trust",
    title: "Automation people trust is boring on purpose",
    excerpt:
      "The automations that survive are predictable, visible, and easy to stop. Notes on human-in-the-loop design from building follow-up and invoicing flows.",
    tag: "Automation",
    date: "2026-02-02",
    readingTime: "6 min",
    body: [
      {
        type: "p",
        text: "Nobody trusts a workflow they can't see, stop, or correct. The most common reason automations get switched off isn't failure — it's mystery. Someone receives a message they didn't expect, asks who sent it, and the answer is a shrug.",
      },
      { type: "h2", text: "Draft, don't send" },
      {
        type: "p",
        text: "For anything client-facing — invoices, follow-ups, outreach — the automation should draft and schedule, and a human should approve. The approval step looks like friction. It is actually the feature that lets the owner sleep.",
      },
      {
        type: "list",
        items: [
          "One source of truth (a board or sheet) showing draft → scheduled → sent → paid",
          "Idempotency: the same trigger twice must never send twice",
          "Every automated message labeled internally with which flow sent it",
          "A single off-switch per flow, not per message",
        ],
      },
      { type: "h2", text: "Fail safe, not loud" },
      {
        type: "p",
        text: "When data is missing, the flow should pause and flag — never guess and send. A stuck item in a visible queue is a minor chore. A wrong invoice sent confidently is a trust incident.",
      },
      {
        type: "code",
        title: "My guardrail checklist before any flow goes live",
        text: "duplicate check → required fields present? → draft first → human approves → send → log everything",
      },
    ],
  },
  {
    slug: "fast-by-default",
    title: "Fast by default: a performance budget for small sites",
    excerpt:
      "Small sites should be fast without heroics. The budget I set before writing a line of code — and what gets cut first when it slips.",
    tag: "Web Development",
    date: "2026-01-11",
    readingTime: "4 min",
    body: [
      {
        type: "p",
        text: "Performance is respect for visitors' time, data, and devices. For a marketing or booking site, I set the budget up front so trade-offs are explicit instead of discovered at launch.",
      },
      {
        type: "list",
        items: [
          "Under ~200KB of first-load JavaScript where possible",
          "Images: modern formats, explicit sizes, lazy-load below the fold",
          "Two font families max, display=swap, subset to latin",
          "No animation on the critical path; honor prefers-reduced-motion",
        ],
      },
      { type: "h2", text: "What gets cut first" },
      {
        type: "p",
        text: "Third-party scripts, then carousels nobody asked for, then decorative video. The hero on this site is typography and one ambient glow — it costs almost nothing and carries the whole first impression.",
      },
      {
        type: "quote",
        text: "A simple section executed exceptionally well beats five average ones — and it loads faster too.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
