import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // GitHub Pages serves this project below `/homepage`, rather than the domain
  // root. Keeping the prefix build-time-only preserves ordinary local dev.
  basePath: isGitHubPages ? "/homepage" : "",
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // The Next.js image optimizer needs a running server, which GitHub Pages
    // does not provide.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
