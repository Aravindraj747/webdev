import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, getFirestore,} from 'firebase/firestore';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  profileForm=new FormGroup({
    uid:new FormControl(''),
    name:new FormControl(''),
  });

  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required)});

  constructor(private authservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {}
  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  
  get password(){
    return this.signUpForm.get('password');
  }
  
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }
  submit(){
    const {name,email,password,confirmPassword}=this.signUpForm.value;
    if(password!==confirmPassword){
      console.log('Not matching')
      alert('Password Not matching')
      return
    }
    this.authservice.register(name,email,password).then(async (res)=>{
      const db=getFirestore()
      try{
        const docRef=addDoc(collection(db,'users'),{
          name:name,
          email:email
        });
        console.log('id',(await (docRef)).id);
        alert('Reistered')
        this.route.navigate(['']);
      }catch(e){
        console.error(e);
      }
    })
  }
}
