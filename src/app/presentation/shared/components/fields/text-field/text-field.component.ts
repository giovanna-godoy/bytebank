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
    const value = input.value;
    
    if (this.type === 'number') {
      this.validateNumber(value);
      if (!this.hasError && value) {
        this.valueChange.emit(parseFloat(value));
      } else if (!value) {
        this.valueChange.emit('');
      }
    } else {
      this.validateInput(value);
      this.valueChange.emit(value);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.type === 'number') {
      const char = event.key;
      const input = event.target as HTMLInputElement;
      const currentValue = input.value;
      
      // Permitir apenas números, ponto decimal e teclas de controle
      if (!/[0-9.]/.test(char) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(char)) {
        event.preventDefault();
        return;
      }
      
      // Não permitir múltiplos pontos decimais
      if (char === '.' && currentValue.includes('.')) {
        event.preventDefault();
        return;
      }
      
      // Não permitir ponto no início
      if (char === '.' && currentValue.length === 0) {
        event.preventDefault();
        return;
      }
    }
  }

  private validateNumber(value: string): void {
    if (this.required && !value.trim()) {
      this.hasError = true;
      this.errorMessage = `${this.label} é obrigatório`;
      return;
    }
    
    if (value && value.trim()) {
      const numValue = parseFloat(value);
      
      // Verificar se é um número válido
      if (isNaN(numValue) || !isFinite(numValue)) {
        this.hasError = true;
        this.errorMessage = 'Digite um número válido';
        return;
      }
      
      // Verificar se é positivo
      if (numValue <= 0) {
        this.hasError = true;
        this.errorMessage = 'O valor deve ser maior que zero';
        return;
      }
      
      // Verificar limite máximo
      if (numValue > 999999999.99) {
        this.hasError = true;
        this.errorMessage = 'Valor muito alto (máximo: 999.999.999,99)';
        return;
      }
    }
    
    this.hasError = false;
    this.errorMessage = '';
  }

  private validateInput(value: string): void {
    if (this.required && !value.trim()) {
      this.hasError = true;
      this.errorMessage = `${this.label} é obrigatório`;
    } else {
      this.hasError = false;
      this.errorMessage = '';
    }
  }
}
