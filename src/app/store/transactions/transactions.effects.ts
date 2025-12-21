import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import * as TransactionActions from './transactions.actions';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private transactionRepository = inject(ITransactionRepository);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      switchMap(() =>
        this.transactionRepository.getAll().pipe(
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
        this.transactionRepository.create(transaction).pipe(
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
        this.transactionRepository.update(id, transaction).pipe(
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
        this.transactionRepository.delete(id).pipe(
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
        this.transactionRepository.getAll().pipe(
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