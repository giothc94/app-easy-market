import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-popover-carrito',
  templateUrl: './popover-carrito.component.html',
  styleUrls: ['./popover-carrito.component.scss'],
})
export class PopoverCarritoComponent implements OnInit {

  listaProductos = []

  listaCarrito = []

  navigate

  listaRender = []

  constructor(private navParams: NavParams, private modalController: ModalController, private storage: Storage) {
    this.listaProductos = this.navParams.get('listaProductos')
    this.navigate = this.navParams.get('return')
    this.storage.keys().then(keys => {
      keys.forEach(key => {
        this.listaProductos.forEach(producto => {
          if (key == producto.id) {
            this.listaCarrito.push(producto)
          }
        })

      })
    }).then(()=>{
      this.listaCarrito.forEach(producto=>{
        this.storage.get(producto.id).then(item=>{
          producto.cantidadCompra = item
          this.listaRender.push(producto)
        })
      })
      console.log('Lista render',this.listaRender)
    })

  }

  ngOnInit() { }

  buscarProductos() {
    this.listaProductos
  }
  cerrar() {
    this.modalController.dismiss()
  }

  limpiarCarrito(){
    this.listaRender = []
    this.storage.clear().then(()=>console.log('carrito vacio'))
  }
}
