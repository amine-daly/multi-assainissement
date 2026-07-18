import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { EmergencyCardComponent } from '../../shared/components/emergency-card/emergency-card.component';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [PageHeaderComponent, LeadFormComponent, EmergencyCardComponent],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
})
export class ContactPage {
  readonly site = SITE_CONFIG;
}
