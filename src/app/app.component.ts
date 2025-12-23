import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderComponent } from './presentation/shared/components/header/header.component';
import { AppState, loadUser, selectUserFullName, checkAuth, selectIsAuthenticated } from './store';
import { IndexedDBService } from './core/services/indexed-db.service';

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
  private indexedDB = inject(IndexedDBService);

  constructor() {
    this.fullName$ = this.store.select(selectUserFullName);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    this.indexedDB.initialize().then(() => {
      console.log('✅ IndexedDB inicializado');
    }).catch(err => {
      console.error('❌ Erro ao inicializar IndexedDB:', err);
    });
    
    this.store.dispatch(checkAuth());
    this.store.dispatch(loadUser());
  }
}
