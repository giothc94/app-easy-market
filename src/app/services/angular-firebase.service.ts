import { Market } from './../interfaces/market';
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

  guardarMarkets(market: Market) {
    return this.afDB.collection('markets-app').doc(`${market.id}`).set(market)
  }

  obtenerMarkets() {
    return this.afDB.collection('markets-app')
  }

  obtenerMarket(id){
    return this.afDB.collection('markets-app').doc(id).snapshotChanges()
  }
}
