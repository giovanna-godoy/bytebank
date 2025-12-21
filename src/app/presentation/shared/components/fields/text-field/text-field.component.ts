import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  imports: [MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {
  @Input() label: string = "";
  @Input() value: string | number = "";
  @Input() type: string = "";
  @Input() required: boolean = false;
  @Input() errorMessage: string = "";
  @Output() valueChange = new EventEmitter<string | number>();

  fieldId = `text-field-${Math.random().toString(36).substr(2, 9)}`;
  errorId = `${this.fieldId}-error`;
  hasError = false;

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.validateInput(input.value);
    this.valueChange.emit(this.type === 'number' ? parseFloat(input.value) : input.value);
  }

  private validateInput(value: string): void {
    if (this.required && !value.trim()) {
      this.hasError = true;
      this.errorMessage = `${this.label} é obrigatório`;
    } else if (this.type === 'number' && value && isNaN(Number(value))) {
      this.hasError = true;
      this.errorMessage = 'Digite um número válido';
    } else {
      this.hasError = false;
      this.errorMessage = '';
    }
  }
}
