import { createAction, props } from '@ngrx/store';
import { StatementItem } from '../../shared/models/statement.model';
import { TransactionFilters } from '../app.state';

export const loadTransactions = createAction('[Transactions] Load Transactions');
export const loadTransactionsSuccess = createAction('[Transactions] Load Transactions Success', props<{ transactions: StatementItem[] }>());
export const loadTransactionsFailure = createAction('[Transactions] Load Transactions Failure', props<{ error: string }>());

export const createTransaction = createAction('[Transactions] Create Transaction', props<{ transaction: Omit<StatementItem, 'id'> }>());
export const createTransactionSuccess = createAction('[Transactions] Create Transaction Success', props<{ transaction: StatementItem }>());
export const createTransactionFailure = createAction('[Transactions] Create Transaction Failure', props<{ error: string }>());

export const updateTransaction = createAction('[Transactions] Update Transaction', props<{ id: number; transaction: Partial<StatementItem> }>());
export const updateTransactionSuccess = createAction('[Transactions] Update Transaction Success', props<{ transaction: StatementItem }>());
export const updateTransactionFailure = createAction('[Transactions] Update Transaction Failure', props<{ error: string }>());

export const deleteTransaction = createAction('[Transactions] Delete Transaction', props<{ id: number }>());
export const deleteTransactionSuccess = createAction('[Transactions] Delete Transaction Success', props<{ id: number }>());
export const deleteTransactionFailure = createAction('[Transactions] Delete Transaction Failure', props<{ error: string }>());

export const setFilters = createAction('[Transactions] Set Filters', props<{ filters: Partial<TransactionFilters> }>());
export const clearFilters = createAction('[Transactions] Clear Filters');

export const loadMoreTransactions = createAction('[Transactions] Load More Transactions');
export const loadMoreTransactionsSuccess = createAction('[Transactions] Load More Transactions Success', props<{ transactions: StatementItem[]; hasMore: boolean }>());
export const resetPagination = createAction('[Transactions] Reset Pagination');