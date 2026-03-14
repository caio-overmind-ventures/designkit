import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/s/cal.com",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
