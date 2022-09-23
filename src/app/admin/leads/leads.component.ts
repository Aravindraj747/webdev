import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  types:any[]=["Agent","User"];
  constructor() { }

  ngOnInit(): void {
  }

}
