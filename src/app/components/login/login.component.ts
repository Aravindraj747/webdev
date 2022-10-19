import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersService} from "../../services/users.service";
import firebase from "firebase/compat";
import {User} from "../../models/user";

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
              private route: Router,
              private _snackBar: MatSnackBar,
              private userService: UsersService) {
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
    this.userService.isUser(email).subscribe(res => {
      console.log(res);
      if (res.docs.length > 0)
      {
        this.authService.login(email, password).then((res)=>{
          console.log(res)
          this.getUserDetails(email);
          this.route.navigate(['userhome']);
        }, err => {
          console.log('error', err);
          this.openSnackBar('Invalid Email or password', 'Undo');
          this.loginSpinnerActive = false;
        });
        console.log(email,password);
      }
      else
      {
        this.openSnackBar('User does not exist', 'Retry');
        this.loginSpinnerActive = false;
        return;
      }
    });

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
    const userID = Math.floor(Date.now()/1000).toString();
    let user: User = {email: email, id: userID, name: name, password: password, phoneNumber: phoneNumber}
    this.authService.register(name,email,password).then((res)=>{
      console.log(res);
      this.userService.saveUser(user).then(res => {
        this.userService.saveUserDetails(user);
        this.route.navigate(['userhome']);
      }).catch(err => {
        this.openSnackBar('Error occurred', 'Retry');
      });
    }, err => {
      console.log('Error', err);
      this.signUpSpinnerActive = false;
    });
  }

  async getUserDetails(email: string) {
    await this.userService.getUser(email);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}