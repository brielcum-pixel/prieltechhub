/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the whole site prerenders to plain HTML/CSS/JS in /out,
  // deployable to Cloudflare Pages like a classic static site.
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
