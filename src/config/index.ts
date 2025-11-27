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
} from 'lucide-react';

export const PROPERTIES = [
  {
    name: 'Sielska Chata',
    slug: 'sielska-chata',
    description: 'Przytulny domek idealny na spokojny wypoczynek.',
    icon: House,
    id: 1,
    beds: 2,
    price: 300,
    facilities: [
      { name: 'WiFi', icon: Wifi },
      { name: 'Kuchnia', icon: Coffee },
      { name: 'TV', icon: Tv },
      { name: 'Łazienka', icon: Bath },
    ],
  },
  {
    name: 'Zielony Zakątek',
    slug: 'zielony-zakatek',

    description: 'Urokliwe miejsce otoczone zielenią, idealne dla rodzin.',
    icon: Building,
    id: 2,
    beds: 3,
    price: 350,
    facilities: [
      { name: 'Parking', icon: Car },
      { name: 'WiFi', icon: Wifi },
      { name: 'Aneks kuchenny', icon: Utensils },
      { name: 'Wentylator', icon: Fan },
    ],
  },
  {
    name: 'Leśne Gniazdo',
    slug: 'lesne-gniazdo',

    description: 'Przestronny domek położony w sercu lasu, pełen spokoju.',
    icon: Building2,
    id: 3,
    beds: 4,
    price: 420,
    facilities: [
      { name: 'Kuchnia', icon: Coffee },
      { name: 'TV', icon: Tv },
      { name: 'WiFi', icon: Wifi },
      { name: 'Parking', icon: Car },
    ],
  },
  {
    name: 'Pod Dębem',
    slug: 'pod-debem',
    description: 'Klimatyczny domek ukryty pod starymi dębami.',
    icon: Trees,
    id: 4,
    beds: 3,
    price: 380,
    facilities: [
      { name: 'WiFi', icon: Wifi },
      { name: 'Kuchnia', icon: Coffee },
      { name: 'Taras', icon: TreePine },
      { name: 'TV', icon: Tv },
    ],
  },

  {
    name: 'Cicha Polana',
    slug: 'cicha-polana',

    description: 'Ustronne miejsce wśród łąk, idealne na relaks.',
    icon: Flower2,
    id: 5,
    beds: 2,
    price: 310,
    facilities: [
      { name: 'Ogród', icon: Flower2 },
      { name: 'WiFi', icon: Wifi },
      { name: 'Kuchnia', icon: Coffee },
      { name: 'Parking', icon: Car },
    ],
  },
];
