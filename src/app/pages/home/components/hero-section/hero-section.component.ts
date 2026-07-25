import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  readonly site = SITE_CONFIG;
}
