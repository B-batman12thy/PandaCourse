import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'login',  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin',  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'courses',loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', redirectTo: 'courses' },
];
