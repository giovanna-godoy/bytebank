import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectFieldComponent),
    multi: true
  }]
})
export class SelectFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() required: boolean = false;
  @Output() selectionChange = new EventEmitter<string>();

  selected: any = null;
  fieldId = `select-field-${Math.random().toString(36).substr(2, 9)}`;
  disabled = false;
  touched = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: any) {
    const value = event.value;
    this.selected = value;
    this.onChange(value);
    this.markAsTouched();
    this.selectionChange.emit(value);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  trackByType(index: number, option: any): string {
    return option.type;
  }
}
