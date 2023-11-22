import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { appReducer } from './store';

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
    provideAuth(()=>getAuth()),
    StoreModule.forRoot(appReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
