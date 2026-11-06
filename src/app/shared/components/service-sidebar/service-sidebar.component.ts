import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/i18n/language.service';
import { AppLang } from '../../../core/i18n/language.constants';
import {
  FR_TO_AR_SERVICE,
  stripArabicPrefix,
} from '../../../core/i18n/locale-path';
import { LocalePathPipe } from '../../../core/i18n/locale-path.pipe';
import { LeadFormComponent } from '../lead-form/lead-form.component';
import { QuickContactComponent } from '../quick-contact/quick-contact.component';

type AlternateLink = { href: string; label: string; hreflang: string; lang: AppLang };

@Component({
  selector: 'app-service-sidebar',
  standalone: true,
  imports: [
    QuickContactComponent,
    LeadFormComponent,
    RouterLink,
    LocalePathPipe,
    TranslatePipe,
  ],
  templateUrl: './service-sidebar.component.html',
})
export class ServiceSidebarComponent {
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);

  private readonly serviceLinks = [
    { labelKey: 'sidebar.desinsectisation', path: '/desinsectisation' },
    { labelKey: 'sidebar.deratisation', path: '/deratisation' },
    { labelKey: 'sidebar.nettoyagePiscine', path: '/nettoyage-piscine' },
    { labelKey: 'sidebar.jardinage', path: '/jardinage' },
    { labelKey: 'sidebar.capturationChats', path: '/capturation-des-chats' },
    { labelKey: 'sidebar.legionellose', path: '/lutte-anti-legionellose' },
  ] as const;

  /** All services except the one for the page currently displayed. */
  get relatedLinks(): ReadonlyArray<{ labelKey: string; path: string }> {
    const current = this.logicalPath();
    return this.serviceLinks.filter((link) => link.path !== current);
  }

  /** Plain `<a href>` to the other-language version, so crawlers can discover it. */
  get alternate(): AlternateLink | null {
    const logical = this.logicalPath();
    const arPath = FR_TO_AR_SERVICE[logical];
    if (!arPath) {
      return null;
    }
    return this.translate.getCurrentLang() === 'ar-sa'
      ? { href: logical, label: 'Version française', hreflang: 'fr-TN', lang: 'fr-fr' }
      : { href: arPath, label: 'النسخة العربية', hreflang: 'ar-SA', lang: 'ar-sa' };
  }

  switchTo(event: MouseEvent, lang: AppLang): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    void this.language.setLang(lang);
  }

  private logicalPath(): string {
    return stripArabicPrefix(this.router.url);
  }
}
