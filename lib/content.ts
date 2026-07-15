import fs from "node:fs";
import path from "node:path";

const APPROVED_CONTENT_PATH = path.join(
  process.cwd(),
  "content",
  "TKC_CONTENIDO_APROBADO_NO_MODIFICAR.md",
);

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

interface HeadingNode {
  level: number;
  title: string;
  lines: string[];
  children: HeadingNode[];
}

const HEADING_RE = /^(#{1,6})\s+(.*)$/;

function parseOutline(raw: string): HeadingNode[] {
  const root: HeadingNode = { level: 0, title: "root", lines: [], children: [] };
  const stack: HeadingNode[] = [root];

  for (const line of raw.split("\n")) {
    const match = line.match(HEADING_RE);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const node: HeadingNode = { level, title, lines: [], children: [] };
      while (stack[stack.length - 1].level >= level) stack.pop();
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else {
      stack[stack.length - 1].lines.push(line);
    }
  }

  return root.children;
}

function matchFrom(nodes: HeadingNode[], titlePath: string[]): HeadingNode | undefined {
  let current: HeadingNode[] = nodes;
  let found: HeadingNode | undefined;
  for (const title of titlePath) {
    found = current.find((n) => n.title === title);
    if (!found) return undefined;
    current = found.children;
  }
  return found;
}

function findByPath(nodes: HeadingNode[], titlePath: string[]): HeadingNode | undefined {
  const direct = matchFrom(nodes, titlePath);
  if (direct) return direct;
  for (const node of nodes) {
    const nested = findByPath(node.children, titlePath);
    if (nested) return nested;
  }
  return undefined;
}

const HARD_BREAK_RE = /[ ]{2,}$/;

function toBlocks(lines: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let segments: string[] = [];
  let softBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushSoftBuffer = () => {
    if (softBuffer.length > 0) {
      segments.push(softBuffer.join(" ").trim());
      softBuffer = [];
    }
  };
  const flushSegments = () => {
    flushSoftBuffer();
    if (segments.length === 1) {
      blocks.push({ type: "paragraph", text: segments[0] });
    } else if (segments.length > 1) {
      blocks.push({ type: "list", items: [...segments] });
    }
    segments = [];
  };
  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim().replace(/\*\*/g, "");
    if (trimmed === "" || trimmed === "---") {
      flushSegments();
      flushList();
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flushSegments();
      listBuffer.push(trimmed.slice(2).trim());
      continue;
    }
    flushList();
    softBuffer.push(trimmed);
    if (HARD_BREAK_RE.test(rawLine)) flushSoftBuffer();
  }
  flushSegments();
  flushList();

  return blocks;
}

let outlineCache: HeadingNode[] | null = null;

function getOutline(): HeadingNode[] {
  if (!outlineCache) {
    const raw = fs.readFileSync(APPROVED_CONTENT_PATH, "utf-8");
    outlineCache = parseOutline(raw);
  }
  return outlineCache;
}

function section(...titlePath: string[]): HeadingNode {
  const node = findByPath(getOutline(), titlePath);
  if (!node) {
    throw new Error(
      `No se encontró la sección "${titlePath.join(" > ")}" en el contenido aprobado.`,
    );
  }
  return node;
}

function firstParagraph(node: HeadingNode): string {
  const block = toBlocks(node.lines).find((b) => b.type === "paragraph");
  return block && block.type === "paragraph" ? block.text : "";
}

export interface Portada {
  tituloPrincipal: string;
  fraseApoyo: string;
  marca: string;
}

export function getPortada(): Portada {
  return {
    tituloPrincipal: firstParagraph(section("1. Portada", "Título principal")),
    fraseApoyo: firstParagraph(section("1. Portada", "Frase de apoyo")),
    marca: firstParagraph(section("1. Portada", "Marca")),
  };
}

export function getQuienesSomosTitulo(): string {
  return firstParagraph(section("2. Quiénes somos", "Título principal"));
}

export interface Diferencial {
  titulo: string;
  body: ContentBlock[];
}

const DIFERENCIALES_TITULOS = [
  "Experiencia y conocimiento",
  "Cobertura y respuesta",
  "Sistemas de gestión certificados",
  "Tecnología y trazabilidad",
  "Acompañamiento técnico",
  "Formación e innovación",
] as const;

export function getDiferenciales(): Diferencial[] {
  return DIFERENCIALES_TITULOS.map((titulo) => ({
    titulo,
    body: toBlocks(section("2. Quiénes somos", "¿Por qué confiar en TKC?", titulo).lines),
  }));
}

export interface LineaNegocio {
  id: "tkc-corp" | "hidriko" | "tkc-security" | "tkc-home";
  titulo: string;
  encabezado: string;
}

export function getLineasNegocio(): LineaNegocio[] {
  return [
    {
      id: "tkc-corp",
      titulo: firstParagraph(section("3. TKC Corp", "Título")),
      encabezado: firstParagraph(section("3. TKC Corp", "Encabezado")),
    },
    {
      id: "hidriko",
      titulo: firstParagraph(section("4. TKC Hídriko", "Título")),
      encabezado: firstParagraph(section("4. TKC Hídriko", "Encabezado")),
    },
    {
      id: "tkc-security",
      titulo: firstParagraph(section("5. TKC Security", "Título")),
      encabezado: firstParagraph(section("5. TKC Security", "Encabezado")),
    },
    {
      id: "tkc-home",
      titulo: firstParagraph(section("6. TKC Home", "Título")),
      encabezado: firstParagraph(section("6. TKC Home", "Encabezado")),
    },
  ];
}

