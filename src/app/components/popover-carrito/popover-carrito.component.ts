import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { ListasService } from './../../services/listas/listas.service';
import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover-carrito',
  templateUrl: './popover-carrito.component.html',
  styleUrls: ['./popover-carrito.component.scss'],
})
export class PopoverCarritoComponent implements OnInit {

  public listaProductos = []
  public listaCarrito = []
  public navigate
  public listaRender = []
  public precioTotal: number = 0
  public usuario: any = {}
  public listaDisponibles = []
  public listaNoDisponibles = []
  public productoCompraEfectiva: any
  public listaProductosModificados = []
  public listaConfirmada: any = {}

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private storage: Storage,
    private loginService: LoginService,
    private listaService: ListasService,
    private productosService: AngularFirebaseService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.listaProductos = this.navParams.get('listaProductos')
    this.navigate = this.navParams.get('return')
    this.actualizarCarro()
    this.loginService.isLoggedInApp().subscribe(user => {
      this.usuario.uid = user.uid
    })
  }

  buscarProductos() {
    this.listaProductos
  }
  cerrar() {
    this.modalController.dismiss()
  }

  limpiarCarrito() {
    this.listaRender = []
    this.storage.clear().then(() => console.log('carrito vacio'))
  }

  quitarProducto(productoId) {
    this.storage.remove(productoId)
    this.actualizarCarro()
  }

  actualizarCarro(){
    this.listaCarrito = []
    this.listaRender = []
    this.storage.keys()
      .then(keys => {
        keys.forEach(key => {
          this.listaProductos.forEach(producto => {
            if (key == producto.id) {
              this.listaCarrito.push(producto)
            }
          })

        })
      })
      .then(() => {
        this.listaCarrito.forEach(producto => {
          this.storage.get(producto.id).then(item => {
            producto.cantidadCompra = item
            this.precioTotal += (producto.cantidadCompra * parseFloat(producto.precioProducto))
            // console.log(this.precioTotal, producto.cantidadCompra, parseFloat(producto.precioProducto))
            this.listaRender.push(producto)
          })
        })
        console.log('Lista render', this.listaRender)
      });
  }

  hacerCompra() {
    this.productosService.obtenerProductos()
      .snapshotChanges()
      .subscribe(resp => {
        resp.forEach(producto => {
          let p: any = producto.payload.doc.data()
          this.listaRender.forEach(prod => {
            if (prod.id == p.id) {
              console.log('comprar', prod, 'fresco', p)
              p.cantidadProducto = p.cantidadProducto - prod.cantidadCompra
              this.productoCompraEfectiva = p
              this.listaProductosModificados.push(this.productoCompraEfectiva)
            }
          })
        })
      });
    // this.listaService.agregarListaAConfirmadas(this.listaRender)
    this.listaConfirmada.user = this.usuario
    this.listaConfirmada.lista = this.listaRender
    // this.listaService.agregarListaAConfirmadas(this.listaConfirmada)
    this.router.navigate([`efectuar-compra`, { lista: JSON.stringify(this.listaConfirmada), precio: this.precioTotal, ruta: this.navigate }])
    this.cerrar()
  }
}