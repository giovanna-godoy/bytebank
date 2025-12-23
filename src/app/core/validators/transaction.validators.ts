import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class TransactionValidators {
  
  static valueRange(min: number = 0.01, max: number = 1000000): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseFloat(control.value);
      
      if (isNaN(value)) {
        return { invalidValue: { message: 'Valor deve ser um número válido' } };
      }
      
      if (value < min) {
        return { minValue: { message: `Valor mínimo é R$ ${min.toFixed(2)}` } };
      }
      
      if (value > max) {
        return { maxValue: { message: `Valor máximo é R$ ${max.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` } };
      }
      
      return null;
    };
  }

  static validCategory(): ValidatorFn {
    const validCategories = ['ALIMENTACAO', 'TRANSPORTE', 'LAZER', 'SAUDE', 'EDUCACAO', 'OUTROS'];
    
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: { message: 'Categoria é obrigatória' } };
      }
      
      if (!validCategories.includes(control.value.toUpperCase())) {
        return { invalidCategory: { message: 'Categoria inválida' } };
      }
      
      return null;
    };
  }

  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (selectedDate > today) {
        return { futureDate: { message: 'Data não pode ser futura' } };
      }
      
      return null;
    };
  }
}