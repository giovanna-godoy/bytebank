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
  templateUrl: './transaction-filters.component.html',
  styleUrl: './transaction-filters.component.scss'
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