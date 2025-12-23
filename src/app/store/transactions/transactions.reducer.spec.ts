import { transactionsReducer, initialState } from './transactions.reducer';
import * as TransactionsActions from './transactions.actions';

describe('TransactionsReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = transactionsReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadTransactions', () => {
    const action = TransactionsActions.loadTransactions();
    const state = transactionsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loadTransactionsSuccess', () => {
    const transactions = [
      { id: 1, value: 100, type: 'DEPOSITO', date: '2024-01-01' }
    ];
    const action = TransactionsActions.loadTransactionsSuccess({ transactions });
    const state = transactionsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(transactions);
    expect(state.error).toBe(null);
  });

  it('should handle loadTransactionsFailure', () => {
    const error = 'Load failed';
    const action = TransactionsActions.loadTransactionsFailure({ error });
    const state = transactionsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});