import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-ingreso-productos',
  templateUrl: './ingreso-productos.page.html',
  styleUrls: ['./ingreso-productos.page.scss'],
})
export class IngresoProductosPage implements OnInit {

  uploadPercent
  downloadURL
  nombreProducto
  descripcionProducto
  precioProducto
  cantidadProducto
  categoriaProducto
  marketIdProducto
  pesoVentaProducto
  uploadTask: firebase.storage.UploadTask

  producto: any = {}

  markets = []

  categorias = []

  constructor(private afs: AngularFirebaseService, private storage: AngularFireStorage) {
    this.afs.obtenerMarkets().snapshotChanges().subscribe(data => {
      data.forEach(market => {
        this.markets.push(market.payload.doc.data())
      })
    })
    this.afs.obtenerCategorias().snapshotChanges().subscribe(data => {
      data.forEach(categoria => {
        this.categorias.push(categoria.payload.doc.data())
      })
      console.log(this.categorias)
    })
  }

  subir(event) {
    this.producto.nombreProducto = this.nombreProducto
    this.producto.descripcionProducto = this.descripcionProducto
    this.producto.precioProducto = this.precioProducto
    this.producto.cantidadProducto = this.cantidadProducto
    this.producto.pesoVentaProducto = this.pesoVentaProducto
    this.producto.categoriaProducto = this.categoriaProducto
    this.producto.marketIdProducto = this.marketIdProducto
    console.log(this.producto)
    const file = event.target.files[0]
    const filepath = 'productos'
    const ref = firebase.storage().ref()
    this.uploadTask = ref.child(`${filepath}/${file.name}`).put(file)
    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => { this.uploadPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 },
      error => console.log(error),
      () => {
        this.producto.id = Date.now()
        this.uploadTask.snapshot.ref.getDownloadURL().then(url => { this.producto.downloadURL = url; this.afs.guardarProducto(this.producto) })
        this.uploadTask.snapshot.ref.getDownloadURL().then(url => this.downloadURL = url)
      })
      
  }
  buscarMarket(market) {
    console.log(market)
  }
  ngOnInit() {
  }

}
