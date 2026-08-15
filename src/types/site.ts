export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  category: string;
  url: string;
};

export type GaragePhone = {
  formatted: string;
  dial: string;
  whatsapp: string;
};

export type GarageLocation = {
  label: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  googleMapsUrl?: string;
};

export type GarageSettings = {
  phone: string;
  whatsapp: string;
  address: string;
  phones: GaragePhone[];
  location: GarageLocation;
  hours: {
    weekday: string;
    sunday: string;
  };
};
