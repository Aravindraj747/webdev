import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
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


  isloggedin=false;
  // credentials={email:'',password:''}
  constructor(public authservice:AuthenticationService,private route:Router) {
   }

  ngOnInit(): void {
  }
// toggleFormsignup(){
//   const signUpButton=document.getElementById('signUp');
//   const main=document.getElementById('main');
//   signUpButton?.addEventListener('click',()=>{
//     main?.classList.add("right-panel-active");
//   });
// }
//   toggleFormsignin(){
//     const signInButton=document.getElementById('signIn');
//     const main=document.getElementById('main');

//     signInButton?.addEventListener('click',()=>{
//       main?.classList.remove("right-panel-active");
//     });
//   }
toggleForm(){
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton?.addEventListener('click', () => {
	container?.classList.add("right-panel-active");
});

signInButton?.addEventListener('click', () => {
	container?.classList.remove("right-panel-active");
});
}

  get email(){
    return this.loginForm.get('email');
  }
  
  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    const {email,password}=this.loginForm.value;
    this.authservice.login(email,password).then((res)=>{
      this.isloggedin=true;
      console.log(res)
      this.route.navigate(['userhome']);
    });
    console.log(email,password);
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