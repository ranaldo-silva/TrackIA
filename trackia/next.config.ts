import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Ignora erros do ESLint durante o build (ex: 'any', hooks, <img>, etc.)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignora erros do TypeScript durante o build (ex: 'no-explicit-any', tipos faltando)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
