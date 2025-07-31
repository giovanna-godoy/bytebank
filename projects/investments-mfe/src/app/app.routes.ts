import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./investments/investments.component').then(m => m.InvestmentsComponent) }
];
