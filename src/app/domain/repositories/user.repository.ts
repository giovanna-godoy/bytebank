import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract getUser(): Observable<User>;
  abstract getAmount(): Observable<User>;
}
