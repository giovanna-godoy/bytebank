import { Observable } from 'rxjs';
import { Transaction } from '../entities/transaction.entity';

export abstract class ITransactionRepository {
  abstract getAll(): Observable<Transaction[]>;
  abstract getById(id: number): Observable<Transaction>;
  abstract create(transaction: Omit<Transaction, 'id'>): Observable<Transaction>;
  abstract update(id: number, transaction: Partial<Transaction>): Observable<Transaction>;
  abstract delete(id: number): Observable<void>;
}
