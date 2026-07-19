import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmergencyCardComponent } from '../emergency-card/emergency-card.component';
import { LeadFormComponent } from '../lead-form/lead-form.component';

@Component({
  selector: 'app-service-sidebar',
  standalone: true,
  imports: [LeadFormComponent, EmergencyCardComponent, RouterLink],
  templateUrl: './service-sidebar.component.html',
})
export class ServiceSidebarComponent {
  readonly relatedLinks = [
    { label: 'Désinsectisation', path: '/desinsectisation' },
    { label: 'Dératisation', path: '/deratisation' },
    { label: 'Vides-ordures', path: '/vides-ordures' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact / Devis', path: '/contact' },
  ] as const;
}
