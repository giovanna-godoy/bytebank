import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private isLocal: boolean = window.location.hostname === 'localhost';
  private readonly baseUrl = this.isLocal ? 'http://localhost:3000' : 'https://bytebank-api-gio.vercel.app/';

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }
}