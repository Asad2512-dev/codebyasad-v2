import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // emits /work/index.html so Hostinger (Apache) serves nested routes directly
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
