import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class GetUserUseCase {
  private userRepository = inject(IUserRepository);

  execute(): Observable<User> {
    return this.userRepository.getUser();
  }
}
