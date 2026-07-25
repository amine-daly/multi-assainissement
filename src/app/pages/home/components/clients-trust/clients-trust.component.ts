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
  readonly logos = SITE_CONFIG.clientLogos;
  readonly count = SITE_CONFIG.references.length;
}
