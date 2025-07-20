import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>
          Username
          <input formControlName="username" />
        </label>
        <label>
          Password
          <input type="password" formControlName="password" />
        </label>
        <button type="submit" [disabled]="form.invalid">Login</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container { max-width: 300px; margin: 2rem auto; }
    label { display: block; margin-bottom: 1rem; }
    input { width: 100%; padding: .5rem; }
    button { width: 100%; padding: .5rem; }
  `],})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // initialiser le form après que fb soit injecté
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    if (this.auth.login(username, password)) {
      this.router.navigate(['/courses']);
    }
  }
}
