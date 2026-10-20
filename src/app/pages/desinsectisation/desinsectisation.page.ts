import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PAGE_SEO } from '../../core/seo/seo.config';
import { buildServiceJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import {
  ProofGalleryComponent,
  ProofPair,
} from '../../shared/components/proof-gallery/proof-gallery.component';
import { QuickContactComponent } from '../../shared/components/quick-contact/quick-contact.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

const SERVICE_JSON_LD_ID = 'jsonld-service';

@Component({
  selector: 'app-desinsectisation-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ServiceSidebarComponent,
    ProofGalleryComponent,
    QuickContactComponent,
    TranslatePipe,
  ],
  templateUrl: './desinsectisation.page.html',
  styleUrl: './desinsectisation.page.scss',
})
export class DesinsectisationPage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);
  private readonly translate = inject(TranslateService);
  private langSub?: Subscription;

  readonly site = SITE_CONFIG;
  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-kitchen.webp',
      afterSrc: 'assets/images/after-kitchen.webp',
      beforeAltKey: 'alt.kitchenZoneBefore',
      afterAltKey: 'alt.kitchenZoneAfter',
      captionKey: 'desinsectisation.gallery.caption1',
    },
  ];

  ngOnInit(): void {
    this.applyJsonLd();
    this.langSub = this.translate.onLangChange.subscribe(() => this.applyJsonLd());
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }

  private applyJsonLd(): void {
    const seo = PAGE_SEO['/desinsectisation'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: this.translate.instant('desinsectisation.jsonLd.name'),
        description: this.translate.instant(seo.descriptionKey),
        path: seo.path,
        serviceType: this.translate.instant('desinsectisation.jsonLd.serviceType'),
      }),
    );
  }
}
