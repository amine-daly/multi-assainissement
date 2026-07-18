export interface NavLink {
  label: string;
  path: string;
}

export interface SiteConfig {
  name: string;
  tel: string;
  telDisplay: string;
  mobile: string;
  mobileDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  areaServed: string;
  credit: string;
  heroImage: string;
  teamPhoto: string;
  technicianPhoto: string;
  baitStationPhoto: string;
  navLinks: NavLink[];
  footerQuickLinks: NavLink[];
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Multi-Assainissement',
  tel: '+21675652561',
  telDisplay: '+216 75 652 561',
  mobile: '+21698962556',
  mobileDisplay: '98 962 556',
  whatsapp: 'https://wa.me/21698962556',
  email: 'dalyassainissement@yahoo.fr',
  address: 'Djerba, Tunisie',
  areaServed: 'Djerba',
  credit: 'Site by Hamza Ben Amor',
  heroImage: 'assets/images/hero-djerba.png',
  teamPhoto: 'assets/images/team.png',
  technicianPhoto: 'assets/images/technician-kitchen.png',
  baitStationPhoto: 'assets/images/bait-station.png',
  navLinks: [
    { label: 'Accueil', path: '/' },
    { label: 'Désinsectisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'À Propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ],
  footerQuickLinks: [
    { label: 'Désinsectisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'Vides-Ordures', path: '/vides-ordures' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Confidentialité', path: '/politique-de-confidentialite' },
  ],
};
