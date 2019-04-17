import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-categoria',
  templateUrl: './producto-categoria.page.html',
  styleUrls: ['./producto-categoria.page.scss'],
})
export class ProductoCategoriaPage implements OnInit {

  constructor(private router:Router, private activeRouter:ActivatedRoute) { 
    this.activeRouter.snapshot.params['idCategoria']
  }

  ngOnInit() {
  }

}
