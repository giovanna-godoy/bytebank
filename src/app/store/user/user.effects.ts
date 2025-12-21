import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { IUserRepository } from '../../domain/repositories/user.repository';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userRepository = inject(IUserRepository);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.userRepository.getUser().pipe(
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
        this.userRepository.getAmount().pipe(
          map((response: any) => UserActions.loadAmountSuccess({ amount: response.value })),
          catchError((error: { message: any; }) => of(UserActions.loadAmountFailure({ error: error.message })))
        )
      )
    )
  );
}