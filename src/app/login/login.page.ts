import { LoginService } from './../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavParams, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app'

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/ngx';
import { Router } from '@angular/router';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  stateResp

  user: any = {}

  constructor(private fAuth: LoginService,
    private userService: UserService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.loginFacebook()
  }

  ngOnInit() {
  }

  loginFacebook() {
    this.fAuth.loginFacebookNative()
      .then(resp => {
        if (resp.status) {
          let credenciales = firebase.auth.FacebookAuthProvider.credential(resp.authResponse.accessToken)
          firebase.auth().signInWithCredential(credenciales).then(resp => {
            this.user.displayName = resp.displayName
            this.user.email = resp.email
            this.user.phoneNumber = resp.phoneNumber
            this.user.photoUrl = resp.photoURL
            this.user.id = resp.uid
            //consulta bd de users
            this.userService.buscarUsuario(this.user.id).subscribe(resp => {
              if (resp.payload.exists) {
                this.router.navigate(['home'])
              } else {
                this.router.navigate([`registro`, { user: JSON.stringify(this.user) }])
              }
            })
          })
        }
      })
      .catch(error => {
        console.log('ERROR!!',error)
      })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }

  isLogged() {
    let verificador: boolean
    this.fAuth.isLoggedInApp().subscribe(resp => {
      verificador = resp.uid ? true : false
    })
  }

  logOut() {
    this.fAuth.signOut()
  }
}














































  // isLogged() {
  //   this.fAuth.isLoggedInFacebook().then(status => {
  //     console.log(status.status)
  //     console.log('currentUser', firebase.auth().currentUser)
  //   })
  //   this.fAuth.isLoggedInApp().subscribe(resp => {
  //     console.log('Logged in app', resp)
  //   })
  // }
  // logOut() {
  //   firebase.auth().signOut().then(resp => {
  //     console.log('LOGOUT', resp)
  //   })
  // }