import { createReducer, on } from '@ngrx/store';
import { UserState } from '../app.state';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  currentUser: null,
  amount: 0,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
    error: null
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.loadAmount, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadAmountSuccess, (state, { amount }) => ({
    ...state,
    amount,
    loading: false,
    error: null
  })),
  on(UserActions.loadAmountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);