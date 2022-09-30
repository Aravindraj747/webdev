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
  }

  register(name:string,email:string,password:string){
    const auth = getAuth(this.app)
    return createUserWithEmailAndPassword(auth,email,password);
  }

  logout(){
    return this.fireauth.signOut();
  }

  adminlogin(email:string,password:string){
    const auth = getAuth(this.app)
    return signInWithEmailAndPassword(auth,email,password);
  }

  getUser() {
    return this.fireauth.user;
  }
}

