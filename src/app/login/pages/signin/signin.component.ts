/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  submit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loginForm.controls.email.value === 'test@gmail.com' && this.loginForm.controls.password.value === '123456') {
        this.invalidCredentials = false;
        this.loading = false;
        this.router.navigate(['/signup']);
      } else {
        this.invalidCredentials = true;
        this.loading = false;
      }
    }, 1000);
  }
}
