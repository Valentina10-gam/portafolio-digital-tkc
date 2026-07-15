import fs from "node:fs";
import path from "node:path";
import { withBasePath } from "@/lib/base-path";

const CLIENTS_DIR = path.join(process.cwd(), "public", "clients");

/**
 * Nombres que requieren tildes o capitalización especial que el slug del
 * archivo no puede representar. Para agregar/quitar un cliente, solo hay que
 * agregar/quitar el archivo en public/clients/ — este mapa es opcional y
 * únicamente ajusta cómo se muestra el nombre.
 */
const NAME_OVERRIDES: Record<string, string> = {
  "andres-carne-de-res": "Andrés Carne de Res",
  "banco-de-la-republica": "Banco de la República",
  "bima-centro-comercial": "BIMA Centro Comercial",
  cinepolis: "Cinépolis",
  "crepes-and-waffles": "Crepes & Waffles",
  gmovil: "G Móvil",
  "gran-estacion": "Gran Estación",
  "latam-airline": "LATAM Airlines",
  loreal: "L'Oréal",
  "metropolis-cc": "Metrópolis CC",
  opain: "OPAIN",
  "paseo-villa-del-rio": "Paseo Villa del Río",
  "santa-barbara": "Santa Bárbara",
  "santafe-centro-comercial": "Santafé Centro Comercial",
  "unicentro-bogota": "Unicentro Bogotá",
  "unicentro-de-occidente": "Unicentro de Occidente",
};

const LOWERCASE_WORDS = new Set(["de", "la", "del", "el", "y"]);

function titleize(slug: string): string {
  return slug
    .split("-")
    .map((word, index) => {
      if (index > 0 && LOWERCASE_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export interface ClientLogo {
  slug: string;
  name: string;
  src: string;
}

let cache: ClientLogo[] | null = null;

export function getClientLogos(): ClientLogo[] {
  if (cache) return cache;

  const files = fs
    .readdirSync(CLIENTS_DIR)
    .filter((file) => !file.startsWith("."))
    .sort((a, b) => a.localeCompare(b));

  cache = files.map((file) => {
    const slug = file.replace(/\.[^.]+$/, "");
    return {
      slug,
      name: NAME_OVERRIDES[slug] ?? titleize(slug),
      src: withBasePath(`/clients/${file}`),
    };
  });

  return cache;
}
