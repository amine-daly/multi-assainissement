import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SITE_CONFIG } from '../../core/config/site.config';
import { LanguageService } from '../../core/i18n/language.service';
import { buildFaqPageJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

const FAQ_JSON_LD_ID = 'jsonld-faq';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, TranslatePipe],
  templateUrl: './faq.page.html',
  styleUrl: './faq.page.scss',
})
export class FaqPage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);
  private readonly translate = inject(TranslateService);
  private langSub?: Subscription;

  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);

  readonly faqs = [
    { qKey: 'faq.items.0.q', aKey: 'faq.items.0.a' },
    { qKey: 'faq.items.1.q', aKey: 'faq.items.1.a' },
    { qKey: 'faq.items.2.q', aKey: 'faq.items.2.a' },
    { qKey: 'faq.items.3.q', aKey: 'faq.items.3.a' },
    { qKey: 'faq.items.4.q', aKey: 'faq.items.4.a' },
    { qKey: 'faq.items.5.q', aKey: 'faq.items.5.a' },
  ] as const;

  ngOnInit(): void {
    this.applyJsonLd();
    this.langSub = this.translate.onLangChange.subscribe(() => this.applyJsonLd());
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.jsonLd.remove(FAQ_JSON_LD_ID);
  }

  private applyJsonLd(): void {
    const translated = this.faqs.map((item) => ({
      q: this.translate.instant(item.qKey),
      a: this.translate.instant(item.aKey),
    }));
    this.jsonLd.set(FAQ_JSON_LD_ID, buildFaqPageJsonLd(translated));
  }
}
