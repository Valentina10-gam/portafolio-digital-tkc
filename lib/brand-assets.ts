import type { LineaNegocio } from "@/lib/content";
import { withBasePath } from "@/lib/base-path";

export const GROUP_LOGO = withBasePath("/brand/tkc-group.png");
export const GROUP_LOGO_WHITE = withBasePath("/brand/tkc-group-blanco.png");

export const LINEA_LOGOS: Record<LineaNegocio["id"], string> = {
  "tkc-corp": withBasePath("/brand/tkc-corp.png"),
  hidriko: withBasePath("/brand/hidriko.png"),
  "tkc-security": withBasePath("/brand/tkc-security.png"),
  "tkc-home": withBasePath("/brand/tkc-home.png"),
};

export const GROUP_LOGO_DIMENSIONS = { width: 2052, height: 1820 };
export const GROUP_LOGO_WHITE_DIMENSIONS = { width: 2056, height: 1672 };

export const LINEA_LOGO_DIMENSIONS: Record<LineaNegocio["id"], { width: number; height: number }> = {
  "tkc-corp": { width: 2914, height: 1072 },
  hidriko: { width: 3115, height: 1426 },
  "tkc-security": { width: 4092, height: 868 },
  "tkc-home": { width: 3650, height: 1168 },
};

/**
 * Acentos por línea. "base" y "logoAccent" se muestrean directamente de cada
 * PNG oficial (public/brand/*.png). "sectionAccent" es la decisión de UI para
 * la sección dedicada de cada línea: para Corp y Home reutiliza tonos ya
 * presentes en su propio logo o en la marca; para Security introduce un
 * ámbar corporativo (el logo de Security es monocromático) según dirección
 * de arte explícita — nunca se aplica ese color al logo en sí.
 */
export const LINEA_THEME: Record<
  LineaNegocio["id"],
  { base: string; logoAccent: string; sectionAccent: string; tint: string }
> = {
  "tkc-corp": {
    base: "#250045",
    logoAccent: "#056789",
    sectionAccent: "#056789",
    tint: "#e8f1f3",
  },
  hidriko: {
    base: "#01809f",
    logoAccent: "#6dbee8",
    sectionAccent: "#01809f",
    tint: "#e3f4f8",
  },
  "tkc-security": {
    base: "#250045",
    logoAccent: "#250045",
    sectionAccent: "#c77b1e",
    tint: "#faf1e4",
  },
  "tkc-home": {
    base: "#250045",
    logoAccent: "#383c85",
    sectionAccent: "#65cffb",
    tint: "#eaf7fd",
  },
};

export const LINEA_COLORS: Record<LineaNegocio["id"], string> = {
  "tkc-corp": LINEA_THEME["tkc-corp"].sectionAccent,
  hidriko: LINEA_THEME.hidriko.sectionAccent,
  "tkc-security": LINEA_THEME["tkc-security"].sectionAccent,
  "tkc-home": LINEA_THEME["tkc-home"].sectionAccent,
};
