import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from 'src/app/model/signInData';

import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { jwtToken } from 'src/app/model/jwtToken';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private TOKEN_NAME: string = 'jwt_token';

  private readonly mockedUser = new SignInData("hwangso93@gmail.com", "Test123@");

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }

  login(signInData: SignInData) {
    return this.http.post<jwtToken>("http://localhost:3000/auth/login", signInData.getUserInfo(), {
      observe: 'body',
      responseType: 'json'
    })
    .pipe(
      tap(res => this.setToken(res.accessToken)),
      shareReplay(),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  private getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME)!; // assert not null
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  private isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // 클라이언트나 네트워크 문제로 발생한 에러
      console.error('An error occurred:', error.error.message);
    }
    /**
     * @TODO : ID/PW 틀렸을 시 403 에러 처리
     */
    else {
      // 백엔드에서 실패한 것으로 보낸 에러
      // 요청으로 받은 에러 객체를 확인하면 원인을 확인 가능
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // 사용자가 이해할 수 있는 에러 메시지를 반환
    return throwError(
      'Something bad happened; please try again later.');
  }

  // authenticate(signInData: SignInData): boolean {
  //   this.isAuthenticated = false;

  //   if (this.checkCredentials(signInData)) {
  //     this.isAuthenticated = true;
  //     this.router.navigate(['home']);
  //   }

  //   return this.isAuthenticated;
  // }

  // private checkCredentials(signInData: SignInData): boolean {
  //   this.signIn(signInData).subscribe(() => {

  //   })
  //   return true;
  //   // return this.checkEmail(signInData.getEmail()) && this.checkPassword(signInData.getPassword());
  // }

  // private signIn<T>(signInData: SignInData): Observable<T> {
  //   return this.http.post<T>("http://localhost:3000/auth/login", signInData, {
  //     observe: 'body',
  //     responseType: 'json'
  //   })
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // private checkEmail(email: string): boolean {
  //   return email === this.mockedUser.getEmail();
  // }

  // private checkPassword(password: string): boolean {
  //   return password === this.mockedUser.getPassword();
  // }
}
