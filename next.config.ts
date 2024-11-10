import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/weather-news",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/weather-news",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
