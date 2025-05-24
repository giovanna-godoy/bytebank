import { Component, EventEmitter, Input, Output } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { formatDate } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-date-field',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, CommonModule, MatInputModule, MatNativeDateModule],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent {
  @Input() label = 'Data';
  @Input() value: Date | null = null;

  @Output() dateSelected = new EventEmitter<string>();

  onDateChange(event: any) {
    const date = event.value.toLocaleDateString('pt-BR');
    this.dateSelected.emit(formatDate(date, 'YYYY-MM-DD', 'DD/MM/YYYY'));
  }
}
