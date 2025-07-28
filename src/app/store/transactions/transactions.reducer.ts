import { createReducer, on } from '@ngrx/store';
import { TransactionState } from '../app.state';
import * as TransactionActions from './transactions.actions';

export const initialState: TransactionState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    type: null,
    dateFrom: null,
    dateTo: null
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    hasMore: true
  }
};

export const transactionsReducer = createReducer(
  initialState,
  on(TransactionActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TransactionActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    items: transactions,
    loading: false,
    error: null
  })),
  on(TransactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TransactionActions.createTransactionSuccess, (state, { transaction }) => ({
    ...state,
    items: [...state.items, transaction],
    loading: false,
    error: null
  })),
  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) => ({
    ...state,
    items: state.items.map(item => item.id === transaction.id ? transaction : item),
    loading: false,
    error: null
  })),
  on(TransactionActions.deleteTransactionSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id),
    loading: false,
    error: null
  })),
  on(TransactionActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),
  on(TransactionActions.clearFilters, (state) => ({
    ...state,
    filters: initialState.filters
  })),
  on(TransactionActions.loadMoreTransactions, (state) => ({
    ...state,
    loading: true
  })),
  on(TransactionActions.loadMoreTransactionsSuccess, (state, { transactions, hasMore }) => ({
    ...state,
    items: [...state.items, ...transactions],
    loading: false,
    pagination: {
      ...state.pagination,
      currentPage: state.pagination.currentPage + 1,
      hasMore
    }
  })),
  on(TransactionActions.resetPagination, (state) => ({
    ...state,
    items: [],
    pagination: initialState.pagination
  }))
);