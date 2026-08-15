import Image from "next/image";
import LogoMark from "./LogoMark";

const trust = [
  "Diagnostic professionnel",
  "Équipe expérimentée",
  "Service rapide",
  "Expertise Volkswagen",
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/garage-hero.jpg"
          alt="Garage Bouaïla - atelier automobile professionnel à Safi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-rise">
          <div className="mb-8 inline-flex rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-3 backdrop-blur">
            <LogoMark />
          </div>
          <p className="eyebrow">Garage automobile à Safi</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-normal text-[var(--text)] sm:text-6xl lg:text-8xl">
            Garage Bouaïla
          </h1>
          <h2 className="mt-5 max-w-3xl text-2xl font-bold text-[var(--text)] sm:text-4xl">
            Entretien & Réparation Automobile
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-soft)] sm:text-xl">
            Votre spécialiste en mécanique automobile à Safi, avec une expertise solide
            sur les véhicules Volkswagen et la mécanique générale.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-red">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-metal">
              Nous contacter
            </a>
            <a href="#services" className="btn btn-ghost">
              Voir nos services
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {trust.map((itemText) => (
              <span key={itemText} className="trust-pill">
                <span className="text-[#E00000]">✓</span> {itemText}
              </span>
            ))}
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { value: "+10", label: "ans" },
              { value: "+500", label: "réparations" },
              { value: "Service", label: "pro" },
            ].map((stat) => (
              <div key={stat.value + stat.label} className="glass-card rounded-md p-4">
                <div className="text-xl font-black text-[var(--text)]">{stat.value}</div>
                <div className="mt-1 text-sm text-[var(--text-soft)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
