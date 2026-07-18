import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import {
  ProofGalleryComponent,
  ProofPair,
} from '../../shared/components/proof-gallery/proof-gallery.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

@Component({
  selector: 'app-deratisation-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent, ProofGalleryComponent],
  templateUrl: './deratisation.page.html',
  styleUrl: './deratisation.page.scss',
})
export class DeratisationPage {
  readonly site = SITE_CONFIG;
  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-chute.png',
      afterSrc: 'assets/images/after-chute.png',
      beforeAlt: 'Point d’entrée avant sécurisation anti-rongeurs',
      afterAlt: 'Zone sécurisée après dératisation',
      caption: 'Sécurisation des accès',
    },
    {
      beforeSrc: 'assets/images/bait-station.png',
      afterSrc: 'assets/images/after-kitchen.png',
      beforeAlt: 'Station d’appât discrète en place',
      afterAlt: 'Locaux protégés après intervention',
      caption: 'Dispositifs ciblés et discrets',
    },
  ];
}
