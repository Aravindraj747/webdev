import { Injectable } from '@angular/core';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
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
}
