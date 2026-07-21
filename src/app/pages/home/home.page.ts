import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { buildLocalBusinessJsonLd } from '../../core/seo/structured-data';
import { JsonLdService } from '../../core/services/json-ld.service';
import { ActivityResultsComponent } from './components/activity-results/activity-results.component';
import { ClientsTrustComponent } from './components/clients-trust/clients-trust.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ServicesGridComponent } from './components/services-grid/services-grid.component';
import { TrustBarComponent } from './components/trust-bar/trust-bar.component';
import { UrgencyZoneComponent } from './components/urgency-zone/urgency-zone.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';

const LOCAL_BUSINESS_JSON_LD_ID = 'jsonld-local-business';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TrustBarComponent,
    ServicesGridComponent,
    ActivityResultsComponent,
    WhyChooseUsComponent,
    ClientsTrustComponent,
    UrgencyZoneComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private readonly jsonLd = inject(JsonLdService);

  readonly site = SITE_CONFIG;

  ngOnInit(): void {
    this.jsonLd.set(LOCAL_BUSINESS_JSON_LD_ID, {
      '@context': 'https://schema.org',
      ...buildLocalBusinessJsonLd(),
    });
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(LOCAL_BUSINESS_JSON_LD_ID);
  }
}
