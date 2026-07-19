export interface PageSeo {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  /** Defaults to index,follow when omitted */
  robots?: string;
}

/** Canonical site origin for absolute SEO URLs */
export const SITE_URL = 'https://multi-assainissement.com';

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'Multi-Assainissement | Désinsectisation & Dératisation à Djerba',
    description:
      'Experts en désinsectisation et dératisation à Djerba. Interventions rapides, discrètes et professionnelles pour particuliers, hôtels et restaurants.',
    ogImage: '/assets/images/hero-djerba.png',
  },
  '/desinsectisation': {
    path: '/desinsectisation',
    title: 'Désinsectisation Djerba | Cafards & Blattes',
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
      'Nettoyage et désinfection des colonnes et chutes à ordures à Djerba. Hygiène spécialisée pour immeubles, résidences et syndicats.',
  },
  '/capturation-des-chats': {
    path: '/capturation-des-chats',
    title: 'Capturation des Chats Errants à Djerba | Multi-Assainissement',
    description:
      'Service de capturation des chats errants à Djerba pour particuliers, syndicats et hôtels. Intervention discrète et organisée.',
  },
  '/lutte-anti-legionellose': {
    path: '/lutte-anti-legionellose',
    title: 'Lutte Anti-Légionellose à Djerba | Multi-Assainissement',
    description:
      'Prévention et lutte anti-légionellose à Djerba pour hôtels, thalasso et établissements à réseaux d’eau à risque.',
  },
  '/a-propos': {
    path: '/a-propos',
    title: 'À Propos | Assainissement à Djerba | Multi-Assainissement',
    description:
      'Entreprise d’assainissement à Djerba : expérience, sérieux et tarif compétitif. Références hôtels et établissements locaux.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact & Devis | Multi-Assainissement Djerba',
    description:
      'Demandez un devis gratuit. Appelez le 98 962 556 ou contactez Multi-Assainissement à Djerba pour une intervention rapide et discrète.',
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ Désinsectisation & Dératisation | Djerba',
    description:
      'Questions fréquentes sur la désinsectisation, la dératisation, les délais d’intervention et les devis à Djerba.',
  },
  '/politique-de-confidentialite': {
    path: '/politique-de-confidentialite',
    title: 'Politique de confidentialité | Multi-Assainissement',
    description:
      'Comment Multi-Assainissement collecte et utilise vos données personnelles via les formulaires de contact.',
    robots: 'noindex, follow',
  },
  '/404': {
    path: '/404',
    title: 'Page introuvable | Multi-Assainissement',
    description: 'La page demandée est introuvable. Retournez à l’accueil Multi-Assainissement.',
    robots: 'noindex, follow',
  },
};
