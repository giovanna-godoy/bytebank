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
    const key = await service.generateKey();
    const data = 'sensitive-token-123';
    const encrypted = await service.encrypt(data, key);
    
    expect(encrypted).toBeTruthy();
    expect(encrypted).not.toBe(data);

    const decrypted = await service.decrypt(encrypted, key);
    expect(decrypted).toBe(data);
  });

  it('should generate different encrypted values for same input', async () => {
    const key = await service.generateKey();
    const data = 'test-data';
    const encrypted1 = await service.encrypt(data, key);
    const encrypted2 = await service.encrypt(data, key);
    
    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should handle empty string', async () => {
    const key = await service.generateKey();
    const encrypted = await service.encrypt('', key);
    const decrypted = await service.decrypt(encrypted, key);
    expect(decrypted).toBe('');
  });
});
