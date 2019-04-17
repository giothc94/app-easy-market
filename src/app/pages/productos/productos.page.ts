import { PopoverCarritoComponent } from './../../components/popover-carrito/popover-carrito.component';
import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos = []

  productosCarrito = []

  tempCarrito = []

  constructor(private afDB: AngularFirebaseService, public modalController: ModalController) {
    this.afDB.obtenerProductos().snapshotChanges().subscribe(data => {
      data.forEach(prod => {
        this.productos.push(prod.payload.doc.data())
      })
    })
    console.log(this.productos)
  }

  ngOnInit() {
  }

  async popoverCarrito(ev: any) {
    const modal = await this.modalController.create({
      component: PopoverCarritoComponent,
      componentProps:{listaCarrito: this.tempCarrito, listaProductos: this.productos}
    })
    return await modal.present()
  }

  agregar(producto) {

    let productoId = producto.id

    let flag = this.tempCarrito.find(element => {
      return element == productoId
    })

    if (flag == undefined) {
      this.tempCarrito.push(productoId)
      this.productosCarrito.push({ productoId: productoId, cantidad: 1 })
    } else {
      this.productosCarrito.forEach(element => {
        if (element.productoId == productoId) {
          element.cantidad++
        }
      });
    }
  }
}