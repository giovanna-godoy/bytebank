import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../fields/text-field/text-field.component';
import { SelectFieldComponent } from '../fields/select-field/select-field.component';
import { DateFieldComponent } from '../fields/date-field/date-field.component';

@Component({
  selector: 'app-manage-item',
  imports: [TextFieldComponent, SelectFieldComponent, DateFieldComponent, CommonModule],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})
export class ManageItemComponent {
  isEdit: boolean = false;
}
