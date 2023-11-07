import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"angular-itu","appId":"1:658611626559:web:ee5c3d05bc1ddd784b4e8a","storageBucket":"angular-itu.appspot.com","apiKey":"AIzaSyDDHO8HDvpEsSB92yz7g0fnH11mtzCdjyc","authDomain":"angular-itu.firebaseapp.com","messagingSenderId":"658611626559"})),
    provideFirestore(() => getFirestore()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
