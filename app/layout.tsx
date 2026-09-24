import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/chrome";
import { HydrationGuard } from "@/components/motion";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "prieltechhub — Web Developer + Automationist",
    template: "%s · prieltechhub",
  },
  description:
    "Web dev by day, workflow wizard by night. I design and build modern websites and automated workflows for people and businesses that want to work smarter.",
  metadataBase: new URL("https://prieltechhub.dev"),
  alternates: { canonical: "https://prieltechhub.dev" },
  openGraph: {
    title: "prieltechhub — Web Developer + Automationist",
    description: "Modern websites + workflow automation that actually pays off.",
    url: "https://prieltechhub.dev",
    siteName: "prieltechhub",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "prieltechhub", description: "Web dev by day, workflow wizard by night." },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="grain bg-void font-sans text-ink antialiased">
        {/* Fallback timer: if the JS bundle never hydrates (blocked/slow scripts),
            reveal animation-hidden content after 3s instead of a blank page.
            HydrationGuard cancels this timer as soon as React mounts. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=setTimeout(function(){document.documentElement.classList.add('motion-fallback')},3000);window.__cancelMotionFallback=function(){clearTimeout(t)}}catch(e){}})();",
          }}
        />
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <HydrationGuard />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
