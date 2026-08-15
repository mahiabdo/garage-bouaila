import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? process.env.NEXT_PUBLIC_REPO_NAME;
const configuredBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  process.env.BASE_PATH ||
  (repositoryName ? `/${repositoryName}` : "") ||
  "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: configuredBasePath || undefined,
  assetPrefix: configuredBasePath ? `${configuredBasePath}/` : undefined,
};

export default nextConfig;
