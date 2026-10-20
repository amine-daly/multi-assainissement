import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LeadFormComponent } from '../lead-form/lead-form.component';
import { QuickContactComponent } from '../quick-contact/quick-contact.component';

@Component({
  selector: 'app-service-sidebar',
  standalone: true,
  imports: [QuickContactComponent, LeadFormComponent, RouterLink, TranslatePipe],
  templateUrl: './service-sidebar.component.html',
})
export class ServiceSidebarComponent {
  private readonly router = inject(Router);

  private readonly serviceLinks = [
    { labelKey: 'sidebar.desinsectisation', path: '/desinsectisation' },
    { labelKey: 'sidebar.deratisation', path: '/deratisation' },
    { labelKey: 'sidebar.nettoyagePiscine', path: '/nettoyage-piscine' },
    { labelKey: 'sidebar.jardinage', path: '/jardinage' },
    { labelKey: 'sidebar.capturationChats', path: '/capturation-des-chats' },
    { labelKey: 'sidebar.legionellose', path: '/lutte-anti-legionellose' },
  ] as const;

  /** All services except the one for the page currently displayed. */
  get relatedLinks(): ReadonlyArray<{ labelKey: string; path: string }> {
    const current = this.router.url.split('?')[0].split('#')[0];
    return this.serviceLinks.filter((link) => link.path !== current);
  }
}
