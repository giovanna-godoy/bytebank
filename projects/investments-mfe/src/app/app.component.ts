import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvestmentsComponent } from './investments/investments.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvestmentsComponent],
  template: '<app-investments></app-investments>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'investments-mfe';
}
