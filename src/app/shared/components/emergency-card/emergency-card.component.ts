import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-emergency-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './emergency-card.component.html',
})
export class EmergencyCardComponent {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);
}
