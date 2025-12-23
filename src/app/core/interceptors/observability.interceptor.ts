import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ObservabilityService } from '../services/observability.service';
import { environment } from '../../../environments/environment';

export const observabilityInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.enableAnalytics) {
    return next(req);
  }

  const observabilityService = inject(ObservabilityService);
  const startTime = performance.now();

  return next(req).pipe(
    tap(() => {
      const duration = performance.now() - startTime;
      
      observabilityService.trackUserAction('api_call', {
        method: req.method,
        url: req.url.replace(/\/\d+/g, '/:id'),
        status: 'success',
        duration: `${duration.toFixed(2)}ms`
      });

      if (duration > 2000) {
        observabilityService.trackApiError(
          req.url,
          200,
          `Slow API response: ${duration.toFixed(2)}ms`
        );
      }
    }),
    catchError(error => {
      const duration = performance.now() - startTime;
      
      observabilityService.trackApiError(
        req.url.replace(/\/\d+/g, '/:id'),
        error.status || 0,
        error.message || 'Unknown error'
      );

      return throwError(() => error);
    })
  );
};