import { LoginService } from './services/login/login.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Markets',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Mis listas',
      url: '/listas-usuario',
      icon: 'list'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'list'
    }
    // {
    //   title: 'Ingreso de productos',
    //   url: '/ingreso-productos',
    //   icon: 'list'
    // },
    // {
    //   title: 'Ingreso de markets',
    //   url: '/ingreso-tiendas',
    //   icon: 'list'
    // },
    // {
    //   title: 'Ingreso de categorias',
    //   url: '/ingreso-categoria',
    //   icon: 'list'
    // }

  ];

  usuario:any={}

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.initializeApp();

    this.loginService.isLoggedInApp()
      .subscribe(resp => {
        console.log(resp)
        this.usuario.displayName = resp.displayName
        this.usuario.photoURL = resp.photoURL
        this.usuario.email = resp.email
      })
  }

  initializeApp() {
    // this.router.navigate(['login'])
    this.platform.ready().then(() => {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw'
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


}
