import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public email = '';
  public password = '';

  onLogin() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciais inválidas!');
    }
  }
}