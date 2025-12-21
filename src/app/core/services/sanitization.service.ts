import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SanitizationService {
  private sanitizer = inject(DomSanitizer);

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(1, html) || '';
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.sanitize(4, url) || '';
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (data.length <= visibleChars) return '****';
    return data.slice(0, visibleChars) + '*'.repeat(data.length - visibleChars);
  }

  removePII(obj: any): any {
    const piiFields = ['password', 'token', 'refreshToken', 'ssn', 'cpf', 'creditCard'];
    const sanitized = { ...obj };
    
    for (const key in sanitized) {
      if (piiFields.some(field => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      }
    }
    
    return sanitized;
  }
}
