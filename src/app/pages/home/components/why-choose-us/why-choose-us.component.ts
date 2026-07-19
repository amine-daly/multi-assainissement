import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  private readonly scroll = inject(ScrollService);

  readonly site = SITE_CONFIG;
  readonly points = [
    'Connaissance biologique des nuisibles',
    'Méthodes radicales et discrètes',
    'Intervention rapide à Djerba',
    'Tarifs transparents et compétitifs',
    'Véhicules banalisés (hôtels/restos)',
  ] as const;
  readonly previewReferences = SITE_CONFIG.references.slice(0, 4);

  onDevisClick(event: Event): void {
    this.scroll.scrollToLeadForm(event);
  }
}
