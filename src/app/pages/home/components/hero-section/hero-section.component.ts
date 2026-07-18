import { Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  private readonly scroll = inject(ScrollService);

  readonly site = SITE_CONFIG;

  onDevisClick(event: Event): void {
    this.scroll.scrollToLeadForm(event);
  }
}
