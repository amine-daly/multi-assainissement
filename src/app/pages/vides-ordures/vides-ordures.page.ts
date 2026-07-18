import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import {
  ProofGalleryComponent,
  ProofPair,
} from '../../shared/components/proof-gallery/proof-gallery.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

@Component({
  selector: 'app-vides-ordures-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent, ProofGalleryComponent],
  templateUrl: './vides-ordures.page.html',
  styleUrl: './vides-ordures.page.scss',
})
export class VidesOrduresPage {
  readonly gallery: ProofPair[] = [
    {
      beforeSrc: 'assets/images/before-chute.png',
      afterSrc: 'assets/images/after-chute.png',
      beforeAlt: 'Colonne de vide-ordures avant nettoyage',
      afterAlt: 'Colonne de vide-ordures après désinfection',
      caption: 'Nettoyage et désinfection de chute',
    },
  ];
}
