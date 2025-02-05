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
  
  itemsList = []

  query:any = ''

  constructor(private afDB: AngularFirebaseService, private router:Router, private platform:Platform) {
    this.afDB.obtenerMarkets().snapshotChanges().subscribe(items=>{
      this.itemsList = []
      items.forEach(data=>{
        this.itemsList.push(data.payload.doc.data())
      })
      console.log(this.itemsList)
    })
    
  }

  entrarTienda(id){
    this.router.navigate([`tienda/${id}`,{id:id}])
  }

  ngOnInit() {
  }
}
