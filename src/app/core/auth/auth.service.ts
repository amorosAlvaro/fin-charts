import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, of, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRes, Token } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {}

  public login(email: string, password: string): Observable<LoginRes> {
    const payload = { email: email, password: password };

    return this.http.post<Token>('http://localhost:3000/auth/login', payload).pipe(
      map((token) => {
        this.setSessionData(token);
        return this.successfullLogin();
      }),
      catchError((err) => {
        return this.unsuccessfullLogin(err);
      })
    );
  }

  public logOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  public isAuthenticated() {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
  }

  private setSessionData(token: Token) {
    sessionStorage.clear();
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('user_name', this.jwtHelper.decodeToken(token.access_token).username);
  }

  private successfullLogin(): LoginRes {
    return { succsesLogin: true, message: 'Login was successful!', statusCode: 200 };
  }

  private unsuccessfullLogin(err: HttpErrorResponse) {
    return of({ succsesLogin: false, message: err.message || 'An error occurred', statusCode: err.status || 400 });
  }
}
