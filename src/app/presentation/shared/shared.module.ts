import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { StatementItemsComponent } from './components/statement-items/statement-items.component';
import { ManageItemComponent } from './components/manage-item/manage-item.component';
import { TransactionFiltersComponent } from './components/transaction-filters/transaction-filters.component';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';
import { HeaderComponent } from './components/header/header.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    WelcomeCardComponent,
    SideBarComponent,
    StatementItemsComponent,
    ManageItemComponent,
    TransactionFiltersComponent,
    ModalBaseComponent,
    HeaderComponent,
    InfiniteScrollDirective
  ],
  exports: [
    CommonModule, 
    ReactiveFormsModule,
    WelcomeCardComponent,
    SideBarComponent,
    StatementItemsComponent,
    ManageItemComponent,
    TransactionFiltersComponent,
    ModalBaseComponent,
    HeaderComponent,
    InfiniteScrollDirective
  ]
})
export class SharedModule {}
