import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import {
  ProofGalleryComponent,
  ProofPair,
} from '../../shared/components/proof-gallery/proof-gallery.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

@Component({
  selector: 'app-desinsectisation-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent, ProofGalleryComponent],
  templateUrl: './desinsectisation.page.html',
  styleUrl: './desinsectisation.page.scss',
})
export class DesinsectisationPage {
  readonly site = SITE_CONFIG;
  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-kitchen.png',
      afterSrc: 'assets/images/after-kitchen.png',
      beforeAlt: 'Zone cuisine avant traitement anti-cafards',
      afterAlt: 'Zone cuisine après traitement professionnel',
      caption: 'Cuisine / plinthes — intervention ciblée',
    },
    {
      beforeSrc: 'assets/images/before-chute.png',
      afterSrc: 'assets/images/after-chute.png',
      beforeAlt: 'Colonne de vide-ordures avant désinsectisation',
      afterAlt: 'Colonne de vide-ordures après désinsectisation',
      caption: 'Vide-ordures — traitement radical et discret',
    },
  ];
}
