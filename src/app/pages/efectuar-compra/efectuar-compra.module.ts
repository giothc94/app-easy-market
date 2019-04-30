import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EfectuarCompraPage } from './efectuar-compra.page';

const routes: Routes = [
  {
    path: '',
    component: EfectuarCompraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EfectuarCompraPage]
})
export class EfectuarCompraPageModule {}
