import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { LanguageService } from '../../../../core/i18n/language.service';

@Component({
  selector: 'app-urgency-zone',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './urgency-zone.component.html',
})
export class UrgencyZoneComponent {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);
}
