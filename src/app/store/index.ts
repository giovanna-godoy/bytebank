import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { userReducer } from './user/user.reducer';
import { transactionsReducer } from './transactions/transactions.reducer';
import { uiReducer } from './ui/ui.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  transactions: transactionsReducer,
  ui: uiReducer
};

export * from './app.state';
export * from './user/user.actions';
export * from './user/user.selectors';
export * from './transactions/transactions.actions';
export * from './transactions/transactions.selectors';
export * from './ui/ui.actions';
export * from './ui/ui.selectors';