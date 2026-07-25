import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-quick-contact',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './quick-contact.component.html',
})
export class QuickContactComponent {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);
}
