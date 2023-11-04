import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    provideFirebaseApp(() => initializeApp({"projectId":"angular-itu","appId":"1:658611626559:web:ee5c3d05bc1ddd784b4e8a","storageBucket":"angular-itu.appspot.com","apiKey":"AIzaSyDDHO8HDvpEsSB92yz7g0fnH11mtzCdjyc","authDomain":"angular-itu.firebaseapp.com","messagingSenderId":"658611626559"})),
    provideFirestore(() => getFirestore()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
