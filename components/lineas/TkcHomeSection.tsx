"use client";

import { Search, SlidersHorizontal, Zap, Shield } from "lucide-react";
import type { LineaDetalle } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import LineaHeader from "@/components/ui/LineaHeader";
import BlockCard from "@/components/ui/BlockCard";
import ClosingPhrase from "@/components/ui/ClosingPhrase";
import SectionEdge from "@/components/ui/SectionEdge";
import { LINEA_LOGOS, LINEA_LOGO_DIMENSIONS, LINEA_THEME } from "@/lib/brand-assets";

const ICONS = {
  "Identificación de la necesidad": Search,
  "Procesos pasivos y activos": SlidersHorizontal,
  "Controles activos": Zap,
  "Controles pasivos": Shield,
};

export default function TkcHomeSection({ data }: { data: LineaDetalle }) {
  const theme = LINEA_THEME["tkc-home"];

  return (
    <section
      id="tkc-home"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: theme.tint }}
    >
      <SectionEdge accent={theme.sectionAccent} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/70 via-transparent to-mist/40"
      />
      <GlowOrb className="-left-24 -top-20 h-96 w-96" color={theme.sectionAccent} opacity={0.16} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 bottom-[-3rem] h-64 w-64 opacity-[0.08]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,200 200,200 100,0" fill="none" stroke={theme.base} strokeWidth="0.75" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-[14%] top-14 hidden h-20 w-20 opacity-[0.14] lg:block"
        viewBox="0 0 100 100"
      >
        <polygon points="0,0 100,0 0,100" fill={theme.sectionAccent} />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <LineaHeader
          eyebrow="Línea de negocio"
          logoSrc={LINEA_LOGOS["tkc-home"]}
          logoDimensions={LINEA_LOGO_DIMENSIONS["tkc-home"]}
          logoAlt={data.titulo}
          encabezado={data.encabezado}
          introduccion={data.introduccion}
          accent={theme.base}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {data.bloques.map((bloque, index) => (
            <BlockCard
              key={bloque.titulo}
              titulo={bloque.titulo}
              icon={ICONS[bloque.titulo as keyof typeof ICONS]}
              body={bloque.body}
              accent={index >= 2 ? theme.base : theme.sectionAccent}
              delay={(index % 2) * 0.08}
              asChips
            />
          ))}
        </div>

        <ClosingPhrase accent={theme.sectionAccent}>{data.fraseCierre}</ClosingPhrase>
      </div>
    </section>
  );
}
