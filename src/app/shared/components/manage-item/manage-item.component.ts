import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../fields/text-field/text-field.component';
import { SelectFieldComponent } from '../fields/select-field/select-field.component';
import { DateFieldComponent } from '../fields/date-field/date-field.component';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-manage-item',
  imports: [TextFieldComponent, SelectFieldComponent, DateFieldComponent, CommonModule, MatButtonModule],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})
export class ManageItemComponent implements OnInit {
  isEdit: boolean = false;
  typeOptions: any[] = [];

  ngOnInit() {
    this.setOptions();
  }

  setOptions() {
    this.typeOptions = [
      { name: 'Depósito', type: 'DEPOSITO' },
      { name: 'Transferência', type: 'TRANSFERENCIA' }
    ]
  }
}
