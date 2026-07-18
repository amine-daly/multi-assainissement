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
        'Élimination des cafards, blattes germaniques et insectes rampants. Décafarisation professionnelle.',
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
    {
      title: 'Capturation des chats',
      description:
        'Capture des chats errants pour particuliers, syndicats et hôtels à Djerba.',
      path: '/capturation-des-chats',
      icon: 'cat',
    },
    {
      title: 'Lutte anti-légionellose',
      description:
        'Prévention et traitement des risques liés à Legionella dans les réseaux d’eau.',
      path: '/lutte-anti-legionellose',
      icon: 'water',
    },
  ] as const;
}
