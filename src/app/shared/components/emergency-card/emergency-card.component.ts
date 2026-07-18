import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';

@Component({
  selector: 'app-emergency-card',
  standalone: true,
  templateUrl: './emergency-card.component.html',
})
export class EmergencyCardComponent {
  readonly site = SITE_CONFIG;
}
