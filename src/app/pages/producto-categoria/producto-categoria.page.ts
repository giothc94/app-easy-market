import { DetalleProductoComponent } from './../../components/detalle-producto/detalle-producto.component';
import { ModalController } from '@ionic/angular';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverCarritoComponent } from './../../components/popover-carrito/popover-carrito.component';

@Component({
  selector: 'app-producto-categoria',
  templateUrl: './producto-categoria.page.html',
  styleUrls: ['./producto-categoria.page.scss'],
})
export class ProductoCategoriaPage implements OnInit {

  categoria: any = {}

  productos = []
  productosfull = []

  idCategoria

  query = ''

  constructor(private router: Router, private activeRouter: ActivatedRoute, private afDB: AngularFirebaseService, public modalController: ModalController) {
    this.obtenerProductos()
  }

  obtenerProductos(){
    this.productosfull = []
    this.afDB.obtenerProductos().snapshotChanges().subscribe(data => {
      data.forEach(prod => {
        this.productosfull.push(prod.payload.doc.data())
      })
    })
  }


  ngOnInit() {
    this.idCategoria = this.activeRouter.snapshot.params['idCategoria']
    this.buscarProductos()
    this.afDB.obtenerCategoria(this.idCategoria).subscribe(categoria => {
      this.categoria = categoria.payload.data()
    })
  }
  buscarProductos() {
    this.productos = []
    this.afDB.obtenerProductoPorCategoria(this.idCategoria).get()
      .then(result => {
        result.forEach(producto => {
          this.productos.push(producto.data())
        })
      })
  }
  async popoverCarrito(ev: any) {
    const modal = await this.modalController.create({
      component: PopoverCarritoComponent,
      componentProps: { listaProductos: this.productosfull, return: `producto-categoria/${this.idCategoria}` }
    })
    return await modal.present()
  }
  async detalleProducto(id){
    const modal = await this.modalController.create({
      component: DetalleProductoComponent,
      componentProps:{idProducto:`${id}`,listaProductos:this.productos,return: `producto-categoria/${this.idCategoria}`}
    })
    return await modal.present()
  }
  doRefresh(event) {
    setTimeout(() => {
      this.buscarProductos()
      event.target.complete();
    }, 3000);
  }
}
