import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  typeList:any[]=["Insurance","Claim"];
  type:any;
  vechicleList:any[]=["Car","Two Wheeler","Commercial"]

  constructor(private route:Router) { }
  ngOnInit(): void {
  }
  chooserc(event:any){

  }
choosecsr(event:any){
}
chooseVechile(event:any){

}
chooseland(event:any){

}
choosepicture(event:any){

}
choosetype(event:any){
  this.type=event;
  console.log(this.type);
}
cancel(){
  return this.route.navigate(['sellnow']);
}
}
