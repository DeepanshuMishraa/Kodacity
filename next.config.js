import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Any request to `/api/...`
        destination: "http://localhost:9000/:path*", // Forward to Docker container
      },
    ];
  },
};

export default config;
