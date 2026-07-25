import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  readonly relatedLinks = [
    { labelKey: 'sidebar.desinsectisation', path: '/desinsectisation' },
    { labelKey: 'sidebar.deratisation', path: '/deratisation' },
    { labelKey: 'sidebar.videsOrdures', path: '/vides-ordures' },
    { labelKey: 'sidebar.faq', path: '/faq' },
    { labelKey: 'sidebar.contact', path: '/contact' },
  ] as const;
}
