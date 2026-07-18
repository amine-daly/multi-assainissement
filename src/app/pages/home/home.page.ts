import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SITE_URL } from '../../core/seo/seo.config';
import { JsonLdService } from '../../core/services/json-ld.service';
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
    WhyChooseUsComponent,
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
      '@type': 'LocalBusiness',
      name: this.site.name,
      description:
        'Désinsectisation et dératisation professionnelles à Djerba — interventions rapides et discrètes.',
      url: `${SITE_URL}/`,
      telephone: this.site.mobile,
      email: this.site.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Djerba',
        addressCountry: 'TN',
      },
      areaServed: {
        '@type': 'Place',
        name: this.site.areaServed,
      },
      image: `${SITE_URL}/${this.site.heroImage}`,
    });
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(LOCAL_BUSINESS_JSON_LD_ID);
  }
}
