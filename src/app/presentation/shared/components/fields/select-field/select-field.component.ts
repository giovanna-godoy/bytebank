import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent {
  @Input() label: string = '';
  @Input() selected: any = null;
  @Input() options: any[] = [];
  @Input() required: boolean = false;
  @Output() selectionChange = new EventEmitter<string>();

  fieldId = `select-field-${Math.random().toString(36).substr(2, 9)}`;
  hasError = false;
  errorMessage = '';

  onSelectionChange(event: any) {
    this.validateSelection(event.value);
    this.selectionChange.emit(event.value);
  }

  trackByType(index: number, option: any): string {
    return option.type;
  }

  private validateSelection(value: any): void {
    if (this.required && !value) {
      this.hasError = true;
      this.errorMessage = `${this.label} é obrigatório`;
    } else {
      this.hasError = false;
      this.errorMessage = '';
    }
  }
}
