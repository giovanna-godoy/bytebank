import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-investments',
  standalone: true,
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent implements AfterViewInit {
  @ViewChild('portfolioChart') portfolioChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('performanceChart') performanceChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.createPortfolioChart();
    this.createPerformanceChart();
  }

  private createPortfolioChart(): void {
    new Chart(this.portfolioChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Renda Fixa', 'Renda Variável', 'Fundos', 'Reserva'],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: [
            '#004D61',
            '#FF5031', 
            '#34A853',
            '#999999'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  private createPerformanceChart(): void {
    new Chart(this.performanceChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Rentabilidade (%)',
          data: [2.1, 1.8, 3.2, 2.7, 4.1, 3.5],
          borderColor: '#004D61',
          backgroundColor: 'rgba(0, 77, 97, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }


}