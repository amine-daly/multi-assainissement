import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { LanguageService } from '../../core/i18n/language.service';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { QuickContactComponent } from '../../shared/components/quick-contact/quick-contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    QuickContactComponent,
    LeadFormComponent,
    TranslatePipe,
  ],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
})
export class ContactPage {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);
  /** Visible wa.me label (digits only, no +). */
  readonly whatsappWaLabel = `wa.me/${SITE_CONFIG.mobile.replace('+', '')}`;
}
