"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

interface LineaHeaderProps {
  eyebrow: string;
  logoSrc: string;
  logoDimensions: { width: number; height: number };
  logoAlt: string;
  encabezado: string;
  introduccion: string;
  accent: string;
  logoClassName?: string;
}

export default function LineaHeader({
  eyebrow,
  logoSrc,
  logoDimensions,
  logoAlt,
  encabezado,
  introduccion,
  accent,
  logoClassName = "h-14 w-auto sm:h-16",
}: LineaHeaderProps) {
  return (
    <div className="max-w-2xl">
      <Eyebrow color={accent}>{eyebrow}</Eyebrow>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6"
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoDimensions.width}
          height={logoDimensions.height}
          className={logoClassName}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-tkc-purple sm:text-3xl"
      >
        {encabezado}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-lg leading-relaxed text-ink/70"
      >
        {introduccion}
      </motion.p>
    </div>
  );
}
