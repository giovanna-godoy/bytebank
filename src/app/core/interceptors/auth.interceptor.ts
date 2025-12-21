import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IAuthRepository } from '../../domain/repositories/auth.repository';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authRepository = inject(IAuthRepository);
  const token = authRepository.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
