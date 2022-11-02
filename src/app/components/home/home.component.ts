import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import {Storage,ref,uploadBytesResumable,getDownloadURL} from '@angular/fire/storage'
import { getStorage } from 'firebase/storage';
import { Router } from '@angular/router';
import { User } from "../../models/user";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$=this.authservice.currentUser$;

  isUserLogin: boolean= false;

  user: User;

  public file:any={}
  constructor(private authservice: AuthenticationService,
              private userservice: UsersService,
              public storage: Storage,
              private route: Router) {
                if(this.userservice.getUserLogin()){
                  this.isUserLogin=true;
                }
  }
  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(res => {
      this.isUserLogin = false;
      this.route.navigate(['home']);
    })
  }
  chooseFile(event:any){
    this.file=event.target.files[0];
  }
  addData(){
    console.log(this.file);
    const storage = getStorage();
    const storageRef = ref(storage,this.file.name);
    const uploadTask = uploadBytesResumable(storageRef,this.file);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress =(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      console.log('Upload is'+progress+'%done');
    },
    (error)=>{
      console.log(error.message);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL)=>{
        console.log('files',downLoadURL);
        window.alert('File uploaded');
      });
    }
    )
    }
    viewProfile() {
      return this.route.navigate(['userprofile']);
    }
  
    viewPolicy() {
      this.route.navigate(['userpolicy']);
    }
}
