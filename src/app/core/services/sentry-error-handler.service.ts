import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    // Sentry initialization would go here when package is installed
    console.log('SentryErrorHandler initialized (Sentry package not installed)');
  }

  handleError(error: any): void {
    console.error('Global error handler:', error);
    
    if (environment.production) {
      // Would send to Sentry when package is installed
      this.logToService(error);
    }
  }

  private logToService(error: any): void {
    const errorData = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    console.log('Error logged (would send to Sentry):', errorData);
  }
}