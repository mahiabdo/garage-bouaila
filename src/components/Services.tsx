import Image from "next/image";
import { services } from "@/lib/data";
import { serviceImages } from "@/lib/images";

export default function Services() {
  return (
    <section id="services" className="section-pad bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Entretien & réparation avec précision</h2>
          <p>
            Des interventions propres, rapides et contrôlées, avec diagnostic moderne
            et expertise Volkswagen.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="service-card group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={serviceImages[service.id]}
                  alt={`${service.title} - Garage Bouaïla Safi`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 grid size-12 place-items-center rounded-md border border-[var(--border)] bg-black/70 text-2xl backdrop-blur">
                  {service.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[var(--text)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">{service.description}</p>
                <a href="#contact" className="mt-5 inline-flex text-sm font-bold text-[var(--brand-red)]">
                  En savoir plus
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
