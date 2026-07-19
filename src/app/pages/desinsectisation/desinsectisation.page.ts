import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PAGE_SEO } from '../../core/seo/seo.config';
import { buildServiceJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import {
  ProofGalleryComponent,
  ProofPair,
} from '../../shared/components/proof-gallery/proof-gallery.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

const SERVICE_JSON_LD_ID = 'jsonld-service';

@Component({
  selector: 'app-desinsectisation-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent, ProofGalleryComponent],
  templateUrl: './desinsectisation.page.html',
  styleUrl: './desinsectisation.page.scss',
})
export class DesinsectisationPage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);

  readonly site = SITE_CONFIG;
  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-kitchen.webp',
      afterSrc: 'assets/images/after-kitchen.webp',
      beforeAlt: 'Zone cuisine avant traitement anti-cafards',
      afterAlt: 'Zone cuisine après traitement professionnel',
      caption: 'Cuisine / plinthes — intervention ciblée',
    },
    {
      beforeSrc: 'assets/images/before-chute.webp',
      afterSrc: 'assets/images/after-chute.webp',
      beforeAlt: 'Colonne de vide-ordures avant désinsectisation',
      afterAlt: 'Colonne de vide-ordures après désinsectisation',
      caption: 'Vide-ordures — traitement radical et discret',
    },
  ];

  ngOnInit(): void {
    const seo = PAGE_SEO['/desinsectisation'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: 'Désinsectisation à Djerba',
        description: seo.description,
        path: seo.path,
        serviceType: 'Pest control / désinsectisation',
      }),
    );
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }
}
