import { Platform } from '@ionic/angular';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent
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

  constructor(private activatedRoute:ActivatedRoute, private afDB:AngularFirebaseService, private platform:Platform) {
    
    this.platform.ready().then(()=>{
      this.loadMap()
    })
    
    let id = this.activatedRoute.snapshot.params.id
    this.afDB.obtenerMarket(id).subscribe(data=>{
      this.market = data.payload.data()
      console.log('Market',this.market)

    })
    
  }

  loadMap(){
    this.map = GoogleMaps.create('map_canvas')
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(this.onMapReady.bind(this))
  }

  onMapReady(){
    console.log('map is ready')
  }

  ngOnInit() {
  }

}
