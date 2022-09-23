import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  types:any[]=["ALL","COMPLETED","INCOMPLETED"];
  constructor(private authservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      this.route.navigate(['admin']);
    });
  }
}
