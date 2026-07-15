interface SocialIconProps {
  size?: number;
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon({ size = 20, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.75" />
      <path
        d="M14 9.2h1.6V6.6h-1.6c-1.79 0-3.1 1.36-3.1 3.15v1.55H9.2v2.6h1.7v5.4h2.6v-5.4h1.9l.4-2.6h-2.3v-1.3c0-.61.39-1.15 1.1-1.15Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4.5" />
      <rect x="7.1" y="10" width="1.9" height="7" fill="currentColor" stroke="none" />
      <circle cx="8.05" cy="7.3" r="1.05" fill="currentColor" stroke="none" />
      <path
        d="M11.1 10h1.9v1.05c.5-.75 1.35-1.25 2.35-1.25 1.85 0 3.05 1.3 3.05 3.5V17h-1.9v-3.3c0-1.05-.5-1.75-1.45-1.75-.75 0-1.4.55-1.65 1.25-.08.2-.1.45-.1.7V17h-1.9Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function TiktokIcon({ size = 20, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.75" />
      <path
        d="M13.6 6.5c.35 1.75 1.5 2.95 3.2 3.15v2.05c-1.15-.03-2.25-.4-3.2-1.1v4.3a4 4 0 1 1-4-4c.2 0 .4.02.6.05v2.05a2 2 0 1 0 1.4 1.9V6.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3.25" y="5.5" width="17.5" height="13" rx="4" />
      <path d="M10.4 9.2v5.6l5-2.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
