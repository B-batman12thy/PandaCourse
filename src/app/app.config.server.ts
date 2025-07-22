// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRoutesConfig }                from '@angular/ssr';
import { appConfig }                                from './app.config';
import { serverRoutes }                             from './app.routes.server';

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, {
  providers: [
    // injection de la config de routes serveur
    provideServerRoutesConfig(serverRoutes)
  ]
});
