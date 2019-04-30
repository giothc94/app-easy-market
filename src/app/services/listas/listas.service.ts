import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private afDB:AngularFirestore) {
  }
  
  agregarListaAConfirmadas(lista){
    this.afDB.collection('listas-confirmadas-app').doc(`${lista.id}`).set(lista)
    this.afDB.collection('usuarios-app').doc(`${lista.user.id}`).collection('listas-compradas').doc(`${lista.id}`).set((lista))
  }

  obtenerListasDeUsuarioCompradas(id){
    return this.afDB.collection('usuarios-app').doc(`${id}`).collection('listas-compradas').valueChanges()
  }

  comprarProducto(listaProductoComprados){
    return this.afDB.collection('productos-app').doc(`${listaProductoComprados.id}`).update(listaProductoComprados)
  }


}
