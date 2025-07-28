import { Component } from '@angular/core';

@Component({
  selector: 'app-investments',
  standalone: true,
  template: `
    <div class="investments-container">
      <h2>Investimentos</h2>
      <div class="investment-cards">
        <div class="card">
          <h3>Renda Fixa</h3>
          <p>CDB, LCI, LCA</p>
          <span class="yield">12,5% a.a.</span>
        </div>
        <div class="card">
          <h3>Renda Variável</h3>
          <p>Ações, FIIs</p>
          <span class="yield">+15% a.a.</span>
        </div>
        <div class="card">
          <h3>Fundos</h3>
          <p>Multimercado</p>
          <span class="yield">8,2% a.a.</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .investments-container {
      padding: 20px;
    }
    .investment-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }
    .yield {
      color: #4CAF50;
      font-weight: bold;
    }
  `]
})
export class InvestmentsComponent { }