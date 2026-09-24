export const site = {
  name: "prieltechhub",
  role: "Web Developer + Automationist",
  tagline: "Web dev by day, workflow wizard by night.",
  description:
    "I design and build modern websites and automated workflows for people and businesses that want to work smarter.",
  url: "https://prieltechhub.dev",
  email: "hello@prieltechhub.dev",
  location: "Remote — worldwide",
  socials: [
    { label: "GitHub", href: "https://github.com/", handle: "@prieltechhub" },
    { label: "LinkedIn", href: "https://linkedin.com/", handle: "/in/prieltechhub" },
    { label: "X / Twitter", href: "https://x.com/", handle: "@prieltechhub" },
    { label: "Dribbble", href: "https://dribbble.com/", handle: "@prieltechhub" },
  ],
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Writing", href: "/writing" },
    { label: "Lab", href: "/experiments" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
