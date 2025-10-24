import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.33.5",
    "192.168.33.5:3000",
    "192.168.33.3",
    "192.168.33.3:3000",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
