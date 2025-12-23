import { Component, EventEmitter, inject, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StatementItem, TransactionType, AttachmentItem } from '../../models/statement.model';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-manage-item',
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
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
  public existingAttachments: AttachmentItem[] = [];
  public attachmentsBase64: AttachmentItem[] = [];

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
    
    // Força atualização de erros quando campos mudam
    this.transactionForm.valueChanges.subscribe(() => {
      // Trigger change detection
    });
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

      const attachments = (this.selectedItem as any)?.attachments || [];
      this.existingAttachments = Array.isArray(attachments) && attachments.length > 0 && typeof attachments[0] === 'object' 
        ? attachments 
        : attachments.map((name: string) => ({ name }));

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
      this.convertFilesToBase64(Array.from(files));
    }
  }

  private convertFilesToBase64(files: File[]): void {
    this.attachmentsBase64 = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.attachmentsBase64.push({
          name: file.name,
          base64: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    });
  }

  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
  }

  removeExistingAttachment(index: number): void {
    this.existingAttachments.splice(index, 1);
  }

  downloadAttachment(attachment: AttachmentItem): void {
    if (attachment.base64) {
      const link = document.createElement('a');
      link.href = attachment.base64;
      link.download = attachment.name;
      link.click();
    }
  }

  enableButton(): boolean {
    return this.transactionForm.valid;
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      // Marca todos os campos como touched para mostrar erros
      this.transactionForm.markAllAsTouched();
      return;
    }

    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      const allAttachments = [
        ...this.existingAttachments,
        ...this.attachmentsBase64
      ];

      const payload = {
        type: formValue.type,
        value: typeof formValue.value === 'string' ? parseFloat(formValue.value) : formValue.value,
        date: formValue.date,
        category: formValue.category,
        attachments: allAttachments
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

  // Marca campos como touched para mostrar erros
  markFieldAsTouched(field: string): void {
    this.transactionForm.get(field)?.markAsTouched();
  }
}
