import type { Metadata } from "next";

export function baseMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `https://prieltechhub.dev${path}`;
  return {
    title,
    description,
    metadataBase: new URL("https://prieltechhub.dev"),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "prieltechhub",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}
