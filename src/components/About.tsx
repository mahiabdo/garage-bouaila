import Image from "next/image";
import { imagePath } from "@/lib/images";
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
              src={imagePath("/images/garage/mechanic.jpg")}
              alt="Mécanicien professionnel travaillant sur un véhicule"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          </div>
          <div className="grid gap-4 sm:col-span-2">
            {[
              [imagePath("/images/garage/tools.jpg"), "Outils automobiles professionnels"],
              [imagePath("/images/garage/diagnostic.jpg"), "Équipement de diagnostic moderne"],
            ].map(([src, alt]) => (
              <div key={src} className="image-card h-[252px]">
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">À propos du Garage Bouaila</p>
          <h2 id="garage-information" className="mt-4 text-4xl font-black leading-tight text-[var(--text)] sm:text-5xl">
            Garage automobile à Safi, spécialisé Volkswagen et mécanique générale.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--text-soft)]">
            Garage Bouaila est un garage automobile situé à Safi, au Maroc. Il intervient
            dans l&apos;entretien, le diagnostic et la réparation des véhicules Volkswagen,
            ainsi que dans la mécanique automobile générale pour les voitures en circulation
            à Safi et dans la région.
          </p>
          <p className="mt-4 leading-7 text-[var(--text-soft)]">
            Le garage propose des interventions de diagnostic automobile à Safi,
            d&apos;entretien voiture, de réparation mécanique, de freinage, de climatisation,
            de vidange et de maintenance pour assurer un service fiable et professionnel.
          </p>

          <ul className="mt-6 grid gap-3 text-sm text-[var(--text-soft)] sm:grid-cols-2">
            <li className="flex items-start gap-2"><span aria-hidden="true">•</span><span>Garage automobile à Safi</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true">•</span><span>Garage Volkswagen à Safi</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true">•</span><span>Réparation automobile à Safi</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true">•</span><span>Diagnostic automobile à Safi</span></li>
          </ul>

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
