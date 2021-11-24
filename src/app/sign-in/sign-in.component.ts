import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // isFormInvalid = false;
  // areCredentialsInvalid = false;

  public regexEmail: RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,15}$/;
  public regexPassword: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}:;',?/*~$^+=<>]).{8,255}$/;

  public email: string = "";
  public password: string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      return;
    }

    this.checkCredentials(signInForm);
  }

  private checkCredentials(signInForm: NgForm) {
    const signInData = new SignInData(signInForm.value.email, signInForm.value.password);

    this.authService.login(signInData)
      .subscribe(
        () => {
          console.log("User is logged in");
        }
      )
  }

}
