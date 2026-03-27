import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 强制 Vercel 在构建时忽略 ESLint 报错
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 强制 Vercel 在构建时忽略 TS 类型报错
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
