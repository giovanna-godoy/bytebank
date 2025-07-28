import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TransactionState } from '../app.state';
import { StatementItem, TransactionType } from '../../shared/models/statement.model';

export const selectTransactionState = createFeatureSelector<TransactionState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.items
);

export const selectTransactionFilters = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.filters
);

export const selectTransactionLoading = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.loading
);

export const selectTransactionError = createSelector(
  selectTransactionState,
  (state: TransactionState) => state.error
);

export const selectFilteredTransactions = createSelector(
  selectAllTransactions,
  selectTransactionFilters,
  (transactions, filters) => {
    return transactions.filter(transaction => {
      const matchesSearch = !filters.searchTerm || 
        transaction.type.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        transaction.value.toString().includes(filters.searchTerm);
      
      const matchesType = !filters.type || transaction.type === filters.type;
      
      const matchesDateFrom = !filters.dateFrom || transaction.date >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || transaction.date <= filters.dateTo;
      
      return matchesSearch && matchesType && matchesDateFrom && matchesDateTo;
    });
  }
);

export const selectTransactionsByType = createSelector(
  selectAllTransactions,
  (transactions) => {
    const deposits = transactions.filter(t => t.type === TransactionType.DEPOSITO);
    const transfers = transactions.filter(t => t.type === TransactionType.TRANSFERENCIA);
    
    return {
      deposits,
      transfers,
      totalDeposits: deposits.reduce((sum, t) => sum + t.value, 0),
      totalTransfers: transfers.reduce((sum, t) => sum + t.value, 0)
    };
  }
);