import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngresoTiendasPage } from './ingreso-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoTiendasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [IngresoTiendasPage]
})
export class IngresoTiendasPageModule {}
