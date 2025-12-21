import { Injectable, inject } from '@angular/core';
import { IAuthRepository } from '../../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(IAuthRepository);

  execute(email: string, password: string): boolean {
    return this.authRepository.login(email, password);
  }
}
