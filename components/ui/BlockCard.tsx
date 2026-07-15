"use client";

import { motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import ServiceChip from "@/components/ui/ServiceChip";
import type { ContentBlock } from "@/lib/content";

interface BlockCardProps {
  titulo: string;
  icon: LucideIcon;
  body: ContentBlock[];
  accent: string;
  delay?: number;
  className?: string;
  asChips?: boolean;
}

export default function BlockCard({
  titulo,
  icon: Icon,
  body,
  accent,
  delay = 0,
  className,
  asChips = true,
}: BlockCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={`rounded-2xl border bg-paper p-7 shadow-[0_1px_2px_rgba(20,10,40,0.05)] transition-shadow hover:shadow-lg ${className ?? ""}`}
      style={{ borderColor: `${accent}38` }}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accent}17` }}
      >
        <Icon size={22} strokeWidth={1.5} style={{ color: accent }} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{titulo}</h3>
      <div className="mt-3 space-y-3">
        {body.map((block, i) =>
          block.type === "paragraph" ? (
            <p key={i} className="text-[0.95rem] leading-relaxed text-ink/70">
              {block.text}
            </p>
          ) : asChips ? (
            <div key={i} className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <ServiceChip key={item} accent={accent}>
                  {item}
                </ServiceChip>
              ))}
            </div>
          ) : (
            <ul key={i} className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[0.9rem] text-ink/70">
                  <Check size={14} className="mt-1 shrink-0" style={{ color: accent }} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ),
        )}
      </div>
    </motion.article>
  );
}
