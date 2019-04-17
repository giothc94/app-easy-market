import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popover-carrito',
  templateUrl: './popover-carrito.component.html',
  styleUrls: ['./popover-carrito.component.scss'],
})
export class PopoverCarritoComponent implements OnInit {

  listaProductos = []

  listaCarrito = []

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.listaCarrito = this.navParams.get('listaCarrito')
    this.listaProductos = this.navParams.get('listaProductos')
  }

  ngOnInit() { }

  buscarProductos() {
    this.listaProductos
  }
  cerrar() {
    this.modalController.dismiss()
  }
}
