import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderComponent } from './presentation/shared/components/header/header.component';
import { AppState, loadUser, selectUserFullName } from './store';
import { IAuthRepository } from './domain/repositories/auth.repository';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'bytebank';
  public fullName$: Observable<string>;
  public isAuthenticated$: Observable<boolean>;

  private store = inject(Store<AppState>);
  private authRepository = inject(IAuthRepository);

  constructor() {
    this.fullName$ = this.store.select(selectUserFullName);
    this.isAuthenticated$ = this.authRepository.isAuthenticated$;
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }
}
