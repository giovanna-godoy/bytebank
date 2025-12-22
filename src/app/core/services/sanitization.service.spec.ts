import { TestBed } from '@angular/core/testing';
import { SanitizationService } from './sanitization.service';

describe('SanitizationService', () => {
  let service: SanitizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize HTML content', () => {
    const maliciousHtml = '<script>alert("xss")</script><p>Safe content</p>';
    const sanitized = service.sanitizeHtml(maliciousHtml);
    
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('Safe content');
  });

  it('should validate input data', () => {
    const validInput = 'valid@email.com';
    const invalidInput = '<script>alert("xss")</script>';
    
    expect(service.validateInput(validInput)).toBe(true);
    expect(service.validateInput(invalidInput)).toBe(false);
  });
});