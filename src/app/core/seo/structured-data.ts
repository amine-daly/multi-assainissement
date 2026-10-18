import { SITE_CONFIG } from '../config/site.config';
import { SITE_URL } from './seo.config';

export function absoluteAssetUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${SITE_URL}/${clean}`;
}

/** Shared LocalBusiness node used on home and as Service.provider */
export function buildLocalBusinessJsonLd(
  description?: string,
): Record<string, unknown> {
  const site = SITE_CONFIG;
  const data: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: site.name,
    description:
      description ??
      'Désinsectisation et dératisation professionnelles à Djerba — interventions rapides et discrètes.',
    url: `${SITE_URL}/`,
    telephone: site.mobile,
    email: site.email,
    image: absoluteAssetUrl(site.heroImage),
    priceRange: site.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      postalCode: site.postalCode,
      addressCountry: site.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      '@type': 'Place',
      name: site.areaServed,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.mobile,
      contactType: 'customer service',
      areaServed: 'TN',
      availableLanguage: ['French', 'Arabic', 'English'],
    },
  };

  const sameAs = [site.googleMapsUrl, site.googleReviewUrl].filter(Boolean);
  if (sameAs.length) {
    data['sameAs'] = sameAs;
  }

  return data;
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: `${SITE_URL}${input.path}`,
    areaServed: {
      '@type': 'Place',
      name: SITE_CONFIG.areaServed,
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.mobile,
      url: `${SITE_URL}/`,
    },
  };
}

export function buildWebSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_CONFIG.name,
    url: `${SITE_URL}/`,
    inLanguage: ['fr-TN', 'en-GB', 'ar-SA'],
    publisher: { '@id': `${SITE_URL}/#localbusiness` },
  };
}

export function buildBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}

export function buildFaqPageJsonLd(
  faqs: ReadonlyArray<{ q: string; a: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
