import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  query = ''

  categorias = []

  constructor(private afDB: AngularFirebaseService, private router:Router) {
    this.obtenerCategorias()
  }

  obtenerCategorias(){
    this.categorias = []
    this.afDB.obtenerCategorias().snapshotChanges().subscribe(data => {
      data.forEach(cat => {
        this.categorias.push(cat.payload.doc.data())
      })
    })
  }

  entrarCategoria(categoria) {
    this.router.navigate([`producto-categoria/${categoria}`])
  }

  ngOnInit() {
  }

  doRefresh(event) {
    setTimeout(() => {
      this.obtenerCategorias()
      event.target.complete();
    }, 3000);
  }
}
