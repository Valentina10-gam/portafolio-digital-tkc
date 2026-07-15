"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight } from "lucide-react";
import type { Contacto } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import SectionEdge from "@/components/ui/SectionEdge";
import { GROUP_LOGO, GROUP_LOGO_DIMENSIONS } from "@/lib/brand-assets";
import { WHATSAPP_URL } from "@/lib/links";

const CANAL_ICONS: Record<string, typeof Phone> = {
  Llámenos: Phone,
  Escríbanos: Mail,
};

/**
 * Solo se muestran los canales de contacto directo (teléfono y correo).
 * El canal "Conozca más" (web / usuario social) del contenido aprobado
 * no se renderiza aquí: la web vive en el footer y las redes no se
 * repiten en el bloque principal de contacto.
 */
const CANALES_VISIBLES = ["Llámenos", "Escríbanos"];

export default function ContactoSection({ data }: { data: Contacto }) {
  const telefonos = data.telefonos.split(" · ");

  return (
    <section id="contacto" className="relative overflow-hidden bg-paper py-28">
      <SectionEdge accent="var(--color-tkc-purple)" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-paper to-mist"
      />
      <GlowOrb className="-left-24 -top-24 h-96 w-96" color="var(--color-tkc-purple)" opacity={0.08} />
      <GlowOrb className="-right-24 bottom-1/4 h-80 w-80" color="var(--color-tkc-blue)" opacity={0.12} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-[-4rem] h-72 w-72 opacity-[0.06]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,200 200,200 0,0" fill="var(--color-tkc-purple)" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-12 md:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-px bg-line-strong/50 md:block"
        />
        <div className="md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-tkc-blue" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-tkc-purple/80">
              {data.marcaSuperior}
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-tkc-purple sm:text-5xl"
          >
            {data.tituloPrincipal}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/70"
          >
            {data.textoApoyo}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-tkc-purple px-8 py-4 text-sm font-medium tracking-wide text-paper transition-transform hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
            >
              {data.llamadoPrincipal}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-3 text-sm text-ink/50">{data.whatsappLabel}</p>
          </motion.div>

          <motion.div
            id="canales-contacto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2 md:grid-cols-1"
          >
            {data.canales
              .filter((canal) => CANALES_VISIBLES.includes(canal.label))
              .map((canal) => {
                const Icon = CANAL_ICONS[canal.label] ?? Phone;
                return (
                  <div key={canal.label}>
                    <div className="flex items-center gap-2.5 text-tkc-purple">
                      <Icon size={20} aria-hidden="true" />
                      <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em]">
                        {canal.label}
                      </p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {canal.label === "Llámenos"
                        ? telefonos.map((tel) => (
                            <a
                              key={tel}
                              href={`tel:${tel.replace(/\s+/g, "")}`}
                              className="block text-xl font-semibold leading-relaxed text-ink underline decoration-line-strong underline-offset-4 hover:text-tkc-purple sm:text-2xl"
                            >
                              {tel}
                            </a>
                          ))
                        : canal.valores.map((valor) => (
                            <a
                              key={valor}
                              href={`mailto:${valor}`}
                              className="block break-words text-base font-semibold leading-relaxed text-ink underline decoration-line-strong underline-offset-4 hover:text-tkc-purple sm:text-lg"
                            >
                              {valor}
                            </a>
                          ))}
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </div>

        <div className="flex md:col-span-6 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <GlowOrb className="-right-16 -top-16 h-72 w-72" color="var(--color-tkc-blue)" opacity={0.18} />
            <GlowOrb className="-bottom-16 -left-12 h-64 w-64" color="var(--color-tkc-purple)" opacity={0.12} />

            {/* Acento triangular sólido que sangra desde la esquina afilada del panel */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 z-0 h-16 w-16 sm:h-20 sm:w-20"
              style={{
                background: "var(--color-tkc-blue)",
                clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                opacity: 0.85,
              }}
            />
            {/* Triángulo en trazo, contrapunto sutil en la esquina opuesta */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 opacity-[0.35]"
              viewBox="0 0 100 100"
            >
              <polygon points="0,100 100,100 0,0" fill="none" stroke="var(--color-tkc-purple)" strokeWidth="1.5" />
            </svg>

            <div className="relative z-10 overflow-hidden rounded-tl-lg rounded-tr-[3rem] rounded-br-lg rounded-bl-[3rem] shadow-2xl">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src="/images/contacto-tkc.png"
                  alt="Equipo TKC Fumigaciones Group"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-tkc-purple/50 via-tkc-purple/5 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ background: "linear-gradient(135deg, var(--color-tkc-blue) 0%, transparent 45%)", opacity: 0.16 }}
                />
              </div>
            </div>

            <div className="relative z-10 mt-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rotate-45 bg-tkc-blue" />
              <p className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
                Equipo TKC Fumigaciones Group
              </p>
              <span aria-hidden="true" className="hidden h-px flex-1 bg-line-strong/60 sm:block" />
              <Image
                src={GROUP_LOGO}
                alt="TKC Fumigaciones Group"
                width={GROUP_LOGO_DIMENSIONS.width}
                height={GROUP_LOGO_DIMENSIONS.height}
                className="h-4 w-auto opacity-70"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
