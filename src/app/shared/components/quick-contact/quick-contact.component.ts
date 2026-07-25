import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/site.config';

@Component({
  selector: 'app-quick-contact',
  standalone: true,
  templateUrl: './quick-contact.component.html',
})
export class QuickContactComponent {
  readonly site = SITE_CONFIG;
}
