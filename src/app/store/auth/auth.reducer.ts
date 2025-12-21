import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { token, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    token,
    refreshToken,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    loading: false,
    error
  })),
  on(AuthActions.logout, AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.refreshTokenSuccess, (state, { token, refreshToken }) => ({
    ...state,
    token,
    refreshToken
  })),
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
