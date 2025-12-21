import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WelcomeCardComponent } from '../../../shared/components/welcome-card/welcome-card.component';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { StatementItemsComponent } from '../../../shared/components/statement-items/statement-items.component';
import { TransactionFiltersComponent } from '../../../shared/components/transaction-filters/transaction-filters.component';
import { ManageItemComponent } from '../../../shared/components/manage-item/manage-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalBaseComponent } from '../../../shared/components/modal-base/modal-base.component';
import { 
  AppState, 
  loadTransactions, 
  loadAmount, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction,
  loadMoreTransactions,
  selectFilteredTransactions,
  selectUserAmount,
  selectUserFirstName,
  selectTransactionLoading,
  selectHasMore
} from '../../../../store';
import { Transaction } from '../../../../domain/entities/transaction.entity';
import { GetTransactionByIdUseCase } from '../../../../domain/usecases/transactions/get-transaction-by-id.usecase';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideBarComponent, WelcomeCardComponent, StatementItemsComponent, ManageItemComponent, TransactionFiltersComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public userName$: Observable<string>;
  public amount$: Observable<number>;
  public statementItems$: Observable<Transaction[]>;
  public loading$: Observable<boolean>;
  public hasMore$: Observable<boolean>;

  private store = inject(Store<AppState>);
  private dialog = inject(MatDialog);
  private getTransactionByIdUseCase = inject(GetTransactionByIdUseCase);

  constructor() {
    this.userName$ = this.store.select(selectUserFirstName);
    this.amount$ = this.store.select(selectUserAmount);
    this.statementItems$ = this.store.select(selectFilteredTransactions);
    this.loading$ = this.store.select(selectTransactionLoading);
    this.hasMore$ = this.store.select(selectHasMore);
  }

  ngOnInit() {
    this.store.dispatch(loadTransactions());
    this.store.dispatch(loadAmount());
  }

  createItem(item: Omit<Transaction, "id">) {
    this.store.dispatch(createTransaction({ transaction: item }));
  }

  editItem(item: Transaction) {
    this.store.dispatch(updateTransaction({ id: item.id, transaction: item }));
  }

  openModal(itemId: number) {
    this.getTransactionByIdUseCase.execute(itemId).subscribe({
      next: (transaction: Transaction) => {
        const dialogRef = this.dialog.open(ModalBaseComponent, {
          width: '65vw',
          data: { ...transaction }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.editItem(result);
          }
        });
      },
      error: () => alert('Erro ao consultar transação'),
    });
  }

  deleteItem(itemId: number) {
    this.store.dispatch(deleteTransaction({ id: itemId }));
  }

  loadMoreTransactions() {
    this.store.dispatch(loadMoreTransactions());
  }
}
