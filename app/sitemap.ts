import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://prieltechhub.dev";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/writing`, lastModified: new Date() },
    { url: `${base}/experiments`, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
    })),
    ...posts.map((p) => ({
      url: `${base}/writing/${p.slug}`,
      lastModified: new Date(p.date),
    })),
  ];
}
