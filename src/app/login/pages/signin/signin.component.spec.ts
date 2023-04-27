/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../../login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, LoginModule, BrowserAnimationsModule],
      declarations: [SigninComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty email and password fields', () => {
    expect(component.loginForm.get('email').value).toEqual('');
    expect(component.loginForm.get('password').value).toEqual('');
  });

  it('login button disabled when form is invalid', () => {
    const emailInput = component.loginForm.controls.email;
    const passwordInput = component.loginForm.controls.password;
    const loginButton = fixture.nativeElement.querySelector('.login__button button[type="submit"]');

    emailInput.setValue('test');
    passwordInput.setValue('12345');
    fixture.detectChanges();

    expect(loginButton.disabled).toBeTrue();
  });

  it('login button enabled when form is valid', () => {
    const emailInput = component.loginForm.controls.email;
    const passwordInput = component.loginForm.controls.password;
    const loginButton = fixture.nativeElement.querySelector('.login__button button[type="submit"]');

    emailInput.setValue('test@example.com');
    passwordInput.setValue('123456');
    fixture.detectChanges();

    expect(loginButton.disabled).toBeFalse();
  });

  it('when submit is clicked, loading is set to true', () => {
    component.submit();
    expect(component.loading).toBeTrue();
  });

  it('after sumbit responds, loading is set to false', fakeAsync(() => {
    component.submit();
    tick(1000);
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
  }));

  it('should navigate to signup page when login is successful', fakeAsync(() => {
    const emailInput = component.loginForm.controls.email;
    const passwordInput = component.loginForm.controls.password;

    emailInput.setValue('test@gmail.com');
    passwordInput.setValue('123456');
    component.submit();
    tick(1000);
    fixture.detectChanges();

    expect(component.router.url).toEqual('/signup');
  }));
});
