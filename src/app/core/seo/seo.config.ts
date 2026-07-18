export interface PageSeo {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

/** Canonical site origin for absolute SEO URLs */
export const SITE_URL = 'https://multi-assainissement.com';

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'Multi-Assainissement | Désinsectisation & Dératisation à Djerba',
    description:
      'Experts en désinsectisation et dératisation à Djerba. Interventions sous 24h, discrètes et professionnelles pour particuliers, hôtels et restaurants.',
    ogImage: '/assets/images/hero-djerba.png',
  },
  '/desinsectisation': {
    path: '/desinsectisation',
    title: 'Désinsectisation à Djerba | Cafards & Blattes | Multi-Assainissement',
    description:
      'Extermination professionnelle des cafards et blattes germaniques à Djerba. Traitements radicaux et discrets pour appartements, hôtels et vides-ordures.',
  },
  '/deratisation': {
    path: '/deratisation',
    title: 'Dératisation à Djerba | Rats & Souris | Multi-Assainissement',
    description:
      'Dératisation discrète à Djerba : diagnostic, extermination et sécurisation contre rats et souris. Idéal hôtels, restaurants et particuliers.',
  },
  '/vides-ordures': {
    path: '/vides-ordures',
    title: 'Nettoyage Vides-Ordures à Djerba | Multi-Assainissement',
    description:
      'Nettoyage et désinfection des colonnes et chutes à ordures à Djerba. Hygiène spécialisée pour immeubles et résidences.',
  },
  '/a-propos': {
    path: '/a-propos',
    title: 'À Propos | Multi-Assainissement Djerba',
    description:
      'Entreprise d’assainissement à Djerba : expérience, sérieux et tarif compétitif. Références hôtels et établissements locaux.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact & Devis Gratuit | Multi-Assainissement Djerba',
    description:
      'Demandez un diagnostic gratuit. Appelez le 98 962 556 ou contactez Multi-Assainissement à Djerba pour une intervention rapide.',
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ | Multi-Assainissement Djerba',
    description:
      'Questions fréquentes sur la désinsectisation, la dératisation et les interventions d’urgence à Djerba.',
  },
  '/politique-de-confidentialite': {
    path: '/politique-de-confidentialite',
    title: 'Politique de confidentialité | Multi-Assainissement',
    description:
      'Comment Multi-Assainissement collecte et utilise vos données personnelles via les formulaires de contact.',
  },
};
