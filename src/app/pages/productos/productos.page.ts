import { DetalleProductoComponent } from './../../components/detalle-producto/detalle-producto.component';
import { PopoverCarritoComponent } from './../../components/popover-carrito/popover-carrito.component';
import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos = []

  productosCarrito = []

  tempCarrito = []

  query = ''

  constructor(private afDB: AngularFirebaseService, public modalController: ModalController) {
    this.obtenerProductos()
  }

  ngOnInit() {
  }

  obtenerProductos(){
    this.afDB.obtenerProductos().snapshotChanges().subscribe(data => {
      this.productos = []
      data.forEach(prod => {
        this.productos.push(prod.payload.doc.data())
      })
    })
  }

  async popoverCarrito(ev: any) {
    const modal = await this.modalController.create({
      component: PopoverCarritoComponent,
      componentProps:{listaProductos:this.productos,return:`productos`}
    })
    return await modal.present()
  }

  async detalleProducto(id){
    const modal = await this.modalController.create({
      component: DetalleProductoComponent,
      componentProps:{idProducto:`${id}`,listaProductos:this.productos,return: `productos`}
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

  doRefresh(event) {
    setTimeout(() => {
      this.obtenerProductos()
      event.target.complete();
    }, 3000);
  }
}