"use client";

import { useState } from "react";
import { settings } from "@/lib/data";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <div className="relative">
        {open && (
          <div className="absolute bottom-16 right-0 flex w-72 flex-col gap-2 rounded-2xl border border-white/10 bg-[#0f1115]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
            {settings.phones.map((phone) => (
              <a
                key={phone.whatsapp}
                href={`https://wa.me/${phone.whatsapp}?text=${encodeURIComponent("Bonjour Garage Bouaïla, je souhaite prendre rendez-vous pour mon véhicule.")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-500/20"
              >
                WhatsApp — {phone.formatted}
              </a>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Contacter Garage Bouaïla sur WhatsApp"
          className="grid size-14 place-items-center rounded-full border border-white/15 bg-[#20b358] text-xl font-black text-white shadow-2xl shadow-green-950/40 transition-transform hover:scale-105"
        >
          W
        </button>
      </div>
    </div>
  );
}
