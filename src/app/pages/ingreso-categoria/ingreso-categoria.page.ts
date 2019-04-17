import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { UploadTask } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-ingreso-categoria',
  templateUrl: './ingreso-categoria.page.html',
  styleUrls: ['./ingreso-categoria.page.scss'],
})
export class IngresoCategoriaPage implements OnInit {
  
  downloadURL
  uploadPercent


  nombreCategoria
  descripcionCategoria

  uploadTask:firebase.storage.UploadTask

  categoria:any = {}
  constructor(private afs:AngularFirebaseService) { 

  }

  ngOnInit() {
  }
  subir(event) {
    const file = event.target.files[0]
    this.categoria.nombreCategoria = this.nombreCategoria
    this.categoria.descripcionCategoria = this.descripcionCategoria
    const filepath = 'categorias'
    const ref = firebase.storage().ref()
    this.uploadTask = ref.child(`${filepath}/${file.name}`).put(file)

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot=>{this.uploadPercent = (snapshot.bytesTransferred / snapshot.totalBytes)*100},
      error=>console.log(error),
      ()=>{
        this.categoria.id = Date.now()
        this.uploadTask.snapshot.ref.getDownloadURL().then(url=>{this.categoria.downloadURL = url;this.afs.guardarCategoria(this.categoria)})
        this.uploadTask.snapshot.ref.getDownloadURL().then(url=>this.downloadURL = url)
      })
    
  }
}
