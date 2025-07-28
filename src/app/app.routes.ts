import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'transfers', loadComponent: () => import('./pages/in-building/in-building.component').then(m => m.InBuildingComponent) },
    { path: 'investments', loadComponent: () => import('../../projects/investments-mfe/src/app/investments/investments.component').then(m => m.InvestmentsComponent) },
    { path: 'others-services', loadComponent: () => import('./pages/in-building/in-building.component').then(m => m.InBuildingComponent) },
];