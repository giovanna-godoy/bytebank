import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/shared/components/header/header.component';
import { ApiService } from './services/api.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bytebank';
  fullName: string = '';

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.apiService.getUser().subscribe({
      next: (data: User) => (this.fullName = data?.firstName + ' ' + data?.lastName),
      error: (err: any) => console.error('Erro ao carregar usuário', err),
    });
  }
}
