import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { LanguageService } from '../../../../core/i18n/language.service';

export interface ActivityProofPair {
  beforeSrc: string;
  afterSrc: string;
  beforeAltKey: string;
  afterAltKey: string;
  labelKey: string;
}

export interface ActivityShot {
  src: string;
  altKey: string;
  labelKey: string;
}

@Component({
  selector: 'app-activity-results',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './activity-results.component.html',
  styleUrl: './activity-results.component.scss',
})
export class ActivityResultsComponent {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);

  readonly pairs: ActivityProofPair[] = [
    {
      beforeSrc: 'assets/images/before-kitchen.webp',
      afterSrc: 'assets/images/after-kitchen.webp',
      beforeAltKey: 'alt.kitchenBefore',
      afterAltKey: 'alt.kitchenAfter',
      labelKey: 'home.results.pair.kitchen',
    },
    {
      beforeSrc: 'assets/images/before-chute.webp',
      afterSrc: 'assets/images/after-chute.webp',
      beforeAltKey: 'alt.chuteBefore',
      afterAltKey: 'alt.chuteAfter',
      labelKey: 'home.results.pair.chute',
    },
  ];

  readonly shots: ActivityShot[] = [
    {
      src: SITE_CONFIG.technicianPhoto,
      altKey: 'alt.technician',
      labelKey: 'home.results.shot.onsite',
    },
    {
      src: SITE_CONFIG.baitStationPhoto,
      altKey: 'alt.bait',
      labelKey: 'home.results.shot.bait',
    },
    {
      src: SITE_CONFIG.activityHotelPhoto,
      altKey: 'alt.hotelCorridor',
      labelKey: 'home.results.shot.hotels',
    },
  ];
}
