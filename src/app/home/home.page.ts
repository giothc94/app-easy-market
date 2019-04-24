import { Platform, MenuController, NavParams, NavController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker } from '@ionic-native/google-maps/ngx'
import { Environment } from '@ionic-native/google-maps/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: GoogleMap;

  constructor(private platform: Platform, 
    private menuCtrl: MenuController, 
    private router: Router,
    ) {

  }

  async ngOnInit() {
    this.menuCtrl.enable(true)
    await this.platform.ready()
    await this.loadMap()
  }

  ionViewWillEnter() {
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw'
    });

    this.map = GoogleMaps.create('map_canvas')
    this.map.setCameraZoom(15)
    let marker: Marker = this.map.addMarkerSync({
      title: `Central carnivery`,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: -0.2537994,
        lng: -78.512753
      }
    });
    marker.showInfoWindow()
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(this.onMapReady.bind(this))
  }
  onMapReady(){
    console.log('mapa cargado correctamente')
  }

  redirectComprar() {
    this.router.navigate(['productos'])
  }
  redirectCategorias() {
    this.router.navigate(['categorias'])
  }
  redirectTiendas() {
    this.router.navigate(['list'])
  }

}
