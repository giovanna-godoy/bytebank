import { authReducer, initialState, AuthState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('Auth Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = authReducer(initialState, action as any);

      expect(state).toBe(initialState);
    });
  });

  describe('login action', () => {
    it('should set loading to true', () => {
      const action = AuthActions.login({ email: 'test@test.com', password: 'pass' });
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('loginSuccess action', () => {
    it('should set authenticated state with tokens', () => {
      const action = AuthActions.loginSuccess({ 
        token: 'test-token', 
        refreshToken: 'refresh-token' 
      });
      const state = authReducer(initialState, action);

      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('test-token');
      expect(state.refreshToken).toBe('refresh-token');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('loginFailure action', () => {
    it('should set error and reset auth state', () => {
      const action = AuthActions.loginFailure({ error: 'Invalid credentials' });
      const state = authReducer(initialState, action);

      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });
  });

  describe('logout action', () => {
    it('should reset to initial state', () => {
      const authenticatedState: AuthState = {
        isAuthenticated: true,
        token: 'token',
        refreshToken: 'refresh',
        loading: false,
        error: null
      };
      const action = AuthActions.logout();
      const state = authReducer(authenticatedState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('refreshTokenSuccess action', () => {
    it('should update tokens', () => {
      const authenticatedState: AuthState = {
        isAuthenticated: true,
        token: 'old-token',
        refreshToken: 'old-refresh',
        loading: false,
        error: null
      };
      const action = AuthActions.refreshTokenSuccess({ 
        token: 'new-token', 
        refreshToken: 'new-refresh' 
      });
      const state = authReducer(authenticatedState, action);

      expect(state.token).toBe('new-token');
      expect(state.refreshToken).toBe('new-refresh');
      expect(state.isAuthenticated).toBe(true);
    });
  });
});
