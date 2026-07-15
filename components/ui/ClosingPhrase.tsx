"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ClosingPhraseProps {
  children: ReactNode;
  accent: string;
  className?: string;
}

export default function ClosingPhrase({ children, accent, className }: ClosingPhraseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mt-16 flex items-center gap-4 border-t pt-8 ${className ?? ""}`}
      style={{ borderColor: `${accent}40` }}
    >
      <span aria-hidden="true" className="h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
      <p className="text-lg font-medium leading-relaxed text-ink">{children}</p>
    </motion.div>
  );
}
