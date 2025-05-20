import { Component, Input } from '@angular/core';
import { currentDate } from '../../../core/utils/date.utils';
import { AmountComponent } from './amount/amount.component';

@Component({
  selector: 'app-welcome-card',
  imports: [AmountComponent],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss'
})
export class WelcomeCardComponent {
  public currentDate: string = currentDate();

  @Input() userName: string = '';
  @Input() amount: number = 0;
}
