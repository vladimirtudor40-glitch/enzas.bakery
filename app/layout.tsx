import type { Metadata, Viewport } from "next";
import { Amatic_SC, Lobster, Zilla_Slab } from "next/font/google";
import { Providers } from "@/components/Providers";
import { brand } from "@/data/bakery-data";
import "./globals.css";

const zilla = Zilla_Slab({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-zilla",
  display: "swap",
});

const amatic = Amatic_SC({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  variable: "--font-amatic",
  display: "swap",
});

const lobster = Lobster({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-lobster",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — Brutărie & Patiserie Artizanală în Constanța`,
  description:
    "Pâine cu maia, croissante cu unt, torturi și deserturi artizanale coapte zilnic în loturi mici. Comenzi pe WhatsApp și Instagram @enzas.bakery.",
  openGraph: {
    title: `${brand.name} — Brutărie & Patiserie Artizanală`,
    description: "Pâine coaptă cu suflet, în fiecare dimineață. Aleea Violetelor 3, Constanța.",
    locale: "ro_RO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3D8CF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${zilla.variable} ${amatic.variable} ${lobster.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
