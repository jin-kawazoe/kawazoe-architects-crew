import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  basePath: isDev ? "" : "/crew",
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kawazoe-architects.com",
      },
    ],
  },
};

export default nextConfig;
