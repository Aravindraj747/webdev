import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, user, authState, Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { doc, getFirestore } from '@firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { asapScheduler, from, map, switchMap } from 'rxjs';
import { AgentService } from './agent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(getAuth(this.app));

  constructor(private fireauth: AngularFireAuth, private app: FirebaseApp, private route: Router, private agentService: AgentService,) { }

  currentUser: string

  // Agent login and logout
  agentLogin(email: string, password: string) {
    const auth = getAuth(this.app);
    return signInWithEmailAndPassword(auth, email, password);
  }

  agentLogout() {
    sessionStorage.removeItem('agentLogin');
    return this.fireauth.signOut();
  }

  //Userlogin and logout and regitser
  login(email: string, password: string) {
    const auth = getAuth(this.app);
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    sessionStorage.removeItem('userLogin');
    sessionStorage.removeItem('userData');
    console.log('after', sessionStorage.getItem('userLogin'));
    return this.fireauth.signOut();
  }
  // User registration 
  register(name: string, email: string, password: string) {
    const auth = getAuth(this.app)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // AdminLogin
  adminLogin(email: string, password: string) {
    const auth = getAuth(this.app)
    return signInWithEmailAndPassword(auth, email, password);
  }

  adminLogout() {
    sessionStorage.removeItem('adminLogin');
    return this.fireauth.signOut();
  }

  getUser() {
    return this.fireauth.user;
  }
}