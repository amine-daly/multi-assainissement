import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { LanguageService } from '../../../../core/i18n/language.service';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);
  readonly points = [
    'home.why.point1',
    'home.why.point2',
    'home.why.point3',
    'home.why.point4',
    'home.why.point5',
  ] as const;
}
