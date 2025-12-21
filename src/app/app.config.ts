import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { reducers } from './store';
import { UserEffects } from './store/user/user.effects';
import { TransactionEffects } from './store/transactions/transactions.effects';
import { CoreModule } from './core/core.module';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore(reducers),
    provideEffects([UserEffects, TransactionEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(CoreModule)
  ]
};
