import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * @constant
 * @type {ApplicationConfig}
 * @description The configuration for the application. It provides the router with the application's routes.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
