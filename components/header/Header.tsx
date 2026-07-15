"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/links";
import { GROUP_LOGO, GROUP_LOGO_DIMENSIONS } from "@/lib/brand-assets";

const NAV_LINKS = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#lineas-negocio", label: "Líneas de negocio" },
  { href: "#referencias", label: "Referencias" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[4.5rem] md:px-10">
        <a
          href="#hero"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tkc-blue"
          aria-label="TKC Fumigaciones Group — inicio"
        >
          <Image
            src={GROUP_LOGO}
            alt="TKC Fumigaciones Group"
            width={GROUP_LOGO_DIMENSIONS.width}
            height={GROUP_LOGO_DIMENSIONS.height}
            priority
            sizes="200px"
            style={{ height: "2.25rem", width: "auto" }}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-tkc-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tkc-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-tkc-purple px-5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
          >
            Solicitar asesoría
          </a>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-ink md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-ink/80 transition-colors hover:bg-mist hover:text-tkc-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tkc-blue"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-tkc-purple px-5 py-3 text-center text-sm font-medium text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tkc-blue"
          >
            Solicitar asesoría
          </a>
        </div>
      )}
    </header>
  );
}
