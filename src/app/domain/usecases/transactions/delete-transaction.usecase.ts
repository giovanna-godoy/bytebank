import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactionRepository } from '../../repositories/transaction.repository';

@Injectable({ providedIn: 'root' })
export class DeleteTransactionUseCase {
  private transactionRepository = inject(ITransactionRepository);

  execute(id: number): Observable<void> {
    return this.transactionRepository.delete(id);
  }
}
