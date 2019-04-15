import { Platform } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';

import {GoogleMaps,GoogleMap} from '@ionic-native/google-maps/ngx'
import { Environment } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map:GoogleMap;

  constructor(private platform:Platform){

  }
  
  async ngOnInit() {
    await this.platform.ready()
    await this.loadMap()
  }

  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw'
    });

    this.map = GoogleMaps.create('map_canvas')
  }
}
