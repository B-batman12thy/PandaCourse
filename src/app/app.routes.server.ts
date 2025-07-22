// src/app/app.routes.server.ts
import { ServerRoute, RenderMode, } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // la home en statique
  { path: '', renderMode: RenderMode.Prerender },
  // liste des cours admin (URL sans param) en statique
  { path: 'admin/courses', renderMode: RenderMode.Prerender },
  // édition de cours (URL paramétrée) en Server (SSR on‐demand)
  {
    path: 'admin/courses/:id/edit',
    renderMode: RenderMode.Server,
  },
  // catalogue public en statique
  { path: 'courses', renderMode: RenderMode.Prerender },
  // player de cours (URL param) en Server
  {
    path: 'courses/:id/player',
    renderMode: RenderMode.Server,
  },
  // fallback : toutes les autres routes se comportent en CSR
  { path: '**', renderMode: RenderMode.Client },
];
