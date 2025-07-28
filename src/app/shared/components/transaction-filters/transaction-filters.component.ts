import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppState, setFilters, clearFilters, selectTransactionFilters } from '../../../store';
import { TransactionFilters } from '../../../store/app.state';

@Component({
  selector: 'app-transaction-filters',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <div class="filters" role="search" aria-label="Filtros de transações">
      <mat-form-field appearance="outline">
        <mat-label>Buscar</mat-label>
        <input 
          matInput 
          [(ngModel)]="searchTerm" 
          (ngModelChange)="onFilterChange()"
          placeholder="Digite para buscar..."
          aria-label="Campo de busca">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Tipo</mat-label>
        <mat-select 
          [(value)]="selectedType" 
          (selectionChange)="onFilterChange()"
          aria-label="Filtrar por tipo de transação">
          <mat-option value="">Todos</mat-option>
          <mat-option value="DEPOSITO">Depósito</mat-option>
          <mat-option value="TRANSFERENCIA">Transferência</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Data inicial</mat-label>
        <input 
          matInput 
          type="date" 
          [(ngModel)]="dateFrom" 
          (ngModelChange)="onFilterChange()"
          aria-label="Data inicial do filtro">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Data final</mat-label>
        <input 
          matInput 
          type="date" 
          [(ngModel)]="dateTo" 
          (ngModelChange)="onFilterChange()"
          aria-label="Data final do filtro">
      </mat-form-field>

      <button 
        mat-raised-button 
        color="primary" 
        (click)="clearAllFilters()"
        aria-label="Limpar todos os filtros">
        Limpar Filtros
      </button>
    </div>
  `,
  styles: [`
    .filters {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      align-items: center;

      mat-form-field {
        min-width: 200px;
      }

      @media (max-width: 768px) {
        flex-direction: column;
        
        mat-form-field {
          width: 100%;
        }
      }
    }
  `]
})
export class TransactionFiltersComponent {
  public searchTerm: string = '';
  public selectedType: string = '';
  public dateFrom: string = '';
  public dateTo: string = '';

  private store = inject(Store<AppState>);
  private filters$: Observable<TransactionFilters>;

  constructor() {
    this.filters$ = this.store.select(selectTransactionFilters);
    this.filters$.subscribe(filters => {
      this.searchTerm = filters.searchTerm;
      this.selectedType = filters.type || '';
      this.dateFrom = filters.dateFrom || '';
      this.dateTo = filters.dateTo || '';
    });
  }

  onFilterChange(): void {
    this.store.dispatch(setFilters({
      filters: {
        searchTerm: this.searchTerm,
        type: this.selectedType || null,
        dateFrom: this.dateFrom || null,
        dateTo: this.dateTo || null
      }
    }));
  }

  clearAllFilters(): void {
    this.store.dispatch(clearFilters());
  }
}