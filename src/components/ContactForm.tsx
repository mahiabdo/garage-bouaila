"use client";

import { FormEvent, useMemo, useState } from "react";
import { settings } from "@/lib/data";

const phonePattern = /^(?:\+?\d[\d\s().-]{7,20})$/;

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyMessage, setReadyMessage] = useState<string | null>(null);

  const mapHref = useMemo(() => {
    const address = encodeURIComponent(settings.address || "Safi, Maroc");
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (!values.name) nextErrors.name = "Veuillez entrer votre nom.";
    if (!values.phone) nextErrors.phone = "Veuillez entrer votre numéro de téléphone.";
    else if (!phonePattern.test(values.phone)) nextErrors.phone = "Veuillez entrer un numéro de téléphone valide.";
    if (!values.message) nextErrors.message = "Veuillez entrer votre message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ type: "error", message: "Veuillez corriger les champs indiqués." });
      return;
    }

    const whatsappMessage = [
      "Bonjour Garage Bouaïla,",
      `Nom: ${values.name}`,
      `Téléphone: ${values.phone}`,
      values.email ? `Email: ${values.email}` : undefined,
      `Message: ${values.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    setReadyMessage(whatsappMessage);
    setStatus({
      type: "success",
      message: "Votre message est prêt. Choisissez un numéro WhatsApp pour l’envoyer.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-4xl font-black text-[var(--text)] sm:text-5xl">Garage Bouaïla</h2>
          <div className="mt-8 space-y-4 text-[var(--text-soft)]">
            <p>📍 {settings.address}</p>
            <p>📞 Téléphone: <a href={settings.phone ? `tel:${settings.phone.replace(/\s+/g, "")}` : "#contact"} className="text-[var(--text)] underline decoration-red-500 underline-offset-4">{settings.phone}</a></p>
            <p>💬 WhatsApp: <a href={settings.whatsapp ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Bonjour Garage Bouaïla, je souhaite prendre rendez-vous pour mon véhicule.")}` : "#contact"} target={settings.whatsapp ? "_blank" : undefined} rel={settings.whatsapp ? "noreferrer" : undefined} className="text-[var(--text)] underline decoration-green-500 underline-offset-4">{settings.whatsapp ? "Ouvrir WhatsApp" : "Numéro non configuré"}</a></p>
            <p>🕒 {settings.hours.weekday}</p>
            <p>🕒 {settings.hours.sunday}</p>
          </div>

          <div className="mt-8 grid min-h-72 place-items-center rounded-md border border-[var(--border)] bg-[linear-gradient(135deg,var(--surface),var(--brand-bg))] p-6 text-center">
            <div>
              <div className="mx-auto mb-4 h-1 w-20 bg-[var(--brand-red)]" />
              <h3 className="text-2xl font-black text-[var(--text)]">Localisation du Garage Bouaïla</h3>
              <p className="mt-3 text-sm text-[var(--text-soft)]">{settings.address}</p>
              <a href={mapHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-md border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--text)]">
                Nous trouver
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-md p-6 sm:p-8" noValidate>
          <h3 className="text-2xl font-black text-[var(--text)]">Envoyer un message</h3>
          <div className="mt-6 grid gap-4">
            <label className="field-label">
              Nom
              <input name="name" className="field" placeholder="Votre nom" aria-invalid={Boolean(errors.name)} />
              {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
            </label>
            <label className="field-label">
              Téléphone
              <input name="phone" className="field" placeholder="Votre téléphone" aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
            </label>
            <label className="field-label">
              Email (optionnel)
              <input name="email" type="email" className="field" placeholder="Votre email" />
            </label>
            <label className="field-label">
              Message
              <textarea name="message" className="field min-h-36 resize-none" placeholder="Décrivez votre besoin" aria-invalid={Boolean(errors.message)} />
              {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
            </label>
          </div>
          <button type="submit" className="btn btn-red mt-6 w-full justify-center">
            Préparer le message
          </button>
          {status && (
            <p className={`mt-4 text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {status.message}
            </p>
          )}
          {readyMessage && (
            <div className="mt-5 grid gap-3">
              {settings.phones.map((phone) => (
                <a
                  key={phone.whatsapp}
                  href={`https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(readyMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost justify-center"
                >
                  WhatsApp — {phone.formatted}
                </a>
              ))}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
