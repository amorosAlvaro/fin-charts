import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRes } from './interfaces';
import { map, catchError, of, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public login(email: string, password: string): Observable<LoginRes> {
    const payload = { email: email, password: password };

    return this.http.post<any>('http://localhost:3000/auth/login', payload).pipe(
      map((token) => {
        this.setSessionData(token);
        return this.successfullLogin();
      }),
      catchError((err) => {
        return this.unsuccessfullLogin(err);
      })
    );
  }

  successfullLogin(): LoginRes {
    return { succsesLogin: true, message: 'Login was successful!', statusCode: 200 };
  }

  unsuccessfullLogin(err: HttpErrorResponse) {
    return of({ succsesLogin: false, message: err.message || 'An error occurred', statusCode: err.status || 400 });
  }

  private setSessionData(token: Record<'access_token', string>) {
    // IF existing acces token, clear session storage
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('user_name', this.jwtHelper.decodeToken(token.access_token).user_name);
  }
}
