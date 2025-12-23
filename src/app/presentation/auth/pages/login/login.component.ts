import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { login } from '../../../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);
  showPassword = false;

  loginForm: FormGroup = this.fb.group({
    email: ['user@bytebank.com', [Validators.required, Validators.email]],
    password: ['Fiap@2025', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({ email, password }));
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
