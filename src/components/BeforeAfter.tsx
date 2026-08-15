"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { beforeAfterPairs } from "@/lib/images";

function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(100, Math.max(0, next)));
    };

    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  const handlePointer = (clientX: number) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  return (
    <article className="glass-card rounded-md p-4">
      <h3 className="px-1 pb-4 text-xl font-black text-[var(--text)]">{title}</h3>
      <div
        ref={ref}
        className="relative h-72 overflow-hidden rounded-md"
        onPointerDown={(event) => {
          setDragging(true);
          handlePointer(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging) handlePointer(event.clientX);
        }}
        aria-label={`Comparez avant et après pour ${title}`}
      >
        <Image src={after} alt={`Après : ${title}`} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image src={before} alt={`Avant : ${title}`} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="absolute inset-y-0 w-0.5 bg-[var(--brand-red)]" />
          <div className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-red-500 bg-black/70 text-xl text-white shadow-lg shadow-red-900/40">
            ⇄
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-md bg-[var(--brand-red)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">
          Avant
        </span>
        <span className="absolute right-4 top-4 rounded-md bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          Après
        </span>
      </div>
    </article>
  );
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="section-pad bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="eyebrow">Avant / Après</p>
          <h2>Des transformations visibles</h2>
          <p>
            Comparaisons visuelles d&apos;interventions: freinage, moteur, nettoyage
            technique et remise en état.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {beforeAfterPairs.map((pair) => (
            <BeforeAfterSlider key={pair.title} before={pair.before} after={pair.after} title={pair.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
