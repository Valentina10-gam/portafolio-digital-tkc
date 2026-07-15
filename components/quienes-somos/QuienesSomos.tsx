"use client";

import { motion } from "framer-motion";
import {
  Award,
  Timer,
  ShieldCheck,
  Radar,
  ClipboardCheck,
  GraduationCap,
  Check,
  type LucideIcon,
} from "lucide-react";
import type { ContentBlock, Diferencial } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import SectionEdge from "@/components/ui/SectionEdge";

interface QuienesSomosProps {
  titulo: string;
  diferenciales: Diferencial[];
}

const CARD_META: Record<
  string,
  { icon: LucideIcon; span: string; tint: string }
> = {
  "Experiencia y conocimiento": { icon: Award, span: "md:col-span-5", tint: "bg-paper" },
  "Cobertura y respuesta": { icon: Timer, span: "md:col-span-7", tint: "bg-paper" },
  "Sistemas de gestión certificados": {
    icon: ShieldCheck,
    span: "md:col-span-4",
    tint: "bg-paper",
  },
  "Tecnología y trazabilidad": { icon: Radar, span: "md:col-span-8", tint: "bg-paper" },
  "Acompañamiento técnico": {
    icon: ClipboardCheck,
    span: "md:col-span-6",
    tint: "bg-paper",
  },
  "Formación e innovación": {
    icon: GraduationCap,
    span: "md:col-span-6",
    tint: "bg-paper",
  },
};

function Block({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") {
    return <p className="text-[0.95rem] leading-relaxed text-ink/70">{block.text}</p>;
  }

  const list = (
    <ul className="mt-3 space-y-2">
      {block.items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[0.9rem] text-ink/70">
          <Check size={14} className="mt-1 shrink-0 text-tkc-blue" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  if (block.items.length > 4) {
    return (
      <details className="group mt-1">
        <summary className="cursor-pointer text-[0.85rem] font-medium text-tkc-purple underline decoration-tkc-blue decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue">
          Ver detalle
        </summary>
        {list}
      </details>
    );
  }

  return list;
}

export default function QuienesSomos({ titulo, diferenciales }: QuienesSomosProps) {
  return (
    <section id="quienes-somos" className="relative overflow-hidden bg-ivory py-28">
      <SectionEdge accent="var(--color-tkc-purple)" />
      <GlowOrb
        className="-right-32 -top-24 h-96 w-96"
        color="var(--color-tkc-purple)"
        opacity={0.05}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-[-5rem] h-72 w-72 opacity-[0.05]"
        viewBox="0 0 200 200"
      >
        <polygon
          points="0,200 200,200 0,0"
          fill="none"
          stroke="var(--color-tkc-purple)"
          strokeWidth="0.75"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[10%] hidden h-40 w-40 opacity-[0.08] lg:block"
        viewBox="0 0 200 200"
      >
        <polygon points="200,0 200,140 60,0" fill="var(--color-tkc-blue)" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[18%] hidden h-px w-40 rotate-45 bg-tkc-purple/10 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-tkc-purple sm:text-4xl"
        >
          {titulo}
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
          {diferenciales.map((diferencial, index) => {
            const meta = CARD_META[diferencial.titulo];
            const Icon = meta?.icon ?? Award;
            return (
              <motion.article
                key={diferencial.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (index % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border border-line ${meta?.tint ?? "bg-paper"} ${
                  meta?.span ?? "md:col-span-6"
                } p-8 shadow-[0_1px_2px_rgba(20,10,40,0.05)] transition-shadow hover:shadow-md`}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tkc-purple/10"
                >
                  <Icon size={24} strokeWidth={1.5} className="text-tkc-purple" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{diferencial.titulo}</h3>
                <div className="mt-3 space-y-3">
                  {diferencial.body.map((block, blockIndex) => (
                    <Block key={blockIndex} block={block} />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
