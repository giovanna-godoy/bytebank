import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatementItem, TransactionType } from '../../models/statement.model';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../core/utils/date.utils';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

@Component({
  selector: 'app-statement-items',
  imports: [CommonModule, InfiniteScrollDirective],
  templateUrl: './statement-items.component.html',
  styleUrl: './statement-items.component.scss'
})
export class StatementItemsComponent {
  @Input() statementItems: StatementItem[] = [];
  @Input() loading: boolean = false;
  @Input() hasMore: boolean = true;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() loadMore = new EventEmitter<void>();

  formatDate(date: string):string {
    return formatDate(date, 'DD/MM/YYYY');
  }

  getValue(item: StatementItem) {
    const isTransfer: boolean = item?.type?.toUpperCase() === TransactionType.TRANSFERENCIA;

    return `${isTransfer ? '-R$' : 'R$'} ${item.value}`
  }

  getType(type: string) {
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

  trackByItemId(index: number, item: StatementItem): number {
    return item.id;
  }

  getItemAriaLabel(item: StatementItem): string {
    const type = this.getType(item.type);
    const value = this.getValue(item);
    const date = this.formatDate(item.date);
    return `${type} de ${value} realizada em ${date}`;
  }

  onLoadMore(): void {
    if (!this.loading && this.hasMore) {
      this.loadMore.emit();
    }
  }
}
