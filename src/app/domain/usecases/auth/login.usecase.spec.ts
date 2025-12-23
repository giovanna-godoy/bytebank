import { TestBed } from '@angular/core/testing';
import { LoginUseCase } from './login.usecase';
import { IAuthRepository } from '../../repositories/auth.repository';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['login']);

    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: IAuthRepository, useValue: mockAuthRepository }
      ]
    });

    useCase = TestBed.inject(LoginUseCase);
  });

  it('should call repository login method', () => {
    const email = 'test@test.com';
    const password = 'password123';
    mockAuthRepository.login.and.returnValue(true);

    const result = useCase.execute(email, password);

    expect(mockAuthRepository.login).toHaveBeenCalledWith(email, password);
    expect(result).toBe(true);
  });

  it('should return false when credentials are invalid', () => {
    mockAuthRepository.login.and.returnValue(false);

    const result = useCase.execute('wrong@test.com', 'wrong');

    expect(result).toBe(false);
  });
});
