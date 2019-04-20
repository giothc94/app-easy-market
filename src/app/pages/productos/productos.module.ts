import { SearchPipe } from './../../pipes/search';
import { ProductosClickDirective } from './../../directives/productos-click.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductosPage } from './productos.page';
import { SearchPipeModule } from 'src/app/pipes/search.module';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
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
  declarations: [ProductosPage,ProductosClickDirective]
})
export class ProductosPageModule {}
