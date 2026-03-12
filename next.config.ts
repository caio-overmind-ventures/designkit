import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  exclude: ['styleguides'],
};

export default nextConfig;
