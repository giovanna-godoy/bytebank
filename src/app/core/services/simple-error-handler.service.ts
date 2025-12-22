import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SimpleErrorHandler implements ErrorHandler {
  
  handleError(error: any): void {
    // Log error to console
    console.error('Global error handler:', error);
    
    // In production, you could send to logging service
    if (environment.production) {
      this.logToService(error);
    }
  }

  private logToService(error: any): void {
    // Placeholder for external logging service
    // Could be replaced with actual service like Sentry, LogRocket, etc.
    const errorData = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Example: send to your own logging endpoint
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // }).catch(() => {});
    
    console.log('Error logged:', errorData);
  }
}