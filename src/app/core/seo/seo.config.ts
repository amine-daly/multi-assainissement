export interface PageSeo {
  titleKey: string;
  descriptionKey: string;
  path: string;
  ogImage?: string;
  /** Defaults to index,follow when omitted */
  robots?: string;
  /** Short label for BreadcrumbList. Omitted on home and 404. */
  breadcrumbKey?: string;
}

/** Canonical site origin for absolute SEO URLs */
export const SITE_URL = 'https://multi-assainissement.com';

/** Default Open Graph / Twitter share image (WebP hero) */
export const DEFAULT_OG_IMAGE = '/assets/images/hero-djerba-md.webp';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 800;
export const DEFAULT_OG_IMAGE_ALT = 'seo.ogImageAlt';

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    titleKey: 'seo.home.title',
    descriptionKey: 'seo.home.description',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/desinsectisation': {
    path: '/desinsectisation',
    titleKey: 'seo.desinsectisation.title',
    descriptionKey: 'seo.desinsectisation.description',
    breadcrumbKey: 'nav.desinsectisation',
  },
  '/deratisation': {
    path: '/deratisation',
    titleKey: 'seo.deratisation.title',
    descriptionKey: 'seo.deratisation.description',
    breadcrumbKey: 'nav.deratisation',
  },
  '/nettoyage-piscine': {
    path: '/nettoyage-piscine',
    titleKey: 'seo.nettoyagePiscine.title',
    descriptionKey: 'seo.nettoyagePiscine.description',
    breadcrumbKey: 'footer.links.nettoyagePiscine',
    robots: 'noindex, follow',
  },
  '/capturation-des-chats': {
    path: '/capturation-des-chats',
    titleKey: 'seo.capturationChats.title',
    descriptionKey: 'seo.capturationChats.description',
    breadcrumbKey: 'nav.capturationChats',
  },
  '/lutte-anti-legionellose': {
    path: '/lutte-anti-legionellose',
    titleKey: 'seo.legionellose.title',
    descriptionKey: 'seo.legionellose.description',
    breadcrumbKey: 'footer.links.legionellose',
  },
  '/a-propos': {
    path: '/a-propos',
    titleKey: 'seo.about.title',
    descriptionKey: 'seo.about.description',
    breadcrumbKey: 'nav.about',
  },
  '/contact': {
    path: '/contact',
    titleKey: 'seo.contact.title',
    descriptionKey: 'seo.contact.description',
    breadcrumbKey: 'nav.contact',
  },
  '/faq': {
    path: '/faq',
    titleKey: 'seo.faq.title',
    descriptionKey: 'seo.faq.description',
    breadcrumbKey: 'footer.links.faq',
  },
  '/politique-de-confidentialite': {
    path: '/politique-de-confidentialite',
    titleKey: 'seo.privacy.title',
    descriptionKey: 'seo.privacy.description',
    robots: 'noindex, follow',
    breadcrumbKey: 'footer.links.privacy',
  },
  '/404': {
    path: '/404',
    titleKey: 'seo.notFound.title',
    descriptionKey: 'seo.notFound.description',
    robots: 'noindex, follow',
  },
};
