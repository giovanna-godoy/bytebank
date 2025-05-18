import { Component, Input } from '@angular/core';
import { StatementItem } from '../../models/statement.model';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../core/utils/date.utils';

@Component({
  selector: 'app-statement-items',
  imports: [CommonModule],
  templateUrl: './statement-items.component.html',
  styleUrl: './statement-items.component.scss'
})
export class StatementItemsComponent {
  @Input() statementItems: StatementItem[] = [];

  formatDate(date: string):string {
    return formatDate(date, 'DD/MM/YYYY');
  }

  getValue(item: StatementItem):string {
    const isTransfer: boolean = item?.type?.toLowerCase() === 'transferência';

    return `${isTransfer ? '-R$' : 'R$'} ${item.value}`
  }

  getMonth(date: string) {
    return formatDate(date, 'MMMM');
  }

  deleteItem() {
    console.log('excluir')
  }

  editItem() {
    console.log('editar')
  }
}
