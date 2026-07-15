interface ServiceChipProps {
  children: string;
  accent: string;
}

export default function ServiceChip({ children, accent }: ServiceChipProps) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium text-ink/85"
      style={{ borderColor: `${accent}45`, backgroundColor: `${accent}16` }}
    >
      {children}
    </span>
  );
}
