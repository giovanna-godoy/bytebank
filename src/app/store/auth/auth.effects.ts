import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authRepository = inject(IAuthRepository);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) => {
        const success = this.authRepository.login(email, password);
        if (success) {
          const token = this.authRepository.getToken() || '';
          const refreshToken = this.generateRefreshToken();
          this.storeTokensSecurely(token, refreshToken);
          return of(AuthActions.loginSuccess({ token, refreshToken }));
        }
        return of(AuthActions.loginFailure({ error: 'Credenciais inválidas' }));
      }),
      catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authRepository.logout();
        this.clearTokens();
        this.router.navigate(['/auth/login']);
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() => {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
          const newToken = this.generateNewToken();
          const newRefreshToken = this.generateRefreshToken();
          this.storeTokensSecurely(newToken, newRefreshToken);
          return of(AuthActions.refreshTokenSuccess({ token: newToken, refreshToken: newRefreshToken }));
        }
        return of(AuthActions.refreshTokenFailure({ error: 'No refresh token' }));
      }),
      catchError((error) => of(AuthActions.refreshTokenFailure({ error: error.message })))
    )
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      map(() => {
        const token = this.getStoredToken();
        const refreshToken = this.getRefreshToken();
        if (token && refreshToken) {
          return AuthActions.loginSuccess({ token, refreshToken });
        }
        return AuthActions.logoutSuccess();
      })
    )
  );

  private storeTokensSecurely(token: string, refreshToken: string): void {
    const encrypted = btoa(JSON.stringify({ token, refreshToken, timestamp: Date.now() }));
    sessionStorage.setItem('auth_data', encrypted);
  }

  private getStoredToken(): string | null {
    const encrypted = sessionStorage.getItem('auth_data');
    if (encrypted) {
      try {
        const data = JSON.parse(atob(encrypted));
        return data.token;
      } catch {
        return null;
      }
    }
    return null;
  }

  private getRefreshToken(): string | null {
    const encrypted = sessionStorage.getItem('auth_data');
    if (encrypted) {
      try {
        const data = JSON.parse(atob(encrypted));
        return data.refreshToken;
      } catch {
        return null;
      }
    }
    return null;
  }

  private clearTokens(): void {
    sessionStorage.removeItem('auth_data');
  }

  private generateRefreshToken(): string {
    return btoa(`refresh-${Date.now()}-${Math.random()}`);
  }

  private generateNewToken(): string {
    return btoa(`token-${Date.now()}-${Math.random()}`);
  }
}
