import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-ingreso-tiendas',
  templateUrl: './ingreso-tiendas.page.html',
  styleUrls: ['./ingreso-tiendas.page.scss'],
})
export class IngresoTiendasPage implements OnInit {

  uploadPercent: number;
  downloadURL: string;


  nombre_comercial: string;
  direccion: string;
  representante_legal: string;
  ruc: string;
  telefono: string;
  descripcion:string;

  uploadTask:firebase.storage.UploadTask
  market: any = {}
  constructor(private afs: AngularFirebaseService, private storage: AngularFireStorage) {

  }

  subir(event) {
    this.market.nombre_comercial = this.nombre_comercial
    this.market.descripcion = this.descripcion
    this.market.direccion = this.direccion
    this.market.representante_legal = this.representante_legal
    this.market.ruc = this.ruc
    this.market.telefono = this.telefono
    const file = event.target.files[0]
    const filepath = 'markets'
    const ref = firebase.storage().ref()
    this.uploadTask = ref.child(`${filepath}/${file.name}`).put(file)

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot=>{this.uploadPercent = (snapshot.bytesTransferred / snapshot.totalBytes)*100},
      error=>console.log(error),
      ()=>{
        this.market.id = Date.now()
        this.uploadTask.snapshot.ref.getDownloadURL().then(url=>{this.market.downloadURL = url;this.afs.guardarMarkets(this.market)})
        this.uploadTask.snapshot.ref.getDownloadURL().then(url=>this.downloadURL = url)
      })

    // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    // task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.downloadURL = ref.getDownloadURL()
    //     this.market.id = Date.now()
    //     this.market.downloadURLImg = this.downloadURL
    //   })
    // )
    //   .subscribe()
  }

  ngOnInit() {
  }

}
