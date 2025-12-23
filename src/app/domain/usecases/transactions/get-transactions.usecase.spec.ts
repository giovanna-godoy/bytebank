import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetTransactionsUseCase } from './get-transactions.usecase';
import { ITransactionRepository } from '../../repositories/transaction.repository';

describe('GetTransactionsUseCase', () => {
  let useCase: GetTransactionsUseCase;
  let mockRepository: jasmine.SpyObj<ITransactionRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('ITransactionRepository', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        GetTransactionsUseCase,
        { provide: ITransactionRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(GetTransactionsUseCase);
  });

  it('should return transactions', (done) => {
    const mockTransactions = [
      { id: 1, value: 100, date: '2025-01-01', type: 'DEPOSITO' }
    ];
    mockRepository.getAll.and.returnValue(of(mockTransactions));

    useCase.execute().subscribe({
      next: (result) => {
        expect(result).toEqual(mockTransactions);
        done();
      }
    });
  });

  it('should handle error', (done) => {
    mockRepository.getAll.and.returnValue(throwError(() => new Error('Network error')));

    useCase.execute().subscribe({
      error: (error) => {
        expect(error.message).toBe('Network error');
        done();
      }
    });
  });
});
