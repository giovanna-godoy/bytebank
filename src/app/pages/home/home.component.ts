import { Component, inject, OnInit } from '@angular/core';
import { WelcomeCardComponent } from '../../shared/components/welcome-card/welcome-card.component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { StatementItemsComponent } from '../../shared/components/statement-items/statement-items.component';
import { StatementItem } from '../../shared/models/statement.model';
import { ApiService } from '../../services/api.service';
import { ManageItemComponent } from '../../shared/components/manage-item/manage-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [SideBarComponent, WelcomeCardComponent, StatementItemsComponent, ManageItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public userName: string = "Giovanna";
  public amount: number = 0;
  public statementItems: StatementItem[] = [];

  private apiService = inject(ApiService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.searchBankStatement();
    this.getAmount();
  }

  searchBankStatement() {
    this.apiService.getStatement().subscribe({
      next: (data: StatementItem[]) => (this.statementItems = data),
      error: () => alert('Erro ao carregar itens'),
    });
  }

  createItem(item: Omit<StatementItem, "id">) {
    this.apiService.createTransaction(item).subscribe({
      next: () => {
        alert('Sucesso ao criar transação');
        this.searchBankStatement();
      },
      error: () => alert('Erro ao consultar transação'),
    });
  }

  editItem(item: StatementItem) {
    this.apiService.updateTransaction(item.id, item).subscribe({
      next: () => {
        alert('Sucesso ao atualizar transação');
        this.searchBankStatement();
      },
      error: () => alert('Erro ao consultar transação'),
    });
  }

  openModal(itemId: number) {
    let transaction: StatementItem;
    this.apiService.getTransactionById(itemId).subscribe({
      next: (response: any) => {
        transaction = response;
        this.dialog.open(ManageItemComponent, {
          width: '65vw',
          data: {}
        });
      },
      error: () => alert('Erro ao consultar transação'),
    });
  }

  deleteItem(itemId: number) {
    this.apiService.deleteTransaction(itemId).subscribe({
      next: () => {
        alert('Deletado com sucesso');
        this.searchBankStatement();
      },
      error: () => alert('Erro ao deletar'),
    });
  }

  getAmount() {
    this.apiService.getAmount().subscribe({
      next: (response: any) => this.amount = response?.value,
      error: () => alert('Erro ao consultar saldo'),
    });
  }
}
