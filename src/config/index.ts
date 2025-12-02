import {
  House,
  Building,
  Building2,
  Trees,
  Flower2,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Utensils,
  Car,
  Fan,
  TreePine,
  LucideIcon,
} from "lucide-react";

type Facility = {
  name: string;
  icon: LucideIcon;
};

export type HouseItem = {
  name: string;
  slug: string;
  description: string;
  Icon: LucideIcon;
  id: number;
  beds: number;
  price_per_night: number;
  facilities: Facility[];
};

export const PROPERTIES: HouseItem[] = [
  {
    name: "Sielska Chata",
    slug: "sielska-chata",
    description: "Przytulny domek idealny na spokojny wypoczynek.",
    Icon: House,
    id: 1,
    beds: 2,
    price_per_night: 300,
    facilities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kuchnia", icon: Coffee },
      { name: "TV", icon: Tv },
      { name: "Łazienka", icon: Bath },
    ],
  },
  {
    name: "Zielony Zakątek",
    slug: "zielony-zakatek",
    description: "Urokliwe miejsce otoczone zielenią, idealne dla rodzin.",
    Icon: Building,
    id: 2,
    beds: 3,
    price_per_night: 350,
    facilities: [
      { name: "Parking", icon: Car },
      { name: "WiFi", icon: Wifi },
      { name: "Aneks kuchenny", icon: Utensils },
      { name: "Wentylator", icon: Fan },
    ],
  },
  {
    name: "Leśne Gniazdo",
    slug: "lesne-gniazdo",
    description: "Przestronny domek położony w sercu lasu, pełen spokoju.",
    Icon: Building2,
    id: 3,
    beds: 4,
    price_per_night: 420,
    facilities: [
      { name: "Kuchnia", icon: Coffee },
      { name: "TV", icon: Tv },
      { name: "WiFi", icon: Wifi },
      { name: "Parking", icon: Car },
    ],
  },
  {
    name: "Pod Dębem",
    slug: "pod-debem",
    description: "Klimatyczny domek ukryty pod starymi dębami.",
    Icon: Trees,
    id: 4,
    beds: 3,
    price_per_night: 380,
    facilities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kuchnia", icon: Coffee },
      { name: "Taras", icon: TreePine },
      { name: "TV", icon: Tv },
    ],
  },

  {
    name: "Cicha Polana",
    slug: "cicha-polana",
    description: "Ustronne miejsce wśród łąk, idealne na relaks.",
    Icon: Flower2,
    id: 5,
    beds: 2,
    price_per_night: 310,
    facilities: [
      { name: "Ogród", icon: Flower2 },
      { name: "WiFi", icon: Wifi },
      { name: "Kuchnia", icon: Coffee },
      { name: "Parking", icon: Car },
    ],
  },
] as const;
