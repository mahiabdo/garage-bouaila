const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const imagePath = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

export const vehicleCards = [
  {
    name: "Volkswagen Golf",
    image: imagePath("/images/vehicles/volkswagen-golf.jpg"),
    alt: "Volkswagen Golf dans un atelier automobile",
    verification: "Volkswagen Golf VII, hatchback, Wikimedia Commons",
    description: "Entretien, diagnostic, freinage et performance au quotidien.",
  },
  {
    name: "Volkswagen Passat",
    image: imagePath("/images/vehicles/volkswagen-passat.jpg"),
    alt: "Volkswagen Passat dans un atelier automobile",
    verification: "Volkswagen Passat B8 GTE facelift, berline, Wikimedia Commons",
    description: "Révisions complètes et interventions mécaniques précises.",
  },
  {
    name: "Volkswagen Tiguan",
    image: imagePath("/images/vehicles/volkswagen-tiguan.jpg"),
    alt: "Volkswagen Tiguan dans un atelier automobile",
    verification: "Volkswagen Tiguan II 1.5 TSI, SUV, Wikimedia Commons",
    description: "Suspension, moteur, climatisation et électronique embarquée.",
  },
  {
    name: "Volkswagen Transporter",
    image: imagePath("/images/vehicles/volkswagen-transporter.jpg"),
    alt: "Volkswagen Transporter dans un atelier automobile",
    verification: "Volkswagen Transporter T6.1 Kastenwagen, van utilitaire, Wikimedia Commons",
    description: "Maintenance fiable pour véhicules utilitaires et familiaux.",
  },
];

export const serviceImages: Record<string, string> = {
  diagnostic: imagePath("/images/services/diagnostic.jpg"),
  entretien: imagePath("/images/services/maintenance.jpg"),
  vidange: imagePath("/images/services/oil-filter.jpg"),
  freinage: imagePath("/images/services/brakes.jpg"),
  embrayage: imagePath("/images/services/clutch.jpg"),
  distribution: imagePath("/images/services/timing.jpg"),
  climatisation: imagePath("/images/services/ac.jpg"),
  moteur: imagePath("/images/services/engine.jpg"),
};

export const beforeAfterPairs = [
  {
    title: "Système de freinage",
    before: imagePath("/images/before-after/before-brake.jpg"),
    after: imagePath("/images/before-after/after-brake.jpg"),
  },
  {
    title: "Compartiment moteur",
    before: imagePath("/images/before-after/before-engine.jpg"),
    after: imagePath("/images/before-after/after-engine.jpg"),
  },
];

export const garageGallery = [
  { src: imagePath("/images/garage/work.jpg"), title: "Mécanicien au travail", span: "md:row-span-2" },
  { src: imagePath("/images/garage/diagnostic.jpg"), title: "Diagnostic électronique", span: "" },
  { src: imagePath("/images/garage/engine-repair.jpg"), title: "Réparation moteur", span: "" },
  { src: imagePath("/images/garage/tools.jpg"), title: "Outils professionnels", span: "" },
  { src: imagePath("/images/garage/lift.jpg"), title: "Véhicule sur pont", span: "md:row-span-2" },
  { src: imagePath("/images/garage/volkswagen.jpg"), title: "Véhicules Volkswagen", span: "" },
];