export interface LineaBloque {
  titulo: string;
  body: ContentBlock[];
}

export interface LineaDetalle {
  id: LineaNegocio["id"];
  titulo: string;
  encabezado: string;
  introduccion: string;
  bloques: LineaBloque[];
  fraseCierre: string;
}

function buildLineaDetalle(
  id: LineaNegocio["id"],
  base: string,
  introHeading: string,
  bloqueTitulos: string[],
): LineaDetalle {
  return {
    id,
    titulo: firstParagraph(section(base, "Título")),
    encabezado: firstParagraph(section(base, "Encabezado")),
    introduccion: firstParagraph(section(base, introHeading)),
    bloques: bloqueTitulos.map((titulo) => ({
      titulo,
      body: toBlocks(section(base, titulo).lines),
    })),
    fraseCierre: firstParagraph(section(base, "Frase de cierre")),
  };
}

export function getTkcCorp(): LineaDetalle {
  return buildLineaDetalle("tkc-corp", "3. TKC Corp", "Texto introductorio", [
    "Asesoría",
    "Acompañamiento",
    "Controles activos",
    "Controles pasivos",
  ]);
}

export function getHidriko(): LineaDetalle {
  return buildLineaDetalle("hidriko", "4. TKC Hídriko", "Texto introductorio original", [
    "Cumplimiento legal",
    "Servicios",
  ]);
}

export function getTkcSecurity(): LineaDetalle {
  return buildLineaDetalle("tkc-security", "5. TKC Security", "Texto introductorio original", [
    "Servicios",
    "Acompañamiento y asesoría",
    "Respuesta rápida",
  ]);
}

export function getTkcHome(): LineaDetalle {
  return buildLineaDetalle("tkc-home", "6. TKC Home", "Texto introductorio original", [
    "Identificación de la necesidad",
    "Procesos pasivos y activos",
    "Controles activos",
    "Controles pasivos",
  ]);
}

export interface ExperienciaSectores {
  titulo: string;
  introduccion: ContentBlock[];
  bloques: string[];
  fraseCierre: string;
}

export function getExperienciaSectores(): ExperienciaSectores {
  const base = "7. Experiencia por sectores";
  const bloquesBlocks = toBlocks(section(base, "Bloques principales").lines);
  const bloquesList = bloquesBlocks.find(
    (b): b is Extract<ContentBlock, { type: "list" }> => b.type === "list",
  );
  return {
    titulo: firstParagraph(section(base, "Título principal")),
    introduccion: toBlocks(section(base, "Texto introductorio").lines),
    bloques: bloquesList ? bloquesList.items : [],
    fraseCierre: firstParagraph(section(base, "Frase de cierre")),
  };
}

export interface ReferenciasComerciales {
  titulo: string;
  introduccion: string;
}

export function getReferenciasComerciales(): ReferenciasComerciales {
  const base = "8. Referencias comerciales";
  return {
    titulo: firstParagraph(section(base, "Título principal")),
    introduccion: firstParagraph(section(base, "Texto introductorio")),
  };
}

export interface CanalContacto {
  label: string;
  valores: string[];
}

export interface Contacto {
  marcaSuperior: string;
  tituloPrincipal: string;
  textoApoyo: string;
  llamadoPrincipal: string;
  whatsappLabel: string;
  telefonos: string;
  canales: CanalContacto[];
  fraseFinalMarca: string;
  fraseFinalTexto: string;
}

export function getContacto(): Contacto {
  const base = "9. Contacto y cierre comercial";

  const datosPrincipales = toBlocks(section("1. Portada", "Datos principales").lines);
  const datosList = datosPrincipales.find(
    (b): b is Extract<ContentBlock, { type: "list" }> => b.type === "list",
  );
  const telefonos = datosList ? datosList.items[0] : "";

  const contactoPrincipalBlocks = toBlocks(section(base, "Contacto principal").lines);
  const whatsappList = contactoPrincipalBlocks.find(
    (b): b is Extract<ContentBlock, { type: "list" }> => b.type === "list",
  );
  const whatsappLabel = whatsappList ? whatsappList.items[0] : "";

  const canales = toBlocks(section(base, "Canales secundarios").lines)
    .filter((b): b is Extract<ContentBlock, { type: "list" }> => b.type === "list")
    .map((b) => ({ label: b.items[0], valores: b.items.slice(1) }));

  const fraseFinalBlocks = toBlocks(section(base, "Frase final").lines);
  const fraseFinalList = fraseFinalBlocks.find(
    (b): b is Extract<ContentBlock, { type: "list" }> => b.type === "list",
  );
  const fraseFinalMarca = fraseFinalList ? fraseFinalList.items[0] : "";
  const fraseFinalTexto = fraseFinalList ? fraseFinalList.items[1] : "";

  return {
    marcaSuperior: firstParagraph(section(base, "Marca superior")),
    tituloPrincipal: firstParagraph(section(base, "Título principal")),
    textoApoyo: firstParagraph(section(base, "Texto de apoyo")),
    llamadoPrincipal: firstParagraph(section(base, "Llamado principal")),
    whatsappLabel,
    telefonos,
    canales,
    fraseFinalMarca,
    fraseFinalTexto,
  };
}
