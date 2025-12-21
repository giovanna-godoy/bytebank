import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { LoginUseCase } from '../../../../domain/usecases/auth/login.usecase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['user@bytebank.com', [Validators.required, Validators.email]],
    password: ['Fiap@2025', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const success = this.loginUseCase.execute(email, password);
      
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Credenciais inválidas');
      }
    }
  }
}
