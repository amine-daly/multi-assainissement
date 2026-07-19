import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PAGE_SEO } from '../../core/seo/seo.config';
import { buildServiceJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

const SERVICE_JSON_LD_ID = 'jsonld-service';

@Component({
  selector: 'app-capturation-chats-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent],
  templateUrl: './capturation-chats.page.html',
  styleUrl: './capturation-chats.page.scss',
})
export class CapturationChatsPage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);

  readonly site = SITE_CONFIG;

  ngOnInit(): void {
    const seo = PAGE_SEO['/capturation-des-chats'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: 'Capturation des chats errants à Djerba',
        description: seo.description,
        path: seo.path,
        serviceType: 'Stray cat capture',
      }),
    );
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }
}
