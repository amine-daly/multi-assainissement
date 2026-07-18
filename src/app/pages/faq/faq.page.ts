import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './faq.page.html',
  styleUrl: './faq.page.scss',
})
export class FaqPage {
  readonly faqs = [
    {
      q: 'Intervenez-vous en urgence à Djerba ?',
      a: 'Oui. Contactez-nous au 98 962 556 — nous pouvons souvent intervenir le jour même selon la disponibilité.',
    },
    {
      q: 'Traitez-vous les blattes germaniques dans les vides-ordures ?',
      a: 'Oui, c’est l’une de nos spécialités : appartements, cuisines et colonnes de chute.',
    },
    {
      q: 'Vos interventions sont-elles discrètes pour les hôtels ?',
      a: 'Oui. Nous privilégions la discrétion (véhicules banalisés, méthodes adaptées aux établissements accueillant du public).',
    },
    {
      q: 'Comment obtenir un devis ?',
      a: 'Remplissez le formulaire de diagnostic gratuit sur la page Contact, ou appelez-nous directement.',
    },
  ];
}
