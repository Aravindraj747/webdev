import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  constructor(public authservice:AuthenticationService,private route: Router, private _snackBar: MatSnackBar, private userService: UsersService) { 
  }

  ngOnInit(): void {
  }
  get email(){
    return this.adminForm.get('email');
  }
  
  get password(){
    return this.adminForm.get('password');
  }
//  submit(){
//   const{email,password}=this.adminForm.value;
//     if (email==''){
//       this.openSnackBar('Enter Email', 'Retry');
//       return;
//     }
//     if(password==''){
//       this.openSnackBar('Enter Password', 'Retry');
//       return;
//     }
//     this.authservice.adminlogin(email,password).then((res)=>{
//       console.log(res.user.uid)
//       this.route.navigate(['adminhome']);
//     })
//   }
//   openSnackBar(message: string, action: string) {
//     this._snackBar.open(message, action, {
//       duration: 2000,
//     });
//   }
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
  this.userService.isAdmin(email).subscribe(res => {
    console.log(res);
    if (res.docs.length > 0)
    {
      this.authservice.adminLogin(email, password).then((res)=>{
        console.log('success', res)
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
// async getAdminDetails(email: string) {
//   await this.userService.getUser(email);
// }

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}
