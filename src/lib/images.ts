export const vehicleCards = [
  {
    name: "Volkswagen Golf",
    image: "/images/vehicles/volkswagen-golf.jpg",
    alt: "Volkswagen Golf dans un atelier automobile",
    verification: "Volkswagen Golf VII, hatchback, Wikimedia Commons",
    description: "Entretien, diagnostic, freinage et performance au quotidien.",
  },
  {
    name: "Volkswagen Passat",
    image: "/images/vehicles/volkswagen-passat.jpg",
    alt: "Volkswagen Passat dans un atelier automobile",
    verification: "Volkswagen Passat B8 GTE facelift, berline, Wikimedia Commons",
    description: "Révisions complètes et interventions mécaniques précises.",
  },
  {
    name: "Volkswagen Tiguan",
    image: "/images/vehicles/volkswagen-tiguan.jpg",
    alt: "Volkswagen Tiguan dans un atelier automobile",
    verification: "Volkswagen Tiguan II 1.5 TSI, SUV, Wikimedia Commons",
    description: "Suspension, moteur, climatisation et électronique embarquée.",
  },
  {
    name: "Volkswagen Transporter",
    image: "/images/vehicles/volkswagen-transporter.jpg",
    alt: "Volkswagen Transporter dans un atelier automobile",
    verification: "Volkswagen Transporter T6.1 Kastenwagen, van utilitaire, Wikimedia Commons",
    description: "Maintenance fiable pour véhicules utilitaires et familiaux.",
  },
];

export const serviceImages: Record<string, string> = {
  diagnostic: "/images/services/diagnostic.jpg",
  entretien: "/images/services/maintenance.jpg",
  vidange: "/images/services/oil-filter.jpg",
  freinage: "/images/services/brakes.jpg",
  embrayage: "/images/services/clutch.jpg",
  distribution: "/images/services/timing.jpg",
  climatisation: "/images/services/ac.jpg",
  moteur: "/images/services/engine.jpg",
};

export const beforeAfterPairs = [
  {
    title: "Système de freinage",
    before: "/images/before-after/before-brake.jpg",
    after: "/images/before-after/after-brake.jpg",
  },
  {
    title: "Compartiment moteur",
    before: "/images/before-after/before-engine.jpg",
    after: "/images/before-after/after-engine.jpg",
  },
];

export const garageGallery = [
  { src: "/images/garage/work.jpg", title: "Mécanicien au travail", span: "md:row-span-2" },
  { src: "/images/garage/diagnostic.jpg", title: "Diagnostic électronique", span: "" },
  { src: "/images/garage/engine-repair.jpg", title: "Réparation moteur", span: "" },
  { src: "/images/garage/tools.jpg", title: "Outils professionnels", span: "" },
  { src: "/images/garage/lift.jpg", title: "Véhicule sur pont", span: "md:row-span-2" },
  { src: "/images/garage/volkswagen.jpg", title: "Véhicules Volkswagen", span: "" },
];
