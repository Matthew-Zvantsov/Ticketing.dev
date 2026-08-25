import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {}, // явно говорим Next.js: да, мы осознанно на Turbopack
  allowedDevOrigins: ["ticketing.test"],
};

export default nextConfig;