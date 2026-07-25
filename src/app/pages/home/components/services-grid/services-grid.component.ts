import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './services-grid.component.html',
})
export class ServicesGridComponent {
  readonly services = [
    {
      titleKey: 'home.services.desinsectisation.title',
      descKey: 'home.services.desinsectisation.desc',
      path: '/desinsectisation',
      icon: 'insect',
    },
    {
      titleKey: 'home.services.deratisation.title',
      descKey: 'home.services.deratisation.desc',
      path: '/deratisation',
      icon: 'rodent',
    },
    {
      titleKey: 'home.services.videsOrdures.title',
      descKey: 'home.services.videsOrdures.desc',
      path: '/vides-ordures',
      icon: 'building',
    },
    {
      titleKey: 'home.services.capturationChats.title',
      descKey: 'home.services.capturationChats.desc',
      path: '/capturation-des-chats',
      icon: 'cat',
    },
    {
      titleKey: 'home.services.legionellose.title',
      descKey: 'home.services.legionellose.desc',
      path: '/lutte-anti-legionellose',
      icon: 'water',
    },
  ] as const;
}
