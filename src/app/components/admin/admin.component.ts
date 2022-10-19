import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  loginSpinnerActive: boolean = false;
  adminForm=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });

  // admincredentials={email:'',password:''};
  constructor(public authservice:AuthenticationService,private route: Router, private _snackBar: MatSnackBar, private userService: UsersService, private adminService: AdminService) { 
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
  const {email,password}=this.adminForm.value;

  if (email === '') {
    this.openSnackBar('Enter the Email', 'Undo');
    return;
  }
  if (password === '') {
    this.openSnackBar('Enter the Password', 'Undo');
    return;
  }

  console.log(email, password);
  this.loginSpinnerActive = true;
  this.adminService.checkIfAdmin(email).subscribe(res => {
    this.adminService.isAdmin = 'true';
    console.log(res);
    if (res.docs.length > 0)
    {
      this.authservice.adminLogin(email, password).then((res)=>{
        console.log('success', res)
        this.getAdminDetails(email);
        this.route.navigate(['adminhome']);
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
async getAdminDetails(email: string) {
  // await this.adminService.getAdmin(email);
  await this.adminService.getAdmin(email);
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}
