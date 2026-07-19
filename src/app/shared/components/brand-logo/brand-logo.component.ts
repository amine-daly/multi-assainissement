import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../core/config/site.config';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-logo.component.html',
})
export class BrandLogoComponent {
  readonly name = SITE_CONFIG.name;
}
