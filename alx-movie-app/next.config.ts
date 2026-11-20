import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public", // the service worker is generated here on each build
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "m.media-amazon.com" }],
  },
};

export default withPWA({
  ...nextConfig,
});
