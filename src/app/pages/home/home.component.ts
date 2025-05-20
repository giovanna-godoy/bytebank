import { Component, OnInit } from '@angular/core';
import { WelcomeCardComponent } from '../../shared/components/welcome-card/welcome-card.component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { StatementItemsComponent } from '../../shared/components/statement-items/statement-items.component';
import { StatementItem } from '../../shared/models/statement.model';

@Component({
  selector: 'app-home',
  imports: [SideBarComponent, WelcomeCardComponent, StatementItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public userName: string = "Giovanna";
  public amount: number = 2500;
  public statementItems: StatementItem[] = [];

  ngOnInit() {
    this.searchBankStatement();
  }

  searchBankStatement() {
    this.statementItems = [
      { type: 'Depósito', value: 150, date: '2025-05-18' },
      { type: 'Depósito', value: 100, date: '2025-05-21' },
      { type: 'Depósito', value: 50, date: '2025-05-21'},
      { type: 'Transferência', value: 500, date: '2025-05-21' },
    ]
  }
}
