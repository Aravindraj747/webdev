import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Console } from 'console';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });

  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  loginSpinnerActive: boolean = false;
  signUpSpinnerActive: boolean = false;

  constructor(public authService: AuthenticationService,
              private route: Router, private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
  }

  switchToSignUp() {
    const container = document.getElementById('container');
    container?.classList.add("right-panel-active");
  }

  switchToSignIn() {
    const container = document.getElementById('container');
    container?.classList.remove("right-panel-active");
  }

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.loginForm.get('email');
  }
  
  get password(){
    return this.loginForm.get('password');
  }
  signIn(){
    const {email,password}=this.loginForm.value;

    if (email === '') {
      this.openSnackBar('Enter the Email', 'Undo');
      return;
    }
    if (password === '') {
      this.openSnackBar('Enter the Password', 'Undo');
      return;
    }
    this.loginSpinnerActive = true;
    this.authService.login(email,password).then((res)=>{
      console.log(res)
      this.route.navigate(['userhome']);
    }, err => {
      console.log('error', err);
      this.openSnackBar('Invalid Email or password', 'Undo');
      this.loginSpinnerActive = false;
    });
    console.log(email,password);
  }

  signUp(){
    const {name,email,phoneNumber,password}=this.signUpForm.value;
    if (name === '') {
      this.openSnackBar('Enter the UserName', 'Undo');
      return;
    }
    if (email === '') {
      this.openSnackBar('Enter the Email', 'Undo');
      return;
    }
    if (phoneNumber === '') {
      this.openSnackBar('Enter the PhoneNumber', 'Undo');
      return;
    }
    if (password === '') {
      this.openSnackBar('Enter the Password', 'Undo');
      return;
    }
    this.signUpSpinnerActive = true;
    this.authService.register(name,email,password).then((res)=>{
      console.log(res);
      this.route.navigate(['userhome']);
    }, err => {
      console.log('Error', err);
      this.signUpSpinnerActive = false;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}