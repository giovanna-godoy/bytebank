import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { convertStringDate, formatDate } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-date-field',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, CommonModule, MatInputModule, MatNativeDateModule],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent implements OnInit {
  public selectedDate!: Date;

  @Input() label = 'Data';
  @Input() initialDate: Date | string = '';
  @Input() required: boolean = false;

  @Output() dateSelected = new EventEmitter<string>();

  fieldId = `date-field-${Math.random().toString(36).substr(2, 9)}`;
  errorId = `${this.fieldId}-error`;
  hasError = false;
  errorMessage = '';

  ngOnInit() {
    if (this.initialDate) {
      this.selectedDate = typeof (this.initialDate) === 'string' ? convertStringDate(this.initialDate) : this.initialDate;
    }
  }

  onDateChange(event: any) {
    const date = event.value.toLocaleDateString('pt-BR');
    this.validateDate(event.value);
    this.dateSelected.emit(formatDate(date, 'YYYY-MM-DD', 'DD/MM/YYYY'));
  }

  private validateDate(value: Date): void {
    if (this.required && !value) {
      this.hasError = true;
      this.errorMessage = `${this.label} é obrigatória`;
    } else {
      this.hasError = false;
      this.errorMessage = '';
    }
  }
}
