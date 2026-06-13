export interface Tour {
  id: string;
  name: string;
  tagLabel: string;
  type: 'air' | 'antelope' | 'river' | 'heli' | 'secret';
  price: string;
  priceFrom: number;
  description: string;
  duration: string;
  seasonality: string;
  audience: string;
  href: string;
  bookingUrl: string;
  imgSrc?: string;
  imgAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: string;
  featured: boolean;
}

export const FAREHARBOR_BASE =
  'https://fareharbor.com/embeds/book/antelopecanyonaz/?ref=valerie&full-items=yes&flow=1234128';

export const tours: Tour[] = [
  {
    id: 'air-helicopter',
    name: 'Kayak the Colorado',
    tagLabel: 'Kayaking',
    type: 'air',
    price: 'from $80',
    priceFrom: 80,
    description:
      'Paddle the emerald Colorado River beneath 800-foot canyon walls below Horseshoe Bend — calm flat water, no experience needed. Backhauls for Kayak Trips depart daily March–November from Lee\'s Ferry.',
    duration: 'Full day',
    seasonality: 'March–November',
    audience: '',
    href: '/river-tours/',
    bookingUrl: FAREHARBOR_BASE,
    imgSrc: '/images/tour-kayak-colorado.webp',
    imgAlt: 'Paddleboarder on the Colorado River below red canyon walls',
    ctaHref: 'https://fareharbor.com/embeds/book/kayakthecolorado/items/703224/?asn=fhdn&asn-ref=antelopecanyonaz&ref=antelopecanyonaz&bookable-only=yes&full-items=yes&marketplace=yes&flow=no&branding=no',
    featured: true,
  },
  {
    id: 'antelope-canyon-combo',
    name: 'Antelope Canyon Combo',
    tagLabel: 'Combo',
    type: 'antelope',
    price: 'from $135',
    priceFrom: 135,
    description:
      'Pair Horseshoe Bend with a Native American-guided cultural tour through Lower Antelope Canyon — Navajo guides share the stories, history, and sacred significance of these ancient sandstone passages.',
    duration: '4.5 hrs',
    seasonality: 'Guided',
    audience: 'Permit incl.',
    href: '/antelope-canyon/',
    bookingUrl: FAREHARBOR_BASE,
    imgSrc: '/images/tour-antelope-combo.webp',
    imgAlt: 'Horseshoe Bend and Antelope Canyon combo view',
    ctaHref: 'https://book.nativeamericantours.com/?iframe=true&tid=lact&oid=1&pid=1&aid=2',
    ctaTarget: '_blank',
    featured: true,
  },
  {
    id: 'river-kayak',
    name: 'River Rafting Tour',
    tagLabel: 'On the water',
    type: 'river',
    price: 'from $113',
    priceFrom: 113,
    description:
      'Board a guided raft at Lees Ferry and cruise upriver past Horseshoe Bend toward Glen Canyon Dam — smooth water, towering canyon walls, and the bend you just looked down at from the rim.',
    duration: 'Half day',
    seasonality: 'Guided',
    audience: 'All ages',
    href: '/river-tours/',
    bookingUrl: FAREHARBOR_BASE,
    imgSrc: '/images/tour-river-kayak.webp',
    imgAlt: 'Guided raft on the Colorado River below Horseshoe Bend canyon walls',
    ctaHref: 'https://fareharbor.com/embeds/book/wrahorseshoebend-aramark/items/655797/?asn=fhdn&asn-ref=antelopecanyonaz&ref=antelopecanyonaz&bookable-only=yes&full-items=yes&marketplace=yes&flow=no&branding=no',
    ctaTarget: '_blank',
    featured: true,
  },
  {
    id: 'secret-antelope-canyon',
    name: 'Horseshoe Bend & Secret Antelope Canyon',
    tagLabel: 'Secret Canyon',
    type: 'secret',
    price: 'from $140',
    priceFrom: 140,
    description:
      'A private Navajo-guided tour through Secret Antelope Canyon — swirling sandstone corridors and magical light beams without the crowds — paired with an overlook at Horseshoe Bend via off-road transport.',
    duration: '2.5 hrs',
    seasonality: 'Guided',
    audience: 'Small groups',
    href: '/antelope-canyon/',
    bookingUrl: 'https://fareharbor.com/embeds/book/deerspringcanyontours/',
    imgAlt: 'Swirling sandstone walls inside Secret Antelope Canyon with light beams',
    ctaHref: 'https://fareharbor.com/embeds/book/deerspringcanyontours/',
    featured: true,
  },
  {
    id: 'horseshoe-bend-heli',
    name: 'Horseshoe Bend Heli',
    tagLabel: 'Helicopter',
    type: 'heli',
    price: 'from $204',
    priceFrom: 204,
    description:
      'Soar 500+ feet above the bend in an EcoStar EC-130 with stadium seating, oversized windows, and noise-canceling headsets — sweeping views of Lake Powell, Glen Canyon Dam, and the 270° Colorado River curve below.',
    duration: '10–12 min',
    seasonality: 'Year-round',
    audience: 'All ages',
    href: '/tours/',
    bookingUrl: 'https://www.papillon.com/lake-powell-page/lake-powell-page-tours/skyview-horseshoe-bend-air-tour/',
    imgAlt: 'Helicopter flying over Horseshoe Bend with the Colorado River far below',
    ctaHref: 'https://www.papillon.com/lake-powell-page/lake-powell-page-tours/skyview-horseshoe-bend-air-tour/',
    ctaTarget: '_blank',
    featured: true,
  },
  {
    id: 'horseshoe-bend-air',
    name: 'Horseshoe Bend Air',
    tagLabel: 'Scenic Flight',
    type: 'air',
    price: 'from $189',
    priceFrom: 189,
    description:
      'A 30-minute fixed-wing flightseeing tour from Page with plush seating, oversized windows, and multilingual narration — sweeping aerial views of Glen Canyon Dam, Lake Powell, and the Colorado River\'s 1,000-foot bend.',
    duration: '30 min',
    seasonality: 'Year-round',
    audience: 'All ages',
    href: '/tours/',
    bookingUrl: 'https://www.papillon.com/lake-powell-page/lake-powell-page-tours/horseshoe-bend-flightseeing-tour/',
    imgAlt: 'Aerial view of Horseshoe Bend from a scenic flight over the Colorado River',
    ctaHref: 'https://www.papillon.com/lake-powell-page/lake-powell-page-tours/horseshoe-bend-flightseeing-tour/',
    ctaTarget: '_blank',
    featured: true,
  },
];

export const featuredTours = tours.filter((t) => t.featured);
