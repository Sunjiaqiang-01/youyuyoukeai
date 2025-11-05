import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 使用localhost而不是0.0.0.0避免Windows权限问题
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
