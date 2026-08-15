import Image from "next/image";
import Counter from "./Counter";

const stats: Array<[number, string, number]> = [
  [10, "ans d'expérience", 900],
  [500, "véhicules réparés", 1400],
  [100, "% qualité", 1100],
  [24, "/7 Contact", 1200],
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="grid gap-4 sm:grid-cols-5">
          <div className="image-card h-[520px] sm:col-span-3">
            <Image
              src="/images/garage/mechanic.jpg"
              alt="Mécanicien professionnel travaillant sur un véhicule"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          </div>
          <div className="grid gap-4 sm:col-span-2">
            {[
              ["/images/garage/tools.jpg", "Outils automobiles professionnels"],
              ["/images/garage/diagnostic.jpg", "Équipement de diagnostic moderne"],
            ].map(([src, alt]) => (
              <div key={src} className="image-card h-[252px]">
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">À propos du Garage Bouaïla</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[var(--text)] sm:text-5xl">
            Un atelier sérieux pour une mécanique fiable.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--text-soft)]">
            Garage Bouaïla est un atelier spécialisé dans l&apos;entretien et la réparation
            automobile à Safi. Notre objectif est de fournir un service rapide,
            fiable et professionnel avec des équipements modernes.
          </p>
          <p className="mt-4 leading-7 text-[var(--text-soft)]">
            L&apos;équipe travaille avec méthode: diagnostic clair, pièces de qualité,
            intervention propre et attention réelle à la satisfaction client.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map(([value, label, duration]) => (
              <div key={label} className="glass-card rounded-md p-5">
                <Counter to={Number(value)} duration={duration} />
                <div className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--text-soft)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
