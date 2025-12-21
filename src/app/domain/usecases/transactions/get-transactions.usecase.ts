import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../entities/transaction.entity';
import { ITransactionRepository } from '../../repositories/transaction.repository';

@Injectable({ providedIn: 'root' })
export class GetTransactionsUseCase {
  private transactionRepository = inject(ITransactionRepository);

  execute(): Observable<Transaction[]> {
    return this.transactionRepository.getAll();
  }
}
