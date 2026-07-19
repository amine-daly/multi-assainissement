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

  readonly activityLinks = [
    { label: 'Désinsectisation / Décafarisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'Capturation des chats', path: '/capturation-des-chats' },
    { label: 'Lutte anti-légionellose', path: '/lutte-anti-legionellose' },
    { label: 'Nettoyage des vides-ordures', path: '/vides-ordures' },
  ] as const;

  onDevisClick(event: Event): void {
    this.scroll.scrollToLeadForm(event);
  }
}
