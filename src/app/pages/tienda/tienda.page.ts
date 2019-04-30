import { DetalleProductoComponent } from './../../components/detalle-producto/detalle-producto.component';
import { Platform, ModalController } from '@ionic/angular';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker
} from '@ionic-native/google-maps/';
import { PopoverCarritoComponent } from 'src/app/components/popover-carrito/popover-carrito.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  market: any = {}

  map: GoogleMap;

  slideOpts = {
    effect: 'flip'
  };

  productosDeLaTienda = []

  productos = []

  idTienda

  constructor(private activatedRoute: ActivatedRoute, private afDB: AngularFirebaseService, private platform: Platform, public modalController: ModalController) {
    
    this.idTienda = this.activatedRoute.snapshot.paramMap.get('id')
    
    this.obtenerProductos()
    let id = this.activatedRoute.snapshot.params.id
    this.afDB.obtenerMarket(id).subscribe(data => {
      this.market = data.payload.data()
      console.log('Market', this.market)
      this.platform.ready().then(() => {
        this.loadMap()
      })

    })

    this.afDB.obtenerProductoPorMarket(id).get().then(result => {
      this.productosDeLaTienda = []
      result.forEach(resp => {
        this.productosDeLaTienda.push(resp.data())
      })
      console.log(this.productosDeLaTienda)
    })


  }

  loadMap() {
    console.log(this.market)
    this.map = GoogleMaps.create('map_canvas',{
      camera: {
        target: {
          lat: this.market.position._lat,
          lng: this.market.position._long
        },
        zoom: 14
      }
    })
    let marker: Marker = this.map.addMarkerSync({
      title: `${this.market.nombre_comercial}`,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.market.position._lat,
        lng: this.market.position._long
      }
    });
    // this.map.setCameraZoom(18)
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
    marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(this.onMapReady.bind(this))
  }
  onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
  }

  onMapReady() {
    console.log('mapa cargado correctamente')
  }
  obtenerProductos() {
    this.productos = []
    this.afDB.obtenerProductos().snapshotChanges().subscribe(data => {
      data.forEach(prod => {
        this.productos.push(prod.payload.doc.data())
      })
    })
  }
  async popoverCarrito(ev: any) {
    const modal = await this.modalController.create({
      component: PopoverCarritoComponent,
      componentProps: { listaProductos: this.productos, return: `tienda/${this.idTienda}` }
    })
    return await modal.present()
  }

  async detalleProducto(id) {
    const modal = await this.modalController.create({
      component: DetalleProductoComponent,
      componentProps: { idProducto: `${id}`, listaProductos: this.productos, return: `tienda/${this.idTienda}`, marketDetalle: false }
    })
    return await modal.present()
  }

  ngOnInit() {
  }

}
