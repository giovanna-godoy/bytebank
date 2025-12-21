import { Injectable, inject } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({ providedIn: 'root' })
export class SecureStorageService {
  private cryptoService = inject(CryptoService);
  private encryptionKey: CryptoKey | null = null;
  private readonly KEY_STORAGE = 'app_encryption_key';

  async initialize(): Promise<void> {
    const storedKey = sessionStorage.getItem(this.KEY_STORAGE);
    
    if (storedKey) {
      this.encryptionKey = await this.cryptoService.importKey(storedKey);
    } else {
      this.encryptionKey = await this.cryptoService.generateKey();
      const exportedKey = await this.cryptoService.exportKey(this.encryptionKey);
      sessionStorage.setItem(this.KEY_STORAGE, exportedKey);
    }
  }

  async setItem(key: string, value: any): Promise<void> {
    if (!this.encryptionKey) await this.initialize();
    
    const jsonValue = JSON.stringify(value);
    const encrypted = await this.cryptoService.encrypt(jsonValue, this.encryptionKey!);
    sessionStorage.setItem(key, encrypted);
  }

  async getItem<T>(key: string): Promise<T | null> {
    if (!this.encryptionKey) await this.initialize();
    
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) return null;

    try {
      const decrypted = await this.cryptoService.decrypt(encrypted, this.encryptionKey!);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
