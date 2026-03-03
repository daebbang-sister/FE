import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "https://api.daebbang-sister.shop/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
