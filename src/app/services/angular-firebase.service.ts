import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AngularFirebaseService {

  constructor(private afS: AngularFireStorage, private afDB: AngularFirestore) {

  }

  guardarImgProduct(filepath, file) {
    const storeRef = this.afS.storage.ref(filepath)
    const tarea = storeRef.putString(file)
    return tarea
  }

  guardarProducto(producto) {
    return this.afDB.collection('productos-app').doc(`${producto.id}`).set(producto)
  }

  guardarMarkets(market) {
    return this.afDB.collection('markets-app').doc(`${market.id}`).set(market)
  }

  obtenerMarkets() {
    return this.afDB.collection('markets-app')
  }

  obtenerMarket(id) {
    return this.afDB.collection('markets-app').doc(id).snapshotChanges()
  }

  obtenerProductoPorMarket(id) {
    let ref = this.afDB.collection('productos-app').ref
    return ref.where("marketIdProducto", "==", id)
  }

  obtenerProductos() {
    return this.afDB.collection('productos-app')
  }

  guardarCategoria(categoria) {
    return this.afDB.collection("categorias-app").doc(`${categoria.id}`).set(categoria)
  }

  obtenerCategorias() {
    return this.afDB.collection('categorias-app')
  }

  obtenerCategoria(id) {
    return this.afDB.collection('categorias-app').doc(id).snapshotChanges()
  }
  obtenerProductoPorCategoria(id) {
    let ref = this.afDB.collection('productos-app').ref
    return ref.where("categoriaProducto", "==", id)
  }
}
