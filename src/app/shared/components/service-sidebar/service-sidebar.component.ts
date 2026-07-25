import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeadFormComponent } from '../lead-form/lead-form.component';
import { QuickContactComponent } from '../quick-contact/quick-contact.component';

@Component({
  selector: 'app-service-sidebar',
  standalone: true,
  imports: [QuickContactComponent, LeadFormComponent, RouterLink],
  templateUrl: './service-sidebar.component.html',
})
export class ServiceSidebarComponent {
  readonly relatedLinks = [
    { label: 'Désinsectisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'Vides-ordures', path: '/vides-ordures' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ] as const;
}
