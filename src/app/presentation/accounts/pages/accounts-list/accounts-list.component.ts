import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {
  accounts = [
    { id: 1, name: 'Conta Corrente', balance: 5000 },
    { id: 2, name: 'Conta Poupança', balance: 10000 }
  ];
}
