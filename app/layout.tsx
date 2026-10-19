import "./globals.css";

import type { Metadata, Viewport } from "next";
import { DM_Mono } from "next/font/google";
import { links } from "@/data/links";

// The identity manual specifies Apercu Mono Pro (commercial licence). DM Mono stands in until a web licence
// is available: swap it here with next/font/local and keep the --dv-font variable.
const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--dv-font",
});

export const metadata: Metadata = {
  metadataBase: new URL(links.pageUrl),
  title: links.brand.title,
  description: links.brand.description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: links.brand.name,
    title: links.brand.title,
    description: links.brand.description,
    type: "website",
    locale: "es_MX",
    images: [links.heroImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={dmMono.variable}>
      <body>{children}</body>
    </html>
  );
}
