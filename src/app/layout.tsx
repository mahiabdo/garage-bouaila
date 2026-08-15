import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { settings } from "@/lib/data";
import { imagePath } from "@/lib/images";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mahiabdo.github.io/garage-bouaila";
const ogImageUrl = new URL(`images/hero/garage-hero.jpg`, `${siteUrl}/`).toString();
const canonicalBase = new URL(`${siteUrl}/`).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Garage Bouaila | Garage Automobile & Volkswagen à Safi",
  description:
    "Garage Bouaila à Safi, spécialiste Volkswagen et réparation automobile. Diagnostic électronique, entretien, freinage, moteur, climatisation et mécanique. Prenez rendez-vous ou contactez-nous sur WhatsApp.",
  keywords: [
    "Garage Bouaila",
    "Garage automobile à Safi",
    "Garage Volkswagen à Safi",
    "Réparation automobile à Safi",
    "Diagnostic automobile à Safi",
    "Entretien Volkswagen à Safi",
    "Réparation Volkswagen à Safi",
    "Mécanicien Safi",
    "Garage mécanique Safi",
    "Volkswagen Safi",
    "Garage Bouaila Safi",
  ],
  applicationName: "Garage Bouaila",
  authors: [{ name: "Garage Bouaila" }],
  creator: "Garage Bouaila",
  publisher: "Garage Bouaila",
  alternates: {
    canonical: canonicalBase,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Garage Bouaila | Garage Automobile & Volkswagen à Safi",
    description:
      "Garage Bouaila à Safi, spécialiste Volkswagen et réparation automobile. Diagnostic électronique, entretien, freinage, moteur, climatisation et mécanique.",
    url: canonicalBase,
    siteName: "Garage Bouaila",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Garage Bouaila - atelier automobile et Volkswagen à Safi" }],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Bouaila | Garage Automobile & Volkswagen à Safi",
    description:
      "Garage Bouaila à Safi, spécialiste Volkswagen et réparation automobile. Diagnostic électronique, entretien, freinage, moteur, climatisation et mécanique.",
    images: [ogImageUrl],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Garage Bouaila",
  image: ogImageUrl,
  logo: ogImageUrl,
  url: canonicalBase,
  telephone: settings.phones.map((phone) => phone.dial),
  sameAs: [
    `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Bonjour Garage Bouaila, je souhaite prendre rendez-vous.")}`,
    settings.location.googleMapsUrl,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: settings.address,
    addressLocality: "Safi",
    addressCountry: "MA",
  },
  areaServed: "Safi, Morocco",
  description:
    "Garage automobile à Safi spécialisé en Volkswagen et réparation automobile générale, avec diagnostic, entretien, freinage, moteur et climatisation.",
  makesOffer: [
    "Diagnostic automobile à Safi",
    "Entretien Volkswagen à Safi",
    "Réparation automobile à Safi",
    "Réparation Volkswagen à Safi",
    "Garage mécanique Safi",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "18:30",
    },
  ],
  geo: settings.location.latitude && settings.location.longitude
    ? {
        "@type": "GeoCoordinates",
        latitude: settings.location.latitude,
        longitude: settings.location.longitude,
      }
    : undefined,
  priceRange: "€€",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
