import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IAuthRepository } from '../domain/repositories/auth.repository';
import { IUserRepository } from '../domain/repositories/user.repository';
import { ITransactionRepository } from '../domain/repositories/transaction.repository';
import { AuthHttpRepository } from '../data/repositories/auth-http.repository';
import { UserHttpRepository } from '../data/repositories/user-http.repository';
import { TransactionHttpRepository } from '../data/repositories/transaction-http.repository';

@NgModule({
  providers: [
    { provide: IAuthRepository, useClass: AuthHttpRepository },
    { provide: IUserRepository, useClass: UserHttpRepository },
    { provide: ITransactionRepository, useClass: TransactionHttpRepository }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
