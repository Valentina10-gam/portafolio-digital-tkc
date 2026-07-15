"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ClientLogo } from "@/lib/clients";
import type { ReferenciasComerciales as ReferenciasComercialesData } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowOrb from "@/components/ui/GlowOrb";
import SectionEdge from "@/components/ui/SectionEdge";

interface ReferenciasComercialesProps {
  data: ReferenciasComercialesData;
  logos: ClientLogo[];
}

function LogoCard({ logo }: { logo: ClientLogo }) {
  return (
    <div className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-line-strong/60 bg-paper px-6 py-4 shadow-[0_1px_2px_rgba(20,10,40,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-md sm:w-48">
      {/* eslint-disable-next-line @next/next/no-img-element -- catálogo de clientes descubierto dinámicamente, sin dimensiones fijas conocidas */}
      <img
        src={logo.src}
        alt={logo.name}
        className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  duration,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...logos, ...logos];
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
    >
      <div
        className="flex w-max gap-5 hover:[animation-play-state:paused]"
        style={{ animation: `${animationName} ${duration}s linear infinite` }}
      >
        {doubled.map((logo, index) => (
          <LogoCard key={`${logo.slug}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export default function ReferenciasComerciales({ data, logos }: ReferenciasComercialesProps) {
  const prefersReducedMotion = useReducedMotion();
  const half = Math.ceil(logos.length / 2);
  const rowA = logos.slice(0, half);
  const rowB = logos.slice(half);

  return (
    <section id="referencias" className="relative overflow-hidden bg-mist py-28">
      <SectionEdge accent="var(--color-tkc-purple)" />
      <GlowOrb className="-left-24 -top-24 h-96 w-96" color="var(--color-tkc-purple)" opacity={0.07} />
      <GlowOrb className="-right-24 -bottom-24 h-96 w-96" color="var(--color-tkc-blue)" opacity={0.1} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[-2rem] h-56 w-56 opacity-[0.06]"
        viewBox="0 0 200 200"
      >
        <polygon points="200,0 200,200 0,0" fill="var(--color-tkc-purple)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-[-3rem] h-48 w-48 opacity-[0.09]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,200 100,200 0,100" fill="none" stroke="var(--color-tkc-blue)" strokeWidth="0.75" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Eyebrow>Referencias comerciales</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-tkc-purple sm:text-4xl"
        >
          {data.titulo}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70"
        >
          {data.introduccion}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mt-14"
      >
        {prefersReducedMotion ? (
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6 md:px-10">
            {logos.map((logo) => (
              <LogoCard key={logo.slug} logo={logo} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <MarqueeRow logos={rowA} direction="left" duration={52} />
            <MarqueeRow logos={rowB} direction="right" duration={58} />
          </div>
        )}
      </motion.div>
    </section>
  );
}
