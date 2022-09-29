import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-agentlogin',
  templateUrl: './agentlogin.component.html',
  styleUrls: ['./agentlogin.component.css']
})
export class AgentloginComponent implements OnInit {

  agentForm=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });
  
  constructor(private authservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  get email(){
    return this.agentForm.get('email');
  }
  
  get password(){
    return this.agentForm.get('password');
  }

  submit(){
    const{email,password}=this.agentForm.value;
    if (email === " ")
    {
      return alert("Enter Email")
    }
    if (password === " ")
    {
      return alert("Enter Password")
    }
    this.authservice.adminlogin(email,password).then((res)=>{
      console.log(res.user.uid)
      return this.route.navigate(['agenthome']);
  })
}
}