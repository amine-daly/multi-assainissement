import { Routes } from '@angular/router';
import { PAGE_SEO } from './core/seo/seo.config';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
        title: PAGE_SEO['/'].title,
      },
      {
        path: 'desinsectisation',
        loadComponent: () =>
          import('./pages/desinsectisation/desinsectisation.page').then(
            (m) => m.DesinsectisationPage,
          ),
        title: PAGE_SEO['/desinsectisation'].title,
      },
      {
        path: 'deratisation',
        loadComponent: () =>
          import('./pages/deratisation/deratisation.page').then(
            (m) => m.DeratisationPage,
          ),
        title: PAGE_SEO['/deratisation'].title,
      },
      {
        path: 'vides-ordures',
        loadComponent: () =>
          import('./pages/vides-ordures/vides-ordures.page').then(
            (m) => m.VidesOrduresPage,
          ),
        title: PAGE_SEO['/vides-ordures'].title,
      },
      {
        path: 'a-propos',
        loadComponent: () =>
          import('./pages/about/about.page').then((m) => m.AboutPage),
        title: PAGE_SEO['/a-propos'].title,
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.page').then((m) => m.ContactPage),
        title: PAGE_SEO['/contact'].title,
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./pages/faq/faq.page').then((m) => m.FaqPage),
        title: PAGE_SEO['/faq'].title,
      },
      {
        path: 'politique-de-confidentialite',
        loadComponent: () =>
          import('./pages/privacy/privacy.page').then((m) => m.PrivacyPage),
        title: PAGE_SEO['/politique-de-confidentialite'].title,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
