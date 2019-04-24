import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private router:Router,private fln:Facebook) { }

  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())  
  }

  loginFacebookNative(){
    return this.fln.login(['public_profile','email'])
  }

  isLoggedInFacebook(){
    return this.fln.getLoginStatus()
  }

  isLoggedInApp(){
    return this.afAuth.authState
  }

  signOut(){
    this.afAuth.auth.signOut()
  }
}
