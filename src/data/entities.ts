// Canonical schema.org entities for HorseshoeBend.com.
// Defined once and referenced elsewhere by @id so the knowledge graph
// stays consistent across pages (homepage, /about/, /tours/, etc.).

const SITE = 'https://horseshoebend.com';

export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}/#karlyn-bunting`;
export const WEBSITE_ID = `${SITE}/#website`;

/** The business entity — modeled as a tour-focused TravelAgency. */
export const organization = {
  '@type': ['TravelAgency', 'Organization'],
  '@id': ORG_ID,
  name: 'HorseshoeBend.com',
  url: `${SITE}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/images/logo-badge.webp`,
    width: 1024,
    height: 1024,
  },
  image: `${SITE}/images/og-default.webp`,
  email: 'info@horseshoebend.com',
  description:
    'Visitor guide and tour-booking service for Horseshoe Bend, Antelope Canyon, Glen Canyon, and the Page, Arizona area.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Page',
    addressRegion: 'AZ',
    postalCode: '86040',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Page, Arizona' },
    { '@type': 'Place', name: 'Glen Canyon National Recreation Area' },
  ],
  knowsAbout: [
    'Horseshoe Bend',
    'Antelope Canyon',
    'Glen Canyon',
    'Lake Powell',
    'Colorado River tours',
    'Page, Arizona travel',
  ],
} as const;

/** The named author / local expert behind the site's content (E-E-A-T). */
export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Karlyn Bunting',
  jobTitle: 'Manager',
  worksFor: { '@id': ORG_ID },
  url: `${SITE}/about/`,
  description:
    'Karlyn Bunting was born and raised in Page, Arizona, near Horseshoe Bend, and has lived there his whole life. He previously managed GrandCanyon.com and now manages HorseshoeBend.com, helping visitors get the most out of their Horseshoe Bend visits.',
  homeLocation: {
    '@type': 'Place',
    name: 'Page, Arizona',
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'GrandCanyon.com',
    url: 'https://grandcanyon.com/',
  },
  knowsAbout: [
    'Horseshoe Bend',
    'Antelope Canyon tours',
    'Page, Arizona',
    'Glen Canyon National Recreation Area',
    'Grand Canyon',
  ],
} as const;

/** The website entity, published by the organization. */
export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'HorseshoeBend.com',
  url: `${SITE}/`,
  publisher: { '@id': ORG_ID },
} as const;

/** Wrap a set of nodes into a single @graph document for one <script> tag. */
export function graph(nodes: Array<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
