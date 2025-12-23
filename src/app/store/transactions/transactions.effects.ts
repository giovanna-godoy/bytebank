import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import * as TransactionActions from './transactions.actions';
import { loadAmount } from '../user/user.actions';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private transactionRepository = inject(ITransactionRepository);
  private store = inject(Store);

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

  createTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.createTransactionSuccess),
      tap(() => {
        // Recarrega o saldo após criar transação
        this.store.dispatch(loadAmount());
      })
    ),
    { dispatch: false }
  );

  updateTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransactionSuccess),
      tap(() => {
        // Recarrega o saldo após atualizar transação
        this.store.dispatch(loadAmount());
      })
    ),
    { dispatch: false }
  );

  deleteTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransactionSuccess),
      tap(() => {
        // Recarrega o saldo após deletar transação
        this.store.dispatch(loadAmount());
      })
    ),
    { dispatch: false }
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