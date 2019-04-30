import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

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

  cantidad = 1

  navigate

  flag = false

  listaPedido = []

  star

  tempCarrito = []

  marketDetalle

  constructor(private platform: Platform, 
    private navParams: NavParams, 
    private modalController: ModalController, 
    private afDB: AngularFirebaseService, 
    private navController: NavController, 
    private storage: Storage,
    public toastController: ToastController    
    ) {
    this.productos = this.navParams.get('listaProductos')
    this.productoId = this.navParams.get('idProducto')
    this.navigate = this.navParams.get('return')
    this.marketDetalle = this.navParams.get('marketDetalle') ? false : true
  }

  ngOnInit() {
    this.afDB.obtenerProductoPorId(this.productoId).subscribe(resp => {
      this.producto = resp
      console.log(this.producto)
      this.afDB.obtenerMarket(this.producto.marketIdProducto).subscribe(resp => {
        this.market = resp.payload.data()
        console.log(this.market)
      })
      this.afDB.obtenerCategoria(this.producto.categoriaProducto).subscribe(resp => {
        this.categoria = resp.payload.data()
        console.log(this.categoria)
      })
    })

  }
  cerrar() {
    console.log(this.navigate)
    this.modalController.dismiss()
  }

  agregarACarrito() {
    this.storage.set(this.productoId, this.cantidad).then(() => {
      this.presentToast()
    })

    this.cerrar()

  }
  activateProd() {
    if (this.cantidad) {
      this.flag = true
      console.log(this.flag)

    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito',
      duration: 1500
    });
    toast.present();
  }

}
