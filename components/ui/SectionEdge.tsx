export default function SectionEdge({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
      style={{ background: `linear-gradient(to right, transparent, ${accent}70, transparent)` }}
    />
  );
}
