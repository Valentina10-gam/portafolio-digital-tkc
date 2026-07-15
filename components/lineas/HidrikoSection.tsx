"use client";

import { FileCheck, Waves } from "lucide-react";
import type { LineaDetalle } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import LineaHeader from "@/components/ui/LineaHeader";
import BlockCard from "@/components/ui/BlockCard";
import ClosingPhrase from "@/components/ui/ClosingPhrase";
import SectionEdge from "@/components/ui/SectionEdge";
import { LINEA_LOGOS, LINEA_LOGO_DIMENSIONS, LINEA_THEME } from "@/lib/brand-assets";

const ICONS = {
  "Cumplimiento legal": FileCheck,
  Servicios: Waves,
};

export default function HidrikoSection({ data }: { data: LineaDetalle }) {
  const theme = LINEA_THEME.hidriko;

  return (
    <section
      id="hidriko"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: theme.tint }}
    >
      <SectionEdge accent={theme.base} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/60 via-transparent to-transparent"
      />
      <GlowOrb className="-left-24 -bottom-24 h-96 w-96" color={theme.base} opacity={0.12} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[-3rem] h-64 w-64 opacity-[0.08]"
        viewBox="0 0 200 200"
      >
        <polygon points="200,0 200,200 0,0" fill="none" stroke={theme.base} strokeWidth="0.75" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-32 w-full opacity-[0.09]"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C150,40 300,110 450,60 C600,20 700,80 800,50"
          fill="none"
          stroke={theme.base}
          strokeWidth="1.5"
        />
        <path
          d="M0,100 C180,60 320,110 480,80 C620,55 720,95 800,70"
          fill="none"
          stroke={theme.logoAccent}
          strokeWidth="1.5"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-[8%] hidden h-28 w-28 opacity-[0.1] lg:block"
        viewBox="0 0 100 100"
      >
        <polygon points="0,0 100,100 0,100" fill={theme.base} />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <LineaHeader
          eyebrow="Línea de negocio"
          logoSrc={LINEA_LOGOS.hidriko}
          logoDimensions={LINEA_LOGO_DIMENSIONS.hidriko}
          logoAlt={data.titulo}
          encabezado={data.encabezado}
          introduccion={data.introduccion}
          accent={theme.base}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
          {data.bloques.map((bloque, index) => (
            <BlockCard
              key={bloque.titulo}
              titulo={bloque.titulo}
              icon={ICONS[bloque.titulo as keyof typeof ICONS]}
              body={bloque.body}
              accent={theme.base}
              delay={index * 0.08}
              className={index === 0 ? "md:col-span-4" : "md:col-span-8"}
              asChips
            />
          ))}
        </div>

        <ClosingPhrase accent={theme.base}>{data.fraseCierre}</ClosingPhrase>
      </div>
    </section>
  );
}
