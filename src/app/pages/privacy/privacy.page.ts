import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './privacy.page.html',
  styleUrl: './privacy.page.scss',
})
export class PrivacyPage {
  readonly site = SITE_CONFIG;
}
