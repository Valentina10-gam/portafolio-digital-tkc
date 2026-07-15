import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionRoot from "@/components/motion-root";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TKC Fumigaciones Group",
  description:
    "Soluciones integrales de saneamiento ambiental para empresas, instituciones y hogares.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
