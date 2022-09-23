import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Console } from 'console';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    password: new FormControl('',Validators.required),
});

  // credentials={email:'',password:''}
  constructor(public authservice:AuthenticationService,private route:Router) {
   }

  ngOnInit(): void {
  }
toggleForm(){

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signInButton?.addEventListener('click', () => {
	container?.classList.remove("right-panel-active");
});
signUpButton?.addEventListener('click', () => {
	container?.classList.add("right-panel-active");
});
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
    this.authservice.login(email,password).then((res)=>{
      console.log(res)
      this.route.navigate(['userhome']);
    });
    console.log(email,password);
  }
  signUp(){
    const {name,email,password}=this.signUpForm.value;
    this.authservice.register(name,email,password).then(async (res)=>{
      console.log(res);
      this.route.navigate(['login']);
    });
  }
  // submit(){
  //   const { email,password }=this.credentials;
  //   if (email==''){
  //     alert('Please Enter Email')
  //     return;
  //   }
  //   if(password==''){
  //     alert('Please Enter Password')
  //     return;
  //   }
  //   this.authservice.login(email,password).then((res)=>{
  //     console.log(res);
  //     this.route.navigate(['home']);

  //   });
  //   this.credentials.email='';
  //   this.credentials.password='';
  // }
  
}