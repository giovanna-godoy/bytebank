import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { GetTransactionsUseCase } from '../../../../domain/usecases/transactions/get-transactions.usecase';
import { Transaction } from '../../../../domain/entities/transaction.entity';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  private getTransactionsUseCase = inject(GetTransactionsUseCase);
  
  transactions: Transaction[] = [];

  ngOnInit(): void {
    this.getTransactionsUseCase.execute().subscribe({
      next: (transactions) => this.transactions = transactions,
      error: (err) => console.error('Error loading transactions', err)
    });
  }
}
