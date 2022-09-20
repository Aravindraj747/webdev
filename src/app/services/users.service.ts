import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { UserProfile } from '@angular/fire/auth';
import { ProfileUser } from '../models/user-profile';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
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

  constructor(private firestore:Firestore,private authservice:AuthenticationService) { }

  addUser(user:ProfileUser):Observable<any>{
    const ref = doc(this.firestore,'users',user?.uid)
    return from(setDoc(ref,user));
  }
  //Add file
  // addfile(){
  //   id=doc(collection(this.firestore,'id')).id
  //   return addDoc(collection(this.firestore,''))
  // }
  // addUser(user:ProfileUser):Observable<any>{
  //   const ref=doc(this.firestore,'users',user?.uid)
  //   return from(setDoc(ref,user));
  // }
  //Get All file
  // getFile():Observable<>{
  //   let ref=collection(this.firestore,'files');
  //   return collectionData(ref,{idField:'id'})as
  //   Observable<>
  // }
  // addname(name:UserProfile){
  //   name.id=doc(collection(this.firestore,'name')).id;
  //   return addDoc(collection(this.firestore,'name'),name)
  // }
}
