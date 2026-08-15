import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Garage Bouaïla",
  description: "Contactez Garage Bouaïla à Safi pour un rendez-vous automobile.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactForm />
    </div>
  );
}
