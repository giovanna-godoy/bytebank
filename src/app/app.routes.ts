import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./presentation/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./presentation/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    loadChildren: () => import('./presentation/transactions/transactions.routes').then(m => m.TRANSACTIONS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./presentation/accounts/accounts.routes').then(m => m.ACCOUNTS_ROUTES),
    canActivate: [authGuard]
  },
  { path: 'home', loadComponent: () => import('./presentation/dashboard/pages/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
  { path: 'transfers', loadComponent: () => import('./pages/in-building/in-building.component').then(m => m.InBuildingComponent), canActivate: [authGuard] },
  { path: 'investments', loadComponent: () => import('../../projects/investments-mfe/src/app/investments/investments.component').then(m => m.InvestmentsComponent), canActivate: [authGuard] },
  { path: 'others-services', loadComponent: () => import('./pages/in-building/in-building.component').then(m => m.InBuildingComponent), canActivate: [authGuard] }
];