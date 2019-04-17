import { Platform } from '@ionic/angular';
import { AngularFirebaseService } from './../services/angular-firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Observable<any>;

  itemsList = []

  query:any = ''

  constructor(private afDB: AngularFirebaseService, private router:Router, private platform:Platform) {
    // this.items = this.afDB.obtenerMarkets().get()
    this.afDB.obtenerMarkets().snapshotChanges().subscribe(items=>{
      items.forEach(data=>{
        this.itemsList.push(data.payload.doc.data())
      })
      console.log(this.itemsList)
    })
    
  }

  entrarTienda(id){
    this.router.navigate([`tienda/${id}`])
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
