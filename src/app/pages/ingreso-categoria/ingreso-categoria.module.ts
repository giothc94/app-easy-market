import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngresoCategoriaPage } from './ingreso-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoCategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IngresoCategoriaPage]
})
export class IngresoCategoriaPageModule {}
