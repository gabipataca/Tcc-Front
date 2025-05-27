import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    },
  },
  compiler: {
    emotion: true
  }
};

export default nextConfig;
