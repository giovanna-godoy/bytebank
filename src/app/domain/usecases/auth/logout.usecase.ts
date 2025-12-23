import { Injectable, inject } from '@angular/core';
import { IAuthRepository } from '../../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  private authRepository = inject(IAuthRepository);

  execute(): void {
    this.authRepository.logout();
  }
}
