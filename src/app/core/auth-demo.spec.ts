import { authReducer, initialState } from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';

describe('Auth Reducer - Demo', () => {
  it('should return initial state', () => {
    const action = { type: 'Unknown' };
    const state = authReducer(initialState, action as any);
    expect(state).toBe(initialState);
  });

  it('should handle login action', () => {
    const action = AuthActions.login({ email: 'test@test.com', password: 'pass' });
    const state = authReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle login success', () => {
    const action = AuthActions.loginSuccess({ 
      token: 'test-token', 
      refreshToken: 'refresh-token' 
    });
    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('test-token');
    expect(state.loading).toBe(false);
  });
});