"use client";

import { useMemo } from "react";
import { settings } from "@/lib/data";

function buildDirectionsUrl() {
  const location = settings.location;
  if (location.googleMapsUrl) return location.googleMapsUrl;

  if (location.latitude != null && location.longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
  }

  if (location.address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`;
  }

  return "https://www.google.com/maps";
}

function buildMapUrl() {
  const location = settings.location;
  if (location.googleMapsUrl) return location.googleMapsUrl;

  if (location.latitude != null && location.longitude != null) {
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15`;
  }

  if (location.address) {
    return `https://www.google.com/maps?q=${encodeURIComponent(location.address)}&z=15`;
  }

  return "https://www.google.com/maps";
}

function buildEmbedMapUrl() {
  const location = settings.location;

  if (location.latitude != null && location.longitude != null) {
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}&output=embed`;
  }

  if (location.googleMapsUrl) {
    try {
      const url = new URL(location.googleMapsUrl);
      const query = url.searchParams.get("query") || url.searchParams.get("q") || location.address;
      if (query) {
        return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
      }
    } catch {
      // fall through to address-based fallback below
    }
  }

  if (location.address) {
    return `https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`;
  }

  return "https://www.google.com/maps?q=7QG6%2BMV7%2C%20Safi%2C%20Morocco&output=embed";
}

export default function LocationMap() {
  const mapUrl = useMemo(() => buildMapUrl(), []);
  const directionsUrl = useMemo(() => buildDirectionsUrl(), []);
  const embedMapUrl = useMemo(() => buildEmbedMapUrl(), []);
  const hasExactLocation = Boolean(
    settings.location.googleMapsUrl ||
      (settings.location.latitude != null && settings.location.longitude != null) ||
      settings.location.address
  );

  return (
    <section id="location" className="section-pad bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-left">
          <p className="eyebrow">Nous trouver</p>
          <h2 className="mt-4 text-4xl font-black text-[var(--text)] sm:text-5xl">Retrouvez facilement Garage Bouaïla à Safi.</h2>
        </div>

        <div className="grid gap-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_80px_var(--shadow)] lg:grid-cols-[1.6fr_1fr]">
          <div className="relative min-h-[360px] overflow-hidden border-b border-[var(--border)] lg:min-h-[500px] lg:border-b-0 lg:border-r">
            {hasExactLocation ? (
              <iframe
                title="Carte Garage Bouaïla"
                src={embedMapUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-full min-h-[360px] items-center justify-center bg-[radial-gradient(circle_at_center,var(--surface-soft),var(--brand-bg))] px-6 text-center">
                <div>
                  <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full border border-red-500/40 bg-red-500/10 text-2xl text-red-500">📍</div>
                  <p className="text-lg font-bold text-[var(--text)]">Localisation Garage Bouaïla</p>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">Aucune adresse exacte n&apos;est encore vérifiée. Ajoutez GARAGE_ADDRESS ou GARAGE_LATITUDE / GARAGE_LONGITUDE dans les variables d&apos;environnement.</p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-sm font-bold text-[var(--text)]"
                  >
                    Voir la localisation sur Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>

          <aside className="flex flex-col justify-center bg-[var(--surface)] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-xl border border-red-500/40 bg-red-500/10 text-2xl text-red-500">🔧</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Garage</p>
                <h3 className="text-2xl font-black text-[var(--text)]">Garage Bouaïla</h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[var(--text-soft)]">
              <p className="flex items-start gap-3"><span className="mt-1">📍</span><span>{settings.address}</span></p>
              <div className="space-y-3">
                {settings.phones.map((phone) => (
                  <div key={phone.dial} className="flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span>📞</span>
                      <span className="font-medium text-[var(--text)]">{phone.formatted}</span>
                    </div>
                    <div className="flex gap-2">
                      <a href={`tel:${phone.dial}`} className="inline-flex rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-bold text-[var(--text)]">Appeler</a>
                      <a href={`https://wa.me/${phone.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex rounded-md border border-green-500/30 bg-green-500/10 px-2.5 py-1.5 text-xs font-bold text-green-400">WhatsApp</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-soft)]">Horaires</p>
                <div className="mt-3 space-y-1 text-[var(--text)]">
                  <p><span className="font-semibold">Lundi – Samedi</span> 08:30 – 18:30</p>
                  <p><span className="font-semibold">Dimanche</span> Fermé</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a href={directionsUrl} target="_blank" rel="noreferrer" className="btn btn-red justify-center">
                  📍 Itinéraire
                </a>
                <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-metal justify-center">
                  🗺️ Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
