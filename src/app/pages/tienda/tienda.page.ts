import { Platform } from '@ionic/angular';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker
} from '@ionic-native/google-maps/';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  market:any = {}
  
  map: GoogleMap;

  slideOpts = {
    effect: 'flip'
  };

  productosDeLaTienda = []

  constructor(private activatedRoute:ActivatedRoute, private afDB:AngularFirebaseService, private platform:Platform) {
    
    let id = this.activatedRoute.snapshot.params.id
    this.afDB.obtenerMarket(id).subscribe(data=>{
      this.market = data.payload.data()
      console.log('Market',this.market)
      this.platform.ready().then(()=>{
        this.loadMap()
      })

    })

    this.afDB.obtenerProductoPorMarket(id).get().then(result=>{
      result.forEach(resp=>{
        this.productosDeLaTienda.push(resp.data())
      })
      console.log(this.productosDeLaTienda)
    })
    
    
  }
  
  loadMap(){
    this.map = GoogleMaps.create('map_canvas')
    this.map.setCameraZoom(15)
    let marker: Marker = this.map.addMarkerSync({
      title: `${this.market.nombre_comercial}`,
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

  ngOnInit() {
  }

}
