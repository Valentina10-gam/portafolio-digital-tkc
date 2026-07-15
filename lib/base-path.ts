/**
 * Con `images.unoptimized: true` (necesario para exportar el sitio como
 * estático), next/image no antepone basePath automáticamente a los `src`
 * literales. NEXT_PUBLIC_BASE_PATH la fija el workflow de GitHub Actions
 * (ver .github/workflows/deploy-pages.yml); en desarrollo/local queda vacía.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(assetPath: string): string {
  return `${BASE_PATH}${assetPath}`;
}
