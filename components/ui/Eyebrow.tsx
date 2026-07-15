"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface EyebrowProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export default function Eyebrow({
  children,
  color = "var(--color-tkc-blue)",
  className,
}: EyebrowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 ${className ?? ""}`}
    >
      <span aria-hidden="true" className="h-2 w-2 rotate-45" style={{ backgroundColor: color }} />
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-tkc-purple/80">
        {children}
      </p>
    </motion.div>
  );
}
