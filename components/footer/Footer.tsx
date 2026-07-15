import Image from "next/image";
import { Globe2 } from "lucide-react";
import { GROUP_LOGO_WHITE, GROUP_LOGO_WHITE_DIMENSIONS } from "@/lib/brand-assets";
import { SOCIAL_LINKS, WEBSITE_URL, WEBSITE_LABEL } from "@/lib/links";
import type { Contacto } from "@/lib/content";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const SOCIALS = [
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL_LINKS.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: SOCIAL_LINKS.tiktok, label: "TikTok", Icon: TiktokIcon },
  { href: SOCIAL_LINKS.youtube, label: "YouTube", Icon: YoutubeIcon },
];

interface FooterProps {
  fraseFinalMarca: Contacto["fraseFinalMarca"];
  fraseFinalTexto: Contacto["fraseFinalTexto"];
}

export default function Footer({ fraseFinalMarca, fraseFinalTexto }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-tkc-core py-16 text-paper/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-tkc-blue) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 -top-14 h-56 w-56 opacity-[0.07]"
        viewBox="0 0 200 200"
      >
        <polygon points="0,0 200,0 0,200" fill="var(--color-tkc-blue)" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 opacity-[0.08]"
        viewBox="0 0 200 200"
      >
        <polygon points="200,200 0,200 200,20" fill="none" stroke="var(--color-tkc-blue)" strokeWidth="0.75" />
      </svg>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-7 px-6 text-center md:px-10">
        <Image
          src={GROUP_LOGO_WHITE}
          alt="TKC Fumigaciones Group"
          width={GROUP_LOGO_WHITE_DIMENSIONS.width}
          height={GROUP_LOGO_WHITE_DIMENSIONS.height}
          className="h-9 w-auto"
        />

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">
          TKC Fumigaciones Group
        </p>

        {(fraseFinalMarca || fraseFinalTexto) && (
          <div className="max-w-xl">
            {fraseFinalMarca && (
              <p className="text-base font-semibold text-paper">{fraseFinalMarca}</p>
            )}
            {fraseFinalTexto && (
              <p className="mt-1 text-sm text-paper/60">{fraseFinalTexto}</p>
            )}
          </div>
        )}

        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2 text-sm font-medium text-paper transition-colors hover:border-tkc-blue hover:text-tkc-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
        >
          <Globe2 size={16} aria-hidden="true" />
          {WEBSITE_LABEL}
        </a>

        <nav aria-label="Redes sociales de TKC Fumigaciones Group" className="flex items-center gap-3">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-tkc-blue hover:text-tkc-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
            >
              <Icon size={18} />
            </a>
          ))}
        </nav>

        <div className="w-full max-w-md border-t border-paper/15" />

        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
          © {new Date().getFullYear()} TKC Fumigaciones Group · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
