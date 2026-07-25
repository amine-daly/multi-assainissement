import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface ProofPair {
  beforeSrc: string;
  afterSrc: string;
  beforeAltKey: string;
  afterAltKey: string;
  captionKey?: string;
}

@Component({
  selector: 'app-proof-gallery',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './proof-gallery.component.html',
})
export class ProofGalleryComponent {
  @Input({ required: true }) pairs!: ProofPair[];
  @Input() titleKey = 'proofGallery.title';
}
