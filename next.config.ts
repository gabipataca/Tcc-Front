import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      
    },
  },
  compiler: {
    emotion: true
  }
};

export default nextConfig;
