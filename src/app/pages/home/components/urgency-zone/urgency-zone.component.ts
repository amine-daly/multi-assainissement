import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';

@Component({
  selector: 'app-urgency-zone',
  standalone: true,
  templateUrl: './urgency-zone.component.html',
})
export class UrgencyZoneComponent {
  readonly site = SITE_CONFIG;
}
