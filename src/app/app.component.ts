import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../app/shared/components/header/header.component';
import { AppState, loadUser, selectUserFullName } from './store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'bytebank';
  public fullName$: Observable<string>;

  private store = inject(Store<AppState>);

  constructor() {
    this.fullName$ = this.store.select(selectUserFullName);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }
}
