import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public authservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      this.route.navigate(['']);
    });
  }
}
