import { TestBed } from '@angular/core/testing';
import { SecureStorageService } from './secure-storage.service';
import { CryptoService } from './crypto.service';

describe('SecureStorageService', () => {
  let service: SecureStorageService;
  let cryptoService: jasmine.SpyObj<CryptoService>;

  beforeEach(() => {
    cryptoService = jasmine.createSpyObj('CryptoService', ['encrypt', 'decrypt', 'generateKey', 'exportKey', 'importKey']);
    cryptoService.generateKey.and.returnValue(Promise.resolve({} as CryptoKey));
    cryptoService.exportKey.and.returnValue(Promise.resolve('exported-key'));
    cryptoService.importKey.and.returnValue(Promise.resolve({} as CryptoKey));

    TestBed.configureTestingModule({
      providers: [
        SecureStorageService,
        { provide: CryptoService, useValue: cryptoService }
      ]
    });

    service = TestBed.inject(SecureStorageService);
    sessionStorage.clear();
  });

  it('should store and retrieve encrypted data', async () => {
    const key = 'test-key';
    const value = 'test-value';
    cryptoService.encrypt.and.returnValue(Promise.resolve('encrypted-value'));
    cryptoService.decrypt.and.returnValue(Promise.resolve('"test-value"'));

    await service.setItem(key, value);
    expect(cryptoService.encrypt).toHaveBeenCalled();

    const retrieved = await service.getItem(key);
    expect(retrieved).toBe(value);
    expect(cryptoService.decrypt).toHaveBeenCalled();
  });

  it('should remove item', async () => {
    const key = 'test-key';
    cryptoService.encrypt.and.returnValue(Promise.resolve('encrypted'));
    
    await service.setItem(key, 'value');
    service.removeItem(key);
    
    const retrieved = await service.getItem(key);
    expect(retrieved).toBeNull();
  });

  it('should clear all items', async () => {
    cryptoService.encrypt.and.returnValue(Promise.resolve('encrypted'));
    
    await service.setItem('key1', 'value1');
    await service.setItem('key2', 'value2');
    
    service.clear();
    
    const retrieved1 = await service.getItem('key1');
    const retrieved2 = await service.getItem('key2');
    
    expect(retrieved1).toBeNull();
    expect(retrieved2).toBeNull();
  });
});
