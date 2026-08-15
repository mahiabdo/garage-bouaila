import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Garage Bouaila à Safi",
  description:
    "Contactez Garage Bouaila à Safi pour un diagnostic automobile, un entretien Volkswagen ou une réparation voiture rapide et professionnelle.",
  alternates: {
    canonical: "https://mahiabdo.github.io/garage-bouaila/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <h1 className="sr-only">Contact Garage Bouaila à Safi</h1>
      <ContactForm />
    </div>
  );
}
