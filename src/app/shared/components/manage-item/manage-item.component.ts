import { Component, EventEmitter, inject, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextFieldComponent } from '../fields/text-field/text-field.component';
import { SelectFieldComponent } from '../fields/select-field/select-field.component';
import { DateFieldComponent } from '../fields/date-field/date-field.component';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { StatementItem, TransactionType } from '../../models/statement.model';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-manage-item',
  imports: [TextFieldComponent, SelectFieldComponent, DateFieldComponent, CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})
export class ManageItemComponent implements OnInit, OnChanges {
  public typeOptions: any[] = [];
  public itemId: number = 0;
  public value: number | string = 0;
  public date: string = '';
  public selectedType: TransactionType | any = null;
  public category: string = '';

  public attachments: File[] = [];
  public existingAttachments: string[] = [];

  public transactionForm: FormGroup;
  public categories: string[] = ['Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Moradia', 'Vestuário', 'Outros'];
  public filteredCategories: Observable<string[]>;

  private fb = inject(FormBuilder);

  @Input() selectedItem: StatementItem | null = null;
  @Input() isEdit: boolean = false;
  @Output() itemSubmited = new EventEmitter<any>();
  @Output() itemEdited = new EventEmitter<any>();

  constructor() {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.filteredCategories = this.transactionForm.get('category')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
    );
  }

  ngOnInit() {
    this.setOptions();
    this.setValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem'] && changes['selectedItem'].currentValue) {
      this.setValues();
    }
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
      this.category = (this.selectedItem as any)?.category || 'Outros';

      this.transactionForm.patchValue({
        type: this.selectedItem?.type,
        value: this.selectedItem?.value,
        date: this.selectedItem?.date,
        category: (this.selectedItem as any)?.category || 'Outros'
      });

      this.existingAttachments = (this.selectedItem as any)?.attachments || [];

      this.transactionForm.markAllAsTouched();
    }
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category =>
      category.toLowerCase().includes(filterValue)
    );
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      this.attachments = Array.from(files);
    }
  }

  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
  }

  removeExistingAttachment(index: number): void {
    this.existingAttachments.splice(index, 1);
  }

  enableButton(): boolean {
    return this.transactionForm.valid;
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      const payload = {
        type: formValue.type,
        value: typeof formValue.value === 'string' ? parseFloat(formValue.value) : formValue.value,
        date: formValue.date,
        category: formValue.category,
        attachments: this.attachments.map(file => file.name)
      };

      this.isEdit ? this.itemEdited.emit({ id: this.itemId, ...payload }) : this.itemSubmited.emit(payload);
    }
  }

  getErrorMessage(field: string): string {
    const control = this.transactionForm.get(field);
    if (control?.hasError('required')) {
      return `Campo obrigatório`;
    }
    if (control?.hasError('min')) {
      return 'Valor deve ser maior que zero';
    }

    return '';
  }
}
