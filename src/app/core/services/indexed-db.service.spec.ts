import { TestBed } from '@angular/core/testing';
import { IndexedDbService } from './indexed-db.service';

describe('IndexedDbService', () => {
  let service: IndexedDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize database', async () => {
    const result = await service.initDB();
    expect(result).toBeTruthy();
  });

  it('should handle database operations', async () => {
    await service.initDB();
    const testData = { id: 1, name: 'test' };
    
    await service.setItem('test', testData);
    const retrieved = await service.getItem('test');
    
    expect(retrieved).toEqual(testData);
  });
});