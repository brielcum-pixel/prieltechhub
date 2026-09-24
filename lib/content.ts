export type ExperienceItem = {
  period: string;
  role: string;
  focus: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "2024 — Now",
    role: "Freelance Web Developer + Automationist",
    focus: "Client work",
    description:
      "Designing and building fast marketing sites, booking flows, and internal tools — plus automation systems that remove repetitive ops work. [Replace with your real client focus.]",
  },
  {
    period: "2023 — 2024",
    role: "Frontend Builder",
    focus: "Deep practice",
    description:
      "Shipped personal and practice projects end to end: responsive layouts, TypeScript, performance budgets, and connecting forms, email, and CMS APIs. [Replace with your real milestones.]",
  },
  {
    period: "2022 — 2023",
    role: "Workflow Tinkerer",
    focus: "Foundations",
    description:
      "Learned how businesses actually run: spreadsheets, inboxes, and late invoices. Started connecting tools with webhooks, Zapier/Make, and small scripts. [Replace with your origin story.]",
  },
];

export const capabilities = {
  web: {
    title: "Web Development",
    tag: "01 / Build",
    intro: "Modern, responsive websites that load fast and read clearly.",
    items: [
      {
        name: "Responsive websites",
        detail: "Mobile-first layouts that hold up on real devices, not just Figma frames.",
      },
      {
        name: "Frontend development",
        detail: "Next.js + TypeScript builds with clean structure you can extend later.",
      },
      {
        name: "UI implementation",
        detail: "Faithful, accessible interfaces — spacing, type, and states done properly.",
      },
      {
        name: "Performance builds",
        detail: "Image discipline, lean JS, and measured load times instead of vibes.",
      },
    ],
  },
  automation: {
    title: "Automation",
    tag: "02 / Connect",
    intro: "Systems that quietly remove repetitive work from your week.",
    items: [
      {
        name: "Workflow automation",
        detail: "Multi-step flows across the tools you already use — no rip-and-replace.",
      },
      {
        name: "Tool connections",
        detail: "APIs and webhooks that let forms, CRMs, sheets, and inboxes talk.",
      },
      {
        name: "Repetitive-task removal",
        detail: "Follow-ups, data entry, and status updates handled consistently.",
      },
      {
        name: "Human-in-the-loop design",
        detail: "Automation drafts and reminds; you approve what matters.",
      },
    ],
  },
};

export const testimonials = [
  {
    quote:
      "Placeholder testimonial — replace with a real client quote about a website or booking flow you shipped.",
    name: "Client Name",
    role: "Owner, Example Studio",
    status: "placeholder" as const,
  },
  {
    quote:
      "Placeholder testimonial — replace with a quote about time saved or a workflow you automated.",
    name: "Collaborator Name",
    role: "Operations, Example Team",
    status: "placeholder" as const,
  },
];
