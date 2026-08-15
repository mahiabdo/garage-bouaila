import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { imagePath } from "@/lib/images";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.github.io"),
  title: "Garage Bouaïla | Entretien & Réparation Automobile à Safi",
  description:
    "Garage Bouaïla à Safi — diagnostic, entretien et réparation automobile. Expertise Volkswagen et service professionnel.",
  keywords: [
    "Garage Bouaïla",
    "garage Safi",
    "réparation automobile Safi",
    "Volkswagen Safi",
    "diagnostic automobile",
  ],
  openGraph: {
    title: "Garage Bouaïla | Entretien & Réparation Automobile",
    description: "Atelier automobile professionnel à Safi, spécialisé Volkswagen et mécanique générale.",
    images: [imagePath("/images/hero/garage-hero.jpg")],
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const key = 'garage-bouaila-theme';
                  const saved = localStorage.getItem(key);
                  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
                  const theme = saved || (prefersLight ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
