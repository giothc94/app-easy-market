import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductoCategoriaPage } from './producto-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoCategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductoCategoriaPage]
})
export class ProductoCategoriaPageModule {}
