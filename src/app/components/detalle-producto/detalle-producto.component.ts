import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {

  productos = []

  productoId

  producto

  market

  categoria

  cantidad


  flag = false

  constructor(private navParams:NavParams, private modalController:ModalController, private afDB:AngularFirebaseService) { 
    this.productos = this.navParams.get('listaProductos')
    this.productoId = this.navParams.get('idProducto')
    this.afDB.obtenerProductoPorId(this.productoId).subscribe(resp=>{
      this.producto = resp.payload.data()
      console.log(this.producto)
      this.afDB.obtenerMarket(this.producto.marketIdProducto).subscribe(resp=>{
        this.market = resp.payload.data()
        console.log(this.market)
        this.afDB.obtenerCategoria(this.producto.categoriaProducto).subscribe(resp=>{
          this.categoria = resp.payload.data()
          console.log(this.categoria)
        })
      })
    })
  }

  ngOnInit() {

  }
  cerrar(){
    this.modalController.dismiss()
  }

  agregarACarrito(){
    console.log(this.cantidad,this.producto,this.productos.length)
  }

  activateProd(){
    if (this.cantidad) {
      this.flag = true
      console.log(this.flag)

    }
  }

}
