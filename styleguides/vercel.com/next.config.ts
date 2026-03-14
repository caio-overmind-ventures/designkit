import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/s/vercel.com",
  images: { unoptimized: true },
};

export default nextConfig;
