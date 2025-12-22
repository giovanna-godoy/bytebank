import { userReducer, initialState } from './user.reducer';
import * as UserActions from './user.actions';

describe('UserReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = userReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadUserProfile', () => {
    const action = UserActions.loadUserProfile();
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loadUserProfileSuccess', () => {
    const user = { id: '1', name: 'Test User', email: 'test@test.com' };
    const action = UserActions.loadUserProfileSuccess({ user });
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.error).toBe(null);
  });

  it('should handle updateUserProfile', () => {
    const updates = { name: 'Updated Name' };
    const action = UserActions.updateUserProfile({ updates });
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
  });
});