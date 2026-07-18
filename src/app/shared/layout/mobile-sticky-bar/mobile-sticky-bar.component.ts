import { Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-mobile-sticky-bar',
  standalone: true,
  templateUrl: './mobile-sticky-bar.component.html',
  styleUrl: './mobile-sticky-bar.component.scss',
})
export class MobileStickyBarComponent {
  private readonly scroll = inject(ScrollService);

  readonly site = SITE_CONFIG;

  onDevisClick(event: Event): void {
    this.scroll.scrollToLeadForm(event);
  }
}
