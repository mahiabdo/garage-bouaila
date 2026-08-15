"use client";

import Image from "next/image";
import { useState } from "react";
import { garageGallery } from "@/lib/images";

function Lightbox({ active, onClose }: { active: (typeof garageGallery)[number] | null; onClose: () => void }) {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur"
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-5 grid size-11 place-items-center rounded-md border border-white/15 bg-white/10 text-2xl text-white"
        onClick={onClose}
        aria-label="Fermer"
      >
        ×
      </button>
      <div className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-md transition-all duration-300 ease-out animate-[fadeIn_0.28s_ease-out]">
        <Image src={active.src} alt={active.title} fill sizes="90vw" className="object-contain" />
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<(typeof garageGallery)[number] | null>(null);

  return (
    <section id="gallery" className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="eyebrow">Notre Garage</p>
          <h2>Atelier, outils et interventions</h2>
          <p>
            Un aperçu réaliste de l&apos;environnement de travail: diagnostic,
            mécanique, véhicules sur pont et équipement professionnel.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {garageGallery.map((image) => (
            <button
              key={image.src}
              className={`image-card group text-left ${image.span}`}
              onClick={() => setActive(image)}
              aria-label={`Ouvrir ${image.title}`}
            >
              <div className="absolute inset-0 transition duration-700 group-hover:scale-105">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <h3 className="font-black text-white opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{image.title}</h3>
                <span className="grid size-10 shrink-0 place-items-center rounded-md border border-white/20 bg-black/55 text-lg backdrop-blur opacity-0 transition duration-300 group-hover:opacity-100">📷</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox active={active} onClose={() => setActive(null)} />
    </section>
  );
}
