import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'La Bar à Babar — Le bar dégénéré que personne n\'attendait',
  },
  {
    path: 'cocktails',
    loadComponent: () =>
      import('./features/cocktails/cocktails.component').then(
        (m) => m.CocktailsComponent
      ),
    title: 'La Carte — La Bar à Babar',
  },
  {
    path: 'ambiance',
    loadComponent: () =>
      import('./features/ambiance/ambiance.component').then(
        (m) => m.AmbianceComponent
      ),
    title: 'L\'Ambiance — La Bar à Babar',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Nous Trouver — La Bar à Babar',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
