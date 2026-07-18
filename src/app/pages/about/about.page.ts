import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ScrollService } from '../../core/services/scroll.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
})
export class AboutPage {
  private readonly scroll = inject(ScrollService);
  readonly site = SITE_CONFIG;

  readonly references = [
    'Radisson Athene Palace',
    'Iberostar Jerba Beach Hotel',
    'Magic Life Maria',
    'Ulysse Thalasso',
    'Athene Thalasso',
    'Dialysis Jerba Center',
    'Café Chichekhan',
  ];

  onDevisClick(event: Event): void {
    this.scroll.scrollToLeadForm(event);
  }
}
