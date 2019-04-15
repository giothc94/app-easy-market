import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirebaseService } from './../../services/angular-firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ingreso-productos',
  templateUrl: './ingreso-productos.page.html',
  styleUrls: ['./ingreso-productos.page.scss'],
})
export class IngresoProductosPage implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  

  constructor(private afs: AngularFirebaseService, private storage: AngularFireStorage) {

  }

  subir(event) {
    const file = event.target.files[0]
    const filepath = 'productos'
    const ref = this.storage.ref(`${filepath}/${file.name}`)
    const task = ref.put(file)
    // const task = this.storage.upload(filepath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {this.downloadURL = ref.getDownloadURL(),console.log(this.downloadURL)})
    )
      .subscribe()
  }

  ngOnInit() {
  }

}
