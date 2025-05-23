import { Component, inject, OnInit } from '@angular/core';
import { WelcomeCardComponent } from '../../shared/components/welcome-card/welcome-card.component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { StatementItemsComponent } from '../../shared/components/statement-items/statement-items.component';
import { StatementItem } from '../../shared/models/statement.model';
import { ApiService } from '../../services/api.service';
import { ManageItemComponent } from '../../shared/components/manage-item/manage-item.component';

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
    // this.apiService.updateTransaction(item.id, item).subscribe({
    //   next: (response: any) => alert('Alterado com sucesso!'),
    //   error: (err: any) => alert('Erro ao alterar'),
    // });

    this.searchBankStatement();
  }

  deleteItem(itemId: number) {
    this.apiService.deleteTransaction(itemId).subscribe({
      next: (response: any) => alert('Deletado com sucesso!'),
      error: (err: any) => alert('Erro ao deletar'),
    });

    this.searchBankStatement();
  }
}
