const faqs = [
  {
    question: "Garage Bouaila se trouve où ?",
    answer: "Garage Bouaila est situé à Safi, au Maroc. Le garage intervient pour les particuliers et les véhicules présents dans la région de Safi.",
  },
  {
    question: "Quels véhicules prenez-vous en charge ?",
    answer: "Le garage travaille principalement sur les véhicules Volkswagen et sur les interventions de mécanique automobile générale, selon les besoins du véhicule.",
  },
  {
    question: "Garage Bouaila est-il spécialisé Volkswagen ?",
    answer: "Oui. Garage Bouaila est spécialisé dans l'entretien, le diagnostic et la réparation des véhicules Volkswagen, tout en assurant des interventions de mécanique automobile générale.",
  },
  {
    question: "Quels services propose le garage ?",
    answer: "Le garage propose notamment le diagnostic automobile, l'entretien automobile, la vidange, le freinage, la climatisation, l'embrayage, la distribution et la réparation moteur.",
  },
  {
    question: "Comment contacter Garage Bouaila ?",
    answer: "Vous pouvez contacter Garage Bouaila par téléphone au 0663882845 ou 0628451334, ou via WhatsApp pour un rendez-vous.",
  },
  {
    question: "Comment prendre rendez-vous ?",
    answer: "Le plus simple est de contacter le garage par téléphone ou WhatsApp pour organiser un rendez-vous selon votre besoin de diagnostic, entretien ou réparation.",
  },
];

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="section-pad bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading text-left">
          <p className="eyebrow">Questions fréquentes</p>
          <h2 id="faq-title">Garage Bouaila à Safi</h2>
          <p>
            Informations utiles pour les clients recherchant un garage automobile, un garage Volkswagen ou une réparation voiture à Safi.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_45px_var(--shadow)]">
              <h3 className="text-lg font-black text-[var(--text)]">{faq.question}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--text-soft)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
