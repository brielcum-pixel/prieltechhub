# prieltechhub — Web Developer + Automationist

Premium personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Run

Node.js 18+ required.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
npm run typecheck
```

## Deploy to Cloudflare

The site ships to Cloudflare Workers via the OpenNext adapter — no local
Node.js needed if you build in the cloud (StackBlitz terminal or the
Cloudflare dashboard both work).

```bash
npm install
npm run cf:preview  # local preview of the Worker build
npm run cf:deploy   # deploy (needs `wrangler login`)
```

Git-connected deploy (recommended): Cloudflare dashboard → Workers & Pages →
Create → connect the `prieltechhub` GitHub repo → build command
`npx opennextjs-cloudflare build`, deploy command
`npx opennextjs-cloudflare deploy`. Cloudflare builds on every push to `main`.

## Replace with your real content

| What | Where |
|---|---|
| Profile photo | Drop `profile.jpg` (800×1000) into `/public` — `ProfilePlaceholder` documents the slot |
| Projects | `lib/projects.ts` — add objects, no restructuring needed |
| Articles | `lib/writing.ts` — add a `Post` object with structured blocks |
| Experiments | `lib/experiments.ts` + a demo block in `components/ExperimentDemos.tsx` |
| Experience | `lib/content.ts` → `experience` |
| Testimonials | `lib/content.ts` → `testimonials` (marked placeholders, no fake people) |
| Socials + email | `lib/site.ts` |
| Contact form backend | `components/ContactForm.tsx` — wire `onSubmit` to Formspree / Resend / API route |
| SEO domain | `lib/seo.ts` + `app/layout.tsx` (`https://prieltechhub.dev`) |

## Architecture

- `app/` — App Router pages: `/`, `/about`, `/work`, `/work/[slug]`, `/contact` + `sitemap.ts`, `robots.ts`
- `components/` — Navigation, Hero, ProjectPreview (signature hover-reveal), Capabilities, Experience, Testimonials, CTA, Footer, ContactForm, motion primitives
- `lib/` — `projects.ts`, `content.ts`, `site.ts`, `seo.ts`, `utils.ts`

## Signature interaction

Editorial project rows with a cursor-following case preview (spring physics, desktop only; inline visuals on touch). One memorable interaction, reduced-motion respected.
