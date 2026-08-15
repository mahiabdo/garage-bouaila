import type { GalleryPhoto, GarageSettings, Review, Service } from "@/types/site";

const readNumber = (value?: string) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const garagePhones = [
  {
    formatted: "06 63 88 28 45",
    dial: "+212663882845",
    whatsapp: "212663882845",
  },
  {
    formatted: "06 28 45 13 34",
    dial: "+212628451334",
    whatsapp: "212628451334",
  },
];

const address =
  process.env.GARAGE_ADDRESS ||
  process.env.NEXT_PUBLIC_GARAGE_ADDRESS ||
  "7QG6+MV7, Safi, Morocco";

const latitude =
  readNumber(process.env.GARAGE_LATITUDE || process.env.NEXT_PUBLIC_GARAGE_LATITUDE) ??
  undefined;

const longitude =
  readNumber(process.env.GARAGE_LONGITUDE || process.env.NEXT_PUBLIC_GARAGE_LONGITUDE) ??
  undefined;

const googleMapsUrl =
  process.env.GARAGE_GOOGLE_MAPS_URL ||
  process.env.NEXT_PUBLIC_GARAGE_GOOGLE_MAPS_URL ||
  "https://www.google.com/maps/search/?api=1&query=7QG6%2BMV7%2C%20Safi%2C%20Morocco";

export const garageLocation = {
  label: "Garage Bouaïla",
  address,
  latitude,
  longitude,
  googleMapsUrl,
};

export const settings: GarageSettings = {
  phone: garagePhones[0].formatted,
  whatsapp: garagePhones[0].whatsapp,
  address,
  phones: garagePhones,
  location: garageLocation,
  hours: {
    weekday: process.env.GARAGE_OPENING_WEEKDAY || process.env.NEXT_PUBLIC_OPENING_WEEKDAY || "Lundi – Samedi : 08:30 – 18:30",
    sunday: process.env.GARAGE_OPENING_SUNDAY || process.env.NEXT_PUBLIC_OPENING_SUNDAY || "Dimanche : Fermé",
  },
};

export const services: Service[] = [
  {
    id: "diagnostic",
    icon: "🔧",
    title: "Diagnostic électronique",
    description: "OBD, lecture défauts et analyse précise des systèmes électroniques.",
  },
  {
    id: "entretien",
    icon: "🚗",
    title: "Entretien périodique",
    description: "Révisions constructeur, filtres, niveaux et inspection complète du véhicule.",
  },
  {
    id: "vidange",
    icon: "🛢️",
    title: "Vidange & filtres",
    description: "Huile adaptée, filtres, niveaux et remise à zéro d'entretien.",
  },
  {
    id: "freinage",
    icon: "🛞",
    title: "Freinage",
    description: "Plaquettes, disques, liquide de frein et contrôle de sécurité.",
  },
  {
    id: "embrayage",
    icon: "⚙️",
    title: "Embrayage",
    description: "Diagnostic transmission, embrayage et interventions mécaniques propres.",
  },
  {
    id: "distribution",
    icon: "⚙️",
    title: "Distribution",
    description: "Courroie, galets, pompe à eau et calage moteur avec rigueur.",
  },
  {
    id: "climatisation",
    icon: "❄️",
    title: "Climatisation automobile",
    description: "Recharge, détection de fuite et entretien du circuit de climatisation.",
  },
  {
    id: "moteur",
    icon: "🔋",
    title: "Réparation moteur",
    description: "Injection, allumage, refroidissement et recherche de panne avancée.",
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "interior",
    title: "Garage moderne",
    category: "Atelier",
    url: "https://images.unsplash.com/photo-1632823471565-1ecdf5c1b7b0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "engine",
    title: "Réparation moteur",
    category: "Mécanique",
    url: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "diagnostic",
    title: "Diagnostic outils",
    category: "Électronique",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mechanic",
    title: "Technicien au travail",
    category: "Service",
    url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "car",
    title: "Véhicule premium",
    category: "Automobile",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tools",
    title: "Outils professionnels",
    category: "Équipement",
    url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "Yassine A.",
    text: "Service rapide et professionnel, je recommande.",
    rating: 5,
  },
  {
    id: "2",
    name: "Hicham E.",
    text: "Très bon diagnostic, explication claire et travail propre.",
    rating: 5,
  },
  {
    id: "3",
    name: "Sara B.",
    text: "Accueil sérieux, délais respectés et véhicule rendu impeccable.",
    rating: 5,
  },
];
