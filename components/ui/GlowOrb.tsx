interface GlowOrbProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export default function GlowOrb({
  className,
  color = "var(--color-tkc-purple)",
  opacity = 0.16,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
      style={{ background: color, opacity }}
    />
  );
}
