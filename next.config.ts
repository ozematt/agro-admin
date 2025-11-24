import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.33.7",
    "192.168.33.7:3000",
    "192.168.33.3",
    "192.168.33.3:3000",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
