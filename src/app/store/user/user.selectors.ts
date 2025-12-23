import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../app.state';
import { selectAllTransactions } from '../transactions/transactions.selectors';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser
);

export const selectUserAmount = createSelector(
  selectUserState,
  selectAllTransactions,
  (state: UserState, transactions) => {
    // Saldo inicial da API (antes de qualquer transação)
    const INITIAL_BALANCE = 2500;
    
    // Calcula o saldo baseado nas transações
    const balance = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'DEPOSITO') {
        return acc + transaction.value;
      } else if (transaction.type === 'TRANSFERENCIA') {
        return acc - transaction.value;
      }
      return acc;
    }, INITIAL_BALANCE);
    
    return balance;
  }
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserFullName = createSelector(
  selectCurrentUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

export const selectUserFirstName = createSelector(
  selectCurrentUser,
  (user) => user ? `${user.firstName}` : ''
);