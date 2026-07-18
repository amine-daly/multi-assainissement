import { Component, Input } from '@angular/core';

export interface ProofPair {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
}

@Component({
  selector: 'app-proof-gallery',
  standalone: true,
  templateUrl: './proof-gallery.component.html',
})
export class ProofGalleryComponent {
  @Input({ required: true }) pairs!: ProofPair[];
  @Input() title = 'Galerie avant / après';
}
