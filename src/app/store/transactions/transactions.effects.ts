import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as TransactionActions from './transactions.actions';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      switchMap(() =>
        this.apiService.getStatement().pipe(
          map(transactions => TransactionActions.loadTransactionsSuccess({ transactions })),
          catchError(error => of(TransactionActions.loadTransactionsFailure({ error: error.message })))
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.createTransaction),
      switchMap(({ transaction }) =>
        this.apiService.createTransaction(transaction).pipe(
          map(newTransaction => TransactionActions.createTransactionSuccess({ transaction: newTransaction })),
          catchError(error => of(TransactionActions.createTransactionFailure({ error: error.message })))
        )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      switchMap(({ id, transaction }) =>
        this.apiService.updateTransaction(id, transaction).pipe(
          map(updatedTransaction => TransactionActions.updateTransactionSuccess({ transaction: updatedTransaction })),
          catchError(error => of(TransactionActions.updateTransactionFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      switchMap(({ id }) =>
        this.apiService.deleteTransaction(id).pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ id })),
          catchError(error => of(TransactionActions.deleteTransactionFailure({ error: error.message })))
        )
      )
    )
  );

  loadMoreTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadMoreTransactions),
      switchMap(() =>
        this.apiService.getStatement().pipe(
          map(transactions => {
            const hasMore = transactions.length >= 10;
            return TransactionActions.loadMoreTransactionsSuccess({ transactions, hasMore });
          }),
          catchError(error => of(TransactionActions.loadTransactionsFailure({ error: error.message })))
        )
      )
    )
  );
}