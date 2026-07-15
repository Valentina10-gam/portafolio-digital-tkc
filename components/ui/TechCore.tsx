"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { GROUP_LOGO_WHITE, GROUP_LOGO_WHITE_DIMENSIONS } from "@/lib/brand-assets";

interface TechCoreProps {
  sizeClassName: string;
  logoClassName: string;
  breathing?: boolean;
  showScanLine?: boolean;
  showPulseRing?: boolean;
  pulseRingClassName?: string;
  entranceDelay?: number;
}

export default function TechCore({
  sizeClassName,
  logoClassName,
  breathing = false,
  showScanLine = false,
  showPulseRing = false,
  pulseRingClassName = "h-40 w-40 sm:h-52 sm:w-52",
  entranceDelay = 0.2,
}: TechCoreProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {showPulseRing && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-tkc-blue/40 ${pulseRingClassName}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.5, 1.7] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: entranceDelay + 0.9 }}
        />
      )}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={
          breathing && !prefersReducedMotion
            ? { opacity: 1, scale: [1, 1.03, 1] }
            : { opacity: 1, scale: 1 }
        }
        transition={
          breathing && !prefersReducedMotion
            ? {
                opacity: { duration: 0.7, delay: entranceDelay },
                scale: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: entranceDelay + 0.7,
                },
              }
            : { duration: 0.7, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] }
        }
        className={`relative flex items-center justify-center rounded-full ${sizeClassName}`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.18), transparent 42%), radial-gradient(circle at 50% 58%, #2c0056 0%, #20003e 55%, var(--color-tkc-core) 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(24,0,51,0.45), inset 0 1px 1px rgba(255,255,255,0.14)",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 rounded-full border border-tkc-blue/25" />

        {showScanLine && !prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-3 h-6 rounded-full bg-gradient-to-b from-transparent via-tkc-blue/35 to-transparent blur-[2px]"
            initial={{ top: "10%" }}
            animate={{ top: ["10%", "82%", "10%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: entranceDelay + 0.5,
            }}
          />
        )}

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[68%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 55%, transparent 75%)",
          }}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: entranceDelay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={GROUP_LOGO_WHITE}
            alt=""
            width={GROUP_LOGO_WHITE_DIMENSIONS.width}
            height={GROUP_LOGO_WHITE_DIMENSIONS.height}
            sizes="260px"
            className={logoClassName}
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
