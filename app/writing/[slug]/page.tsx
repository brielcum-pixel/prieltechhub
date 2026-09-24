import Link from "next/link";
import { notFound } from "next/navigation";
import { baseMetadata } from "@/lib/seo";
import { formatDate, getPost, posts, type Block } from "@/lib/writing";
import { CTA } from "@/components/chrome";
import { Reveal } from "@/components/motion";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return baseMetadata({ title: p.title, description: p.excerpt, path: `/writing/${p.slug}` });
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight md:text-3xl">{block.text}</h2>;
    case "list":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-body">
              <span aria-hidden="true" className="mt-0.5 text-accent2">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-xl italic leading-snug text-white/90">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <figure className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/60">
          <figcaption className="border-b hairline px-4 py-2.5 font-mono text-xs text-muted">{block.title}</figcaption>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-accent2">{block.text}</pre>
        </figure>
      );
    default:
      return <p className="mt-5 leading-[1.8] text-body">{block.text}</p>;
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const idx = posts.findIndex((x) => x.slug === post.slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <>
      <article className="pt-32 md:pt-40">
        <div className="mx-auto max-w-shell px-5 md:px-8">
          <Reveal>
            <Link href="/writing" className="text-sm text-muted hover:text-white">← All writing</Link>
            <p className="mt-6 text-xs uppercase tracking-mega text-accent2">
              {post.tag} · {formatDate(post.date)} · {post.readingTime} read
            </p>
            <h1 className="text-balance mt-4 max-w-3xl font-display text-4xl font-bold tracking-tighter md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{post.excerpt}</p>
          </Reveal>

          <div className="mt-4 grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
            <aside className="hidden md:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 p-5 text-sm leading-relaxed text-muted">
                <p className="text-xs uppercase tracking-mega">About these notes</p>
                <p className="mt-2">
                  Practical thinking from real builds. Replace and extend freely — each post is one object in{" "}
                  <code className="text-white/80">lib/writing.ts</code>.
                </p>
              </div>
            </aside>
            <div className="max-w-2xl border-t hairline pb-4">
              {post.body.map((b, i) => (
                <RenderBlock key={i} block={b} />
              ))}
              <p className="mt-10 rounded-xl border border-dashed border-white/20 p-4 text-sm text-muted">
                Placeholder series — swap in your real voice and stories as you publish.
              </p>
            </div>
          </div>

          <nav aria-label="Next article" className="py-16">
            <Reveal>
              <Link
                href={`/writing/${next.slug}`}
                className="group block rounded-2xl border border-white/10 p-8 transition-colors hover:border-accent md:p-10"
              >
                <p className="text-xs uppercase tracking-mega text-muted">Next article</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight group-hover:text-accent2 md:text-3xl">
                  {next.title} →
                </p>
              </Link>
            </Reveal>
          </nav>
        </div>
      </article>
      <CTA />
    </>
  );
}
