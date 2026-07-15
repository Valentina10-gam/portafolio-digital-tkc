"use client";

import { ClipboardList, Users, Zap, Shield } from "lucide-react";
import type { LineaDetalle } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import LineaHeader from "@/components/ui/LineaHeader";
import BlockCard from "@/components/ui/BlockCard";
import ClosingPhrase from "@/components/ui/ClosingPhrase";
import SectionEdge from "@/components/ui/SectionEdge";
import { LINEA_LOGOS, LINEA_LOGO_DIMENSIONS, LINEA_THEME } from "@/lib/brand-assets";

const ICONS = {
  Asesoría: ClipboardList,
  Acompañamiento: Users,
  "Controles activos": Zap,
  "Controles pasivos": Shield,
};

export default function TkcCorpSection({ data }: { data: LineaDetalle }) {
  const theme = LINEA_THEME["tkc-corp"];

  return (
    <section
      id="tkc-corp"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: theme.tint }}
    >
      <SectionEdge accent={theme.logoAccent} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/70 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.base} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 85% 20%, black, transparent)",
        }}
      />
      <GlowOrb className="-right-24 -top-24 h-96 w-96" color={theme.logoAccent} opacity={0.1} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-[-4rem] h-72 w-72 opacity-[0.07]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,200 200,200 0,0" fill="none" stroke={theme.base} strokeWidth="0.75" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] bottom-10 hidden h-24 w-24 opacity-[0.1] lg:block"
        viewBox="0 0 100 100"
      >
        <polygon points="0,100 100,100 50,0" fill={theme.logoAccent} />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[22%] hidden h-32 w-px -rotate-12 bg-tkc-purple/10 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <LineaHeader
          eyebrow="Línea de negocio"
          logoSrc={LINEA_LOGOS["tkc-corp"]}
          logoDimensions={LINEA_LOGO_DIMENSIONS["tkc-corp"]}
          logoAlt={data.titulo}
          encabezado={data.encabezado}
          introduccion={data.introduccion}
          accent={theme.logoAccent}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {data.bloques.map((bloque, index) => (
            <BlockCard
              key={bloque.titulo}
              titulo={bloque.titulo}
              icon={ICONS[bloque.titulo as keyof typeof ICONS]}
              body={bloque.body}
              accent={index >= 2 ? theme.base : theme.logoAccent}
              delay={(index % 2) * 0.08}
              asChips
            />
          ))}
        </div>

        <ClosingPhrase accent={theme.logoAccent}>{data.fraseCierre}</ClosingPhrase>
      </div>
    </section>
  );
}
