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
  public amount: number = 2500;
  public statementItems: StatementItem[] = [];

  private apiService = inject(ApiService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.searchBankStatement();
  }

  searchBankStatement() {
    this.apiService.getStatement().subscribe({
      next: (data: StatementItem[]) => (this.statementItems = data),
      error: (err: any) => alert('Erro ao carregar itens'),
    });
  }

  
  editItem(itemId: number) {
    let transaction: StatementItem;
    this.apiService.getTransactionById(itemId).subscribe({
       next: (response: any) => transaction =response,
       error: (err: any) => alert('Erro ao consultar transação'),
     });

    this.dialog.open(ManageItemComponent, {
      width: '65vw',
      data: {}
    });
    

    this.searchBankStatement();
  }

  deleteItem(itemId: number) {
    this.apiService.deleteTransaction(itemId).subscribe({
      next: () => alert('Deletado com sucesso!'),
      error: () => alert('Erro ao deletar'),
    });

    this.searchBankStatement();
  }
}
