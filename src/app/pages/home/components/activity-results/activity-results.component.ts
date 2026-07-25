import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';

export interface ActivityProofPair {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
}

export interface ActivityShot {
  src: string;
  alt: string;
  label: string;
}

@Component({
  selector: 'app-activity-results',
  standalone: true,
  templateUrl: './activity-results.component.html',
  styleUrl: './activity-results.component.scss',
})
export class ActivityResultsComponent {
  readonly site = SITE_CONFIG;

  readonly pairs: ActivityProofPair[] = [
    {
      beforeSrc: 'assets/images/before-kitchen.webp',
      afterSrc: 'assets/images/after-kitchen.webp',
      beforeAlt: 'Cuisine avant traitement anti-cafards',
      afterAlt: 'Cuisine après intervention Multi-Assainissement',
      label: 'Désinsectisation — cuisine',
    },
    {
      beforeSrc: 'assets/images/before-chute.webp',
      afterSrc: 'assets/images/after-chute.webp',
      beforeAlt: 'Vide-ordures avant nettoyage',
      afterAlt: 'Vide-ordures après désinfection',
      label: 'Vides-ordures — hygiène',
    },
  ];

  readonly shots: ActivityShot[] = [
    {
      src: SITE_CONFIG.technicianPhoto,
      alt: 'Technicien en intervention discrète dans une cuisine',
      label: 'Intervention sur site',
    },
    {
      src: SITE_CONFIG.baitStationPhoto,
      alt: 'Station d’appât anti-rongeurs en place',
      label: 'Dératisation discrète',
    },
    {
      src: SITE_CONFIG.activityHotelPhoto,
      alt: 'Intervention discrète dans un couloir d’hôtel',
      label: 'Hôtels & professionnels',
    },
  ];
}
