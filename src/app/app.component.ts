import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../app/shared/components/header/header.component';
import { AppState, loadUser, selectUserFullName } from './store';
import { AuthService } from './services/auth.service';

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
  private authService = inject(AuthService);

  constructor() {
    this.fullName$ = this.store.select(selectUserFullName);
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }
}
