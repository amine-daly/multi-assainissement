import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

type HomeServiceCard = {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'insect' | 'rodent' | 'pool' | 'cat' | 'water';
  path?: string;
  comingSoon?: boolean;
};

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './services-grid.component.html',
})
export class ServicesGridComponent {
  readonly services: HomeServiceCard[] = [
    {
      id: 'desinsectisation',
      titleKey: 'home.services.desinsectisation.title',
      descKey: 'home.services.desinsectisation.desc',
      path: '/desinsectisation',
      icon: 'insect',
    },
    {
      id: 'deratisation',
      titleKey: 'home.services.deratisation.title',
      descKey: 'home.services.deratisation.desc',
      path: '/deratisation',
      icon: 'rodent',
    },
    {
      id: 'nettoyage-piscine',
      titleKey: 'home.services.nettoyagePiscine.title',
      descKey: 'home.services.nettoyagePiscine.desc',
      icon: 'pool',
      path: '/nettoyage-piscine',
      comingSoon: true,
    },
    {
      id: 'capturation-chats',
      titleKey: 'home.services.capturationChats.title',
      descKey: 'home.services.capturationChats.desc',
      path: '/capturation-des-chats',
      icon: 'cat',
    },
    {
      id: 'legionellose',
      titleKey: 'home.services.legionellose.title',
      descKey: 'home.services.legionellose.desc',
      path: '/lutte-anti-legionellose',
      icon: 'water',
    },
  ];
}
