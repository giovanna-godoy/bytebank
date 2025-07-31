import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'bytebank_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, password: string): boolean {
    // Simulação de autenticação
    if (email === 'user@bytebank.com' && password === '123456') {
      const token = this.generateToken();
      localStorage.setItem(this.tokenKey, token);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private generateToken(): string {
    return btoa(`${Date.now()}-${Math.random()}`);
  }
}