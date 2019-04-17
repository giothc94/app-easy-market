import { Component, OnInit } from '@angular/core';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias = []

  constructor(private afDB: AngularFirebaseService) {
    this.afDB.obtenerCategorias().snapshotChanges().subscribe(data => {
      data.forEach(cat => {
        this.categorias.push(cat.payload.doc.data())
      })
    })
    console.log(this.categorias)
  }

  entrarCategoria(categoria) {
    alert(`${categoria}`)
  }

  ngOnInit() {
  }

}
