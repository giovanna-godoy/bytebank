import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IAuthRepository } from '../../domain/repositories/auth.repository';

export const authGuard: CanActivateFn = () => {
  const authRepository = inject(IAuthRepository);
  const router = inject(Router);

  return authRepository.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    })
  );
};
