import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'ingreso-productos', loadChildren: './pages/ingreso-productos/ingreso-productos.module#IngresoProductosPageModule' },
  { path: 'ingreso-tiendas', loadChildren: './pages/ingreso-tiendas/ingreso-tiendas.module#IngresoTiendasPageModule' },
  { path: 'tienda/:id', loadChildren: './pages/tienda/tienda.module#TiendaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
