import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObservabilityService {
  
  measurePageLoad(pageName: string): void {
    const startTime = performance.now();
    
    setTimeout(() => {
      const loadTime = performance.now() - startTime;
      
      console.log(`Page ${pageName} loaded in ${loadTime.toFixed(2)}ms`);
      
      if (loadTime > 3000) {
        console.warn(`Slow page load: ${pageName} - ${loadTime.toFixed(2)}ms`);
      }
    }, 0);
  }

  trackUserAction(action: string, data?: Record<string, any>): void {
    if (!environment.enableAnalytics) return;
    
    const sanitizedData = this.sanitizeData(data);
    console.log(`User action: ${action}`, sanitizedData);
  }

  trackApiError(endpoint: string, status: number, error: string): void {
    console.error(`API Error: ${endpoint} - Status: ${status} - ${error}`);
  }

  measureCriticalUserFlow(flowName: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      console.log(`Critical flow ${flowName} completed in ${duration.toFixed(2)}ms`);
      
      if (duration > 5000) {
        console.warn(`Slow critical flow: ${flowName} - ${duration.toFixed(2)}ms`);
      }
    };
  }

  private sanitizeData(data?: Record<string, any>): Record<string, any> {
    if (!data) return {};
    
    const sanitized = { ...data };
    const sensitiveKeys = ['password', 'token', 'email', 'cpf', 'phone', 'account'];
    
    sensitiveKeys.forEach(key => {
      if (sanitized[key]) {
        sanitized[key] = '[FILTERED]';
      }
    });
    
    return sanitized;
  }
}