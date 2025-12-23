import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserHttpRepository implements IUserRepository {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`);
  }

  getAmount(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/amount`);
  }
}
