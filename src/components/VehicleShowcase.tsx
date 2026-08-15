"use client";

import Image from "next/image";
import { vehicleCards } from "@/lib/images";
import { useTilt } from "@/lib/motion";

export default function VehicleShowcase() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="eyebrow">Expertise Automobile</p>
          <h2>Nos véhicules</h2>
          <p>
            Une prise en charge premium pour Volkswagen et les véhicules multimarques,
            du diagnostic à la réparation mécanique.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vehicleCards.map((vehicle) => (
            <VehicleCard key={vehicle.name} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VehicleCard({ vehicle }: { vehicle: (typeof vehicleCards)[number] }) {
  const { ref, style } = useTilt(true);

  return (
    <article
      ref={ref}
      className="image-card group h-[360px] tilt-3d"
      style={style}
    >
      <div className="absolute inset-0 card-image">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="spotlight" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-all" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-3 accent-line" />
        <h3 className="text-2xl font-black text-white transform transition-transform">{vehicle.name}</h3>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">
          {vehicle.verification}
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{vehicle.description}</p>
        <a href="#services" className="mt-4 inline-flex text-sm font-bold text-white">
          Voir les services
        </a>
      </div>
    </article>
  );
}
