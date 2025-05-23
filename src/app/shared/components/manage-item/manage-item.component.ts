import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-manage-item',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, CommonModule],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})

export class ManageItemComponent {
  isEdit: boolean = false;
}
