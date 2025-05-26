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
  @Output() selectionChange = new EventEmitter<string>();

  onSelectionChange(event: any) {
    this.selectionChange.emit(event.value);
  }
}
