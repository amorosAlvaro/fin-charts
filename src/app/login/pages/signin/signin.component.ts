/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  loading = false;
  invalidCredentials = false;
  hidePassword = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  submit() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    if (!email || !password) return;

    this.loading = true;
    this.authService.login(email, password).subscribe((loginRes) => {
      if (loginRes.succsesLogin) this.router.navigate(['dashboard']);
      if (!loginRes.succsesLogin) alert(loginRes.message);
      this.loading = false;
    });
  }
}
