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
  selector: 'app-deratisation-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent, ProofGalleryComponent],
  templateUrl: './deratisation.page.html',
  styleUrl: './deratisation.page.scss',
})
export class DeratisationPage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);

  readonly site = SITE_CONFIG;
  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-chute.webp',
      afterSrc: 'assets/images/after-chute.webp',
      beforeAlt: 'Point d’entrée avant sécurisation anti-rongeurs',
      afterAlt: 'Zone sécurisée après dératisation',
      caption: 'Sécurisation des accès',
    },
    {
      beforeSrc: 'assets/images/bait-station.webp',
      afterSrc: 'assets/images/after-kitchen.webp',
      beforeAlt: 'Station d’appât discrète en place',
      afterAlt: 'Locaux protégés après intervention',
      caption: 'Dispositifs ciblés et discrets',
    },
  ];

  ngOnInit(): void {
    const seo = PAGE_SEO['/deratisation'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: 'Dératisation à Djerba',
        description: seo.description,
        path: seo.path,
        serviceType: 'Rodent control / dératisation',
      }),
    );
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }
}
