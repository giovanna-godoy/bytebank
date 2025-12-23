import { Observable } from 'rxjs';

export abstract class IAuthRepository {
  abstract login(email: string, password: string): boolean;
  abstract logout(): void;
  abstract getToken(): string | null;
  abstract isAuthenticated$: Observable<boolean>;
}
