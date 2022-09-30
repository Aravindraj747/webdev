import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  types:any[]=["ALL","COMPLETED","INCOMPLETED"];
  constructor(private authservice:AuthenticationService,private route:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      this.route.navigate(['admin']);
    });
  }
  openDialog(){
    return this.dialog.open(DialogComponent,{
    //   height: '200px',
    // width: '300x',
    });
  }
}
