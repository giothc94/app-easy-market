import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductoCategoriaPage } from './producto-categoria.page';
import { SearchPipeModule } from 'src/app/pipes/search.module';

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
    RouterModule.forChild(routes),
    SearchPipeModule
  ],
  declarations: [ProductoCategoriaPage]
})
export class ProductoCategoriaPageModule {}
