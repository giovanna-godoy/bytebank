import { Component, Input } from '@angular/core';
import { currentDate } from '../../../core/utils/date.utils';

@Component({
  selector: 'app-welcome-card',
  imports: [],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss'
})
export class WelcomeCardComponent {
  public currentDate: string = currentDate();

  @Input() userName: string = '';
}
