"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Store, Factory, Landmark, Home, type LucideIcon } from "lucide-react";
import type { ExperienciaSectores as ExperienciaSectoresData } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import Eyebrow from "@/components/ui/Eyebrow";
import ClosingPhrase from "@/components/ui/ClosingPhrase";
import SectionEdge from "@/components/ui/SectionEdge";

const SECTOR_ICONS: Record<string, LucideIcon> = {
  "Sector alimentos": UtensilsCrossed,
  "Sector comercial": Store,
  "Sector industrial": Factory,
  "Entidades públicas y privadas": Landmark,
  "Hogares y personas naturales": Home,
};

const ACCENT = "#250045";

export default function ExperienciaSectores({ data }: { data: ExperienciaSectoresData }) {
  return (
    <section id="sectores" className="relative overflow-hidden bg-ivory py-28">
      <SectionEdge accent={ACCENT} />
      <GlowOrb className="-right-28 top-1/3 h-96 w-96" color="var(--color-tkc-blue)" opacity={0.1} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 opacity-[0.06]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,0 200,60 60,200" fill="var(--color-tkc-purple)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 bottom-[-3rem] h-56 w-56 opacity-[0.08]"
        viewBox="0 0 200 200"
      >
        <polygon points="200,200 60,200 200,80" fill="none" stroke="var(--color-tkc-blue)" strokeWidth="0.75" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[20%] top-10 hidden h-24 w-px rotate-[20deg] bg-tkc-purple/10 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Eyebrow>Experiencia por sectores</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-tkc-purple sm:text-4xl"
        >
          {data.titulo}
        </motion.h2>

        <div className="mt-5 max-w-2xl space-y-3">
          {data.introduccion.map((block, i) =>
            block.type === "paragraph" ? (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg leading-relaxed text-ink/70"
              >
                {block.text}
              </motion.p>
            ) : null,
          )}
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-8 hidden h-px bg-line md:block"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {data.bloques.map((sector, index) => {
              const Icon = SECTOR_ICONS[sector] ?? Landmark;
              return (
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  className="relative flex flex-col items-start rounded-2xl border border-line bg-paper p-6 shadow-[0_1px_2px_rgba(20,10,40,0.05)] transition-shadow hover:shadow-lg"
                >
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${ACCENT}17` }}
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-tkc-purple" />
                  </span>
                  <p className="relative z-10 mt-5 text-[0.95rem] font-medium leading-snug text-ink">
                    {sector}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <ClosingPhrase accent={ACCENT}>{data.fraseCierre}</ClosingPhrase>
      </div>
    </section>
  );
}
