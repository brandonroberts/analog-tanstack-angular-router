import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(),
    provideHttpClient(),
    provideClientHydration(),
  ],
};
