import { Injectable } from '@angular/core';
import { SignInData } from 'src/app/model/signInData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly mockedUser = new SignInData("hwangso93@gmail.com", "test123");
  private isAuthenticated = false;

  constructor() { }

  authenticate(signInData: SignInData): boolean {
    this.isAuthenticated = false;

    if (this.checkCredentials(signInData)) {
      this.isAuthenticated = true;
    }

    return this.isAuthenticated
  }

  private checkCredentials(signInData: SignInData): boolean {
    return this.checkEmail(signInData.getEmail()) && this.checkPassword(signInData.getPassword());
  }

  private checkEmail(email: string): boolean {
    return email === this.mockedUser.getEmail();
  }

  private checkPassword(password: string): boolean {
    return password === this.mockedUser.getPassword();
  }
}
