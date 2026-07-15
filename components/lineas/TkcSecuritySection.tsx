"use client";

import { Flame, ShieldCheck, Zap } from "lucide-react";
import type { LineaDetalle } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import LineaHeader from "@/components/ui/LineaHeader";
import BlockCard from "@/components/ui/BlockCard";
import ClosingPhrase from "@/components/ui/ClosingPhrase";
import SectionEdge from "@/components/ui/SectionEdge";
import { LINEA_LOGOS, LINEA_LOGO_DIMENSIONS, LINEA_THEME } from "@/lib/brand-assets";

const ICONS = {
  Servicios: Flame,
  "Acompañamiento y asesoría": ShieldCheck,
  "Respuesta rápida": Zap,
};

export default function TkcSecuritySection({ data }: { data: LineaDetalle }) {
  const theme = LINEA_THEME["tkc-security"];

  return (
    <section
      id="tkc-security"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: theme.tint }}
    >
      <SectionEdge accent={theme.sectionAccent} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/60 via-transparent to-transparent"
      />
      <GlowOrb className="-right-24 top-[-4rem] h-96 w-96" color={theme.sectionAccent} opacity={0.1} />
      <GlowOrb className="-left-20 bottom-[-6rem] h-72 w-72" color={theme.base} opacity={0.07} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 bottom-[-3rem] h-60 w-60 opacity-[0.09]"
        viewBox="0 0 200 200"
      >
        <polygon points="100,0 200,200 0,200" fill="none" stroke={theme.sectionAccent} strokeWidth="0.75" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-16 hidden h-20 w-20 opacity-[0.12] lg:block"
        viewBox="0 0 100 100"
      >
        <polygon points="50,0 100,100 0,100" fill={theme.sectionAccent} />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[30%] hidden h-24 w-px rotate-12 bg-tkc-purple/10 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <LineaHeader
          eyebrow="Línea de negocio"
          logoSrc={LINEA_LOGOS["tkc-security"]}
          logoDimensions={LINEA_LOGO_DIMENSIONS["tkc-security"]}
          logoAlt={data.titulo}
          encabezado={data.encabezado}
          introduccion={data.introduccion}
          accent={theme.sectionAccent}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
          {data.bloques.map((bloque, index) => (
            <BlockCard
              key={bloque.titulo}
              titulo={bloque.titulo}
              icon={ICONS[bloque.titulo as keyof typeof ICONS]}
              body={bloque.body}
              accent={theme.sectionAccent}
              delay={index * 0.08}
              className={index === 0 ? "md:col-span-6" : "md:col-span-3"}
              asChips
            />
          ))}
        </div>

        <ClosingPhrase accent={theme.sectionAccent}>{data.fraseCierre}</ClosingPhrase>
      </div>
    </section>
  );
}
