import { Injectable } from '@angular/core';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { ProfileUser } from '../models/user-profile';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {AngularServiceOptionsSchema} from "@angular/cli/lib/config/workspace-schema";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {Agent} from "../models/agent";
@Injectable({
  providedIn: 'root'
})
export class UsersService {

    user: User;

  get currentUserProfile$():Observable<ProfileUser | null>{
    return this.authservice.currentUser$.pipe(
      switchMap(user=>{
        if(!user?.uid){
          return of(null)
        }
        const ref = doc(this.firestore,'users',user?.uid)
        return docData(ref) as Observable<ProfileUser>;
      })
    )
  }

  constructor(private firestore: Firestore,
              private authservice:AuthenticationService,
              private angularFirestore: AngularFirestore) { }

  addUser(user:ProfileUser):Observable<any>{
    const ref = doc(this.firestore,'users',user?.uid)
    return from(setDoc(ref,user));
  }

  saveUser(user: User) {
      return this.angularFirestore.collection('users').doc(user.email).set(user);
  }

  getUserDetails() {
      if (this.user === undefined) {
          this.user = JSON.parse(sessionStorage.getItem('userData')!);
      }
      return this.user;
  }

  getUser(id: string) {
      this.angularFirestore.collection('users').doc<User>(id).get().subscribe(res => {
          this.user = <User>res.data();
          console.log(res.data());
          sessionStorage.setItem('userData', JSON.stringify(this.user));
      });
  }

  isUser(id: string) {
      return this.angularFirestore.collection('users', ref => ref.where('email', "==", id)).get();
  }

  isAdmin(id:string){
      return this.angularFirestore.collection('admin',ref=> ref.where("email", "==",id)).get();
  }

  saveUserDetails(user: User) {
      this.user = user;
  }
}
