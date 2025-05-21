import { Component, Input, Output } from '@angular/core';
import { StatementItem, TransactionType } from '../../models/statement.model';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../core/utils/date.utils';
import { EventEmitter } from 'stream';

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

  getValue(item: StatementItem) {
    const isTransfer: boolean = item?.type?.toUpperCase() === TransactionType.TRANSFERENCIA;

    return `${isTransfer ? '-R$' : 'R$'} ${item.value}`
  }

  getType(type: string) {
    const isTransfer: boolean = type?.toUpperCase() === TransactionType.TRANSFERENCIA;
    //TO DO: Ajustar
    return isTransfer ? 'Transferência' : 'Depósito';
  }

  getMonth(date: string) {
    return formatDate(date, 'MMMM');
  }

  // editItem(item: StatementItem) {
  //   this.apiService.updateTransaction(item.id, item).subscribe({
  //     next: (response: any) => alert('Alterado com sucesso!'),
  //     error: (err: any) => alert('Erro ao alterar'),
  //   });
  // }

  // deleteItem(itemId: number) {
  //   this.apiService.deleteTransaction(itemId).subscribe({
  //     next: (response: any) => alert('Deletado com sucesso!'),
  //     error: (err: any) => alert('Erro ao deletar'),
  //   });
  // }

  deleteItem() {
    console.log('excluir')
  }

  editItem() {
    console.log('editar')
  }
}
