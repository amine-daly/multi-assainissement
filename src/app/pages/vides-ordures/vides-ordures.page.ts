import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
  selector: 'app-vides-ordures-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent, ProofGalleryComponent],
  templateUrl: './vides-ordures.page.html',
  styleUrl: './vides-ordures.page.scss',
})
export class VidesOrduresPage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);

  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-chute.webp',
      afterSrc: 'assets/images/after-chute.webp',
      beforeAlt: 'Colonne de vide-ordures avant nettoyage',
      afterAlt: 'Colonne de vide-ordures après désinfection',
      caption: 'Nettoyage et désinfection de chute',
    },
  ];

  ngOnInit(): void {
    const seo = PAGE_SEO['/vides-ordures'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: 'Nettoyage de vides-ordures à Djerba',
        description: seo.description,
        path: seo.path,
        serviceType: 'Garbage chute cleaning',
      }),
    );
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }
}
