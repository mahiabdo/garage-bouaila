"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

const links = [
  ["Accueil", "#top"],
  ["Services", "#services"],
  ["À propos", "#about"],
  ["Véhicules", "#vehicles"],
  ["Galerie", "#gallery"],
  ["Avant / Après", "#before-after"],
  ["Avis", "#reviews"],
  ["Contact", "#contact"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const applyTheme = (next: "dark" | "light") => {
      const root = document.documentElement;
      root.setAttribute("data-theme", next);
      root.style.colorScheme = next;
      localStorage.setItem("garage-bouaila-theme", next);
      setTheme(next);
    };

    const saved = localStorage.getItem("garage-bouaila-theme") as "dark" | "light" | null;
    const preferred = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(preferred);

    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    root.style.colorScheme = nextTheme;
    localStorage.setItem("garage-bouaila-theme", nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-mobile-menu]") || target.closest("[data-mobile-nav]")) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid || open ? "border-b border-[var(--border)] bg-[var(--bg-soft)]/90 shadow-2xl shadow-[var(--shadow)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#top" aria-label="Garage Bouaïla accueil" scroll>
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <a href={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Garage Bouaïla, je souhaite prendre rendez-vous pour mon véhicule.")}` : "#contact"} target={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? "noreferrer" : undefined} className="btn btn-ghost">
            WhatsApp
          </a>
          <a href="#contact" className="btn btn-red">
            Prendre rendez-vous
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            className="theme-toggle-mobile"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            data-mobile-menu
            type="button"
            className="grid size-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface-soft)] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative flex h-5 w-7 flex-col justify-center">
              <span className={`absolute h-0.5 w-7 rounded-full bg-[var(--text)] transition-all ${open ? "rotate-45" : "-translate-y-2"}`} />
              <span className={`absolute h-0.5 w-7 rounded-full bg-[var(--text)] transition-all ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute h-0.5 w-7 rounded-full bg-[var(--text)] transition-all ${open ? "-rotate-45" : "translate-y-2"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" data-mobile-nav className="border-t border-[var(--border)] bg-[var(--bg-soft)]/95 px-4 py-5 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text)]"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="theme-toggle-mobile-full"
            >
              {theme === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre"}
            </button>
            <a href="#contact" className="btn btn-red mt-3 justify-center" onClick={() => setOpen(false)}>
              Prendre rendez-vous
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
