import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../entities/transaction.entity';
import { ITransactionRepository } from '../../repositories/transaction.repository';

@Injectable({ providedIn: 'root' })
export class UpdateTransactionUseCase {
  private transactionRepository = inject(ITransactionRepository);

  execute(id: number, transaction: Partial<Transaction>): Observable<Transaction> {
    return this.transactionRepository.update(id, transaction);
  }
}
