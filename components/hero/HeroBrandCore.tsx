"use client";

import type { MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import GlowOrb from "@/components/ui/GlowOrb";
import TechCore from "@/components/ui/TechCore";

interface HeroBrandCoreProps {
  onActivate: () => void;
  label: string;
}

export default function HeroBrandCore({ onActivate, label }: HeroBrandCoreProps) {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const outerX = useTransform(springX, (v) => v * 0.5);
  const outerY = useTransform(springY, (v) => v * 0.5);
  const coreX = useTransform(springX, (v) => v * 0.18);
  const coreY = useTransform(springY, (v) => v * 0.18);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 20);
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 20);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[28rem] w-full max-w-xl items-center justify-center sm:h-[36rem] md:h-[40rem]"
    >
      <GlowOrb
        className="h-80 w-80 sm:h-[30rem] sm:w-[30rem] md:h-[34rem] md:w-[34rem]"
        color="var(--color-tkc-purple)"
        opacity={0.13}
      />
      <GlowOrb
        className="h-40 w-40 translate-x-28 translate-y-20 sm:h-60 sm:w-60 sm:translate-x-36 sm:translate-y-28 md:h-64 md:w-64"
        color="var(--color-tkc-blue)"
        opacity={0.2}
      />

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute h-[82%] w-[82%]"
        style={{ x: outerX, y: outerY }}
        initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <polygon
          points="200,44 336,296 64,296"
          fill="none"
          stroke="var(--color-tkc-purple)"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <polygon
          points="200,92 296,266 104,266"
          fill="none"
          stroke="var(--color-tkc-blue)"
          strokeOpacity="0.18"
          strokeWidth="0.75"
        />
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute h-full w-full"
        style={{ x: outerX, y: outerY }}
        initial={{ opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, rotate: 360 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.8, delay: 0.1 }
            : {
                opacity: { duration: 0.8, delay: 0.1 },
                rotate: { duration: 110, repeat: Infinity, ease: "linear" },
              }
        }
      >
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="var(--color-tkc-purple)"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="172"
          fill="none"
          stroke="var(--color-tkc-blue)"
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="1.5 11"
        />
        <circle
          cx="200"
          cy="200"
          r="198"
          fill="none"
          stroke="var(--color-tkc-purple)"
          strokeOpacity="0.1"
          strokeWidth="0.6"
        />
        <circle cx="200" cy="60" r="3" fill="var(--color-tkc-blue)" fillOpacity="0.55" />
        <circle cx="372" cy="200" r="2.5" fill="var(--color-tkc-purple)" fillOpacity="0.4" />
        <circle cx="200" cy="340" r="2.5" fill="var(--color-tkc-blue)" fillOpacity="0.4" />
        <circle cx="28" cy="200" r="3" fill="var(--color-tkc-purple)" fillOpacity="0.45" />
      </motion.svg>

      <motion.button
        type="button"
        onClick={onActivate}
        aria-label={label}
        style={{ x: coreX, y: coreY }}
        whileHover={{ scale: 1.02 }}
        className="relative rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-tkc-blue"
      >
        <TechCore
          sizeClassName="h-60 w-60 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]"
          logoClassName="h-24 w-auto sm:h-32 md:h-36 drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
          showScanLine
          showPulseRing
          pulseRingClassName="h-60 w-60 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]"
          entranceDelay={0.3}
        />
      </motion.button>
    </div>
  );
}
