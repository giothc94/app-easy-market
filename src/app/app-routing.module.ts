import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'ingreso-productos', loadChildren: './pages/ingreso-productos/ingreso-productos.module#IngresoProductosPageModule' },
  { path: 'ingreso-tiendas', loadChildren: './pages/ingreso-tiendas/ingreso-tiendas.module#IngresoTiendasPageModule' },
  { path: 'tienda/:id', loadChildren: './pages/tienda/tienda.module#TiendaPageModule' },
  { path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasPageModule' },
  { path: 'productos', loadChildren: './pages/productos/productos.module#ProductosPageModule' },
  { path: 'ingreso-categoria', loadChildren: './pages/ingreso-categoria/ingreso-categoria.module#IngresoCategoriaPageModule' },
  { path: 'producto-categoria/:idCategoria', loadChildren: './pages/producto-categoria/producto-categoria.module#ProductoCategoriaPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'efectuar-compra', loadChildren: './pages/efectuar-compra/efectuar-compra.module#EfectuarCompraPageModule' },
  { path: 'listas-usuario', loadChildren: './pages/listas-usuario/listas-usuario.module#ListasUsuarioPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
