import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionHttpRepository implements ITransactionRepository {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/statement`);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/statement/${id}`);
  }

  create(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/statement`, transaction);
  }

  update(id: number, transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.baseUrl}/statement/${id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/statement/${id}`);
  }
}
