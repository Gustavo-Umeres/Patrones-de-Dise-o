import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Patrones-de-Dise-o" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
