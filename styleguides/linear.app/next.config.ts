import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/s/linear.app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
