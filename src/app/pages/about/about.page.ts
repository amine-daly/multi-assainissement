import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { LanguageService } from '../../core/i18n/language.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, TranslatePipe],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
})
export class AboutPage {
  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);

  readonly activityLinks = [
    { labelKey: 'about.activity.desinsectisation', path: '/desinsectisation' },
    { labelKey: 'about.activity.deratisation', path: '/deratisation' },
    { labelKey: 'about.activity.capturationChats', path: '/capturation-des-chats' },
    { labelKey: 'about.activity.legionellose', path: '/lutte-anti-legionellose' },
    { labelKey: 'about.activity.nettoyagePiscine', path: '/nettoyage-piscine' },
  ] as const;
}
