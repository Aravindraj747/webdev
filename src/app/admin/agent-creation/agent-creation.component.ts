import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-creation',
  templateUrl: './agent-creation.component.html',
  styleUrls: ['./agent-creation.component.css']
})
export class AgentCreationComponent implements OnInit {

  agentForm=new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    phonenumber: new FormControl('',Validators.required),
  });
  constructor() { }

  ngOnInit(): void {
  }
  get name(){
    return this.agentForm.get('name');
  }
  get email(){
    return this.agentForm.get('email');
  }
  get phonenumber(){
    return this.agentForm.get('phonenumber');
  }
  create(){
    const{name,email,phonenumber}=this.agentForm.value
    console.log(name,email,phonenumber);
    alert("created");
  }

}
