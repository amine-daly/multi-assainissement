import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../../../core/config/site.config';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './why-choose-us.component.html',
})
export class WhyChooseUsComponent {
  readonly site = SITE_CONFIG;
  readonly points = [
    'Connaissance biologique des nuisibles',
    'Méthodes radicales et discrètes',
    'Intervention rapide à Djerba',
    'Tarifs transparents et compétitifs',
    'Véhicules banalisés (hôtels/restos)',
  ] as const;
}
