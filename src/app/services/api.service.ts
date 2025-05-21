import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatementItem } from '../shared/models/statement.model';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000';

  getStatement(): Observable<StatementItem[]> {
    return this.http.get<StatementItem[]>(`${this.baseUrl}/search-statement`);
  }

  getTransactionById(id: number): Observable<StatementItem> {
    return this.http.get<StatementItem>(`${this.baseUrl}/${id}`);
  }

  createTransaction(item: Omit<StatementItem, 'id'>): Observable<StatementItem> {
    return this.http.post<StatementItem>(this.baseUrl, item);
  }

  updateTransaction(id: number, item: Partial<StatementItem>): Observable<StatementItem> {
    return this.http.patch<StatementItem>(`${this.baseUrl}/${id}`, item);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`);
  }

  getAmount(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/amount`);
  }
}
