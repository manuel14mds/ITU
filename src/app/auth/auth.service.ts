import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc, where, getDocs, query } from '@angular/fire/firestore';
import { User } from '../model/user';
import { BehaviorSubject, Observable, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  docRef = collection(this.store, 'users')
  usersCollection = collection(this.store, 'users');

  // para protejer la histancia para que no se pueda manipular con el .next() fuera del servicio
  private _authUser$ = new BehaviorSubject<User | null>(null)
  public authUser$ = this._authUser$.asObservable()

  user: User = {} as User


  constructor(private store: Firestore) { }

  addUser(payload: any) {
    addDoc(this.docRef, payload)
  }

  updateUser(uid: string, payload: User) {
    const userRef = doc(this.store, `users/${uid}`)
    setDoc(userRef, payload)
  }

  getUserByEmail(userEmail: string): Observable<User | null> {
    return from(
      getDocs(query(this.usersCollection, where('email', '==', userEmail)))
    ).pipe(
      switchMap((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as User;
          return of({ ...userData, id: userDoc.id });
        } else {
          return of(null);
        }
      })
    );
  }


  login(user: User): Observable<User> {
    this._authUser$.next(user)
    return of<User>(user)
  }
  logout():Observable<null>{
    this._authUser$.next(null)
    return of<null>(null)
  }
}
