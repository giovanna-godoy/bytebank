import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { GetUserUseCase } from '../../../../domain/usecases/user/get-user.usecase';
import { LogoutUseCase } from '../../../../domain/usecases/auth/logout.usecase';
import { User } from '../../../../domain/entities/user.entity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private getUserUseCase = inject(GetUserUseCase);
  private logoutUseCase = inject(LogoutUseCase);
  private router = inject(Router);

  user: User | null = null;

  ngOnInit(): void {
    this.getUserUseCase.execute().subscribe({
      next: (user) => this.user = user,
      error: (err) => console.error('Error loading user', err)
    });
  }

  logout(): void {
    this.logoutUseCase.execute();
    this.router.navigate(['/auth/login']);
  }

  navigateToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  navigateToAccounts(): void {
    this.router.navigate(['/accounts']);
  }
}
