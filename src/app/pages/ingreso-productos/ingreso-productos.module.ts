import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngresoProductosPage } from './ingreso-productos.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoProductosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IngresoProductosPage]
})
export class IngresoProductosPageModule {}
