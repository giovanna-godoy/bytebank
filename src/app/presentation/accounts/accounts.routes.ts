import { Routes } from '@angular/router';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/accounts-list/accounts-list.component').then(m => m.AccountsListComponent)
  }
];
