import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    resolveAlias: {
      
    },
  },
  compiler: {
    emotion: true
  }
};

export default nextConfig;
