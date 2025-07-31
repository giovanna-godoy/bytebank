import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.apiService.getUser().pipe(
          map((user: any) => UserActions.loadUserSuccess({ user })),
          catchError((error: { message: any; }) => of(UserActions.loadUserFailure({ error: error.message })))
        )
      )
    )
  );

  loadAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAmount),
      switchMap(() =>
        this.apiService.getAmount().pipe(
          map((response: any) => UserActions.loadAmountSuccess({ amount: response.value })),
          catchError((error: { message: any; }) => of(UserActions.loadAmountFailure({ error: error.message })))
        )
      )
    )
  );
}