import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);

    const signInData = new SignInData(signInForm.value.email, signInForm.value.password);

    console.log(this.authService.authenticate(signInData));
  }

}
