import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project so a lockfile in a parent folder isn't picked up.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The page used to live at doveralab.com/links; keep that path working here too.
  async redirects() {
    return [{ source: "/links", destination: "/", permanent: true }];
  },
};

export default nextConfig;
