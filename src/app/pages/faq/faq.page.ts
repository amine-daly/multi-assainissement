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
      q: 'Dans quels délais intervenez-vous à Djerba ?',
      a: 'Contactez-nous au 98 962 556 — nous planifions l’intervention selon la disponibilité et la nature de la demande.',
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
      q: 'Proposez-vous la capturation des chats errants ?',
      a: 'Oui. Nous intervenons pour la capture des chats errants auprès des particuliers, syndicats et professionnels à Djerba.',
    },
    {
      q: 'Intervenez-vous en lutte anti-légionellose ?',
      a: 'Oui. Nous accompagnons hôtels, thalasso et établissements à risque pour la prévention et le traitement liés à Legionella.',
    },
    {
      q: 'Comment obtenir un devis ?',
      a: 'Remplissez le formulaire de devis sur la page Contact, ou appelez-nous directement (tél. / portable / fax).',
    },
  ];
}
