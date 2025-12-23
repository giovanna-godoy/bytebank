import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../entities/transaction.entity';
import { ITransactionRepository } from '../../repositories/transaction.repository';

@Injectable({ providedIn: 'root' })
export class CreateTransactionUseCase {
  private transactionRepository = inject(ITransactionRepository);

  execute(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.transactionRepository.create(transaction);
  }
}
