import type { NextConfig } from "next";

// Despliegue estático en GitHub Pages: el sitio queda servido bajo
// /portafolio-digital-tkc/, por lo que basePath/assetPrefix solo se
// activan en el build de GitHub Actions (no en desarrollo ni en
// validaciones locales de `next build`).
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "portafolio-digital-tkc";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
};

export default nextConfig;
