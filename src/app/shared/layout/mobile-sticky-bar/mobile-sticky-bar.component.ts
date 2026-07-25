import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { LanguageService } from '../../../core/i18n/language.service';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-mobile-sticky-bar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './mobile-sticky-bar.component.html',
  styleUrl: './mobile-sticky-bar.component.scss',
})
export class MobileStickyBarComponent {
  private readonly scroll = inject(ScrollService);
  readonly lang = inject(LanguageService);
  readonly site = SITE_CONFIG;

  onRecallClick(event: Event): void {
    this.scroll.scrollToLeadForm(event);
  }
}
