import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  typeList:any[]=["Buy","Rent","Land","Commericial","Lease","PG"]
  constructor() { }

  ngOnInit(): void {
  }

  choosephoto(event:any){

  }
}
