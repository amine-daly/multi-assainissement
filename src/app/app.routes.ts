import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';

/** Document titles are applied by SeoService (translated via ngx-translate). */
export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'desinsectisation',
        loadComponent: () =>
          import('./pages/desinsectisation/desinsectisation.page').then(
            (m) => m.DesinsectisationPage,
          ),
      },
      {
        path: 'deratisation',
        loadComponent: () =>
          import('./pages/deratisation/deratisation.page').then(
            (m) => m.DeratisationPage,
          ),
      },
      {
        path: 'ar/desinsectisation',
        loadComponent: () =>
          import('./pages/desinsectisation/desinsectisation.page').then(
            (m) => m.DesinsectisationPage,
          ),
      },
      {
        path: 'ar/deratisation',
        loadComponent: () =>
          import('./pages/deratisation/deratisation.page').then(
            (m) => m.DeratisationPage,
          ),
      },
      {
        path: 'vides-ordures',
        redirectTo: 'nettoyage-piscine',
        pathMatch: 'full',
      },
      {
        path: 'nettoyage-piscine',
        loadComponent: () =>
          import('./pages/nettoyage-piscine/nettoyage-piscine.page').then(
            (m) => m.NettoyagePiscinePage,
          ),
      },
      {
        path: 'jardinage',
        loadComponent: () =>
          import('./pages/gardening/gardening.page').then((m) => m.GardeningPage),
      },
      {
        path: 'capturation-des-chats',
        loadComponent: () =>
          import('./pages/capturation-chats/capturation-chats.page').then(
            (m) => m.CapturationChatsPage,
          ),
      },
      {
        path: 'lutte-anti-legionellose',
        loadComponent: () =>
          import('./pages/legionellose/legionellose.page').then(
            (m) => m.LegionellosePage,
          ),
      },
      {
        path: 'a-propos',
        loadComponent: () =>
          import('./pages/about/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.page').then((m) => m.ContactPage),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./pages/faq/faq.page').then((m) => m.FaqPage),
      },
      {
        path: 'politique-de-confidentialite',
        loadComponent: () =>
          import('./pages/privacy/privacy.page').then((m) => m.PrivacyPage),
      },
      {
        path: '404',
        loadComponent: () =>
          import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
      },
    ],
  },
];
