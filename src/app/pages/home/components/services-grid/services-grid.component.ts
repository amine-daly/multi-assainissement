import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-grid.component.html',
})
export class ServicesGridComponent {
  readonly services = [
    {
      title: 'Désinsectisation',
      description:
        'Élimination des cafards, blattes germaniques et insectes rampants.',
      path: '/desinsectisation',
      icon: 'insect',
    },
    {
      title: 'Dératisation',
      description:
        'Rats et souris : diagnostic, extermination et sécurisation.',
      path: '/deratisation',
      icon: 'rodent',
    },
    {
      title: 'Vides-Ordures',
      description:
        'Nettoyage et désinfection des colonnes et chutes à ordures.',
      path: '/vides-ordures',
      icon: 'building',
    },
  ] as const;
}
