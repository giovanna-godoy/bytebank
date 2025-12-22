import { TestBed } from '@angular/core/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoService]
    });
    service = TestBed.inject(CryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt and decrypt data', async () => {
    const data = 'sensitive-token-123';
    const encrypted = await service.encrypt(data);
    
    expect(encrypted).toBeTruthy();
    expect(encrypted).not.toBe(data);

    const decrypted = await service.decrypt(encrypted);
    expect(decrypted).toBe(data);
  });

  it('should generate different encrypted values for same input', async () => {
    const data = 'test-data';
    const encrypted1 = await service.encrypt(data);
    const encrypted2 = await service.encrypt(data);
    
    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should handle empty string', async () => {
    const encrypted = await service.encrypt('');
    const decrypted = await service.decrypt(encrypted);
    expect(decrypted).toBe('');
  });
});
