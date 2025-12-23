import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { refreshToken } from '../../store/auth/auth.actions';
import { selectAuthToken } from '../../store/auth/auth.selectors';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return store.select(selectAuthToken).pipe(
          take(1),
          switchMap((token) => {
            if (token) {
              store.dispatch(refreshToken());
              return store.select(selectAuthToken).pipe(
                take(1),
                switchMap((newToken) => {
                  const clonedReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${newToken}` }
                  });
                  return next(clonedReq);
                })
              );
            }
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
