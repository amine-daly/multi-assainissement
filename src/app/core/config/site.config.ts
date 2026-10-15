export interface NavLink {
  labelKey: string;
  path: string;
}

export interface ClientLogo {
  name: string;
  src: string;
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
  /** WhatsApp deep link with prefilled devis message (French default; prefer LanguageService.whatsappDevisUrl()) */
  whatsappDevis: string;
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
  /** Desktop / default hero (≥768px) */
  heroImage: string;
  /** Mobile hero (≤767px) — smaller LCP payload */
  heroImageSm: string;
  teamPhoto: string;
  technicianPhoto: string;
  bedbugTreatmentPhoto: string;
  baitStationPhoto: string;
  activityHotelPhoto: string;
  catTrapPhoto: string;
  catKittensPhoto: string;
  /** Featured hotel logos for the home trust strip */
  clientLogos: ClientLogo[];
  references: string[];
  navLinks: NavLink[];
  footerQuickLinks: NavLink[];
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Multi-Assainissement',
  tel: '+21675652561',
  telDisplay: '+216 75 652 561',
  mobile: '+21626848831',
  mobileDisplay: '26 848 831',
  fax: '+21675757106',
  faxDisplay: '+216 75 757 106',
  whatsapp: 'https://wa.me/21626848831',
  whatsappDevis:
    'https://wa.me/21626848831?text=' +
    encodeURIComponent(
      'Bonjour Multi-Assainissement, je souhaite un devis pour une intervention à Djerba.',
    ),
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
  credit: 'Powered by Multi-Assainissement',
  logo: 'assets/images/logo.webp',
  heroImage: 'assets/images/hero-djerba-md.webp',
  heroImageSm: 'assets/images/hero-djerba-sm.webp',
  teamPhoto: 'assets/images/team.webp',
  technicianPhoto: 'assets/images/technician-kitchen.webp',
  bedbugTreatmentPhoto: 'assets/images/desinsectisation-bedbugs.webp',
  baitStationPhoto: 'assets/images/bait-station.webp',
  activityHotelPhoto: 'assets/images/activity-hotel.webp',
  catTrapPhoto: 'assets/images/cat-trap.webp',
  catKittensPhoto: 'assets/images/cat-kittens.webp',
  clientLogos: [
    {
      name: 'Vincci Hoteles',
      src: 'assets/images/clients/vincci-hoteles.webp',
    },
    {
      name: 'Royal Garden Palace',
      src: 'assets/images/clients/royal-garden-palace.webp',
    },
    {
      name: 'Seabel Rym Beach',
      src: 'assets/images/clients/seabel-rym-beach.webp',
    },
    {
      name: 'Sidi Mansour Resort & SPA',
      src: 'assets/images/clients/sidi-mansour.webp',
    },
    {
      name: 'Fiesta Beach Djerba',
      src: 'assets/images/clients/fiesta-beach.webp',
    },
    {
      name: 'Club Calimera',
      src: 'assets/images/clients/club-calimera.webp',
    },
  ],
  references: [
    'Radisson Athene Palace',
    'Iberostar Jerba Beach Hotel',
    'Magic Life Maria',
    'Ulysse Thalasso',
    'Athene Thalasso',
    'Dialysis Jerba Center',
    'Café Chichekhan',
    'Fiesta Beach',
    'Hasdrubal Thalassa & Spa',
    'Seabel Rym Beach',
    'Djerba Plaza Hotel',
    'Vincci Helios Beach',
    'Royal Garden Palace',
    'Palm Beach Hotel',
    'Calimera Yati Beach',
    'Djerba Beach Hotel',
    'Sidi Mansour Resort',
    'Odyssée Resort & Thalasso',
    'Club Eldorador',
    'Dar Djerba',
    'Hôtel César',
    'Médina Djerba',
  ],
  navLinks: [
    { labelKey: 'nav.home', path: '/' },
    { labelKey: 'nav.desinsectisation', path: '/desinsectisation' },
    { labelKey: 'nav.deratisation', path: '/deratisation' },
    { labelKey: 'nav.capturationChats', path: '/capturation-des-chats' },
    { labelKey: 'nav.about', path: '/a-propos' },
    { labelKey: 'nav.contact', path: '/contact' },
  ],
  footerQuickLinks: [
    { labelKey: 'footer.links.desinsectisation', path: '/desinsectisation' },
    { labelKey: 'footer.links.deratisation', path: '/deratisation' },
    { labelKey: 'footer.links.nettoyagePiscine', path: '/nettoyage-piscine' },
    { labelKey: 'footer.links.capturationChats', path: '/capturation-des-chats' },
    { labelKey: 'footer.links.legionellose', path: '/lutte-anti-legionellose' },
    { labelKey: 'footer.links.faq', path: '/faq' },
    { labelKey: 'footer.links.privacy', path: '/politique-de-confidentialite' },
  ],
};
