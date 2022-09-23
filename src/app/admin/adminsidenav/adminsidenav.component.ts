import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-adminsidenav',
  templateUrl: './adminsidenav.component.html',
  styleUrls: ['./adminsidenav.component.css']
})
export class AdminsidenavComponent implements OnInit {

  constructor(private authservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      return this.route.navigate(['admin']);
    });
  }
}