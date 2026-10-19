import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export to ./out, served by Cloudflare Workers static assets (see wrangler.jsonc).
  output: "export",
  // Pin the workspace root to this project so a lockfile in a parent folder isn't picked up.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // No image optimization server in a static export; next/image serves the files as they are.
  images: { unoptimized: true },
  // Redirects can't live here with output: "export"; /links → / is in public/_redirects.
};

export default nextConfig;
