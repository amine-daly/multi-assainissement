import { Component } from '@angular/core';
import { EmergencyCardComponent } from '../emergency-card/emergency-card.component';
import { LeadFormComponent } from '../lead-form/lead-form.component';

@Component({
  selector: 'app-service-sidebar',
  standalone: true,
  imports: [LeadFormComponent, EmergencyCardComponent],
  templateUrl: './service-sidebar.component.html',
})
export class ServiceSidebarComponent {}
