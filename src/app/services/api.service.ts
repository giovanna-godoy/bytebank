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

  private isLocal: boolean = window.location.hostname === 'localhost';
  private readonly baseUrl = this.isLocal ? 'http://localhost:3000' : 'https://bytebank-api-gio.vercel.app';

  getStatement(): Observable<StatementItem[]> {
    return this.http.get<StatementItem[]>(`${this.baseUrl}/statement`);
  }

  getTransactionById(id: number): Observable<StatementItem> {
    return this.http.get<StatementItem>(`${this.baseUrl}/statement/${id}`);
  }

  createTransaction(item: Omit<StatementItem, 'id'>): Observable<StatementItem> {
    return this.http.post<StatementItem>(`${this.baseUrl}/statement`, item);
  }

  updateTransaction(id: number, item: Partial<StatementItem>): Observable<StatementItem> {
    return this.http.patch<StatementItem>(`${this.baseUrl}/statement/${id}`, item);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/statement/${id}`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`);
  }

  getAmount(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/amount`);
  }
}
