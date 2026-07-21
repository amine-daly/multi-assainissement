import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../../core/config/site.config';

@Component({
  selector: 'app-clients-trust',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clients-trust.component.html',
  styleUrl: './clients-trust.component.scss',
})
export class ClientsTrustComponent {
  readonly site = SITE_CONFIG;
  readonly count = SITE_CONFIG.references.length;

  private readonly rowA = SITE_CONFIG.references.filter((_, i) => i % 2 === 0);
  private readonly rowB = SITE_CONFIG.references.filter((_, i) => i % 2 === 1);

  /** Duplicated for seamless CSS marquee loop */
  readonly loopA = [...this.rowA, ...this.rowA];
  readonly loopB = [...this.rowB, ...this.rowB];
}
