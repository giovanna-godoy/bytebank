import { TestBed } from '@angular/core/testing';
import { CryptoService } from './services/crypto.service';

describe('CryptoService - Demo', () => {
  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate random string', () => {
    const random1 = service.generateRandomString(10);
    const random2 = service.generateRandomString(10);
    
    expect(random1).toBeTruthy();
    expect(random2).toBeTruthy();
    expect(random1).not.toBe(random2);
    expect(random1.length).toBe(10);
  });
});