import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AppState } from '../../../../store/app.state';
import { toggleAmountVisibility } from '../../../../store/ui/ui.actions';
import { selectShowAmount } from '../../../../store/ui/ui.selectors';

@Component({
  selector: 'app-amount',
  imports: [MatIconModule, CommonModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.scss'
})
export class AmountComponent {
  public showAmount$: Observable<boolean>;

  @Input() amount: number = 0;

  private store = inject(Store<AppState>);

  constructor() {
    this.showAmount$ = this.store.select(selectShowAmount);
  }

  toggleAmountVisibility(): void {
    this.store.dispatch(toggleAmountVisibility());
  }
}
