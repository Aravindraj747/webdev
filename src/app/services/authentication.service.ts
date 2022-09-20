import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword, user, authState, Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { doc, getFirestore } from '@firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { asapScheduler, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isuserLoggedin=false;
  isadminLoggedin=false;

  currentUser$=authState(getAuth(this.app));

  constructor(private fireauth:AngularFireAuth, private app: FirebaseApp, private route:Router) {}
 
  currentUser:string

  login(email:string,password:string){
    const auth = getAuth(this.app);
    return signInWithEmailAndPassword(auth, email,password);
    // return from(signInWithEmailAndPassword(this.fireauth,email,password));
    // this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
    //   this.isuserLoggedin=true;
    //   this.currentUser=email
    //   console.log(this.currentUser)
    //   this.route.navigate(['home']);
    // })
  }
  register(name:string,email:string,password:string){
    const auth = getAuth(this.app)
    // return createUserWithEmailAndPassword(auth,email,password).then(()=>{
    //   console.log(auth.app.options.appId)
    //   this.route.navigate(['login']);
    // });
    return createUserWithEmailAndPassword(auth,email,password).catch(map(({user})=>{
      updateProfile(user,{displayName:name})
    }));
    return this.fireauth.createUserWithEmailAndPassword(email,password);
    // this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
    // //   console.log(auth)
    // //   alert('Registerd successfully')
    // //   this.route.navigate(['login']);
    // // },err=>{
    // //   alert(err.message);
    // //   this.route.navigate(['signup']);
    // // })
  }
  logout(){
    return this.fireauth.signOut();
    // this.route.navigate(['login']);
    // this.isuserLoggedin=false;
    // this.isadminLoggedin=false;
  }
  adminlogin(email:string,password:string){
    const auth = getAuth(this.app)
    return signInWithEmailAndPassword(auth,email,password);
    // this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
    //   this.route.navigate(['adminhome']);
    //   this.isadminLoggedin=true
    // })
  }
}

