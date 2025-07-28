import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());

export const loadAmount = createAction('[User] Load Amount');
export const loadAmountSuccess = createAction('[User] Load Amount Success', props<{ amount: number }>());
export const loadAmountFailure = createAction('[User] Load Amount Failure', props<{ error: string }>());