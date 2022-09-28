import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  adminForm=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });

  // admincredentials={email:'',password:''};
  constructor(public authservice:AuthenticationService,private route:Router) { 
  }

  ngOnInit(): void {
  }
  get email(){
    return this.adminForm.get('email');
  }
  
  get password(){
    return this.adminForm.get('password');
  }
 submit(){
  const{email,password}=this.adminForm.value;
  // console.log(email,password)
    // const {email,password} =this.admincredentials;
    // return console.log(email,password);
    if (email==''){
      alert('Please Enter Email')
      return;
    }
    if(password==''){
      alert('Please Enter Password')
      return;
    }
    this.authservice.adminlogin(email,password).then((res)=>{
      console.log(res.user.uid)
      this.route.navigate(['adminhome']);
    })
  }

}
