import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, ErrorHandler } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { tokenRefreshInterceptor } from './core/interceptors/token-refresh.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';
import { observabilityInterceptor } from './core/interceptors/observability.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { reducers } from './store';
import { AuthEffects } from './store/auth/auth.effects';
import { UserEffects } from './store/user/user.effects';
import { TransactionEffects } from './store/transactions/transactions.effects';
import { CoreModule } from './core/core.module';
import { SentryErrorHandler } from './core/services/sentry-error-handler.service';
import { SimpleErrorHandler } from './core/services/simple-error-handler.service';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: SimpleErrorHandler },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withFetch(), withInterceptors([cacheInterceptor, authInterceptor, tokenRefreshInterceptor, observabilityInterceptor])),
    provideStore(reducers),
    provideEffects([AuthEffects, UserEffects, TransactionEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(CoreModule)
  ]
};
