import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SimpleErrorHandler implements ErrorHandler {
  
  handleError(error: any): void {
    if (environment.production) {
      this.logToService(error);
    }
  }

  private logToService(error: any): void {
    const errorData = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // }).catch(() => {});
    
    console.log('Error logged:', errorData);
  }
}