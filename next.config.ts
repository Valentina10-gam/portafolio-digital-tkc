import type { NextConfig } from "next";

// Despliegue estático en GitHub Pages: el sitio queda servido bajo
// /portafolio-digital-tkc/. NEXT_PUBLIC_BASE_PATH la define el workflow de
// GitHub Actions (ver .github/workflows/deploy-pages.yml) y es la misma
// variable que usa lib/base-path.ts para las rutas de imágenes; en
// desarrollo o en un `next build` local queda vacía.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(basePath && {
    basePath,
    assetPrefix: `${basePath}/`,
  }),
};

export default nextConfig;
