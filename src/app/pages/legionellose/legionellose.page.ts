import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PAGE_SEO } from '../../core/seo/seo.config';
import { buildServiceJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { QuickContactComponent } from '../../shared/components/quick-contact/quick-contact.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';
import { SITE_CONFIG } from '../../core/config/site.config';
import { LanguageService } from '../../core/i18n/language.service';

const SERVICE_JSON_LD_ID = 'jsonld-service';

@Component({
  selector: 'app-legionellose-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ServiceSidebarComponent,
    QuickContactComponent,
    TranslatePipe,
  ],
  templateUrl: './legionellose.page.html',
  styleUrl: './legionellose.page.scss',
})
export class LegionellosePage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);
  private readonly translate = inject(TranslateService);
  private langSub?: Subscription;

  readonly site = SITE_CONFIG;
  readonly lang = inject(LanguageService);

  ngOnInit(): void {
    this.applyJsonLd();
    this.langSub = this.translate.onLangChange.subscribe(() => this.applyJsonLd());
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }

  private applyJsonLd(): void {
    const seo = PAGE_SEO['/lutte-anti-legionellose'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: this.translate.instant('legionellose.jsonLd.name'),
        description: this.translate.instant(seo.descriptionKey),
        path: seo.path,
        serviceType: this.translate.instant('legionellose.jsonLd.serviceType'),
      }),
    );
  }
}
