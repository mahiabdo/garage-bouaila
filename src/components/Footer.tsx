import Link from "next/link";
import { settings } from "@/lib/data";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--brand-bg)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <LogoMark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            Entretien & Réparation Automobile à Safi, avec expertise Volkswagen
            et mécanique générale.
          </p>
        </div>
        <div>
          <h3 className="footer-title">Navigation</h3>
          <Link href="#top" className="footer-link">Accueil</Link>
          <Link href="#services" className="footer-link">Services</Link>
          <Link href="#about" className="footer-link">À propos</Link>
          <Link href="#vehicles" className="footer-link">Véhicules</Link>
        </div>
        <div>
          <h3 className="footer-title">Services</h3>
          <Link href="#services" className="footer-link">Diagnostic</Link>
          <Link href="#services" className="footer-link">Vidange</Link>
          <Link href="#services" className="footer-link">Réparation moteur</Link>
        </div>
        <div>
          <h3 className="footer-title">Contact</h3>
          <a href={settings.whatsapp ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Bonjour Garage Bouaïla, je souhaite prendre rendez-vous pour mon véhicule.")}` : "#contact"} target={settings.whatsapp ? "_blank" : undefined} rel={settings.whatsapp ? "noreferrer" : undefined} className="footer-link">WhatsApp</a>
          <a href={settings.phone ? `tel:${settings.phone.replace(/\s+/g, "")}` : "#contact"} className="footer-link">Appeler</a>
          <Link href="#contact" className="footer-link">Contact</Link>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-6 text-center text-sm text-[var(--text-soft)]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 h-px w-full bg-[var(--border)]" />
          <p>© 2026 Garage Bouaïla — Tous droits réservés.</p>
          <p className="mt-3 text-[var(--text-soft)]">Site développé &amp; géré par</p>
          <p className="text-base font-semibold text-[var(--text)]">Mahi Abdalmtlib</p>
          <div className="mt-3 flex flex-col items-center gap-1 text-[var(--text-soft)] sm:flex-row sm:justify-center sm:gap-6">
            <a href="mailto:mahi.abdalmtlib@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text)]">
              <span aria-hidden="true">📧</span>
              <span>mahi.abdalmtlib@gmail.com</span>
            </a>
            <a href="tel:+212622132696" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text)]">
              <span aria-hidden="true">📞</span>
              <span>06 22 13 26 96</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
