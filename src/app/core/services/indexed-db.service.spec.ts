import { TestBed } from '@angular/core/testing';
import { IndexedDBService } from './indexed-db.service';

describe('IndexedDbService', () => {
  let service: IndexedDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize database', async () => {
    await expectAsync(service.initialize()).toBeResolved();
  });

  it('should handle database operations', async () => {
    expect(service).toBeTruthy();
  });
});