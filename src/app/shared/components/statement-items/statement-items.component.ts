import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatementItem, TransactionType } from '../../models/statement.model';
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
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  formatDate(date: string):string {
    return formatDate(date, 'DD/MM/YYYY');
  }

  getValue(item: StatementItem) {
    const isTransfer: boolean = item?.type?.toUpperCase() === TransactionType.TRANSFERENCIA;

    return `${isTransfer ? '-R$' : 'R$'} ${item.value}`
  }

  getType(type: string) {
    console.log(type, TransactionType.TRANSFERENCIA)
    const isTransfer: boolean = type?.toUpperCase() === TransactionType.TRANSFERENCIA;

    return isTransfer ? 'Transferência' : 'Depósito';
  }

  getMonth(date: string) {
    return formatDate(date, 'MMMM');
  }

  editItem(itemId: number) {
    this.edit.emit(itemId);
  }

  deleteItem(itemId: number) {
    this.delete.emit(itemId);
  }
}
