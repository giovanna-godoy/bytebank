import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from '../fields/text-field/text-field.component';
import { SelectFieldComponent } from '../fields/select-field/select-field.component';
import { DateFieldComponent } from '../fields/date-field/date-field.component';
import { MatButtonModule } from '@angular/material/button';
import { StatementItem, TransactionType } from '../../models/statement.model';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-item',
  imports: [TextFieldComponent, SelectFieldComponent, DateFieldComponent, CommonModule, MatButtonModule, FormsModule],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})
export class ManageItemComponent implements OnInit {
  public typeOptions: any[] = [];
  public itemId: number = 0;
  public value: number | string = 0;
  public date: string = '';
  public selectedType: TransactionType | any = null;

  @Input() selectedItem: StatementItem | null = null;
  @Input() isEdit: boolean = false;
  @Output() itemSubmited = new EventEmitter<Omit<StatementItem, "id">>();
  @Output() itemEdited = new EventEmitter<StatementItem>();

  ngOnInit() {
    this.setOptions();
    this.setValues();
  }

  setOptions() {
    this.typeOptions = [
      { name: 'Depósito', type: 'DEPOSITO' },
      { name: 'Transferência', type: 'TRANSFERENCIA' }
    ]
  }

  setValues() {
    if (this.selectedItem) {
      this.itemId = this.selectedItem?.id;
      this.selectedType = this.selectedItem?.type;
      this.value = this.selectedItem?.value;
      this.date = this.selectedItem?.date;
    }
  }

  enableButton(): boolean {
    return !!this.selectedType && !!this.date && !!this.value;
  }

  onSubmit() {
    if (this.selectedType) {
      const payload = {
        "type": this.selectedType,
        "value": typeof this.value === 'string' ? parseFloat(this.value) : this.value,
        "date": this.date
      }

      this.isEdit ? this.itemEdited.emit({ id: this.itemId, ...payload }) : this.itemSubmited.emit(payload);
    }
  }
}
