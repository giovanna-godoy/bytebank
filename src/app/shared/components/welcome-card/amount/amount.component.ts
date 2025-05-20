import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-amount',
  imports: [MatIconModule, CommonModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss'
})
export class AmountComponent {
  public showAmount:boolean = true;

  @Input() amount: number = 0;
}
