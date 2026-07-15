"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LineaNegocio } from "@/lib/content";
import GlowOrb from "@/components/ui/GlowOrb";
import TechCore from "@/components/ui/TechCore";
import SectionEdge from "@/components/ui/SectionEdge";
import { LINEA_LOGOS, LINEA_LOGO_DIMENSIONS, LINEA_COLORS } from "@/lib/brand-assets";

interface LineasNegocioProps {
  lineasNegocio: LineaNegocio[];
}

const NODE_POSITIONS: Record<LineaNegocio["id"], { x: number; y: number; curve: number }> = {
  "tkc-corp": { x: 50, y: 15, curve: 6 },
  hidriko: { x: 80, y: 50, curve: -6 },
  "tkc-security": { x: 50, y: 85, curve: 6 },
  "tkc-home": { x: 20, y: 50, curve: -6 },
};

function connectionPath(x2: number, y2: number, curve: number) {
  const x1 = 50;
  const y1 = 50;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curve;
  const cy = my + ny * curve;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export default function LineasNegocio({ lineasNegocio }: LineasNegocioProps) {
  const [hoverId, setHoverId] = useState<LineaNegocio["id"] | null>(null);
  const [selectedId, setSelectedId] = useState<LineaNegocio["id"] | null>(null);
  const captionId = useId();
  const prefersReducedMotion = useReducedMotion();

  const activeId = hoverId ?? selectedId;
  const activeLinea = lineasNegocio.find((l) => l.id === activeId) ?? null;

  return (
    <section id="lineas-negocio" className="relative overflow-hidden bg-paper py-28">
      <SectionEdge accent="var(--color-tkc-purple)" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper via-ivory to-mist"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-tkc-purple) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 45%, black, transparent)",
        }}
      />
      <GlowOrb
        className="-left-32 -top-32 h-[30rem] w-[30rem]"
        color="var(--color-tkc-purple)"
        opacity={0.08}
      />
      <GlowOrb
        className="-bottom-40 -right-24 h-96 w-96"
        color="var(--color-tkc-blue)"
        opacity={0.12}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-[-4rem] h-80 w-80 opacity-[0.07]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,200 200,200 100,0" fill="var(--color-tkc-purple)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[-3rem] h-64 w-64 opacity-[0.1]"
        viewBox="0 0 200 200"
      >
        <polygon points="200,0 200,200 0,0" fill="var(--color-tkc-blue)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-[0.06]"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C150,80 300,140 450,100 C600,60 700,110 800,70"
          fill="none"
          stroke="var(--color-tkc-purple)"
          strokeWidth="1.5"
        />
        <path
          d="M0,150 C180,110 320,150 480,120 C620,95 720,130 800,100"
          fill="none"
          stroke="var(--color-tkc-blue)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-tkc-blue" />
          <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-tkc-purple/80">
            Nuestras líneas de negocio
          </h2>
        </motion.div>

        <div
          id={captionId}
          role="status"
          className="mt-4 min-h-7 max-w-md text-base text-ink/70"
        >
          {activeLinea ? (
            <span>
              <span className="font-semibold text-tkc-purple">{activeLinea.titulo}:</span>{" "}
              {activeLinea.encabezado}
            </span>
          ) : (
            <span className="opacity-0">.</span>
          )}
        </div>

        <div className="relative mx-auto mt-8 aspect-square w-full max-w-2xl">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 160, repeat: Infinity, ease: "linear" }
            }
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--color-tkc-purple)"
              strokeOpacity="0.1"
              strokeWidth="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--color-tkc-blue)"
              strokeOpacity="0.14"
              strokeWidth="0.3"
              strokeDasharray="0.6 3.4"
            />
          </motion.svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <filter id="line-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {lineasNegocio.map((linea, index) => {
              const pos = NODE_POSITIONS[linea.id];
              const isActive = activeId === linea.id;
              const d = connectionPath(pos.x, pos.y, pos.curve);
              return (
                <g key={linea.id}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={isActive ? LINEA_COLORS[linea.id] : "#d2cddc"}
                    strokeWidth={isActive ? 0.7 : 0.35}
                    strokeLinecap="round"
                    filter={isActive ? "url(#line-glow)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {isActive && !prefersReducedMotion && (
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={LINEA_COLORS[linea.id]}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeDasharray="2 14"
                      opacity={0.85}
                      animate={{ strokeDashoffset: [0, -32] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <TechCore
              sizeClassName="h-28 w-28 sm:h-40 sm:w-40 md:h-52 md:w-52"
              logoClassName="relative z-10 h-14 w-auto sm:h-20 md:h-24"
              breathing
              showPulseRing
              pulseRingClassName="h-28 w-28 sm:h-40 sm:w-40 md:h-52 md:w-52"
              entranceDelay={0.1}
            />
          </div>

          {lineasNegocio.map((linea, index) => {
            const pos = NODE_POSITIONS[linea.id];
            const dims = LINEA_LOGO_DIMENSIONS[linea.id];
            const isActive = activeId === linea.id;
            const color = LINEA_COLORS[linea.id];
            return (
              <motion.button
                key={linea.id}
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileFocus={{ scale: 1.1, y: -4 }}
                onMouseEnter={() => setHoverId(linea.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(linea.id)}
                onBlur={() => setHoverId(null)}
                onClick={() => setSelectedId((current) => (current === linea.id ? null : linea.id))}
                aria-pressed={selectedId === linea.id}
                aria-describedby={captionId}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  backgroundColor: "var(--color-paper)",
                  borderColor: `${color}40`,
                  boxShadow: isActive
                    ? `0 0 38px ${color}55, 0 14px 32px ${color}35`
                    : `0 0 18px ${color}20, 0 4px 16px rgba(15,10,30,0.1)`,
                }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border p-2.5 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tkc-blue sm:p-4"
              >
                <Image
                  src={LINEA_LOGOS[linea.id]}
                  alt={linea.titulo}
                  width={dims.width}
                  height={dims.height}
                  sizes="180px"
                  className="h-7 w-auto sm:h-11"
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
