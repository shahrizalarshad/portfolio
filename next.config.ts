import type { NextConfig } from "next";

// Static export: build hasilkan fail HTML biasa dalam folder `out`,
// supaya boleh dihost kat Cloudflare Pages (dan Vercel) tanpa server.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
