export interface Tour {
  id: string;
  name: string;
  tagLabel: string;
  type: 'air' | 'antelope' | 'river';
  price: string;
  priceFrom: number;
  description: string;
  duration: string;
  seasonality: string;
  audience: string;
  href: string;
  bookingUrl: string;
  imgAlt: string;
  featured: boolean;
}

export const FAREHARBOR_BASE =
  'https://fareharbor.com/embeds/book/antelopecanyonaz/?ref=valerie&full-items=yes&flow=1234128';

export const tours: Tour[] = [
  {
    id: 'air-helicopter',
    name: 'Air & Helicopter Tours',
    tagLabel: 'Scenic Flights',
    type: 'air',
    price: 'from $189',
    priceFrom: 189,
    description:
      'See the bend, Lake Powell and Antelope Canyon from above on a small-group scenic flight.',
    duration: '25–45 min',
    seasonality: 'Year-round',
    audience: 'All ages',
    href: '/tours/',
    bookingUrl: FAREHARBOR_BASE,
    imgAlt: 'Helicopter flying over Horseshoe Bend and the Colorado River',
    featured: true,
  },
  {
    id: 'antelope-canyon-combo',
    name: 'Antelope Canyon Combo',
    tagLabel: 'Combo',
    type: 'antelope',
    price: 'from $129',
    priceFrom: 129,
    description:
      "Pair Horseshoe Bend with a guided walk through Upper or Lower Antelope Canyon's glowing slots.",
    duration: '3–4 hrs',
    seasonality: 'Guided',
    audience: 'Permit incl.',
    href: '/antelope-canyon/',
    bookingUrl: FAREHARBOR_BASE,
    imgAlt: 'Light beams streaming through Antelope Canyon slot canyon',
    featured: true,
  },
  {
    id: 'river-kayak',
    name: 'River & Kayak Tours',
    tagLabel: 'On the water',
    type: 'river',
    price: 'from $96',
    priceFrom: 96,
    description:
      'Paddle the calm emerald water below the cliffs, or float the Colorado from Glen Canyon Dam.',
    duration: 'Half day',
    seasonality: 'Gear incl.',
    audience: 'Beginner',
    href: '/river-tours/',
    bookingUrl: FAREHARBOR_BASE,
    imgAlt: 'Kayaks on the emerald Colorado River below Horseshoe Bend cliffs',
    featured: true,
  },
];

export const featuredTours = tours.filter((t) => t.featured);
