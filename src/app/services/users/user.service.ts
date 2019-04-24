import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afDB:AngularFirestore) { 

  }

  registrarUsuario(user){
    return this.afDB.collection('usuarios-app').doc(`${user.id}`).set(user)
  }

  buscarUsuario(id){
    return this.afDB.collection('usuarios-app').doc(id).snapshotChanges()
  }
}
