import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: "standalone",
  basePath: "/reelwin-admin",
  trailingSlash: false,
  // This is necessary for hosting under a subpath
  assetPrefix: "/reelwin-admin/",
};

export default nextConfig;
