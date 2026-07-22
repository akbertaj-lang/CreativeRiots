import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Sites local worker does not expose an ASSETS binding to the vinext
  // image optimizer. Serve project images directly in both dev and production.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
