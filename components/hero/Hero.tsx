"use client";

import { motion } from "framer-motion";
import type { Portada } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import HeroBrandCore from "@/components/hero/HeroBrandCore";
import { WHATSAPP_URL } from "@/lib/links";

interface HeroProps {
  portada: Portada;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function scrollToLineas() {
  document.getElementById("lineas-negocio")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero({ portada }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ivory via-paper to-mist"
      />

      <GlowOrb
        className="-right-40 top-[-12rem] h-[36rem] w-[36rem]"
        color="var(--color-tkc-purple)"
        opacity={0.09}
      />
      <GlowOrb
        className="-left-24 bottom-[-10rem] h-80 w-80"
        color="var(--color-tkc-blue)"
        opacity={0.14}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[-8rem] h-[34rem] w-[34rem] opacity-[0.1] md:opacity-[0.14]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,0 200,60 60,200" fill="var(--color-tkc-purple)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-[-6rem] h-72 w-72 opacity-[0.16]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,200 200,200 0,0" fill="var(--color-tkc-blue)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[22rem] w-[22rem] -translate-y-1/2 opacity-[0.06] lg:block"
        viewBox="0 0 200 200"
      >
        <polygon
          points="100,4 196,180 4,180"
          fill="none"
          stroke="var(--color-tkc-purple)"
          strokeWidth="0.75"
        />
      </svg>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-6 md:pr-6">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="flex items-center gap-3"
          >
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-tkc-blue" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-tkc-purple/80">
              {portada.marca}
            </p>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-tkc-purple sm:text-6xl"
          >
            {portada.tituloPrincipal}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mt-7 max-w-md text-lg leading-relaxed text-ink/70"
          >
            {portada.fraseApoyo}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.32}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToLineas}
              className="rounded-full bg-tkc-purple px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-transform hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
            >
              CONOCER NUESTRAS SOLUCIONES
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-tkc-purple/30 px-7 py-3.5 text-sm font-medium tracking-wide text-tkc-purple transition-colors hover:border-tkc-purple hover:bg-tkc-purple-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
            >
              SOLICITAR ASESORÍA
            </a>
          </motion.div>
        </div>

        <div className="flex items-center justify-center md:col-span-6">
          <HeroBrandCore
            onActivate={scrollToLineas}
            label="TKC Fumigaciones Group — ir a nuestras líneas de negocio"
          />
        </div>
      </div>
    </section>
  );
}
