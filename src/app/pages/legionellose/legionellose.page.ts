import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PAGE_SEO } from '../../core/seo/seo.config';
import { buildServiceJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

const SERVICE_JSON_LD_ID = 'jsonld-service';

@Component({
  selector: 'app-legionellose-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent],
  templateUrl: './legionellose.page.html',
  styleUrl: './legionellose.page.scss',
})
export class LegionellosePage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);

  ngOnInit(): void {
    const seo = PAGE_SEO['/lutte-anti-legionellose'];
    this.jsonLd.set(
      SERVICE_JSON_LD_ID,
      buildServiceJsonLd({
        name: 'Lutte anti-légionellose à Djerba',
        description: seo.description,
        path: seo.path,
        serviceType: 'Legionella prevention and control',
      }),
    );
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(SERVICE_JSON_LD_ID);
  }
}
