import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  
  typeList:any[] = ["Buy","Rent","Land","Commericial","Lease","PG"]
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  choosephoto(event:any){
  }
  logout(){
    this.route.navigate(['adminlogin']);
  }

}
