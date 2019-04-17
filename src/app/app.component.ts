import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/ngx';

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
      title: 'About',
      url: '/about',
      icon: 'list'
    },
    {
      title: 'Ingreso de productos',
      url: '/ingreso-productos',
      icon: 'list'
    },
    {
      title: 'Ingreso de markets',
      url: '/ingreso-tiendas',
      icon: 'list'
    },
    {
      title: 'Ingreso de categorias',
      url: '/ingreso-categoria',
      icon: 'list'
    }
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
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
