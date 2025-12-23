import { userReducer, initialState } from './user.reducer';
import * as UserActions from './user.actions';

describe('UserReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = userReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadUser', () => {
    const action = UserActions.loadUser();
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loadUserSuccess', () => {
    const user = { id: 1, firstName: 'Test', lastName: 'User' };
    const action = UserActions.loadUserSuccess({ user });
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.currentUser).toEqual(user);
    expect(state.error).toBe(null);
  });

  it('should handle loadAmount', () => {
    const action = UserActions.loadAmount();
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
  });
});