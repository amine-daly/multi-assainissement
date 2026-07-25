import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
})
export class NotFoundPage {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);
}
