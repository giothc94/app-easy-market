import { AngularFirebaseService } from './../services/angular-firebase.service';
import { Platform, MenuController, NavParams, NavController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, BaseArrayClass } from '@ionic-native/google-maps/ngx'
import { Environment } from '@ionic-native/google-maps/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: GoogleMap;

  positions = []

  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private router: Router,
    private afs: AngularFirebaseService
  ) {
    this.afs.obtenerMarkets().snapshotChanges()
      .subscribe(resp => {
        resp.forEach(market => {
          let mkt: any = market.payload.doc.data()
          let punto: any = {}
          punto.position = { lat: mkt.position._lat, lng: mkt.position._long }
          punto.title = mkt.nombre_comercial
          this.positions.push(punto)
        })
        this.cargarMarcadores(this.positions)
      })
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
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(this.onMapReady.bind(this))
  }
  onMapReady() {
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
  cargarMarcadores(data) {
    this.map.clear()
    let MARCADORES: BaseArrayClass<any> = new BaseArrayClass<any>(data)
    MARCADORES.forEach(data => {
      data.disableAutoPan = false
      let marker: Marker = this.map.addMarkerSync(data)
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
      marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
    })
    this.map.setCameraTarget({
      lat: -0.1798809,
      lng: -78.4800328
    })
    this.map.setCameraZoom(8)
  }
  onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
  }

}
