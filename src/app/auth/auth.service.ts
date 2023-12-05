import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Credential, User } from '../model/user';
import { errorHandler } from '../shared/Helpers/firebase.erros';
import { deleteUser, saveUser } from '../shared/Helpers/localStorage';
import { UserActions } from '../store/user/user.actions';
import { selectUser } from '../store/user/user.selector';

export interface authResponse {
    status: boolean
    message: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    docRef = collection(this.store, 'users')
    usersCollection = collection(this.store, 'users');

    public authUser$ = this.storeNgRx.select(selectUser)

    constructor(
        private store: Firestore,
        private storeNgRx: Store,
        private auth: Auth
    ) { }


    async signUp(user: any): Promise<authResponse> {
        try {
            await createUserWithEmailAndPassword(this.auth, user.email, user.password)
                .then(() => {
                    delete user.password
                    this.addUser(user)
                })

            const result = await this.getUserByEmail(user.email)
            if (result) {
                this.storeNgRx.dispatch(UserActions.setUser({ data: result }))
                saveUser(result)
                return { status: true, message: 'success' }

            } else {
                return { status: false, message: 'Something wrong, try again' }
            }
        } catch (error: any) {
            if (error.code) {
                return { status: false, message: errorHandler(error.code) }
            }
            return { status: false, message: 'Something wrong, try again' }
        }
    }


    async logIn(credential: Credential): Promise<authResponse> {
        try {
            const value = await signInWithEmailAndPassword(this.auth, credential.email, credential.password);
            const user = await this.getUserByEmail(value.user.email);

            if (user) {
                this.storeNgRx.dispatch(UserActions.setUser({ data: user }));
                saveUser(user);
                return { status: true, message: 'success' }
            } else {
                return { status: false, message: '400: Wrong credentials' }
            }
        } catch (error: any) {
            if (error.code) {
                return { status: false, message: errorHandler(error.code) }
            }
            return { status: false, message: '400: Wrong credentials' }
        }
    }



    logOut(): void {
        deleteUser()
        this.auth.signOut();
        this.storeNgRx.dispatch(UserActions.resetUserState())
    }


    private addUser(payload: any) {
        addDoc(this.docRef, payload)
    }


    async getUserByEmail(userEmail: string | null): Promise<User | null> {
        try {
            const querySnapshot = await getDocs(query(this.usersCollection, where('email', '==', userEmail)));

            if (querySnapshot.size > 0) {
                const userData = querySnapshot.docs[0].data() as User;
                return { ...userData, id: querySnapshot.docs[0].id };
            } else {
                return null;
            }

        } catch (error) {
            console.error('Error fetching user by email:', error);
            return null
        }
    }
}
