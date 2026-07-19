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
  fax: string;
  faxDisplay: string;
  whatsapp: string;
  email: string;
  /** Human-readable address line for UI */
  address: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  geo: { latitude: number; longitude: number };
  priceRange: string;
  areaServed: string;
  /**
   * Google Maps / Business Profile public URL.
   * Replace with the official GBP share link once the listing is claimed.
   */
  googleMapsUrl: string;
  /**
   * Direct “Write a review” URL (needs Place ID from GBP).
   * Leave empty until available — review CTA stays hidden.
   */
  googleReviewUrl: string;
  credit: string;
  logo: string;
  heroImage: string;
  teamPhoto: string;
  technicianPhoto: string;
  baitStationPhoto: string;
  catTrapPhoto: string;
  catKittensPhoto: string;
  references: string[];
  navLinks: NavLink[];
  footerQuickLinks: NavLink[];
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Multi-Assainissement',
  tel: '+21675652561',
  telDisplay: '+216 75 652 561',
  mobile: '+21698962556',
  mobileDisplay: '98 962 556',
  fax: '+21675757106',
  faxDisplay: '+216 75 757 106',
  whatsapp: 'https://wa.me/21698962556',
  email: 'dalyassainissement@yahoo.fr',
  address: 'Mezraya, Djerba 4186, Tunisie',
  streetAddress: 'Mezraya',
  addressLocality: 'Djerba',
  addressRegion: 'Médenine',
  postalCode: '4186',
  addressCountry: 'TN',
  // Home / base — Mezraya, Djerba (service-area business)
  geo: { latitude: 33.861851, longitude: 10.960291 },
  priceRange: '$$',
  areaServed: 'Djerba',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Multi-Assainissement+Mezraya+Djerba+4186',
  googleReviewUrl: '',
  credit: 'Site by Hamza Ben Amor',
  logo: 'assets/images/logo.webp',
  heroImage: 'assets/images/hero-djerba.webp',
  teamPhoto: 'assets/images/team.webp',
  technicianPhoto: 'assets/images/technician-kitchen.webp',
  baitStationPhoto: 'assets/images/bait-station.webp',
  catTrapPhoto: 'assets/images/cat-trap.webp',
  catKittensPhoto: 'assets/images/cat-kittens.webp',
  references: [
    'Radisson Athene Palace',
    'Iberostar Jerba Beach Hotel',
    'Magic Life Maria',
    'Ulysse Thalasso',
    'Athene Thalasso',
    'Dialysis Jerba Center',
    'Café Chichekhan',
  ],
  navLinks: [
    { label: 'Accueil', path: '/' },
    { label: 'Désinsectisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'Capturation des Chats', path: '/capturation-des-chats' },
    { label: 'À Propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ],
  footerQuickLinks: [
    { label: 'Désinsectisation / Décafarisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'Vides-Ordures', path: '/vides-ordures' },
    { label: 'Capturation des chats', path: '/capturation-des-chats' },
    { label: 'Lutte anti-légionellose', path: '/lutte-anti-legionellose' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Confidentialité', path: '/politique-de-confidentialite' },
  ],
};
