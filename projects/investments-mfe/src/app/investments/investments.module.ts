import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvestmentsComponent } from './investments.component';

@NgModule({
  declarations: [InvestmentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: InvestmentsComponent }
    ])
  ],
  exports: [InvestmentsComponent]
})
export class InvestmentsModule { }