import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  templateUrl: './trust-bar.component.html',
})
export class TrustBarComponent {
  readonly items = [
    {
      title: 'Entreprise Agréée',
      icon: 'shield',
    },
    {
      title: 'Expertise Scientifique',
      icon: 'science',
    },
    {
      title: 'Intervention rapide',
      icon: 'bolt',
    },
  ] as const;
}
