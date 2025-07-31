import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
    { path: 'transfers', loadComponent: () => import('./pages/in-building/in-building.component').then(m => m.InBuildingComponent), canActivate: [authGuard] },
    { path: 'investments', loadComponent: () => import('../../projects/investments-mfe/src/app/investments/investments.component').then(m => m.InvestmentsComponent), canActivate: [authGuard] },
    { path: 'others-services', loadComponent: () => import('./pages/in-building/in-building.component').then(m => m.InBuildingComponent), canActivate: [authGuard] },
];