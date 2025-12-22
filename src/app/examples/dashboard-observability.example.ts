import { Component, OnInit } from '@angular/core';
import { ObservabilityService } from '../../core/services/observability.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      <button (click)="performCriticalAction()">Transfer Money</button>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  
  constructor(private observability: ObservabilityService) {}

  ngOnInit(): void {
    // Measure page load time
    this.observability.measurePageLoad('dashboard');
    
    // Track page view
    this.observability.trackUserAction('page_view', {
      page: 'dashboard',
      timestamp: new Date().toISOString()
    });
  }

  performCriticalAction(): void {
    // Measure critical user flow
    const endMeasurement = this.observability.measureCriticalUserFlow('money_transfer');
    
    // Track user action
    this.observability.trackUserAction('transfer_initiated', {
      source: 'dashboard_button'
    });

    // Simulate transfer process
    setTimeout(() => {
      // End measurement
      endMeasurement();
      
      // Track completion
      this.observability.trackUserAction('transfer_completed', {
        success: true,
        duration: '2.5s'
      });
    }, 2500);
  }
}